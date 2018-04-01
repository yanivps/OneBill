import 'rxjs/add/operator/catch';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { AppError } from '../../shared/models/app-error';
import { NotFoundError } from '../../shared/models/not-found-error';

@Injectable()
export class AccountService {
  private baseUrl: string = environment.apiHost + "/accounts/"

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl)
      .catch(this.handleError);
  }

  get(accountId): Observable<any> {
    return this.http.get(this.baseUrl + accountId)
      .catch(this.handleError);
  }

  private handleError(response: HttpErrorResponse) {
    if (response.status == 404) {
      return Observable.throw(new NotFoundError(response.error));
    }
    return Observable.throw(new AppError(response.error));
  }
}
