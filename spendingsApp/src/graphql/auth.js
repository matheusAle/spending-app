import gql from "graphql-tag";

export const USER_REGISTER = gql`
    mutation register($user: UserInput!){
        registerUser(user: $user) {
            fullName
            email
            _id
        }
    }
`;

export const USER_LOGIN = gql `
    mutation login($email: String!, $password: String!){
        loginUser(
            email: $email,
            password: $password
        ) {
            token
            user {
                email
                _id
                fullName
            }
        }
    }
`;

export const ME = gql `
    {
        me {
            email
            _id
            fullname
        }
    }
`;
