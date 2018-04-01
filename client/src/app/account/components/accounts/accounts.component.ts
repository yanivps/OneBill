import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: any[];
  isLoading: boolean = true;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAll().subscribe(
      res => {
        this.accounts = res;
        this.isLoading = false;
      }
    );
  }
}
