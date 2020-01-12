import {Args, Mutation, Resolver, Query, Context} from '@nestjs/graphql';
import { IUser } from '../../core/repositories/User/User.model';
import { UserService } from '../../core/repositories/User/User.service';
import {wait} from '../../utils/graphql';
import {IContext} from '../../utils/context';

@Resolver('User')
export class UserResolver {

    @Query()
    async users() {
        return UserService.getAllUsers();
    }

    @Query()
    // tslint:disable-next-line:variable-name
    async user(@Args('_id') _id: string) {
        return UserService.getUserById(_id);
    }

    @Mutation()
    async registerUser(@Args('user') user: IUser) {
        return UserService.registerUser(user);
    }

    @Mutation()
    // tslint:disable-next-line:variable-name
    async updateUser(@Args('_id') _id: string, @Args('user') user: IUser) {
        return UserService.updateUser(_id, user);
    }

    @Mutation()
    async loginUser(@Args('email') email: string, @Args('password') password: string) {
        await wait(2000);
        return UserService.login(email, password);
    }

    @Query()
    async me(@Context() context: IContext): Promise<IUser> {
        return context.user;
    }
}
