import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaymentMethod, PayFlowData } from './pay-flow-data';

@Injectable()
export class PaymentService {
  private paymentBaseUrl: string = environment.apiHost + "/payments/"
  private accountPaymentBaseUrl: string = environment.apiHost + "/accounts/"
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.paymentBaseUrl);
  }

  generatePaypalLink(accountId: string, params: {amount: number, returnUrl: string, cancelReturnUrl: string}) {
    return this.http.post(`${this.accountPaymentBaseUrl}${accountId}/generate_paypal_link`, params);
  }

  createPaypal(accountId: string, token: string, payerId: string) {
    return this.http.post(`${this.accountPaymentBaseUrl}${accountId}/paypal_transactions`, { token: token, payerId: payerId });
  }

  createCreditCard(accountId: string, payFlowData: PayFlowData) {
    let params = this.buildCreditCardParams(payFlowData);
    return this.http.post(`${this.accountPaymentBaseUrl}${accountId}/credit_card_transactions`, params);
  }

  private buildCreditCardParams(payFlowData: PayFlowData) {
    let expirationMonthStr = payFlowData.creditCardExpirationDate.split('/')[0].trim();
    let expirationMonth = parseInt(expirationMonthStr);
    let expirationYearStr = payFlowData.creditCardExpirationDate.split('/')[1].trim();
    let expirationYear = parseInt(expirationYearStr);
    if (expirationYearStr.length == 2) expirationYear += 2000;

    return {
      firstName: payFlowData.cardHolderFirstName,
      lastName: payFlowData.cardHolderLastName,
      creditCardNumber: payFlowData.creditCardNumber,
      expirationMonth: expirationMonth,
      expirationYear: expirationYear,
      cardSecurityCode: payFlowData.creditCardSecurityCode,
      amount: payFlowData.amountToPay,
      storeCard: payFlowData.storeCard
    };
  }
}
