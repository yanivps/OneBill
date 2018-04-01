import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { PayFlowValidatorService } from './pay-flow.service';

@Injectable()
export class PayFlowGuard implements CanActivate {
  constructor(private router: Router, private payFlowValidatorService: PayFlowValidatorService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let path: string = route.routeConfig.path;

    return this.verifyPayFlow(path, state.url);
  }

  verifyPayFlow(path: string, currentUrl: string) : boolean {
    // If any of the previous steps is invalid, go back to the first invalid step
    let firstPath = this.payFlowValidatorService.getFirstInvalidStep(path);
    if (firstPath.length > 0) {
      let url = `${currentUrl}/../${firstPath}`;
      this.router.navigate([url]);
      return false;
    };

    return true;
  }
}
