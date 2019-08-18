import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { isEmpty } from 'lodash';


const errorMiddleware = new ApolloLink((request, next) => {
    return next(request).map(response => {
        if (!isEmpty(response.errors)) {
            throw response
        }

        return response;
    });
});

const client = new ApolloClient({
    link: errorMiddleware.concat(new HttpLink({ uri: 'http://5451ae61.ngrok.io/graphql' })),
    cache: new InMemoryCache(),
});


export {
    client
};