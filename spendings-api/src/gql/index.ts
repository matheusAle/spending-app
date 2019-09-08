import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import { join } from 'path';

// @ts-ignore
const spin = global.loading.start('loading graphql types');
const typesArray = fileLoader(join(__dirname, '**', '*.*.graphql'));

spin.text = 'loading graphql resolvers';
const resolversArray = fileLoader(join(__dirname, '**', '*.resolvers.*'));

spin.text = 'loading graphql directives resolvers';
const directivesArray = fileLoader(join(__dirname, 'directives', '**', '*.directive.resolver.*'));

spin.stop();
export const typeDefs = mergeTypes(typesArray);
export const resolvers = mergeResolvers(resolversArray);
export const schemaDirectives = mergeResolvers(directivesArray);
