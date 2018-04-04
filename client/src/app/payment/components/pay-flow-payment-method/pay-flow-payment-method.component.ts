import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppError } from '../../../shared/models/app-error';
import { NotFoundError } from '../../../shared/models/not-found-error';
import { AlertService } from '../../../shared/services/alert.service';
import { PayFlowData, PaymentMethod } from '../../models/pay-flow-data';
import { CreditCardService } from '../../services/credit-card.service';
import { PayFlowDataService } from '../../services/pay-flow-data.service';
import { PaymentService } from '../../services/payment.service';
import { TRANSLATE } from '../../../translation-marker';

@Component({
  selector: 'pay-flow-payment-method',
  templateUrl: './pay-flow-payment-method.component.html',
  styleUrls: ['./pay-flow-payment-method.component.css']
})
export class PayFlowPaymentMethodComponent implements OnInit {
  payFlowData: PayFlowData;
  paymentMethod: PaymentMethod;
  cardType: string;
  storedCards: any[];
  isLoadingCards: boolean = true;
  isLoadingPaypal: boolean = false;

  constructor(
    private router: Router,
    private payFlowDataService: PayFlowDataService,
    private paymentSerivce: PaymentService,
    private creditCardService: CreditCardService,
    private alertService: AlertService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.payFlowData = this.payFlowDataService.getPayFlowData();
    this.paymentMethod = this.payFlowDataService.getPaymentMethod();
    this.creditCardService.getAll().subscribe(
      res => {
        this.isLoadingCards = false;
        this.storedCards = res;
        if (!this.payFlowData.paymentMethodSection) {
          this.payFlowData.paymentMethodSection = this.storedCards.length == 0 ? "newCard" : "storedCard"
        }
      },
      (error: AppError) => {
        this.isLoadingCards = false;
        this.alertService.error(TRANSLATE("pay_flow_payment.could_not_load_saved_credit_cards"));
        if (!this.payFlowData.paymentMethodSection)
          this.payFlowData.paymentMethodSection = "newCard";
      }
    );
  }

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }

    this.cleanUnusedPaymentMethodData();
    this.payFlowDataService.setPaymentMethodSection(this.payFlowData.paymentMethodSection);
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

  deleteStoredCard(card: any) {
    if (!confirm("Are you sure you want to delete card xx" + card.last4))
      return;

    let index = this.storedCards.indexOf(card);
    if (index != -1) {
      this.storedCards.splice(index, 1);
      this.creditCardService.delete(card.id).subscribe(
        null,
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            // Do nothing
          } else {
            this.alertService.error(TRANSLATE("pay_flow_payment.card_could_not_be_deleted"), false, {card: card});
            this.storedCards.splice(index, 0, card);
          }
        }
      );

      if (this.storedCards.length == 0) {
        this.payFlowData.paymentMethodSection = "newCard";
      }
    }
  }

  generatePaypalLink() {
    this.isLoadingPaypal = true;
    let accountId = this.route.parent.snapshot.paramMap.get('id');
    let amount = this.payFlowData.amountToPay;
    let currencyCode = this.payFlowData.currencyCode;
    let params = {
      amount: amount,
      returnUrl: window.location.origin + `/callback/paypal?account=${accountId}&amount=${amount}&currency_code=${currencyCode}`,
      cancelReturnUrl: window.location.href.replace('/method', '/options')
    }
    this.paymentSerivce.generatePaypalLink(accountId, params).subscribe(
      res => window.location.href = res['paypal_express_url'],
      (error: AppError) => {
        this.isLoadingPaypal = false;
        throw error;
      }
    );
  }

  knownCardType() {
    this.cardType = this.detectCardType(this.paymentMethod.creditCardNumber)
    return this.cardType;
  }

  private cleanUnusedPaymentMethodData() {
    if (this.payFlowData.paymentMethodSection != "storedCard") {
      this.paymentMethod.storedCardId = '';
    }
    if (this.payFlowData.paymentMethodSection != "newCard") {
      this.paymentMethod.creditCardNumber = ''
      this.paymentMethod.creditCardSecurityCode = ''
      this.paymentMethod.creditCardExpirationDate = ''
      this.paymentMethod.cardHolderFirstName = ''
      this.paymentMethod.cardHolderLastName = ''
    }
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
