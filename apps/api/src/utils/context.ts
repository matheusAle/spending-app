import {Authentication} from '../core/Authentication';
import {IUser} from '@spending-app/core-types';
import {UnauthorizedException} from '@spending-app/core-exceptions';
import {UserService} from '../core/modules/User';

export interface IContext {
    user: IUser;
}

export async function contextResolver({req: request}): Promise<IContext> {

    const token = request.headers.authorization;

    if (!token) {
        return {} as IContext;
    }

    // @ts-ignore
    let id;
    try {
        const result = await Authentication.decode<IUser>(token);
        id = result._id;
    } catch (e) {
        throw new UnauthorizedException('invalid "authorization" header');
    }

    if (!id) {
        return {} as IContext;
    }

    if (!token) {
        return {} as IContext;
    }

    const user = await UserService.authenticateToken(String(id), token);

    if (!user) {
        throw new UnauthorizedException('invalid "authorization" header');
    }

    return {
        user,
    } as IContext;
}
