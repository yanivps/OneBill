import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { UserService } from '../user.service';
import { InvitationService } from '../invitation.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-invitation-sign-up',
  templateUrl: './invitation-sign-up.component.html',
  styleUrls: ['./invitation-sign-up.component.css']
})
export class InvitationSignUpComponent implements OnInit {
  model: any = {};
  invitation: any;
  token: string;
  isLoading = true;
  isLoadingRegister = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private invitationService: InvitationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get("token");
    if (!this.token) {
      this.router.navigate(['/']);
      return;
    }
    this.loadInvitation();
  }

  register() {
    this.isLoadingRegister = true;
    this.userService.create(this.model, this.token)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login'], { queryParams: { returnUrl: `/invitation?token=${this.token}&account=${this.invitation.account.id}` } });
        },
        error => {
          this.handleRegisterError(error);
        });
  }

  private loadInvitation() {
    this.invitationService.get(this.token)
      .subscribe(
        res => {
          this.isLoading = false;
          this.invitation = res;
          if (this.invitation.usedAt)
            return this.handleInvitationAlreadyUsed();
          if (this.invitation.invitedUserId)
            return this.handleInvitedUserAlreadyRegistered();
        },
        error => {
          this.handleLoadingError(error);
          this.router.navigate(['/']);
        }
      );
  }

  private redirectToLogin() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: `/invitation?token=${this.token}&account=${this.invitation.account.id}` } });
  }

  private handleInvitedUserAlreadyRegistered() {
    if (!this.authService.isLoggedIn()) {
      this.redirectToLogin();
    } else {
      if (this.invitation.invitedUserId == this.authService.currentUser.user_id) {
        this.router.navigate(['/invitation'], { queryParams: { token: this.token, account: this.invitation.account.id } });
      } else {
        this.authService.logout();
        this.redirectToLogin();
      }
    }
  }

  private handleInvitationAlreadyUsed() {
    this.alertService.error("Invitation was already used", true);
    this.router.navigate(['/']);
  }

  private handleRegisterError(error) {
    this.isLoadingRegister = false;
    this.alertService.error(error.error.message, true);
  }

  private handleLoadingError(error) {
    this.alertService.error(error.error.message, true);
    this.router.navigate(['/']);
  }
}
