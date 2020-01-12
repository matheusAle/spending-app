import { ISpending, payment } from '../../repositories/Spending';

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
    this.spending.payment = payment.DEBIT;
    return this;
  }

  credit() {
    this.spending.payment = payment.CREDIT;
    return this;
  }

  get() {
    return this.spending;
  }
}
