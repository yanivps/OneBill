import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { InternationalPhoneModule } from 'ng4-intl-phone';

import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { UserService } from './services/user.service';
import { VerifiedUserGuard } from './services/verified-user-guard.service';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    CustomFormsModule,
    NgbModule.forRoot(),
    InternationalPhoneModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'verify', component: VerifyUserComponent, canActivate: [AuthGuard] },
    ])
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
  ],
  providers: [
    UserService,
    VerifiedUserGuard
  ],
  exports: [
    NavbarComponent,
    InternationalPhoneModule
  ]
})
export class CoreModule { }
