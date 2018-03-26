import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-account-payments',
  templateUrl: './account-payments.component.html',
  styleUrls: ['./account-payments.component.css']
})
export class AccountPaymentsComponent implements OnInit {
  payments: any[];
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private paymentsService: PaymentService,
    public authService: AuthService) { }

  ngOnInit() {
    let accountId = this.route.snapshot.paramMap.get('id');
    this.paymentsService.getAccountPayments(accountId).subscribe(res => {
      this.isLoading = false;
      this.payments = res;
    });
  }

}
