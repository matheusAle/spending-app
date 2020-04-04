import {Module} from '@nestjs/common';
import {SpendingResolver} from './spending.resolver';

@Module({
    providers: [ SpendingResolver ],
})
export class SpendingModule {

}
