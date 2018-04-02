import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IntPhonePrefixComponent } from 'ng4-intl-phone';

import { AuthService } from '../../../auth/services/auth.service';
import { AppError } from '../../../shared/models/app-error';
import { AlertService } from '../../../shared/services/alert.service';
import { UserService } from '../../services/user.service';
import { IncorrectVerificationCodeError, VerificationIncorrectPhoneNumberError } from '../../models/verification-errors';
import { TRANSLATE } from '../../../translation-marker';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent {
  phoneNumber: string = '';
  verificationCode: string = '';
  isLoading: boolean = false;
  verificationSent: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthService,
    private userService: UserService) { }

  sendVerificationCode(phoneNumberInput: NgModel) {
    let selectedCountry = (phoneNumberInput.valueAccessor as IntPhonePrefixComponent).selectedCountry;
    if(!selectedCountry) {
      phoneNumberInput.control.setErrors({'requiredCountryCode': true});
      return;
    }

    let formattedPhoneNumber = this.phoneNumber;
    if (formattedPhoneNumber.indexOf("+" + selectedCountry.dialCode + " ") == -1) {
      formattedPhoneNumber = formattedPhoneNumber.replace("+" + selectedCountry.dialCode, "+" + selectedCountry.dialCode + " ")
    }
    this.isLoading = true;
    let userId = this.authService.currentUser.user_id;
    this.userService.sendVerificationCodeSms(userId, formattedPhoneNumber).subscribe(
      res => {
        this.verificationSent = true;
        this.isLoading = false;
        // TODO: Remove verification code from here
        if (res) console.log(res.code);
      },
      (error: AppError) => {
        this.isLoading = false;
        if (error instanceof VerificationIncorrectPhoneNumberError) {
          this.alertService.error(TRANSLATE("verify.phone_number_is_incorrect"));
        } else throw error;
      }
    );
  }

  verify() {
    this.isLoading = true;
    let userId = this.authService.currentUser.user_id;
    this.userService.verify(userId, this.verificationCode).subscribe(
      res => {
        this.alertService.success(TRANSLATE("verify.user_was_verified"));
        this.authService.refreshToken()
          .subscribe(res => this.navigate());
      },
      (error: AppError) => {
        this.isLoading = false;
        if (error instanceof IncorrectVerificationCodeError) {
          this.alertService.error(TRANSLATE("verify.verification_code_is_incorrect"));
        } else throw error;
      }
    );
  }

  private navigate() {
    let returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.router.navigateByUrl(returnUrl || '/');
  }
}
