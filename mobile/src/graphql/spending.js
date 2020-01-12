import gql from "graphql-tag";

export const CREATE_SPENDING = gql `
    mutation createSpending($spending: SpendingInput!) {
        createSpending(spending: $spending) {
            _id
            name
            payment
            value
        }
    }
`;
