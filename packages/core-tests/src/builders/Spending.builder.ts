import { ISpending, SpendingPaymentType } from '@spending-app/core-types';

export class SpendingBuilder {
  private spending = {
    wallet: {},
    user: {},
  } as ISpending;

  value(value: number) {
    this.spending.value = value;
    return this;
  }

  debit() {
    this.spending.payment = SpendingPaymentType.DEBIT;
    return this;
  }

  credit() {
    this.spending.payment = SpendingPaymentType.CREDIT;
    return this;
  }

  get() {
    return this.spending;
  }
}
