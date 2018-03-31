import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { AuthService } from '../auth/services/auth.service';
import { AppError } from '../shared/models/app-error';
import { NotFoundError } from '../shared/models/not-found-error';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-account-payments',
  templateUrl: './account-payments.component.html',
  styleUrls: ['./account-payments.component.css']
})
export class AccountPaymentsComponent implements OnInit {
  payments: any[];
  isLoading: boolean = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private paymentsService: PaymentService,
    public authService: AuthService) { }

  ngOnInit() {
    let accountId = this.route.snapshot.paramMap.get('id');
    this.paymentsService.getAccountPayments(accountId).subscribe(
      res => {
        this.isLoading = false;
        this.payments = res;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          this.alertService.error("Page was not found", true);
          this.router.navigate(['accounts']);
        } else {
          this.router.navigate(['accounts', accountId]);
          throw error
        };
      }
    );
  }

}
