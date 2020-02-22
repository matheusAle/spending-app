
export interface IWallet {
  _id: string;
  user: string;
  name: string;
  isCard: boolean;
  isDebit: boolean;
  isCredit: boolean;
  invoiceClosesOn: number;
  availableAmount: number;
  creditLimit: number;
  availableCreditLimit: number;
}
