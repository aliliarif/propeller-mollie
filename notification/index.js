import createMollieClient from '@mollie/api-client';
import { getMollieKey } from '../src/configuration';
import { orderSetStatus, paymentUpdate } from '../propeller-api';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

const sendJsonResponse = (res, json) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(json);
};

const sendError = (res, errorCode, errorMessage) =>
  res.status(errorCode).send(errorMessage);

app.post('/', async (req, res) => {
  const transactionId = req.body.id;

  const mollieClient = createMollieClient({
    apiKey: getMollieKey(),
  });

  mollieClient.payments
    .get(transactionId)
    .then((payment) => {
      if (payment.isPaid()) {
        // Payment is paid, but can be refunded from API / Dashboard at a later point.
        if (
          payment.amountRefunded &&
          parseFloat(payment.amountRefunded.value) > 0
        ) {
          // TODO: Mark payment as refunded internally.
          return;
        }

        // Payment has become "paid". Mark payment as paid internally
        paymentUpdate({
          searchBy: {
            paymentId: transactionId,
          },
          transaction: {
            transactionId,
            type: 'PAY',
            amount: payment.amount.value,
            currency: payment.amount.currency,
            status: 'SUCCESS',
          },
          status: 'PAID',
        });

        orderSetStatus({
          orderId: payment.metadata.orderId,
          status: 'NEW',
          payStatus: 'PAID',
          sendOrderConfirmationEmail: true,
          addPDFAttachment: true,
          deleteCart: true,
        });

        res.sendStatus(200);
      }

      if (payment.isAuthorized()) {
        // TODO: Payment is authorized.
        return;
      }

      if (payment.isFailed() || payment.isExpired() || payment.isCanceled()) {
        // TODO: Payment is expired / failed / canceled.
        return;
      }
    })
    .catch((error) => {
      // Do some proper error handling.
      // It's recommended to still send a 200 OK, see: https://docs.mollie.com/guides/webhooks#how-to-handle-unknown-ids
    });
});

export default app;
