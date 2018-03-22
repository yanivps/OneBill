import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AuthComponent } from './components/auth/auth.component';
import { TokenInterceptor } from './helpers/token.interceptor';
import { AuthService } from './services/auth.service';
import { FacebookAuthProvider } from './services/facebook-auth-provider';
import { GoogleAuthProvider } from './services/google-auth-provider';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: "auth/:provider", component: AuthComponent }
    ])
  ],
  providers: [
    AUTH_PROVIDERS,
    GoogleAuthProvider,
    FacebookAuthProvider,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class AuthModule { }
