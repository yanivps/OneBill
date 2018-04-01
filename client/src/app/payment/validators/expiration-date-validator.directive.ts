import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[nonExpired][formControlName],[nonExpired][formControl],[nonExpired][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ExpirationDateValidator), multi: true }
  ]
})
export class ExpirationDateValidator implements Validator {
  constructor() { }

  validate(c: AbstractControl): { [key: string]: any } {
    let v = c.value as String;
    if (v == null || v == "") return null;
    let [monthStr, yearStr] = v.split('/');
    let month = parseInt(monthStr);
    let year = parseInt(yearStr);
    if (yearStr && yearStr.trim().length == 2) year += 2000;
    let date = new Date(year, month, 0, 23, 59, 59, 999);

    if (
      (month > 12 || month <= 0) ||
      isNaN(date.getTime()) ||
      date < new Date()
    ) return {
      notExpired: true
    }

    return null;
  }
}
