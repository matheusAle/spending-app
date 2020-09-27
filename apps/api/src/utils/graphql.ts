import {keyBy} from 'lodash';
import {mergeSchemas} from 'graphql-tools';
import {GraphQLSchema} from 'graphql';

export function formatResponse(value) {
    return {
        ...value,
        errors: value.errors && keyBy(value.errors, 'path'),
    };
}

export function wait(time) {
    return new Promise(r => {
        setTimeout(() => r(), time);
    });
}
