import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css']
})
export class AccountCardComponent implements OnInit {
  @Input('account') account: any;
  @Input('is-link') isLink: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
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

  navigateToAccount() {
    this.router.navigate(['accounts', this.account.id])
  }
}
