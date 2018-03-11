import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OAuthAccessDenied } from '../../models/oauth-errors';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'auth',
  template: `<i class="fa fa-spinner fa-spin fa-3x"></i>`
})
export class AuthComponent implements OnInit {
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn())
      return this.router.navigate(['/'])

    // Authorization code flow
    let provider = this.route.snapshot.paramMap.get('provider');

    this.loginWithCallback(this.route.snapshot.queryParams, provider)
      .subscribe(
        () => {
          let returnUrl = localStorage.getItem("returnUrl")
          localStorage.removeItem("returnUrl");
          this.router.navigate([returnUrl || '/'])
        },
        error => {
          this.router.navigate(['login']);
          if (error instanceof OAuthAccessDenied) {
            this.alertService.error('You must grant permissions to this application in order to login');
          } else throw error
        }
      );
  }

  private loginWithCallback(callbackParams, provider) {
    if (provider == 'google') return this.authService.loginWithGoogleCallback(callbackParams);
    if (provider == 'facebook') return this.authService.loginWithFacebookCallback(callbackParams);
    // Add more providers here. For example:
    // if (provider == 'Twitter') return this.loginWithTwitterAuthCode(authorizationCode)

    throw "Unsupported provider " + provider;
  }
}
