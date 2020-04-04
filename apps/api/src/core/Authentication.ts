import { sign, verify } from 'jsonwebtoken';

export class Authentication {

    public static async genToken(data: any): Promise<string> {
        return sign(data, Authentication.secret);
    }

    public static async decode<T>(token: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            verify(token, Authentication.secret, (err, decoded) => {
                if (err) {
                    throw new Error(`Failed to authenticate token. ${err}`);
                }
                // @ts-ignore
                resolve(decoded);
            });
        });
    }

    private static readonly secret = process.env.secret || 'the-giripoca-will-piupiu';
}
