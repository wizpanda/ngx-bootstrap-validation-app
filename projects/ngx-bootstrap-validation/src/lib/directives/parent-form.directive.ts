import { Directive } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

// @dynamic
@Directive({
    selector: '[wpLinkParentForm]',
    providers: [
        {
            provide: ControlContainer,
            useFactory: function (form: NgForm) {
                return form;
            },
            deps: [NgForm]
        }
    ]
})
export class ParentFormDirective {
}
