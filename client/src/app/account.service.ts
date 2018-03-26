import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {
  private baseUrl: string = environment.apiHost + "/accounts/"

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  get(accountId): Observable<any> {
    return this.http.get(this.baseUrl + accountId);
  }
}
