import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  isLoading: boolean = true;
  payments: any[];

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.getAll().subscribe(
      res => {
        this.isLoading = false;
        this.payments = res as any[];
      }
    )
  }

  formatAddress(address: any) {
    return `${address.street} ${address.houseNumber}, ${address.city}`;
  }

  formatPaymentMethod(paymentMethodType: string, paymentMethod: any) {
    if (paymentMethodType == "CreditCardTransaction") {
      if (paymentMethod.creditCard)
        return `Credit Card xx${paymentMethod.creditCard.last4}`
      else
        return '';
    }

    if (paymentMethodType == "PaypalTransaction") {
      return `Paypal ${paymentMethod.payer}`
    }
  }

}
