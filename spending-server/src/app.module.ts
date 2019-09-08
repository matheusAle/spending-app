import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { keyBy, map } from 'lodash';
import { DirectivesFactory } from './directives/directives.factory';
import { GraphQLSchema } from 'graphql';
import { mergeSchemas } from 'graphql-tools';
import { DirectivesModule } from './directives/directives.module';
import { CoreModule } from './core/core.module';
import { contextResolver } from './core/Context';
import {SpendingResolver} from './modules/spending/spending.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory(factory: DirectivesFactory) {
        return {
          typePaths: ['./**/*.graphql'],
          definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
            outputAs: 'class',
          },
          formatResponse: value => ({
            ...value,
            errors: value.errors && keyBy(value.errors, 'path'),
          }),
          context: contextResolver,
          debug: true,
          playground: true,
          installSubscriptionHandlers: true,
          transformSchema: (schema: GraphQLSchema) => {
            return mergeSchemas({schemas: [schema], schemaDirectives: factory.register() });
          },
        };
      },
      imports: [DirectivesModule],
      inject: [DirectivesFactory],
    }),
    CoreModule.forRoot(),
    UserModule,
    SpendingResolver,
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule {}
