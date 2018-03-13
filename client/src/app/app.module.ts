import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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


@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    AccountCardComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AuthModule,
    routing
  ],
  providers: [
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
