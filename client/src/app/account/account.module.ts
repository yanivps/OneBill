import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { CoreModule } from '../core/core.module';
import { VerifiedUserGuard } from '../core/services/verified-user-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountComponent } from './components/account/account.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ScanBillComponent } from './components/scan-bill/scan-bill.component';
import { AccountService } from './services/account.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    CoreModule,
    RouterModule.forChild([
      { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard, VerifiedUserGuard] },
      { path: 'accounts/:id', component: AccountComponent, canActivate: [AuthGuard, VerifiedUserGuard] },
      { path: 'scan', component: ScanBillComponent, canActivate: [AuthGuard, VerifiedUserGuard] },
    ]),
    PdfViewerModule
  ],
  declarations: [
    AccountsComponent,
    AccountCardComponent,
    AccountComponent,
    ScanBillComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
