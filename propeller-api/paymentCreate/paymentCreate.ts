import gql from 'graphql-tag';

export default gql`
  mutation ($input: CreatePaymentInput!) {
    paymentCreate(input: $input) {
      id
    }
  }
`;
