import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from '../../utils/context';
import { ISpending, SpendingService } from '../../core/repositories/Spending';

@Resolver('Spending')
export class SpendingResolver {

  @Mutation()
  async createSpending(@Context() context: IContext, @Args('spending') spending: ISpending): Promise<ISpending> {
    return await SpendingService.createSpending({
      ...spending,
      user: context.user._id,
    } as ISpending);
  }
}
