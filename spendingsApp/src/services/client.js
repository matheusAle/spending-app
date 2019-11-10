import { ApolloClient, ApolloLink, HttpLink , InMemoryCache, from } from 'apollo-boost';
import { setContext } from "apollo-link-context";
import { isEmpty } from 'lodash';
import {AuthService} from "@/services/Auth";


const httpLink = new HttpLink({ uri: 'http://192.168.0.7:3000/graphql' });

const withToken = setContext((request, { headers = {} }) => {

    return AuthService.getToken().then(userToken => {

        if (userToken) {
            return { headers: { ...headers, authorization: userToken } };
        }

        return { headers: { ...headers } };

    });
});

const errorMiddleware = new ApolloLink((request, next) => {
    return next(request).map(response => {
        if (!isEmpty(response.errors)) {
            throw response
        }

        return response;
    });
});

const client = new ApolloClient({
    link: from([errorMiddleware, withToken.concat(httpLink)]),
    cache: new InMemoryCache(),
});

export {
    client
};
