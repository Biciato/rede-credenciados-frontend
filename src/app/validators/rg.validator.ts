import { AbstractControl, ValidatorFn } from '@angular/forms';

export function rgValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

      return /^[0-9]{2,3}\.?[0-9]{2,3}\.?[0-9]{3}\-?[A-Za-z0-9]{1}$/.test(control.value) ?
        null : {'rgInvalid': true};
  };
}
