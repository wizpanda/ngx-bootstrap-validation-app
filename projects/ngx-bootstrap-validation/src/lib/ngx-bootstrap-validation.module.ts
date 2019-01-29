import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { FormControlDirective } from './directives/form-control.directive';
import { FormDirective } from './directives/form.directive';
import { FormErrorMessage } from './form-error-message.model';
import { ValidationFeedbackComponent } from './components/validation-feedback/validation-feedback.component';
import { FormComponentComponent } from './components/form-component/form-component.component';

export const CUSTOM_ERROR_MESSAGES = new InjectionToken<FormErrorMessage[]>(
    'ng-bootstrap-validation-form-error-messages'
);

@NgModule({
    declarations: [
        FormControlDirective,
        FormDirective,
        ValidationFeedbackComponent,
        FormComponentComponent
    ],
    exports: [
        FormControlDirective,
        FormDirective
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
