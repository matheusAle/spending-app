import { SchemaDirectiveVisitor } from 'graphql-tools';
// tslint:disable-next-line:no-var-requires
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {

    public visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;

        field.resolve = function (...args) {

            const [, , context] = args;

            if (!context || !context.user) {
                throw new Error('You are not authorized.');
            }

            return resolve.apply(this, args);
        };
    }
}

export default {
    auth: AuthDirective,
};
