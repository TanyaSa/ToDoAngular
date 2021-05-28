import { ErrorHandler, Injectable } from '@angular/core';
import { MessageService } from 'src/app/modules/auth/services/message.service';

@Injectable({
    providedIn: 'root'
})

export class ErrorHandterInterceptor implements ErrorHandler {

    constructor(private errorService: MessageService) { }

    handleError(error: any): void {
        switch (true) {
            case !!error.error.message:
                this.errorService.showError(error.error.message);
                break;
            case !!error.message:
                this.errorService.showError(error.message);
                break;
            default:
                this.errorService.showError('Some error happened!');
                break;
        }
    }
}


