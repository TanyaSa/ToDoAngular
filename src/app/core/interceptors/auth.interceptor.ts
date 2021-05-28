import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const shouldAddAuthToken = req.params.get('setAuthToken') || true;
        const token = this.authService.token;

        if (shouldAddAuthToken.toString().toLowerCase() === 'false' || this.authService.token === null || !token) {
            return next.handle(req);
        }

        const modifiedReq = req.clone({
            headers: req.headers.set('x-auth-token', token),
        });

        return next.handle(modifiedReq);
    }
}
