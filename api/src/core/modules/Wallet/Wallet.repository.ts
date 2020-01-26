import { AbstractRepository } from '../AbstractRepository';
import {IWallet, WalletModel} from './Wallet.model';

export class WalletRepository extends AbstractRepository<IWallet> {

    constructor() {
        super(WalletModel);
    }

    async findUserWallets(userId: string): Promise<IWallet[]> {
        return await super.find({ user: userId });
    }

    async getUserWallet(userId: string, walletId: string): Promise<IWallet> {
        return await super.findOne({ user: userId, _id: walletId });
    }

    async create(wallet: IWallet): Promise<IWallet> {
        return super.create(wallet);
    }
}
