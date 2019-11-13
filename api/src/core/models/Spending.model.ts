import { Document, Schema, model, Types } from 'mongoose';

export enum paymentMethod {
    MONEY = 'MONEY',
    CREDIT_CARD = 'CREDIT_CARD',
}

const spendingSchema = new Schema({
    user: { ref: 'User', type: Types.ObjectId, required: true },
    wallet: { ref: 'Wallet', type: Types.ObjectId },
    tags: { ref: 'Tag', type: Types.ObjectId },
    parcels: Number,
    debit: Boolean,
    paymentMethod: {
        type: String,
        required: true,
        enum: Object.values(paymentMethod),
    },
}, {
    timestamps: true,
});
