import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  direction: string;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
    this.direction = environment.rtl ? "rtl" : "ltr";
  }
}
