import { AbstractRepository } from '../AbstractRepository';
import { IUserHistory, UserHistoryModel } from './UserHistory.model';

export class UserHistoryRepository extends AbstractRepository<IUserHistory> {

  constructor() {
    super(UserHistoryModel);
  }

  allOfUser(userId): Promise<IUserHistory> {
    return super.exec(async (): Promise<IUserHistory> => {
      return super.model.find({ user: userId })
        .populate('data')
        .lean();
    });
  }
}
