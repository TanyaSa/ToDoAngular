import { HttpErrorResponse } from '@angular/common/http';

export class CustomError extends Error {
    public innerError: any;
    constructor(innerError: any) {
        let message = 'Unknown error';
        if (innerError instanceof HttpErrorResponse) {
            message = innerError.message;
        } else if (innerError.error && innerError.error.text) {
            message = innerError.error.text;
        } else if (innerError.error && typeof innerError.error === 'string') {
            message = innerError.error;
        } else if (innerError.data) {
            message = innerError.data;
        }
        super(message);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CustomError.prototype);
        this.innerError = innerError;
    }
}
