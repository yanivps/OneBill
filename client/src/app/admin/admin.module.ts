import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { AdminAuthGuard } from '../auth/services/admin-auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TemporaryBillService } from './services/temporary-bill.service';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    NgbModule.forRoot(),
    RouterModule.forChild([
      { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ])
  ],
  declarations: [AdminHomeComponent],
  providers: [TemporaryBillService]
})
export class AdminModule { }
