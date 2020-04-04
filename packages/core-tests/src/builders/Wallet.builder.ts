import { IWallet } from '@spending-app/core-types';

export class WalletBuilder {
  private wallet: IWallet = {} as IWallet;

  debit() {
    this.wallet.isDebit = true;
    this.wallet.isCard = true;
    return this;
  }

  credit() {
    this.wallet.isCredit = true;
    this.wallet.isCard = true;
    return this;
  }

  amount(amount: number) {
    this.wallet.availableAmount = amount;
    return this;
  }

  limit(limit: number) {
    this.wallet.creditLimit = limit;
    return this;
  }

  availableLimit(limit: number) {
    this.wallet.availableCreditLimit = limit;
    return this;
  }

  get() {
    return this.wallet;
  }

}
