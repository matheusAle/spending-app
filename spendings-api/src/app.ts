import { contextResolver } from '@core/Context';
import { resolvers, schemaDirectives, typeDefs } from '@gql/index';
import { lookup } from 'dns';
import { GraphQLServer, Options } from 'graphql-yoga';
import { keyBy } from 'lodash';
import mongoose from 'mongoose';
import { hostname } from 'os';

mongoose.set('useCreateIndex', true);

lookup(hostname(), async (err, add) => {

    const options: Options = {
        port: 4000,
        endpoint: '/graphql',
        subscriptions: '/subscriptions',
        playground: '/playground',
        debug: process.env.NODE_ENV !== 'production',
        formatResponse: value => ({
            ...value,
            errors: value.errors && keyBy(value.errors, 'path'),
        }),
    };

    const server = new GraphQLServer({
        resolvers,
        typeDefs,
        schemaDirectives,
        context: contextResolver,
    });

    // @ts-ignore
    const spin = global.loading.start('connection to database');
    await mongoose.connect(process.env.DB_HOST || '', { useNewUrlParser: true });
    spin.stop();

    server.start(options)
        .then(() => {
            console.log(`Server is running on ${options.port}`);
        })
        .catch((e) => {
            console.error(e);
        });
});
