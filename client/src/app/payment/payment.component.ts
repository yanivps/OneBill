import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PayFlowDataService } from '../pay-flow-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
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
