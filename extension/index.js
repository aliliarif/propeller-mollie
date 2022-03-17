import createMollieClient from '@mollie/api-client';
import {
  getMollieKey,
  getMollieRedirectUrl,
  getNotificationProxyUrl,
  getMollieWebhookUrl,
} from '../src/configuration';
import { paymentCreate } from '../propeller-api';

const express = require('express');
const app = express();

app.use(express.json());

const sendJsonResponse = (res, json) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(json);
};

const sendError = (res, errorCode, errorMessage) =>
  res.status(errorCode).send(errorMessage);

app.post('/', async (req, res) => {
  const amount = parseFloat(req.body.amount).toFixed(2).toString();
  const orderId = req.body.orderId;
  const redirectUrl =
    req.protocol +
    '://' +
    req.get('host') +
    getMollieRedirectUrl() +
    '?order=' +
    orderId;
  const webhookUrl =
    req.protocol + '://' + req.get('host') + getNotificationProxyUrl();
  let payment = {};

  try {
    const mollieClient = createMollieClient({
      apiKey: getMollieKey(),
    });

    payment = await mollieClient.payments.create({
      amount: {
        value: amount,
        currency: req.body.currency,
      },
      method: 'creditcard',
      description: `Order ${orderId}`,
      redirectUrl,
      // if you are developing locally, use ngrok to create a tunnel from a public host to your localhost to allow Mollie to access webhookUrl
      webhookUrl: getMollieWebhookUrl(),
      metadata: {
        orderId,
      },
    });

    // initialize payment for the order
    // initialized payments are created with status 'OPEN' and transcation type 'AUTHORIZATION'
    paymentCreate({
      transaction: {
        transactionId: payment.id,
        type: 'AUTHORIZATION',
        amount,
        currency: req.body.currency,
        status: 'OPEN',
      },
      status: 'OPEN',
      orderId,
      userId: req.body.userId,
      method: 'creditcard', // TODO: make this dynamic, support other methods of Mollie
    });
  } catch (error) {
    console.log(error);
    console.error('[Propeller-Mollie] Error creating payment');
    sendError(res, 400, 'Could not create payment');
  }

  return sendJsonResponse(
    res,
    JSON.stringify({ paymentUrl: payment.getPaymentUrl() })
  );
});

export default app;
