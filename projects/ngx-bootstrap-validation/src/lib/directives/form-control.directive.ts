import { Directive, ElementRef, Host, HostBinding, Input, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

export function controlPath(name: string, parent: ControlContainer): string[] {
    // tslint:disable-next-line:no-non-null-assertion
    return [...parent.path!, name];
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '.form-control,.form-check-input,.custom-control-input'
})
export class FormControlDirective {

    @Input()
    formControlName: string;

    constructor(
        // TODO https://github.com/angular/angular/issues/25544
        @Optional() @Host() @SkipSelf() private parent: ControlContainer,
        @Optional() @Host() private formControl: FormControl,
        private elementRef: ElementRef) {
    }

    get name() {
        if (this.formControlName) {
            return this.formControlName;
        }

        this.formControlName = this.elementRef.nativeElement.getAttribute('name');
        return this.formControlName;
    }

    // This method will be invoked by "getControl" method on "formDirective"
    get path() {
        if (!this.formControlName) {
            this.formControlName = this.elementRef.nativeElement.getAttribute('name');
        }

        return controlPath(this.name, this.parent);
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
