import { connect } from 'mongoose';

export async function bootstrap() {

    await connect(process.env.DB_HOST || '', { useNewUrlParser: true });

}
