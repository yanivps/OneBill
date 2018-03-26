import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomFormsModule } from 'ng2-validation'


import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { routing } from './app.routing';
import { CoreModule } from './core/core.module';
import { AccountService } from './account.service';
import { AccountCardComponent } from './account-card/account-card.component';
import { AccountComponent } from './account/account.component';
import { PayFlowComponent } from './pay-flow/pay-flow.component';
import { PayFlowOptionsComponent } from './pay-flow-options/pay-flow-options.component';
import { PayFlowConfirmationComponent } from './pay-flow-confirmation/pay-flow-confirmation.component';
import { PayFlowNavbarComponent } from './pay-flow-navbar/pay-flow-navbar.component';
import { PayFlowDataService } from './pay-flow-data.service';
import { FormsModule } from '@angular/forms';
import { PayFlowPaymentMethodComponent } from './pay-flow-payment-method/pay-flow-payment-method.component';
import { PayFlowValidatorService } from './pay-flow/pay-flow.service';
import { PayFlowGuard } from './pay-flow/pay-flow-guard.service';
import { ExpirationDateValidator } from './pay-flow-payment-method/expiration-date-validator.directive';
import { PaymentService } from './payment.service';
import { PaypalCallbackComponent } from './paypal-callback/paypal-callback.component';
import { PaymentComponent } from './payment/payment.component';
import { CreditCardService } from './credit-card.service';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PaymentsComponent } from './payments/payments.component';
import { AccountPaymentsComponent } from './account-payments/account-payments.component';
import { InvitationSignUpComponent } from './invitation-sign-up/invitation-sign-up.component';
import { UserService } from './user.service';
import { InvitationService } from './invitation.service';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { VerifiedUserGuard } from './verified-user-guard.service';
import { ActivateInvitationComponent } from './activate-invitation/activate-invitation.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    AccountCardComponent,
    AccountComponent,
    PayFlowComponent,
    PayFlowOptionsComponent,
    PayFlowPaymentMethodComponent,
    PayFlowConfirmationComponent,
    PayFlowNavbarComponent,
    ExpirationDateValidator,
    PaypalCallbackComponent,
    PaymentComponent,
    PaymentsComponent,
    AccountPaymentsComponent,
    InvitationSignUpComponent,
    VerifyUserComponent,
    ActivateInvitationComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AuthModule,
    routing,
    FormsModule,
    CustomFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    AccountService,
    PayFlowDataService,
    PayFlowValidatorService,
    PayFlowGuard,
    PaymentService,
    CreditCardService,
    UserService,
    InvitationService,
    VerifiedUserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
