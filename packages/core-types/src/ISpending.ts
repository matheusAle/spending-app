import { IUser } from './IUser';
import { IWallet } from './IWallet';

export interface ISpending {
  _id: string;
  user: string | IUser;
  wallet: string | IWallet;
  value: number;
  payment: SpendingPaymentType;
  tags?: string[];
  parcels?: number;
  date: string;
}

export enum SpendingPaymentType {
  MONEY = 'MONEY',
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}
