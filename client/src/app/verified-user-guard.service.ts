import { Injectable } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class VerifiedUserGuard {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUser.verified) return true;

    this.router.navigate(['/verify'], { queryParams: { returnUrl: state.url } })
    return false;
  }
}
