import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { ValidationFeedbackComponent } from '../validation-feedback/validation-feedback.component';
import { FormErrorMessage } from '../../form-error-message.model';
import { DEFAULT_ERRORS } from '../../form-default-error-messages';
import { CUSTOM_ERROR_MESSAGES } from '../../token';
import { FormControlDirective } from '../../directives/form-control.directive';

@Component({
    // tslint:disable:component-selector
    selector: '.form-group',
    templateUrl: './form-group.component.html'
})
export class FormGroupComponent implements OnInit, AfterContentInit {

    private errorMessages: FormErrorMessage[];

    @ContentChild(FormControlDirective)
    formControlDirective: FormControlDirective;

    @ContentChild(ValidationFeedbackComponent)
    messagesBlock: ValidationFeedbackComponent;

    messages = () => this.getMessages();

    constructor(private elRef: ElementRef, @Inject(CUSTOM_ERROR_MESSAGES) private customErrorMessages: FormErrorMessage[]) {
    }

    @HostBinding('class.has-error')
    get hasErrors() {
        return this.formControlDirective.control &&
            !this.formControlDirective.control.valid &&
            this.formControlDirective.control.dirty &&
            this.formControlDirective.control.touched;
    }

    @HostBinding('class.has-success')
    get hasSuccess() {
        return this.formControlDirective.control &&
            this.formControlDirective.control.valid &&
            this.formControlDirective.control.dirty &&
            this.formControlDirective.control.touched;
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
        return this.formControlDirective.control &&
            this.formControlDirective.control.dirty &&
            this.formControlDirective.control.touched;
    }

    private getMessages(): string[] {
        const messages = [];
        if (!this.isDirtyAndTouched) {
            return messages;
        }

        const errors = this.formControlDirective.control.errors;
        if (!errors) {
            return;
        }

        Object.keys(this.formControlDirective.control.errors).forEach(key => {
            const error = this.errorMessages.find(err => err.error === key);
            if (!error) {
                return;
            }

            messages.push(error.format(this.label, this.formControlDirective.control.errors[key]));
        });

        return messages;
    }

}
