export interface FormErrorMessage {
    error: string;
    format?: FormatErrorFunction;
}

export type FormatErrorFunction = (label?: string, error?: any) => string;
