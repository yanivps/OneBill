import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CreditCardService {
  private baseUrl: string = environment.apiHost + "/credit_cards/"

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  delete(creditCardId: string) {
    return this.http.delete(this.baseUrl + creditCardId);
  }
}
