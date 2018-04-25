import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AccountModule } from './account/account.module';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { VerifyUserComponent } from './core/components/verify-user/verify-user.component';
import { CoreModule } from './core/core.module';
import { AppErrorHandler } from './core/helpers/app-error-handler';
import { InvitationModule } from './invitation/invitation.module';
import { PaymentModule } from './payment/payment.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    VerifyUserComponent
  ],
  imports: [
    RouterModule.forRoot([
      // otherwise redirect to home
      { path: '**', redirectTo: '' }
    ]),
    BrowserModule,
    SharedModule,
    CoreModule,
    AuthModule,
    AccountModule,
    InvitationModule,
    PaymentModule,
    AdminModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

