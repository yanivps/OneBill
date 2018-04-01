import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { InvitationSignUpComponent } from './components/invitation-sign-up/invitation-sign-up.component';
import { ActivateInvitationComponent } from './components/activate-invitation/activate-invitation.component';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { VerifiedUserGuard } from '../core/services/verified-user-guard.service';
import { CoreModule } from '../core/core.module';
import { AuthModule } from '../auth/auth.module';
import { InvitationService } from './services/invitation.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    AuthModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forChild([
      { path: 'invitation/signup', component: InvitationSignUpComponent },
      { path: 'invitation', component: ActivateInvitationComponent, canActivate: [AuthGuard, VerifiedUserGuard] },
    ])
  ],
  declarations: [
    InvitationSignUpComponent,
    ActivateInvitationComponent
  ],
  providers: [
    InvitationService
  ]
})
export class InvitationModule { }
