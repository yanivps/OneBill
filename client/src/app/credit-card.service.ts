import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/catch";
import { NotFoundError } from './shared/models/not-found-error';
import { AppError } from './shared/models/app-error';

@Injectable()
export class CreditCardService {
  private baseUrl: string = environment.apiHost + "/credit_cards/"

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl)
      .catch(this.handleError);
  }

  delete(creditCardId: string) {
    return this.http.delete(this.baseUrl + creditCardId);
  }

  private handleError(response: HttpErrorResponse) {
    if (response.status == 404) {
      return Observable.throw(new NotFoundError(response.error));
    }
    return Observable.throw(new AppError(response.error));
  }
}
