import { AbstractRepository } from '../AbstractRepository';
import { WalletDocument, WalletModel } from './Wallet.model';
import { IWallet } from '@spending-app/core-types';

export class WalletRepository extends AbstractRepository<WalletDocument, IWallet> {

    constructor() {
        super(WalletModel);
    }

    async findUserWallets(userId: string): Promise<IWallet[]> {
        return await super.find({ user: userId });
    }

    async getUserWallet(userId: string, walletId: string): Promise<IWallet> {
        return await super.findOne({ user: userId, _id: walletId });
    }

    async create(wallet: IWallet): Promise<WalletDocument> {
        return super.create(wallet);
    }
}
