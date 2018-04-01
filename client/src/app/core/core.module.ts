import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerifiedUserGuard } from './services/verified-user-guard.service';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { AuthGuard } from '../auth/services/auth-guard.service';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { AuthModule } from 'angular2-jwt';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    FormsModule,
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
