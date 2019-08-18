import gql from "graphql-tag";

export const REGISTER_USER = gql`
    mutation register($user: UserInput!){
        registerUser(user: $user) {
            fullName
            email
            _id   
        }
    }
`;