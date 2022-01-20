import gql from 'graphql-tag';
import { client } from '../apolloClient';
import paymentCreateQuery from './paymentCreate';
import { CreatePaymentInput } from '../types/GraphQL';

type Variables = {
  input: CreatePaymentInput;
};

export default async (params) => {
  const amount = Number(params.amount) * 100;

  const variables: Variables = {
    input: {
      transactions: {
        transactionId: params.transactionId,
        type: params.transactionType,
        amount: amount,
        currency: params.currency,
      },
      status: params.status,
      orderId: Number(params.orderId),
      userId: params.userId,
      amount: amount,
      currency: params.currency,
      method: params.method,
      paymentId: params.transactionId,
    },
  };

  try {
    return client.mutate({
      mutation: gql`
        ${paymentCreateQuery}
      `,
      variables,
    });
  } catch (error) {
    console.error('[Propeller-Mollie] Error creating payment');
    console.log(error);

    throw error.networkError?.result || error;
  }
};
