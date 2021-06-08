import { ErrorHandler, Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MessageService } from 'src/app/modules/auth/services/message.service';
import { environment } from 'src/environments/environment';
import { CustomError } from './error.type';

@Injectable({
    providedIn: 'root'
})

export class ErrorHandterInterceptor implements ErrorHandler {

    constructor(private errorService: MessageService, private authService: AuthService) { }

    handleError(error: any): void {
        if (!environment.production) {
            console.error(error);
        }
        if (error instanceof CustomError) {
            this.handleServerError(error);
        }
        else {
            if (error.error.message) {
                this.errorService.showError(error.error.message);
            } else if (error.message) {
                this.errorService.showError(error.message);
            } else {
                this.errorService.showError('Some error happened!');
            }
        }
        // switch (true) {
        //     case !!error.error.message:
        //         this.errorService.showError(error.error.message);
        //         break;
        //     case !!error.message:
        //         this.errorService.showError(error.message);
        //         break;
        //     default:
        //         this.errorService.showError('Some error happened!');
        //         break;
        // }
    }
    private handleServerError(error: CustomError): void {
        if (error.innerError.status === 403) {
            this.errorService.showInfo('Session Expired.');
            this.authService.logout();
        } else if (error.innerError.status === 500) {
            this.errorService.showError('Server error.');
        } else {
            this.errorService.showError(error.innerError.error.message);
        }
    }
}
