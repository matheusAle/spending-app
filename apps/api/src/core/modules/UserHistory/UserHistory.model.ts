import { Document, Schema, model, Types } from 'mongoose';
import { IUserHistory, UserHistoryOf, UserHistoryType } from "@spending-app/core-types";

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
export const UserHistoryModel = model<UserHistoryDocument>('UserHistory', userHistorySchema);
