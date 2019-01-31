import { Directive, EventEmitter, Host, HostListener, Input, OnInit, Optional, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';

@Directive({
    selector: '[wpForm]'
})
export class FormDirective implements OnInit {

    @Input()
    wpForm: string;         // https://stackoverflow.com/a/40706065/2405040

    @Output()
    validFormSubmit = new EventEmitter<any>();

    constructor(@Optional() @Host() private ngForm: NgForm, @Optional() @Host() private formGroup: FormGroup) {
    }

    ngOnInit() {
        if (!this.formGroup && this.ngForm) {
            this.formGroup = this.ngForm.form;
        }
    }

    @HostListener('submit')
    onSubmit() {
        if (!this.formGroup) {
            console.warn('Could not find any formGroup or ngForm on the');
            return;
        }

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
