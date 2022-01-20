# Propel.us Nuxt module

<a href="https://propel.us/"><img src="https://propel.us/wp-content/themes/ecs-propeller/assets/build/images/theme/logo-blue.png" height="100px" /></a> <br>
This integration is being developed and maintained by [Propeller](https://propel.us)

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
