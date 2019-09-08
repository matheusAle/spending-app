import {HttpModule, Module} from '@nestjs/common';
import {DirectivesFactory} from './directives.factory';
import {AuthDirective} from './auth/Auth.directive';

@Module({
    imports: [HttpModule],
    providers: [
        AuthDirective,
        DirectivesFactory,
    ],
    exports: [ DirectivesFactory ],
})
export class DirectivesModule {}
