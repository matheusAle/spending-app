import { Injectable } from '@nestjs/common';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import {promises} from 'fs';
// tslint:disable-next-line:no-var-requires
import { defaultFieldResolver, GraphQLField } from 'graphql';

interface DirectiveArguments {
    [name: string]: any;
}

export class AuthDirective extends SchemaDirectiveVisitor {

    public visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;

        field.resolve = async function(...args) {
            const [, , context] = args;

            if (!context || !context.user) {
                throw new Error('You are not authorized.');
            }

            return resolve.apply(this, args);

        };
    }
}
