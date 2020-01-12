import { ISpending } from './Spending.model';
import { WalletSpendingService } from '../WalletSpending';
import { SpendingRepository } from './Spending.repository';
import { WalletService } from '../Wallet';
import { ServerErrorException } from '../../exceptions';

export class SpendingService {

  static async createSpending(spending: ISpending) {
    const repository = new SpendingRepository();
    const newWallet = await WalletSpendingService.apply(spending);
    const createdSpending = await repository.create(spending);

    try {
        await WalletService.updateWallet(newWallet._id, newWallet);

    } catch (e) {
      await repository.delete({ _id: createdSpending._id });
      throw new ServerErrorException('can\'t create spending', e);
    }

    return createdSpending;
  }
}
