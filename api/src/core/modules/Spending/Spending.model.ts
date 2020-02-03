import { Document, Schema, model, Types } from 'mongoose';
import { IUser } from '../User';
import { IWallet } from '../Wallet';

export enum payment {
    MONEY = 'MONEY',
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}

const spendingSchema = new Schema({
    user: { ref: 'User', type: Types.ObjectId, required: true },
    wallet: { ref: 'Wallet', type: Types.ObjectId, required: true },
    value: { type: Number, required: true },
    name: { type: String, required: true },
    payment: { type: String, required: true, enum: Object.values(payment) },
    parcels: Number,
    date: { type: String, required: true },
    // tags: { ref: 'Tag', type: Types.ObjectId },
}, {
    timestamps: true,
});

export interface ISpending extends Document {
    user: string | IUser;
    wallet: string | IWallet;
    value: number;
    payment: payment;
    tags?: string[];
    parcels?: number;
    date: string;
}

export const SpendingModel = model<ISpending>('Spending', spendingSchema);
