import { Document, Schema, model, Types } from 'mongoose';
import { IWallet } from '@spending-app/core-types';

const walletSchema = new Schema<IWallet>({
    user: { ref: 'User', type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    availableAmount: { type: Number, required: true },
    isCard: { type: Boolean, default: false, required: true },
    isDebit: { type: Boolean, default: false, required: true },
    isCredit: { type: Boolean, default: false, required: true },
    creditLimit: { type: Number, default: 0, required: true },
    availableCreditLimit: { type: Number, default: 0 },
    invoiceClosesOn: { type: Number },
}, {
    timestamps: true,
});

export type WalletDocument = IWallet & Document;
export const WalletModel = model<WalletDocument>('Wallet', walletSchema);
