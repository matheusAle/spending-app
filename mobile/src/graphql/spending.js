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

export const LIST_SPENDING = gql `
    query {
        spendingList {
            _id
            payment
            name
            value
            wallet
            tags
            parcels
            createdAt
            updatedAt
        }
    }
`
