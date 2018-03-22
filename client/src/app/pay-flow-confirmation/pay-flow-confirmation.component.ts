import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PayFlowDataService } from '../pay-flow-data.service';
import { PayFlowData } from '../pay-flow-data';
import { PaymentService } from '../payment.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-pay-flow-confirmation',
  templateUrl: './pay-flow-confirmation.component.html',
  styleUrls: ['./pay-flow-confirmation.component.css']
})
export class PayFlowConfirmationComponent implements OnInit {
  title = 'Confirm you payment';
  payFlowData: PayFlowData;
  isPayFlowValid: boolean = false;
  isLoading: boolean = false;
  private _accountId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private payFlowDataService: PayFlowDataService,
    private paymentService: PaymentService,
    private alertService: AlertService) { }

  ngOnInit() {
    this._accountId = this.route.parent.snapshot.paramMap.get('id');
    this.payFlowData = this.payFlowDataService.getPayFlowData();
    this.isPayFlowValid = this.payFlowDataService.isPayFlowValid();
  }

  goToPrevious() {
    this.router.navigate(['../method'], { relativeTo: this.route });
  }

  submit(form: any) {
    this.isLoading = true;
    if (this.payFlowData.paypalToken && this.payFlowData.paypalPayerId) {
      this.makePayPalPayment().subscribe(
        res => this.handlePaymentSuccess(res),
        error => this.handlePaymentError(error)
      )
    } else {
      this.makeCreditCardPayment().subscribe(
        res => this.handlePaymentSuccess(res),
        error => this.handlePaymentError(error)
      )
    }
  }

  private handlePaymentSuccess(res: Object) {
    this.resetData();
    this.payFlowDataService.setPaymentTransaction(res);
    this.router.navigate([`/accounts/${this._accountId}/payment`]);
  }

  private handlePaymentError(error: any) {
    this.alertService.error(error.error.message, true);
    this.router.navigate(['../method'], { relativeTo: this.route });
  }

  private makePayPalPayment() {
    return this.paymentService.createPaypalPayment(this._accountId, this.payFlowData.paypalToken, this.payFlowData.paypalPayerId)
  }

  private makeCreditCardPayment() {
    let params = this.buildCreditCardParams();
    return this.paymentService.createCreditCardPayment(this._accountId, params);
  }

  private resetData() {
    this.payFlowData = this.payFlowDataService.resetPayFlowData();
    this.isPayFlowValid = false;
  }

  private buildCreditCardParams() {
    if (this.payFlowData.storedCardId) {
      return {
        amount: this.payFlowData.amountToPay,
        creditCardId: this.payFlowData.storedCardId
      }
    }

    let expirationMonthStr = this.payFlowData.creditCardExpirationDate.split('/')[0].trim();
    let expirationMonth = parseInt(expirationMonthStr);
    let expirationYearStr = this.payFlowData.creditCardExpirationDate.split('/')[1].trim();
    let expirationYear = parseInt(expirationYearStr);
    if (expirationYearStr.length == 2) expirationYear += 2000;

    return {
      firstName: this.payFlowData.cardHolderFirstName,
      lastName: this.payFlowData.cardHolderLastName,
      creditCardNumber: this.payFlowData.creditCardNumber,
      expirationMonth: expirationMonth,
      expirationYear: expirationYear,
      cardSecurityCode: this.payFlowData.creditCardSecurityCode,
      amount: this.payFlowData.amountToPay,
      storeCard: this.payFlowData.storeCard
    };
  }
}
