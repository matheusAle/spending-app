import {keyBy} from 'lodash';
import {mergeSchemas} from 'graphql-tools';
import {DirectivesFactory} from '../directives/directives.factory';
import {GraphQLSchema} from 'graphql';

export function formatResponse(value) {
    return {
        ...value,
        errors: value.errors && keyBy(value.errors, 'path'),
    };
}

export function transformSchema(factory: DirectivesFactory) {
    return (schema: GraphQLSchema) => {
        return mergeSchemas({schemas: [schema], schemaDirectives: factory.register() });
    };
}

export function wait(time) {
    return new Promise(r => {
        setTimeout(() => r(), time);
    });
}
