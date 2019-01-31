import { InjectionToken } from '@angular/core';
import { FormErrorMessage } from './form-error-message.model';

export const CUSTOM_ERROR_MESSAGES = new InjectionToken<FormErrorMessage[]>(
    'ng-bootstrap-validation-form-error-messages'
);
