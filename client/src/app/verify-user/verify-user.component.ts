import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth/services/auth.service';
import { AlertService } from '../shared/services/alert.service';
import { AppError } from '../shared/models/app-error';
import { VerificationIncorrectPhoneNumberError, IncorrectVerificationCodeError } from '../verification-errors';
import { NgModel } from '@angular/forms';
import { IntPhonePrefixComponent } from 'ng4-intl-phone';

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
          this.alertService.error("Phone number is incorrect");
        } else throw error;
      }
    );
  }

  verify() {
    this.isLoading = true;
    let userId = this.authService.currentUser.user_id;
    this.userService.verify(userId, this.verificationCode).subscribe(
      res => {
        this.alertService.success("User was verified");
        this.authService.refreshToken()
          .subscribe(res => this.navigate());
      },
      (error: AppError) => {
        this.isLoading = false;
        if (error instanceof IncorrectVerificationCodeError) {
          this.alertService.error("Verification code is incorrect",);
        } else throw error;
      }
    );
  }

  private navigate() {
    let returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.router.navigateByUrl(returnUrl || '/');
  }
}
