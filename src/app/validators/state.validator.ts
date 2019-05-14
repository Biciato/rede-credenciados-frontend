import { AbstractControl, ValidatorFn } from '@angular/forms';

import { BR_STATE_NAMES, BR_STATE_INITIALS } from '../models/abreviacao-estados';

export function stateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return BR_STATE_INITIALS.includes(control.value) ||
        BR_STATE_NAMES.includes(control.value) ? null : {'stateInvalid': true};
  };
}
