import { ValidationErrors, FormGroup } from '@angular/forms';

export class CustomValidators {

    static passwordConfirmValidator(formGroup: FormGroup): ValidationErrors {
        const password = formGroup.get('passwordFormControl').value;
        const confirmPassword = formGroup.get('passwordConfirmFormControl').value;

        // compare the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            formGroup.get('passwordConfirmFormControl').setErrors({ NoPassswordMatch: true });
            return { NoPassswordMatch: true };
        }
        formGroup.get('passwordConfirmFormControl').setErrors(null);
        return null;
    }
}
