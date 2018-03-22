import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { AccountComponent } from './account/account.component';
import { PayFlowComponent } from './pay-flow/pay-flow.component';
import { PayFlowOptionsComponent } from './pay-flow-options/pay-flow-options.component';
import { PayFlowConfirmationComponent } from './pay-flow-confirmation/pay-flow-confirmation.component';
import { PayFlowPaymentMethodComponent } from './pay-flow-payment-method/pay-flow-payment-method.component';
import { PayFlowGuard } from './pay-flow/pay-flow-guard.service';
import { PaypalCallbackComponent } from './paypal-callback/paypal-callback.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { AccountPaymentsComponent } from './account-payments/account-payments.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
  { path: 'accounts/:id', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'accounts/:id/payments', component: AccountPaymentsComponent, canActivate: [AuthGuard] },
  { path: 'accounts/:id/pay', component: PayFlowComponent, canActivate: [AuthGuard],
    children: [
      { path: 'options', component: PayFlowOptionsComponent, canActivate: [PayFlowGuard] },
      { path: 'method', component: PayFlowPaymentMethodComponent, canActivate: [PayFlowGuard] },
      { path: 'confirmation', component: PayFlowConfirmationComponent, canActivate: [PayFlowGuard] },
      { path: '', redirectTo: 'options', pathMatch: 'full' },
      { path: '**', redirectTo: 'options' }
    ]
  },
  { path: 'accounts/:id/payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'my/payments', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'callback/paypal', component: PaypalCallbackComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
