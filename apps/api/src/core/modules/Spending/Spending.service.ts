import { WalletSpendingService } from '../WalletSpending';
import { SpendingRepository } from './Spending.repository';
import { WalletService } from '../Wallet';
import { ServerErrorException } from '@spending-app/core-exceptions';
import { UserHistoryService } from '../UserHistory';
import { ISpending, UserHistoryType } from '@spending-app/core-types';

export class SpendingService {

  static async createSpending(spending: ISpending) {
    const repository = new SpendingRepository();
    const newWallet = await WalletSpendingService.apply(spending);
    const createdSpending = await repository.create(spending);
    await UserHistoryService.create(UserHistoryType.SPENDING_CREATED, createdSpending);

    try {
        await WalletService.updateWallet(newWallet._id, newWallet);

    } catch (e) {
      await repository.delete({ _id: createdSpending._id });
      throw new ServerErrorException('can\'t create spending', e);
    }

    return createdSpending;
  }

  static async listUserSpending(userId: string) {
    return new SpendingRepository().find({ user: userId });
  }
}
