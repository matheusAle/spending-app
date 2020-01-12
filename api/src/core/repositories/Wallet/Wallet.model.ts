import { Document, Schema, model, Types } from 'mongoose';

const walletSchema = new Schema<IWallet>({
    user: { ref: 'User', type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    availableAmount: { type: Number, required: true },
    isCard: { type: Boolean, default: false, required: true },
    isDebit: { type: Boolean, default: false, required: true },
    isCredit: { type: Boolean, default: false, required: true },
    creditLimit: { type: Number, default: 0, required: true },
    invoiceClosesOn: { type: Number },
}, {
    timestamps: true,
});

export interface IWallet extends Document {
    _id: string;
    user: string;
    name: string;
    isCard: boolean;
    isDebit: boolean;
    isCredit: boolean;
    invoiceClosesOn: number;
    availableAmount: number;
    creditLimit: number;
}

export const WalletModel = model<IWallet>('Wallet', walletSchema);
