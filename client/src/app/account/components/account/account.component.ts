import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppError } from '../../../shared/models/app-error';
import { NotFoundError } from '../../../shared/models/not-found-error';
import { AlertService } from '../../../shared/services/alert.service';
import { AccountService } from '../../services/account.service';
import { TRANSLATE } from '../../../translation-marker';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private billIndex = 0;
  account: any;
  isLoading: boolean = true;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let accountId = this.route.snapshot.paramMap.get('id');
    this.accountService.get(accountId).subscribe(
      res => {
        this.isLoading = false;
        this.account = res;
        if (this.account.amountDueCents <= 0) {
          this.router.navigate(['/accounts']);
          return;
        }
        this.filterBills();
      },
      (error: AppError) => {
        this.router.navigate(['accounts']);
        if (error instanceof NotFoundError) {
          this.alertService.error(TRANSLATE("common.page_was_not_found"));
        } else throw error;
      }
    );
  }

  // TODO: Move to account model
  displayPrimaryAddress(address) {
    return `${address.street} ${address.houseNumber}, ${address.city}`;
  }

  // TODO: Move to account model
  displaySecondaryAddress(address) {
    let secondaryAddress: string = "";
    if (address.entrance) secondaryAddress += `Entrance ${address.entrance}`
    if (address.entrance && address.apartmentNumber) secondaryAddress += ", "
    if (address.apartmentNumber) secondaryAddress += `Apartment ${address.apartmentNumber}`
    return secondaryAddress;
  }

  private indexBills() {
    let i = 1;
    for (const municipalityAccount of this.account.municipalityAccounts) {
      for (const bill of municipalityAccount.bills) {
        bill['index'] = i++;
      }
    }
  }

  private filterBills() {
    for (const municipalityAccount of this.account.municipalityAccounts) {
      municipalityAccount.bills = municipalityAccount.bills.filter(b => b.amountDueCents > 0);
    }
    this.indexBills();
  }

}
