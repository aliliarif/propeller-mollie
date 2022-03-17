import gql from 'graphql-tag';
import { client } from '../apolloClient';
import paymentCreateQuery from './paymentCreate';
import { CreatePaymentInput } from '../types/GraphQL';

type Variables = {
  input: CreatePaymentInput;
};

export default async (params) => {
  const amount = Number(params.transaction.amount) * 100;

  const variables: Variables = {
    input: {
      addTransaction: {
        transactionId: params.transaction.transactionId,
        type: params.transaction.type,
        amount,
        currency: params.transaction.currency,
        status: params.transaction.status,
      },
      status: params.status,
      orderId: Number(params.orderId),
      userId: params.userId,
      amount,
      currency: params.transaction.currency,
      method: params.method,
      paymentId: params.transaction.transactionId,
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
