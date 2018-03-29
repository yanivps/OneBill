import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth/services/auth.service';
import { AlertService } from '../shared/services/alert.service';

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

  sendVerificationCode() {
    this.isLoading = true;
    let userId = this.authService.currentUser.user_id;
    this.userService.sendVerificationCodeSms(userId, this.phoneNumber)
      .subscribe(
        res => {
          this.verificationSent = true;
          this.isLoading = false;
          // TODO: Remove verification code from here
          if (res) console.log(res.code);
        },
        error => this.handleError(error));
  }

  verify() {
    this.isLoading = true;
    let userId = this.authService.currentUser.user_id;
    this.userService.verify(userId, this.verificationCode)
      .subscribe(
        res => {
          // TODO: Remove verification code from here
          console.log(res)
          this.alertService.success("User was verified");
          this.authService.refreshToken()
            .subscribe(res => this.navigate());
        },
        error => this.handleError(error)
      )
  }

  private navigate() {
    let returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.router.navigateByUrl(returnUrl || '/');
  }

  private handleError(error) {
    this.isLoading = false;
    this.alertService.error(error.error.message);
  }

}
