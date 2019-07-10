import { Authentication } from './Authentication';

describe('Authentication', () => {

    it('encode/decode token', async () => {
        const data = { _id: '1223334444' };

        const result = await new Authentication().genToken(data);
        expect(typeof result).toEqual('string');

        const decoded: any = await new Authentication().decode(result);
        expect(decoded._id).toEqual(data._id);
    });
});
