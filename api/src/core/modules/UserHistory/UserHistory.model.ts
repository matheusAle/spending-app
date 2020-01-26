import { Document, Schema, model, Types } from 'mongoose';
import { ISpending } from '../Spending';
import { IWallet } from '../Wallet';

export enum UserHistoryType {
  SPENDING_CREATED = 'SPENDING_CREATED',
  SPENDING_EDITED = 'SPENDING_EDITED',
  SPENDING_REMOVED = 'SPENDING_REMOVED',
  WALLET_CREATED = 'WALLET_CREATED',
  WALLET_EDITED = 'WALLET_EDITED',
  WALLET_REMOVED = 'WALLET_REMOVED',
}

export enum UserHistoryOf {
  SPENDING = 'Spending',
  WALLET = 'Wallet',
}

export type UserHistoryData = ISpending | IWallet;

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

export interface IUserHistory extends Document {
  _id: string;
  user: string;
  type: UserHistoryType;
  onModel: UserHistoryOf;
  data: UserHistoryData | string;
}

export const UserHistoryModel = model<IUserHistory>('UserHistory', userHistorySchema);
