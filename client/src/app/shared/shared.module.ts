import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AlertService
  ],
  declarations: [
    AlertComponent
  ],
  exports: [
    AlertComponent,
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class SharedModule { }
