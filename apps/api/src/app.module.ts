import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { CoreModule } from './core/core.module';
import {formatResponse} from './utils/graphql';
import {contextResolver} from './utils/context';
import {WalletModule} from './modules/wallet/wallet.module';
import { SpendingModule } from './modules/spending/spending.module';
import { AuthDirective } from './directives/auth/Auth.directive';


@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory() {
        return {
          formatResponse,
          context: contextResolver,
          debug: true,
          playground: true,
          installSubscriptionHandlers: true,
          typePaths: ['./**/*.graphql'],
          definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
            outputAs: 'class',
          },
          schemaDirectives: {
            auth: AuthDirective,
          },
        };
      },
    }),
    CoreModule.forRoot(),
    UserModule,
    WalletModule,
    SpendingModule,
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule {}
