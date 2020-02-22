import { IUser } from "./IUser";
import { IWallet } from "./IWallet";

export interface ISpending {
  _id: string;
  user: string | IUser;
  wallet: string | IWallet;
  value: number;
  payment: payment;
  tags?: string[];
  parcels?: number;
  date: string;
}

export enum payment {
  MONEY = "MONEY",
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}
