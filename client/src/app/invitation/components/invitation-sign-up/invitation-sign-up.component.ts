import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { AppError } from '../../../shared/models/app-error';
import { NotFoundError } from '../../../shared/models/not-found-error';
import { AlertService } from '../../../shared/services/alert.service';
import { UserService } from '../../../core/services/user.service';
import { ValidationError } from '../../../shared/models/validation-error';
import { InvitationExpiredError } from '../../models/invitation-errors';
import { InvitationService } from '../../services/invitation.service';
import { TRANSLATE } from '../../../translation-marker';

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
  validationErrors = {};

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
    this.userService.create(this.model, this.token).subscribe(
      data => {
        this.alertService.success(TRANSLATE('invitation_sign_up.registration_successful'), true);
        this.router.navigate(['/login'], { queryParams: { returnUrl: `/invitation?token=${this.token}&account=${this.invitation.account.id}` } });
      },
      (error: AppError) => {
        this.isLoadingRegister = false;
        if (error instanceof ValidationError) {
          this.validationErrors = error.validations;
          this.alertService.error(TRANSLATE("invitation_sign_up.some_of_the_input_fields_are_invalid"));
        } else throw error;
      }
    );
  }

  private loadInvitation() {
    this.invitationService.get(this.token).subscribe(
      res => {
        this.isLoading = false;
        this.invitation = res;
        if (this.invitation.usedAt)
          return this.handleInvitationAlreadyUsed();
        if (this.invitation.invitedUserId)
          return this.handleInvitedUserAlreadyRegistered();
        // Logout, as we are going to register with a new user
        this.authService.logout();
      },
      (error: AppError) => {
        this.router.navigate(['/']);
        if (error instanceof NotFoundError) {
          this.alertService.error(TRANSLATE("common.invitation_token_is_invalid"), true);
        } else if (error instanceof InvitationExpiredError) {
          this.alertService.error(TRANSLATE("common.invitation_was_expired"), true);
        } else throw error;
      }
    );
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

  private redirectToLogin() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: `/invitation?token=${this.token}&account=${this.invitation.account.id}` } });
  }

  private handleInvitationAlreadyUsed() {
    this.alertService.error(TRANSLATE("common.invitation_was_already_used"), true);
    this.router.navigate(['/']);
  }
}
