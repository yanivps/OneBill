import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-account-payments',
  templateUrl: './account-payments.component.html',
  styleUrls: ['./account-payments.component.css']
})
export class AccountPaymentsComponent implements OnInit {
  payments: any[];
  isLoading: boolean = true;
  constructor(private route: ActivatedRoute, private paymentsService: PaymentService) { }

  ngOnInit() {
    let accountId = this.route.snapshot.paramMap.get('id');
    this.paymentsService.getAccountPayments(accountId).subscribe(res => {
      this.isLoading = false;
      this.payments = res as any[];
    });
  }

}
