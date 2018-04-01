import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from 'angular2-jwt';

import { AuthGuard } from '../auth/services/auth-guard.service';
import { CoreModule } from '../core/core.module';
import { VerifiedUserGuard } from '../core/services/verified-user-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AccountPaymentsComponent } from './components/account-payments/account-payments.component';
import { PayFlowConfirmationComponent } from './components/pay-flow-confirmation/pay-flow-confirmation.component';
import { PayFlowNavbarComponent } from './components/pay-flow-navbar/pay-flow-navbar.component';
import { PayFlowOptionsComponent } from './components/pay-flow-options/pay-flow-options.component';
import { PayFlowPaymentMethodComponent } from './components/pay-flow-payment-method/pay-flow-payment-method.component';
import { PayFlowComponent } from './components/pay-flow/pay-flow.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PaypalCallbackComponent } from './components/paypal-callback/paypal-callback.component';
import { CreditCardService } from './services/credit-card.service';
import { PayFlowDataService } from './services/pay-flow-data.service';
import { PayFlowGuard } from './services/pay-flow-guard.service';
import { PayFlowValidatorService } from './services/pay-flow.service';
import { PaymentService } from './services/payment.service';
import { ExpirationDateValidator } from './validators/expiration-date-validator.directive';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    AuthModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forChild([
      { path: 'accounts/:id/payments', component: AccountPaymentsComponent, canActivate: [AuthGuard, VerifiedUserGuard] },
      {
        path: 'accounts/:id/pay', component: PayFlowComponent, canActivate: [AuthGuard, VerifiedUserGuard],
        children: [
          { path: 'options', component: PayFlowOptionsComponent, canActivate: [PayFlowGuard] },
          { path: 'method', component: PayFlowPaymentMethodComponent, canActivate: [PayFlowGuard] },
          { path: 'confirmation', component: PayFlowConfirmationComponent, canActivate: [PayFlowGuard] },
          { path: '', redirectTo: 'options', pathMatch: 'full' },
          { path: '**', redirectTo: 'options' }
        ]
      },
      { path: 'accounts/:id/payment', component: PaymentConfirmationComponent, canActivate: [AuthGuard, VerifiedUserGuard] },
      { path: 'my/payments', component: PaymentsComponent, canActivate: [AuthGuard, VerifiedUserGuard] },
      { path: 'callback/paypal', component: PaypalCallbackComponent, canActivate: [AuthGuard, VerifiedUserGuard] },
    ])
  ],
  declarations: [
    PayFlowComponent,
    PayFlowOptionsComponent,
    PayFlowPaymentMethodComponent,
    PayFlowConfirmationComponent,
    PayFlowNavbarComponent,
    ExpirationDateValidator,
    PaypalCallbackComponent,
    PaymentConfirmationComponent,
    PaymentsComponent,
    AccountPaymentsComponent,
  ],
  providers: [
    PayFlowDataService,
    PayFlowValidatorService,
    PayFlowGuard,
    PaymentService,
    CreditCardService,
  ]
})
export class PaymentModule { }
