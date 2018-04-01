import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PayFlowDataService } from '../../services/pay-flow-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  transaction: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private payFlowDataService: PayFlowDataService) { }

  ngOnInit() {
    this.transaction = this.payFlowDataService.getPaymentTransaction();
    if (!this.transaction) {
      this.goToAccount();
    }
  }

  goToAccount() {
    let accountId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`/accounts/${accountId}`]);
  }
}
