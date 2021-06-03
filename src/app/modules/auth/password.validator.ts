import { ValidationErrors, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {
    //   static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    //     return (control: AbstractControl): { [key: string]: any } => {
    //       if (!control.value) {
    //         // if control is empty return no error
    //         return null;
    //       }

    //       // test the value of the control against the regexp supplied
    //       const valid = regex.test(control.value);

    //       // if true, return no error (no error), else return error passed in the second parameter
    //       return valid ? null : error;
    //     };
    //   }

    static passwordConfirmValidator(formGroup: FormGroup): ValidationErrors {
        const password = formGroup.get('passwordFormControl').value;
        const confirmPassword = formGroup.get('passwordConfirmFormControl').value;

        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            formGroup.get('passwordConfirmFormControl').setErrors({ NoPassswordMatch: true });

            return { NoPassswordMatch: true };
        }

        formGroup.get('passwordConfirmFormControl').setErrors(null);
        // formGroup.get('passwordConfirmFormControl').updateValueAndValidity();

        return null;
    }
}
