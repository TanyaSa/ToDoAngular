import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  signinForm: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private auth: AuthService, private router: Router) { }

  signIn(): boolean {
    console.log(this.signinForm.get('emailFormControl').value);

    if (!this.signinForm.valid) {
      this.signinForm.markAllAsTouched();
      return false;
    }

    this.auth.login(this.signinForm.get('emailFormControl').value, this.signinForm.get('passwordFormControl').value)
      .subscribe(e => {
        this.router.navigate(['/checklist']);    // tanya1@mail.com  12345678
        return true;
      });
  }
}
