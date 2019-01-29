import { Component, Input } from '@angular/core';

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
}
