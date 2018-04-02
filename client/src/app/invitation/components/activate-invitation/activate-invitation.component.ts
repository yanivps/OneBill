import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppError } from '../../../shared/models/app-error';
import { NotFoundError } from '../../../shared/models/not-found-error';
import { AlertService } from '../../../shared/services/alert.service';
import {
  InvitationAlreadyUsedError,
  InvitationExpiredError,
  InvitationTokenInvalidError,
} from '../../models/invitation-errors';
import { InvitationService } from '../../services/invitation.service';
import { TRANSLATE } from '../../../translation-marker';

@Component({
  selector: 'app-activate-invitation',
  template: `<i class="fa fa-spinner fa-spin fa-3x"></i>`
})
export class ActivateInvitationComponent implements OnInit {
  token: string;
  accountId: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private invitationService: InvitationService) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get("token");
    this.accountId = this.route.snapshot.queryParamMap.get("account");
    if (this.accountId) {
      this.activate();
      return;
    }

    this.invitationService.get(this.token).subscribe(
      res => {
        this.accountId = res.account.id
        this.activate();
      },
      (error: AppError) => {
        this.router.navigate(['/']);
        if (error instanceof NotFoundError) {
          this.alertService.error(TRANSLATE("common.invitation_token_is_invalid"), true);
        } else if (error instanceof InvitationExpiredError) {
          this.alertService.error(TRANSLATE("common.invitation_was_expired"), true);
        } else throw error;
      }
    )
  }

  private activate() {
    this.invitationService.activate(this.token).subscribe(
      res => this.router.navigate(['accounts', this.accountId]),
      (error: AppError) => {
        this.router.navigate(['/']);
        if (error instanceof NotFoundError) {
          this.alertService.error(TRANSLATE("common.invitation_token_is_invalid"), true);
        } else if (error instanceof InvitationExpiredError) {
          this.alertService.error(TRANSLATE("common.invitation_was_expired"), true);
        } else if (error instanceof InvitationAlreadyUsedError) {
          this.alertService.error(TRANSLATE("common.invitation_was_already_used"), true);
        } else if (error instanceof InvitationTokenInvalidError) {
          this.alertService.error(TRANSLATE("common.invitation_token_is_invalid"), true);
        } else throw error;
      }
    );
  }
}
