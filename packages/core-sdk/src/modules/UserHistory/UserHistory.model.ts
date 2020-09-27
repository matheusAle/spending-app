import { Document, model, Schema, Types } from 'mongoose';
import { IUserHistory, UserHistoryOf, UserHistoryType } from '@spending-app/core-types';
import { WalletDocument } from '../Wallet';

const userHistorySchema = new Schema<IUserHistory>({
  user: { ref: 'User', type: Types.ObjectId, required: true },
  type: {
    type: String,
    required: true,
    select: true,
    enum: Object.values(UserHistoryType),
  },
  onModel: {
    type: String,
    required: true,
    select: false,
    enum: Object.values(UserHistoryOf),
  },
  data: {
    type: Types.ObjectId,
    refPath: 'onModel',
    required: true,
    select: true,
  },
}, {
  timestamps: true,
});
export type UserHistoryDocument = IUserHistory & Document;
export const UserHistoryModel = model<WalletDocument>('UserHistory', userHistorySchema);
