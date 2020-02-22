import { AbstractRepository } from '../AbstractRepository';
import { UserHistoryDocument, UserHistoryModel } from "./UserHistory.model";

export class UserHistoryRepository extends AbstractRepository<UserHistoryDocument> {

  constructor() {
    super(UserHistoryModel);
  }

  allOfUser(userId): Promise<UserHistoryDocument> {
    return super.exec(async (): Promise<UserHistoryDocument> => {
      // @ts-ignore
      return super.model.find({ user: userId })
        .populate('data')
        .lean();
    });
  }
}
