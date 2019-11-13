import { Authentication } from '../Authentication';
import { NotFoundException, DuplicatedException } from '../exceptions';
import { IUser } from '../models/User.model';
import { UserRepository } from '../repositories/User.repository';

export class UserService {

    public static async getAllUsers(): Promise<IUser[]> {
        return await new UserRepository().find({});
    }

    public static async getUserById(id: string): Promise<IUser | null> {
        return await new UserRepository().findById(id);
    }

    public static async registerUser(user: IUser): Promise<IUser> {
        try {
            return await new UserRepository().create(user);
        } catch (e) {
            if (e.message.includes('E11000')) {
                throw new DuplicatedException('user is already registered');
            }
        }
    }

    public static async updateUser(id: string, user: IUser): Promise<IUser | null> {
        return await new UserRepository().findByIdAndUpdate(id, { $set: user });
    }

    public static async login(email: string, password: string) {

        const repository = new UserRepository();

        const user = await repository.authenticate(email, password);

        if (!user) {
            throw new NotFoundException('User not not found');
        }

        const token = await Authentication.genToken({ _id: user._id });

        await repository.setUserToken(user, token);

        return {
            token,
            user,
        };
    }

    public static async authenticateToken(userId: string, token: string) {
        return await new UserRepository().findOne({ token, _id: userId });

    }
}
