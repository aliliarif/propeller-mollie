import gql from 'graphql-tag';

export default gql`
  mutation orderSetStatus($input: OrderSetStatusInput!) {
    orderSetStatus(input: $input) {
      id
    }
  }
`;
