import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PayFlowDataService } from '../pay-flow-data.service';
import { Options } from '../pay-flow-data';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-pay-flow-options',
  templateUrl: './pay-flow-options.component.html',
  styleUrls: ['./pay-flow-options.component.css']
})
export class PayFlowOptionsComponent implements OnInit {
  title = 'Select amount to pay.';
  account: any;
  options: Options;
  amountPattern = "^[1-9]+\\.?[0-9]{0,2}$"
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private payFlowDataService: PayFlowDataService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private alertService: AlertService) { }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('token'))
      this.alertService.error("Paypal payment was canceled");

    let accountId = this.route.parent.snapshot.paramMap.get('id');
    this.options = this.payFlowDataService.getOptions();
    this.accountService.get(accountId).subscribe(res => {
      this.isLoading = false;
      this.account = res;
    });
  }

  save(form: any): boolean {
    if (!form.valid) {
      return false;
    }

    switch (this.options.paymentOption) {
      case "fullPayment":
        this.options.amountToPay = this.account.amountDueCents / 100;
        break;
      case "partialPayment":
        this.options.amountToPay = parseFloat(this.options.partialAmount);
        break;
      default:
        return false;
    }

    this.options.currencyCode = this.account.currencyCode;
    this.payFlowDataService.setOptions(this.options);
    return true;
  }

  goToNext(form: any) {
    if (this.save(form)) {
      // Navigate to the work page
      this.router.navigate(['../method'], { relativeTo: this.route });
    }
  }

}
