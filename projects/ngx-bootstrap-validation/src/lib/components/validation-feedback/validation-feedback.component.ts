import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'wp-validation-feedback',
    templateUrl: './validation-feedback.component.html',
    styleUrls: ['./validation-feedback.component.css']
})
export class ValidationFeedbackComponent {

    @Input()
    public messages = () => []

    constructor() {
    }

    // TODO support valid-feedback as well
    @HostBinding('class.invalid-feedback')
    get classes() {
        return true;
    }
}
