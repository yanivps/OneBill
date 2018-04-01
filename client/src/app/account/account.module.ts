import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountComponent } from './components/account/account.component';
import { AccountService } from './services/account.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { VerifiedUserGuard } from '../core/services/verified-user-guard.service';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    CoreModule,
    RouterModule.forChild([
      { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard, VerifiedUserGuard] },
      { path: 'accounts/:id', component: AccountComponent, canActivate: [AuthGuard, VerifiedUserGuard] },
    ])
  ],
  declarations: [
    AccountsComponent,
    AccountCardComponent,
    AccountComponent,
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
