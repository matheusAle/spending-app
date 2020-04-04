import { AbstractRepository } from '../AbstractRepository';
import { UserHistoryDocument, UserHistoryModel } from './UserHistory.model';
import { IUserHistory } from '@spending-app/core-types';

export class UserHistoryRepository extends AbstractRepository<UserHistoryDocument, IUserHistory> {

  constructor() {
    super(UserHistoryModel);
  }

  allOfUser(userId): Promise<IUserHistory[]> {
    return super.exec(async (): Promise<IUserHistory[]> => {
      return this.model.find({ user: userId })
        .populate('data')
        .lean();
    });
  }
}
