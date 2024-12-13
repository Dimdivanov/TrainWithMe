import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const rePassword = control.get('rePassword')?.value;

  return password === rePassword ? null : { passwordsDoNotMatch: true };
};
