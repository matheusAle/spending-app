import { AbstractRepository } from '../AbstractRepository';
import { WalletDocument, WalletModel } from "./Wallet.model";

export class WalletRepository extends AbstractRepository<WalletDocument> {

    constructor() {
        super(WalletModel);
    }

    async findUserWallets(userId: string): Promise<WalletDocument[]> {
        return await super.find({ user: userId });
    }

    async getUserWallet(userId: string, walletId: string): Promise<WalletDocument> {
        return await super.findOne({ user: userId, _id: walletId });
    }

    async create(wallet: WalletDocument): Promise<WalletDocument> {
        return super.create(wallet);
    }
}
