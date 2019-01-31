import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { FormControlDirective } from './directives/form-control.directive';
import { FormDirective } from './directives/form.directive';
import { FormErrorMessage } from './form-error-message.model';
import { ValidationFeedbackComponent } from './components/validation-feedback/validation-feedback.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { CUSTOM_ERROR_MESSAGES } from './token';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        FormControlDirective,
        FormDirective,
        ValidationFeedbackComponent,
        FormGroupComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        FormControlDirective,
        FormDirective,
        ValidationFeedbackComponent,
        FormGroupComponent
    ]
})
export class NgxBootstrapValidationModule {

    static forRoot(customErrorMessages: FormErrorMessage[]): ModuleWithProviders {
        return {
            ngModule: NgxBootstrapValidationModule,
            providers: [
                {
                    provide: CUSTOM_ERROR_MESSAGES,
                    useValue: customErrorMessages || [],
                    multi: true
                }
            ]
        };
    }
}
