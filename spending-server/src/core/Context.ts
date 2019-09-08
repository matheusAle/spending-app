import { Authentication } from './Authentication';
import { UnauthorizedException } from './exceptions';
import { IUser } from './models/User.model';
import { UserService } from './services/User.service';

export async function contextResolver({ req: request }) {

    const token = request.headers.authorization;

    if (!token) return {};

    // @ts-ignore
    let id;
    try {
        const result = await Authentication.decode<IUser>(token);
        id = result._id;
    } catch (e) {
        throw new UnauthorizedException('invalid "authorization" header');
    }

    if (!id) return {};

    if (!token) return {};

    const user = await UserService.authenticateToken(String(id), token);

    if (!user) {
        throw new UnauthorizedException('invalid "authorization" header');
    }

    return {
        user,
    };
}
