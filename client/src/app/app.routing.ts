import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/services/auth-guard.service';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { VerifyUserComponent } from './core/components/verify-user/verify-user.component';
import { VerifiedUserGuard } from './core/services/verified-user-guard.service';
import { AccountPaymentsComponent } from './payment/components/account-payments/account-payments.component';
import { PayFlowConfirmationComponent } from './payment/components/pay-flow-confirmation/pay-flow-confirmation.component';
import { PayFlowOptionsComponent } from './payment/components/pay-flow-options/pay-flow-options.component';
import {
  PayFlowPaymentMethodComponent,
} from './payment/components/pay-flow-payment-method/pay-flow-payment-method.component';
import { PayFlowComponent } from './payment/components/pay-flow/pay-flow.component';
import { PaymentConfirmationComponent } from './payment/components/payment-confirmation/payment-confirmation.component';
import { PaymentsComponent } from './payment/components/payments/payments.component';
import { PaypalCallbackComponent } from './payment/components/paypal-callback/paypal-callback.component';
import { PayFlowGuard } from './payment/services/pay-flow-guard.service';

const appRoutes: Routes = [
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
