import { WalletService } from '../Wallet';
import { BadRequestException } from '@spending-app/core-exceptions';
import { ISpending, SpendingPaymentType, IWallet } from "@spending-app/core-types";

export class WalletSpendingService {

  static async apply(spending: ISpending) {
    const wallet: IWallet = await WalletService.getUserWallet(spending.user as string, spending.wallet as string);

    if (!wallet) {
      throw new BadRequestException('Wallet not Found');
    }

    switch (spending.payment) {
      case SpendingPaymentType.DEBIT:
      case SpendingPaymentType.MONEY:
        return WalletSpendingService._applyDebit(wallet, spending);
      case SpendingPaymentType.CREDIT:
        return WalletSpendingService._applyCredit(wallet, spending);
      default:
        throw new BadRequestException('payment method not available');
    }
  }

  static _applyDebit(wallet: IWallet, spending: ISpending): IWallet {
    if (spending.payment === SpendingPaymentType.DEBIT && (!wallet.isCard || !wallet.isDebit)) {
      throw new BadRequestException('Wallet not accept debit');
    }

    if (wallet.availableAmount < spending.value) {
      throw new BadRequestException('Amount not available');
    }

    wallet.availableAmount -= spending.value;

    return wallet;
  }

  static _applyCredit(wallet: IWallet, spending: ISpending): IWallet {
    if (spending.payment === SpendingPaymentType.CREDIT && (!wallet.isCard || !wallet.isCredit)) {
      throw new BadRequestException('Wallet not accept credit');
    }

    const availableCreditLimit = (wallet.availableCreditLimit - spending.value);

    if (availableCreditLimit >= 0) {
      wallet.availableCreditLimit = availableCreditLimit;

    } else {
      throw new BadRequestException('Limit not available');
    }

    return wallet;
  }
}
