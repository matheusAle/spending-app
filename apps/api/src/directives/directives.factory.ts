import { Inject, Injectable } from '@nestjs/common';
import { AuthDirective } from './auth/Auth.directive';

@Injectable()
export class DirectivesFactory {

    // @Inject()
    // authDirective: AuthDirective;
    //
    constructor(
      private readonly authDirective: AuthDirective
    ) {}

    register() {
        return {
            auth: this.authDirective.build(),
        };
    }
}
