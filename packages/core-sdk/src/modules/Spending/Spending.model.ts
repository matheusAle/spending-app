import { model, Schema, Types, Document } from "mongoose";
import { ISpending, payment } from "core-types/ISpending";

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

export type SpendingDocument = ISpending & Document
export const SpendingModel = model<SpendingDocument>('Spending', spendingSchema);
