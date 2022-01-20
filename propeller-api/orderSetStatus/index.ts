import gql from 'graphql-tag';
import { client } from '../apolloClient';
import orderSetStatusQuery from './orderSetStatus';
import { OrderSetStatusInput } from '../types/GraphQL';

// TODO: move types/enums to saparated file

type Variables = {
  input: OrderSetStatusInput;
};

export default async (params) => {
  const variables: Variables = {
    input: {
      orderId: Number(params.orderId),
      status: params.status,
      payStatus: params.payStatus,
    },
  };

  try {
    return client.mutate({
      mutation: gql`
        ${orderSetStatusQuery}
      `,
      variables,
    });
  } catch (error) {
    console.error('[Propeller-Mollie] Error updating order status');
    console.log(error);

    // For error in data we don't throw 500, because it's not server error
    throw error.networkError?.result || error;
  }
};
