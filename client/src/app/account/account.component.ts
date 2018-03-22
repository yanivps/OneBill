import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private billIndex = 0;
  account: any;
  isLoading: boolean = true;

  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router) { }

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
