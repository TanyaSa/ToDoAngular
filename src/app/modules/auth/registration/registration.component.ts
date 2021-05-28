import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  // constructor() { }

  // ngOnInit(): void {
  // }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    // Validators.password,
  ]);

  selectedValue: string;
  roles: Roles[] = [
    { value: 'admin-0', viewValue: 'Admin' },
    { value: 'user-2', viewValue: 'User' }
  ];

}
