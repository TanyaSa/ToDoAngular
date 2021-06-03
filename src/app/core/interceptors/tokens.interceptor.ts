import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError(error => {
            if (error.status === 403) {
                return this.catchErrorsFunction(req, next);
            } else {
                return throwError(error);
            }
        }));
    }

    private catchErrorsFunction(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('catchErrorsFunction');
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.updateTokensPair().pipe(
                switchMap((tokens: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(tokens);
                    const modifiedReq = req.clone({
                        headers: req.headers.set('x-auth-token', this.authService.token),
                    });
                    console.log('switchMap-modifiedReq!!!');

                    return next.handle(modifiedReq);
                }));
            // ).pipe(catchError(() => this.authService.logout()));
        } else {
            console.log('else-switchMap-modifiedReq!!!');
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    const modifiedReq = req.clone({
                        headers: req.headers.set('x-auth-token', this.authService.token),
                    });
                    return next.handle(modifiedReq);
                })
            );
        }
    }
}
