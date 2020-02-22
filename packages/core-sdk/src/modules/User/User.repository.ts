import { UserDocument, UserModel } from "./User.model";
import { AbstractRepository } from '../AbstractRepository';

export class UserRepository extends AbstractRepository<UserDocument> {

    constructor() {
        super(UserModel);
    }

    public async authenticate(email: string, password: string): Promise<UserDocument | null> {
        let user = await this.model.findOne({ email }, 'password');

        // @ts-ignore
        const match = await user.comparePassword(password);

        user = user.toObject();
        delete user.password;
        return match ? user : null;
    }

    public async setUserToken({ _id }: UserDocument, token: string): Promise<void> {
        await this.findByIdAndUpdate(_id, { $set: { token } });
    }
}
