import { Directive, Host, HostBinding, Input, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '.form-control,.form-check-input,.custom-control-input'
})
export class FormControlDirective {

    constructor(
        // TODO https://github.com/angular/angular/issues/25544
        @Optional() @Host() @SkipSelf() private parent: ControlContainer) {
    }

    @HostBinding('class.is-valid')
    get validClass() {
        if (!this.control) {
            return false;
        }

        return this.control.valid && (this.control.touched || this.control.dirty);
    }

    @HostBinding('class.is-invalid')
    get invalidClass() {
        if (!this.control) {
            return false;
        }

        return this.control.invalid && this.control.touched && this.control.dirty;
    }

    get control(): FormControl {
        return this.formDirective && this.formDirective.getControl(this);
    }

    get formDirective(): any {
        return this.parent ? this.parent.formDirective : null;
    }
}
