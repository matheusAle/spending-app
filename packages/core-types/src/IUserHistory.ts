import { ISpending } from "./ISpending";
import { IWallet } from "./IWallet";

export enum UserHistoryType {
  SPENDING_CREATED = "SPENDING_CREATED",
  SPENDING_EDITED = "SPENDING_EDITED",
  SPENDING_REMOVED = "SPENDING_REMOVED",
  WALLET_CREATED = "WALLET_CREATED",
  WALLET_EDITED = "WALLET_EDITED",
  WALLET_REMOVED = "WALLET_REMOVED",
}

export enum UserHistoryOf {
  SPENDING = "Spending",
  WALLET = "Wallet",
}

export type UserHistoryData = ISpending | IWallet;

export interface IUserHistory {
  _id: string;
  user: string;
  type: UserHistoryType;
  onModel: UserHistoryOf;
  data: UserHistoryData | string;
}
