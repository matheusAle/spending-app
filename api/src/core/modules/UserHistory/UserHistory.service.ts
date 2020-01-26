import { UserHistoryRepository } from './UserHistory.repository';
import { IUserHistory, UserHistoryData, UserHistoryOf, UserHistoryType } from './UserHistory.model';

export class UserHistoryService {

  static async create(type: UserHistoryType, data: UserHistoryData): Promise<IUserHistory> {
    const history: IUserHistory = { type, user: data.user } as IUserHistory;

    switch (type) {
      case UserHistoryType.SPENDING_CREATED:
      case UserHistoryType.SPENDING_REMOVED:
      case UserHistoryType.WALLET_CREATED:
      case UserHistoryType.SPENDING_EDITED:
        history.onModel = UserHistoryOf.SPENDING;
        history.data = data._id;
        break;
      case UserHistoryType.WALLET_EDITED:
      case UserHistoryType.WALLET_REMOVED:
        history.onModel = UserHistoryOf.WALLET;
        history.data = data._id;
        break;
      default:
          return;
    }

    const repository = new UserHistoryRepository();
    return repository.create(history);
  }

  static async listHistoryOfUser(userId: string): Promise<IUserHistory> {
    return new UserHistoryRepository().allOfUser(userId);
  }
}
