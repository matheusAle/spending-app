import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { DirectivesFactory } from './directives/directives.factory';
import { DirectivesModule } from './directives/directives.module';
import { CoreModule } from './core/core.module';
import {formatResponse, transformSchema} from './utils/graphql';
import {SpendingResolver} from './modules/spending/spending.resolver';
import {contextResolver} from './utils/context';
import {WalletModule} from './modules/wallet/wallet.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory(factory: DirectivesFactory) {
        return {
          formatResponse,
          context: contextResolver,
          debug: true,
          playground: true,
          installSubscriptionHandlers: true,
          transformSchema: transformSchema(factory),
          typePaths: ['./**/*.graphql'],
          definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
            outputAs: 'class',
          },
        };
      },
      imports: [DirectivesModule],
      inject: [DirectivesFactory],
    }),
    CoreModule.forRoot(),
    UserModule,
    WalletModule,
    SpendingResolver,
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule {}
