import { IUser} from '@spending-app/core-types';
import { AbstractRepository } from '../AbstractRepository';
import { UserDocument, UserModel } from './User.model';

export class UserRepository extends AbstractRepository<UserDocument, IUser> {

    constructor() {
        super(UserModel);
    }

    public async authenticate(email: string, password: string): Promise<IUser | null> {
        let user = await this.model.findOne({ email }, 'password');

        // @ts-ignore
        const match = await user.comparePassword(password);

        user = user.toObject();
        delete user.password;
        return match ? user : null;
    }

    public async setUserToken({ _id }: IUser, token: string): Promise<void> {
        await this.findByIdAndUpdate(_id, { $set: { token } });
    }
}
