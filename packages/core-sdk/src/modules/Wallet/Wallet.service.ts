import { WalletRepository } from './Wallet.repository';
import { UserHistoryService } from '../UserHistory';
import { IWallet, UserHistoryType } from "core-types";
import { WalletDocument } from "./Wallet.model";

export class WalletService {

    static async listUserWallets(userId: string): Promise<WalletDocument[]> {
        return await new WalletRepository().findUserWallets(userId);
    }

    static async getUserWallet(userId: string, walletId: string): Promise<IWallet> {
        return await new WalletRepository().getUserWallet(userId, walletId);
    }

    static async createWalletForUser(userId: string, wallet: IWallet): Promise<IWallet> {
        wallet.user = userId;
        const createdWallet = await new WalletRepository().create(<WalletDocument>wallet);
        await UserHistoryService.create(UserHistoryType.WALLET_CREATED, createdWallet);
        return createdWallet;
    }

    static async updateWallet(walletId: string, wallet: IWallet): Promise<IWallet> {
        return await new WalletRepository().updateOne({ _id: walletId }, { $set: wallet });
    }

    static async deleteWallet(walletId: string) {
        return await new WalletRepository().delete({ _id: walletId });
    }
}
