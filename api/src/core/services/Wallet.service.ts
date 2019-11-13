import {IWallet} from '../models/Wallet.model';
import {WalletRepository} from '../repositories/Wallet.repository';

export class WalletService {

    static async listUserWallets(userId: string): Promise<IWallet[]> {
        return await new WalletRepository().findUserWallets(userId);
    }

    static async getUserWallet(userId: string, walletId: string): Promise<IWallet> {
        return await new WalletRepository().getUserWallet(userId, walletId);
    }

    static async createWalletForUser(userId: string, wallet: IWallet): Promise<IWallet> {
        wallet.user = userId;
        return await new WalletRepository().create(wallet);
    }
    static async updateWallet(walletId: string, wallet: IWallet): Promise<IWallet> {
        return await new WalletRepository().updateOne({ _id: walletId }, { $set: wallet });
    }

    static async deleteWallet(walletId: string) {
        return await new WalletRepository().delete({ _id: walletId });
    }
}
