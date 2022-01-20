import gql from 'graphql-tag';
import { client } from '../apolloClient';
import paymentUpdateQuery from './paymentUpdate';
import { UpdatePaymentInput, SearchByInput } from '../types/GraphQL';

type Variables = {
  input: UpdatePaymentInput;
  searchBy: SearchByInput;
};

export default async (params) => {
  const amount = Number(params.amount) * 100;

  const searchBy: SearchByInput = {};

  if (params.searchBy.id) searchBy.id = params.searchBy.id;
  else if (params.searchBy.paymentId)
    searchBy.paymentId = params.searchBy.paymentId;
  else if (params.searchBy.orderId) searchBy.orderId = params.searchBy.orderId;

  const variables: Variables = {
    input: {
      addTransaction: {
        // !TEMP: transactionId should not contain postfix type - it's added because of known bug
        transactionId: params.transactionId + '_' + params.transactionType,
        type: params.transactionType,
        amount,
        currency: params.currency,
        status: params.status,
      },
      status: params.transactionType,
    },
    searchBy,
  };

  try {
    return client.mutate({
      mutation: gql`
        ${paymentUpdateQuery}
      `,
      variables,
    });
  } catch (error) {
    console.error('[Propeller-Mollie] Error updating payment');
    console.log(error);

    throw error.networkError?.result || error;
  }
};
