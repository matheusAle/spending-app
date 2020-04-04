import { AbstractRepository } from '../AbstractRepository';
import { SpendingDocument, SpendingModel } from './Spending.model';
import { ISpending } from '@spending-app/core-types';

export class SpendingRepository extends AbstractRepository<SpendingDocument, ISpending> {

  constructor() {
    super(SpendingModel);
  }

  allFromUser(userId) {
    return super.find({ user: userId });
  }
}
