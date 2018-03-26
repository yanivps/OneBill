import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaymentMethod, PayFlowData } from './pay-flow-data';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentService {
  private paymentBaseUrl: string = environment.apiHost + "/payments/"
  private accountPaymentBaseUrl: string = environment.apiHost + "/accounts/"
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.paymentBaseUrl);
  }

  getAccountPayments(accountId: string): Observable<any> {
    return this.http.get(this.accountPaymentBaseUrl + accountId + "/payments/");
  }

  generatePaypalLink(accountId: string, params: {amount: number, returnUrl: string, cancelReturnUrl: string}) {
    return this.http.post(`${this.accountPaymentBaseUrl}${accountId}/generate_paypal_link`, params);
  }

  createPaypalPayment(accountId: string, token: string, payerId: string) {
    return this.http.post(`${this.accountPaymentBaseUrl}${accountId}/paypal_transactions`, { token: token, payerId: payerId });
  }

  createCreditCardPayment(accountId: string, params) {
    return this.http.post(`${this.accountPaymentBaseUrl}${accountId}/credit_card_transactions`, params);
  }
}
