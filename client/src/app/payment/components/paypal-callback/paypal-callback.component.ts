import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PayFlowDataService } from '../../services/pay-flow-data.service';
import { PayFlowValidatorService } from '../../services/pay-flow.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'paypal-callback',
  template: `<i class="fa fa-spinner fa-spin fa-3x"></i>`
})
export class PaypalCallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private payFlowValidatorService: PayFlowValidatorService,
    private payFlowDataService: PayFlowDataService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.extractParamsAndNavigateToPaymentConfirmation();
  }

  extractParamsAndNavigateToPaymentConfirmation() {
    let accountId = this.route.snapshot.queryParamMap.get('account');
    let amount = this.route.snapshot.queryParamMap.get('amount');
    let currencyCode = this.route.snapshot.queryParamMap.get('currency_code');
    let token = this.route.snapshot.queryParamMap.get('token');
    let payerId = this.route.snapshot.queryParamMap.get('PayerID');
    if (!accountId || !amount || !currencyCode || !token || !payerId) {
      this.alertService.error("Error has occured in paypal payment", true);
      this.router.navigate([accountId ? `/accounts/${accountId}/pay/options` : '/accounts/']);
      return;
    }

    let options = this.payFlowDataService.getOptions();
    options.amountToPay = parseFloat(amount);
    options.currencyCode = currencyCode;
    this.payFlowDataService.setOptions(options);

    let paymentMethod = this.payFlowDataService.getPaymentMethod();
    paymentMethod.paypalToken = token;
    paymentMethod.paypalPayerId = payerId;
    this.payFlowDataService.setPaymentMethod(paymentMethod);

    this.router.navigate([`/accounts/${accountId}/pay/confirmation`]);
  }
}
