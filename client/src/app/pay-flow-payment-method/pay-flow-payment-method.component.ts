import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PayFlowDataService } from '../pay-flow-data.service';
import { PaymentMethod, Options, PayFlowData } from '../pay-flow-data';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'pay-flow-payment-method',
  templateUrl: './pay-flow-payment-method.component.html',
  styleUrls: ['./pay-flow-payment-method.component.css']
})
export class PayFlowPaymentMethodComponent implements OnInit {
  title = 'How do you want to pay?';
  payFlowData: PayFlowData;
  paymentMethod: PaymentMethod;
  cardType: string;

  constructor(
    private router: Router,
    private payFlowDataService: PayFlowDataService,
    private paymentSerivce: PaymentService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.payFlowData = this.payFlowDataService.getPayFlowData();
    this.paymentMethod = this.payFlowDataService.getPaymentMethod();
  }

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }

    this.payFlowDataService.setPaymentMethod(this.paymentMethod);
    return true;
  }

  goToPrevious() {
    this.router.navigate(['../options'], { relativeTo: this.route });
  }

  goToNext(form: any) {
    if (this.save(form)) {
      // Navigate to the address page
      this.router.navigate(['../confirmation'], { relativeTo: this.route });
    }
  }

  generatePaypalLink() {
    let accountId = this.route.parent.snapshot.paramMap.get('id');
    let amount = this.payFlowData.amountToPay;
    let currencyCode = this.payFlowData.currencyCode;
    let params = {
      amount: amount,
      returnUrl: window.location.origin + `/callback/paypal?account=${accountId}&amount=${amount}&currency_code=${currencyCode}`,
      cancelReturnUrl: window.location.href.replace('/method', '/options')
    }
    this.paymentSerivce.generatePaypalLink(accountId, params).subscribe(
      res => window.location.href = res['paypal_express_url']
    );
  }

  knownCardType() {
    this.cardType = this.detectCardType(this.paymentMethod.creditCardNumber)
    return this.cardType;
  }

  private detectCardType(number: string) {
    number = number.replace(/ /g, '');
    var re = {
      visa: /^4[0-9]{6,}$/,
      mastercard: /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/,
      amex: /^3[47][0-9]{5,}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{3,}$/
    }

    for (var key in re) {
      if (re[key].test(number)) {
        return "identified " + key;
      }
    }
  }
}
