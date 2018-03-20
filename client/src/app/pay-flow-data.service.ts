import { Injectable } from '@angular/core';
import { PayFlowData, Options, PaymentMethod } from './pay-flow-data';
import { STEPS } from './pay-flow/pay-flow.model';
import { PayFlowValidatorService } from './pay-flow/pay-flow.service';

@Injectable()
export class PayFlowDataService {

  constructor(private payFlowValidatorService: PayFlowValidatorService) { }

  private payFlowData: PayFlowData = new PayFlowData();
  private isOptionsFormValid: boolean = false;
  private isPaymentMethodFormValid: boolean = false;

  getOptions(): Options {
    // Return the Options data
    var options: Options = {
      paymentOption: this.payFlowData.paymentOption,
      partialAmount: this.payFlowData.partialAmount,
      amountToPay: this.payFlowData.amountToPay,
      currencyCode: this.payFlowData.currencyCode
    };
    return options;
  }

  setOptions(data: Options) {
    // Update the Options data only when the Options Form had been validated successfully
    this.isOptionsFormValid = true;
    this.payFlowData.paymentOption = data.paymentOption;
    this.payFlowData.partialAmount = data.partialAmount;
    this.payFlowData.amountToPay = data.amountToPay;
    this.payFlowData.currencyCode = data.currencyCode;
    // Validate Options Step in Workflow
    this.payFlowValidatorService.validateStep(STEPS.options);
  }

  getPaymentMethod(): PaymentMethod {
    // Return the PaymentMethod data
    var paymentMethod: PaymentMethod = {
      creditCardNumber: this.payFlowData.creditCardNumber,
      creditCardSecurityCode: this.payFlowData.creditCardSecurityCode,
      creditCardExpirationDate: this.payFlowData.creditCardExpirationDate,
      cardHolderFirstName: this.payFlowData.cardHolderFirstName,
      cardHolderLastName: this.payFlowData.cardHolderLastName,
      paypalToken: this.payFlowData.paypalToken,
      paypalPayerId: this.payFlowData.paypalPayerId,
      storeCard: this.payFlowData.storeCard
    };
    return paymentMethod;
  }

  setPaymentMethod(data: PaymentMethod) {
    // Update the PaymentMethod data only when the PaymentMethod Form had been validated successfully
    this.isPaymentMethodFormValid = true;
    this.payFlowData.creditCardNumber = data.creditCardNumber;
    this.payFlowData.creditCardSecurityCode = data.creditCardSecurityCode;
    this.payFlowData.creditCardExpirationDate = data.creditCardExpirationDate;
    this.payFlowData.cardHolderFirstName = data.cardHolderFirstName;
    this.payFlowData.cardHolderLastName = data.cardHolderLastName;
    this.payFlowData.paypalToken = data.paypalToken;
    this.payFlowData.paypalPayerId = data.paypalPayerId;
    this.payFlowData.storeCard = data.storeCard;
    // Validate Payment Method Step in Workflow
    this.payFlowValidatorService.validateStep(STEPS.method);
  }

  getPaymentTransaction(): any {
    return this.payFlowData.paymentTransaction;
  }

  setPaymentTransaction(paymentTransaction: any) {
    this.payFlowData.paymentTransaction = paymentTransaction;
  }

  getPayFlowData(): PayFlowData {
    // Return the entire Form Data
    return this.payFlowData;
  }

  resetPayFlowData(): PayFlowData {
    // Reset the pay flow validation
    this.payFlowValidatorService.resetSteps();
    // Return the form data after all this.* members had been reset
    this.payFlowData.clear();
    this.isOptionsFormValid = this.isPaymentMethodFormValid = false;
    return this.payFlowData;
  }

  isPayFlowValid() {
    // Return true if all forms had been validated successfully; otherwise, return false
    return this.isOptionsFormValid &&
      this.isPaymentMethodFormValid;
  }

}
