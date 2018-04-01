export class PayFlowData {
  paymentOption: string = 'fullPayment';
  partialAmount: string = '';
  amountToPay: number = 0;
  currencyCode: string = '';

  paymentMethodSection: string = '';
  storedCardId: string = '';

  creditCardNumber: string = '';
  creditCardSecurityCode: string = '';
  creditCardExpirationDate: string = '';
  cardHolderFirstName: string = '';
  cardHolderLastName: string = '';

  paypalToken: string = '';
  paypalPayerId: string = '';

  storeCard: boolean = false;

  paymentTransaction: any;

  clear() {
    this.paymentOption = 'fullPayment';
    this.partialAmount = '';
    this.amountToPay = 0;
    this.currencyCode = '';

    this.creditCardNumber = '';
    this.creditCardSecurityCode = '';
    this.creditCardExpirationDate = '';
    this.cardHolderFirstName = '';
    this.cardHolderLastName = '';
    this.paypalToken = '';
    this.paypalPayerId = '';

    this.paymentMethodSection = '';
    this.storedCardId = '';
    this.storeCard = false
    this.paymentTransaction = null;
  }
}

export class Options {
  paymentOption: string = 'fullPayment';
  partialAmount: string = '';
  amountToPay: number = 0;
  currencyCode: string = '';
}

export class PaymentMethod {
  storedCardId: string = '';

  creditCardNumber: string = '';
  creditCardSecurityCode: string = '';
  creditCardExpirationDate: string = '';
  cardHolderFirstName: string = '';
  cardHolderLastName: string = '';

  paypalToken: string = '';
  paypalPayerId: string = '';

  storeCard: boolean = false;
}
