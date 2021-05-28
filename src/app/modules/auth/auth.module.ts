import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './sign-in/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { ErrorDirective } from 'src/app/shared/error.directive';
import { ErrorHandterInterceptor } from 'src/app/core/interceptors/errorHandler.interceptor';

@NgModule({
  declarations: [
    SigninComponent,
    RegistrationComponent,
    ErrorDirective,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: ErrorHandterInterceptor }]
})
export class AuthModule { }
