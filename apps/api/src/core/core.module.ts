import {DynamicModule, Global, Module} from '@nestjs/common';
import {bootstrap} from './bootstrap';

const services = [

];

@Global()
@Module({})
export class CoreModule {

    static async forRoot(): Promise<DynamicModule> {
        await bootstrap();
        return {
            module: CoreModule,
            providers: services,
            exports: services,
        };
    }
}
