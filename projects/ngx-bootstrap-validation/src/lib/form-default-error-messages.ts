import { FormErrorMessage } from './form-error-message.model';

export const DEFAULT_ERRORS: FormErrorMessage[] = [
    {
        error: 'required',
        format: label => `${label} is required.`
    },
    {
        error: 'pattern',
        format: label => `${label} is invalid.`
    },
    {
        error: 'minlength',
        format: (label, error) =>
            `${label} must be at least ${error.requiredLength} characters`
    },
    {
        error: 'maxlength',
        format: (label, error) =>
            `${label} must be no longer than ${error.requiredLength} characters`
    },
    {
        error: 'requiredTrue',
        format: (label) => `${label} is required`
    },
    {
        error: 'email',
        format: () => `Invalid email address`
    },
    {
        error: 'max',
        format: (label, error) => `${label} must be no greater than ${error.max}`
    },
    {
        error: 'min',
        format: (label, error) => `${label} must be no less than ${error.min}`
    }
];