import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';
import { AuthError } from '../../../auth/models/auth-error';
import { UnauthorizedError } from '../../../auth/models/unauthorized-error';
import { TRANSLATE } from '../../../translation-marker';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    if (this.authService.isLoggedIn())
      this.router.navigate(['/']);

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authService.loginWithUserCredential(this.model)
      .subscribe(
        data => {
          this.router.navigateByUrl(this.returnUrl);
        },
        (error: AuthError) => {
          this.loading = false;
          if (error instanceof UnauthorizedError) {
            this.alertService.error(TRANSLATE("login.invalid_credentials"));
          } else throw error;
        });
  }
}
