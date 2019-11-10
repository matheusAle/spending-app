import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {IContext} from '../../utils/context';
import {WalletService} from '../../core/services/Wallet.service';
import {IWallet} from '../../core/models/Wallet.model';

@Resolver('Wallet')
export class WalletResolver {

    @Query()
    async wallets(@Context() context: IContext) {
        return await WalletService.listUserWallets(context.user._id);
    }

    @Query()
    async wallet(@Context() context: IContext, @Args('_id') walletId: string) {
        return await WalletService.getUserWallet(context.user._id, walletId);
    }

    @Mutation()
    async createWallet(@Context() context: IContext, @Args('wallet') wallet: IWallet): Promise<IWallet> {
        return await WalletService.createWalletForUser(context.user._id, wallet);
    }

    @Mutation()
    async updateWallet(@Args('_id') walletId: string, @Args('wallet') wallet: IWallet): Promise<IWallet> {
        return await WalletService.updateWallet(walletId, wallet);
    }

    @Mutation()
    async deleteWallet(@Args('_id') walletId: string): Promise<any> {
         await WalletService.deleteWallet(walletId);
         return true;
    }
}
