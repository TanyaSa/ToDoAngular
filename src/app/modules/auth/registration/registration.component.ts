import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { CustomValidators } from 'src/app/modules/auth/password.validator';
// import { fadeInAnimation } from '../../route-animations';

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  // animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  // host: { '[@fadeInAnimation]': '' }
})
export class RegistrationComponent {
  selectedValue: string;

  constructor(private router: Router, private auth: AuthService, private errorService: MessageService) { }

  registrationForm: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
    ]),
    usernameFormControl: new FormControl('', []),
    passwordConfirmFormControl: new FormControl('', [
    ]),
  },
    CustomValidators.passwordConfirmValidator
  );

  roles: Roles[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'user', viewValue: 'User' }
  ];

  signinRedirect(): void {
    this.router.navigate(['/signin']);
  }

  registration(): boolean {
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
      return false;
    }
    const {
      passwordFormControl,
      usernameFormControl,
      passwordConfirmFormControl
    } = this.registrationForm.controls;

    this.auth.register(
      passwordFormControl.value,
      usernameFormControl.value,
      passwordConfirmFormControl.value
    ).subscribe(e => {
      this.router.navigate(['/checklist']);    // tanya1@mail.com  12345678
      return true;
    });
  }
}
