import {
    AfterContentInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostBinding, Inject,
    Input,
    OnInit,
    QueryList
} from '@angular/core';
import { ValidationFeedbackComponent } from '../validation-feedback/validation-feedback.component';
import { FormControlName } from '@angular/forms';
import { FormErrorMessage } from '../../form-error-message.model';
import { CUSTOM_ERROR_MESSAGES } from '../../ngx-bootstrap-validation.module';
import { DEFAULT_ERRORS } from '../../form-default-error-messages';

@Component({
    selector: 'wp-form-component',
    templateUrl: './form-component.component.html'
})
export class FormComponentComponent implements OnInit, AfterContentInit {

    private errorMessages: FormErrorMessage[];

    @ContentChildren(FormControlName)
    formControlNames: QueryList<FormControlName>;

    @Input()
    customErrorMessages: FormErrorMessage[] = [];

    @ContentChild(ValidationFeedbackComponent)
    messagesBlock: ValidationFeedbackComponent;

    messages = () => this.getMessages();

    constructor(private elRef: ElementRef, @Inject(CUSTOM_ERROR_MESSAGES) private customErrorMessages: FormErrorMessage[][]) {
    }

    @HostBinding('class.has-error')
    get hasErrors() {
        return this.formControlNames.some(c => !c.valid && c.dirty && c.touched);
    }

    @HostBinding('class.has-success')
    get hasSuccess() {
        return (
            !this.formControlNames.some(c => !c.valid) &&
            this.formControlNames.some(c => c.dirty && c.touched)
        );
    }

    ngAfterContentInit() {
        if (this.messagesBlock) {
            this.messagesBlock.messages = this.messages;
        }
    }

    ngOnInit() {
        this.errorMessages = DEFAULT_ERRORS
            .concat(this.customErrorMessages)
            .reverse();
    }

    get label() {
        const label = this.elRef.nativeElement.querySelector('label');
        return label && label.textContent ? label.textContent.trim() : 'This field';
    }

    get isDirtyAndTouched() {
        return this.formControlNames.some(control => control.dirty && control.touched);
    }

    private getMessages(): string[] {
        const messages = [];
        if (!this.isDirtyAndTouched) {
            return messages;
        }

        const names = this.formControlNames.map(f => f.name);

        const controls = this.formControlNames.filter((control, index) => {
            return !control.valid && !!control.errors && names.indexOf(control.name) === index;
        });

        controls.forEach(control => {
            Object.keys(control.errors).forEach(key => {
                const error = this.errorMessages.find(err => err.error === key);
                if (!error) {
                    return;
                }

                messages.push(error.format(this.label, control.errors[key]));
            });
        });

        return messages;
    }

}
