import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvitationService } from '../invitation.service';
import { AlertService } from '../shared/services/alert.service';

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
      }
    )
  }

  private activate() {
    this.invitationService.activate(this.token)
      .subscribe(
        res => this.router.navigate(['accounts', this.accountId]),
        error => this.handleError(error)
      )
  }

  private handleError(error) {
    this.alertService.error(error.error.message, true);
    this.router.navigate(['/']);
  }

}
