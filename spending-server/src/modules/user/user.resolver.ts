import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { IUser } from '../../core/models/User.model';
import { UserService } from '../../core/services/User.service';

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
        return UserService.login(email, password);
    }
}
