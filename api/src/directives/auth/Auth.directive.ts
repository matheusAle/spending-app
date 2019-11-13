import { Injectable } from '@nestjs/common';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import {GraphQLField} from 'graphql';
import {promises} from 'fs';
// tslint:disable-next-line:no-var-requires
const { defaultFieldResolver } = require('graphql');

interface DirectiveArguments {
    [name: string]: any;
}

@Injectable()
export class AuthDirective {

    build(): typeof SchemaDirectiveVisitor {
        const d = this;
        // tslint:disable-next-line:max-classes-per-file
        class Directive extends SchemaDirectiveVisitor {
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

        return Directive;
    }
}
