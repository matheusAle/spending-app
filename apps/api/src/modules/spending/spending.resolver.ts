import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from '../../utils/context';
import { ISpending } from '@spending-app/core-types';
import { SpendingService } from '../../core/modules/Spending';

@Resolver('Spending')
export class SpendingResolver {

  @Query()
  async spendingList(@Context() context: IContext): Promise<ISpending[]> {
    return SpendingService.listUserSpending(context.user._id);
  }

  @Mutation()
  async createSpending(@Context() context: IContext, @Args('spending') spending: ISpending): Promise<ISpending> {
    return SpendingService.createSpending({
      ...spending,
      user: context.user._id,
    } as ISpending);
  }
}
