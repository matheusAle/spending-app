import { AbstractRepository } from '../AbstractRepository';
import { ISpending, SpendingModel } from './Spending.model';

export class SpendingRepository extends AbstractRepository<ISpending> {

  constructor() {
    super(SpendingModel);
  }

  allFromUser(userId) {
    return super.find({ user: userId });
  }
}
