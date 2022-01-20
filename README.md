# Propel.us Nuxt module

<a href="https://propel.us/"><img src="https://propel.us/wp-content/themes/ecs-propeller/assets/build/images/theme/logo-blue.png" height="100px" /></a> <br>

## Overview

![Alt text](/assets/images/payment-flow.png?raw=true "Payment Flow") <br>

## Extension module

The extension module acts as a middleware between Propeller platform and Payment Service Provider. Once Extensions is configured to call PSP, for every payment created or update, Propeller GraphQL API is called to register that transaction.

## Notification module

Notification module receives asynchronous notifications sent by Payment Service Provider. Through notifications, PSP provides asynchronously payment status changes like paid, authorization, charge, or refund of the payment. The notification module processes the notification sent by PSP and matches the Propeller payment for this notification, then modifies Propeller payment and order accordingly.

## How to install

<!-- 1. Open your theme directory and run: --->

<!-- ```
yarn add @propeller-commerce/propeller-mollie
``` -->

2. Open your `nuxt.config.js`
3. At the bottom of `modules` add:

```js
// ['@propeller-commerce/propeller-mollie/nuxt', {
['@propeller-commerce/propeller-mollie/nuxt', {
    propellerKey: 'PROPELLER_KEY',
    propellerApiUrl: 'PROPELLER_API_URL',
    mollieKey: 'MOLLIE_KEY',
    mollieIsTest: true,
    mollieRedirectUrl: '/checkout/thank-you',
}],
```

`propellerKey` is used for authentication to Propeller GraphQL queries <br>
`propellerApiUrl` is Propeller GraphQL URL <br>
`mollieKey` is Mollie authentication key <br>
`mollieIsTest` allows to define if mollie if we are using Mollie test environment <br>
`mollieRedirectUrl` is the URL used for redirect after payment is finished <br>

## Render payment handlers & finalize payment

1. Import `useMollie`:

```js
import { useMollie } from "@propeller-commerce/propeller-mollie";
```

In this step you need:

```js
const { makePayment } = useMollie();
```

2. Calling `makePayment` and redirecting to payment page:

```js
const payment = await makePayment({
  amount: cartGetters.getTotals(cart.value).total,
  currency: "EUR",
  orderId: orderGetters.getId(order.value),
  userId: 146443,
});

const paymentUrl = payment.paymentUrl;
```
