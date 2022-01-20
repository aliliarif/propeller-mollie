import gql from 'graphql-tag';

export default gql`
  mutation ($input: UpdatePaymentInput!, $searchBy: SearchByInput!) {
    paymentUpdate(input: $input, searchBy: $searchBy) {
      id
    }
  }
`;
