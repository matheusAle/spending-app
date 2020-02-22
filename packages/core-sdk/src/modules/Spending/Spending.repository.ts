import { AbstractRepository } from '../AbstractRepository';
import { SpendingDocument, SpendingModel } from "./Spending.model";

export class SpendingRepository extends AbstractRepository<SpendingDocument> {

  constructor() {
    super(SpendingModel);
  }

  allFromUser(userId) {
    return super.find({ user: userId });
  }
}
