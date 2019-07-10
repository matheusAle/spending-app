import { UserService } from '@services/User.service';

export default {
    Query: {
        users: async () => {
            return await UserService.getAllUsers();
        },
        user: async (_, { _id }) => {
            return await UserService.getUserById(_id);
        },
    },
    Mutation: {
        registerUser: async (parent, { user }) => {
            return UserService.registerUser({ ...user });
        },
        updateUser: async (parent, { _id, user }) => {
            return UserService.updateUser(_id, { ...user });
        },
        loginUser: async (parent, { email, password }) => {
            return UserService.login(email, password);
        },
    },
};
