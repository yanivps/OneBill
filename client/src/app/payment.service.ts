import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PaymentMethod, PayFlowData } from './pay-flow-data';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/catch";
import { NotFoundError } from './shared/models/not-found-error';
import { AppError } from './shared/models/app-error';
import { PaymentProcessorError, CreditCardDeclinedError, CreditCardInvalidError } from './payment-errors';

@Injectable()
export class PaymentService {
  private paymentBaseUrl: string = environment.apiHost + "/payments/"
  private accountPaymentBaseUrl: string = environment.apiHost + "/accounts/"
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.paymentBaseUrl)
      .catch(this.handleError);
  }

  getAccountPayments(accountId: string): Observable<any> {
    return this.http.get(this.accountPaymentBaseUrl + accountId + "/payments/")
      .catch(this.handleError);
  }

  generatePaypalLink(accountId: string, params: {amount: number, returnUrl: string, cancelReturnUrl: string}) {
    return this.http.post(`${this.accountPaymentBaseUrl}${accountId}/generate_paypal_link`, params)
      .catch(this.handleError);
  }

  createPaypalPayment(accountId: string, token: string, payerId: string) {
    return this.http.post(`${this.accountPaymentBaseUrl}${accountId}/paypal_transactions`, { token: token, payerId: payerId })
      .catch(this.handleError);
  }

  createCreditCardPayment(accountId: string, params) {
    return this.http.post(`${this.accountPaymentBaseUrl}${accountId}/credit_card_transactions`, params)
      .catch(this.handleError);
  }

  private handleError(response: HttpErrorResponse) {
    if (response.error.message == "payment_processor_general_error") {
      return Observable.throw(new PaymentProcessorError(response.error));
    }
    if (response.error.message == "credit_card_invalid") {
      return Observable.throw(new CreditCardInvalidError(response.error));
    }
    if (response.error.message == "credit_card_declined") {
      return Observable.throw(new CreditCardDeclinedError(response.error));
    }
    return Observable.throw(new AppError(response.error));
  }
}
