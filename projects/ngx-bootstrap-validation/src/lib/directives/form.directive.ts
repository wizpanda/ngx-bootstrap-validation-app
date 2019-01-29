import { Directive, EventEmitter, Host, HostListener, Optional, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Directive({
    selector: '[wpForm]'
})
export class FormDirective {

    constructor(@Optional() @Host() private formGroup: FormGroup) {
    }

    @Output()
    validFormSubmit = new EventEmitter<any>();

    @HostListener('submit')
    onSubmit() {
        this.markAsTouchedAndDirty(this.formGroup);
        if (this.formGroup.valid) {
            this.validFormSubmit.emit(this.formGroup.value);
        }
    }

    private markAsTouchedAndDirty(control: AbstractControl) {
        if (control instanceof FormGroup) {
            Object.keys(control.controls).forEach((key) => {
                this.markAsTouchedAndDirty(control.controls[key]);
            });

        } else if (control instanceof FormArray) {
            control.controls.forEach(c => this.markAsTouchedAndDirty(c));

        } else if (control instanceof FormControl && control.enabled) {
            control.markAsDirty();
            control.markAsTouched();
            control.updateValueAndValidity();
        }
    }
}
