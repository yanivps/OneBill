import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppError } from '../../../shared/models/app-error';
import { AlertService } from '../../../shared/services/alert.service';
import { PayFlowData } from '../../models/pay-flow-data';
import { CreditCardDeclinedError, CreditCardInvalidError, PaymentProcessorError } from '../../models/payment-errors';
import { PayFlowDataService } from '../../services/pay-flow-data.service';
import { PaymentService } from '../../services/payment.service';
import { TRANSLATE } from '../../../translation-marker';

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
  private accountId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private payFlowDataService: PayFlowDataService,
    private paymentService: PaymentService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.accountId = this.route.parent.snapshot.paramMap.get('id');
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
        (error: AppError) => {
          this.router.navigate(['../method'], { relativeTo: this.route })
          if (error instanceof PaymentProcessorError) {
            this.alertService.error(TRANSLATE("pay_flow_confirmation.your_transaction_could_not_be_processed"), true);
          } else throw error;
        }
      )
    } else {
      this.makeCreditCardPayment().subscribe(
        res => this.handlePaymentSuccess(res),
        (error: AppError) => {
          this.router.navigate(['../method'], { relativeTo: this.route })
          if (error instanceof PaymentProcessorError) {
            this.alertService.error(TRANSLATE("pay_flow_confirmation.your_transaction_could_not_be_processed"), true);
          } else if (error instanceof CreditCardInvalidError) {
            this.alertService.error(TRANSLATE("pay_flow_confirmation.credit_card_not_valid"), true);
          } else if (error instanceof CreditCardDeclinedError) {
            this.alertService.error(TRANSLATE("pay_flow_confirmation.credit_card_declined"), true);
          } else throw error;
        }
      );
    }
  }

  private handlePaymentSuccess(res: Object) {
    this.resetData();
    this.payFlowDataService.setPaymentTransaction(res);
    this.router.navigate([`/accounts/${this.accountId}/payment`]);
  }

  private makePayPalPayment() {
    return this.paymentService.createPaypalPayment(this.accountId, this.payFlowData.paypalToken, this.payFlowData.paypalPayerId)
  }

  private makeCreditCardPayment() {
    let params = this.buildCreditCardParams();
    return this.paymentService.createCreditCardPayment(this.accountId, params);
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
