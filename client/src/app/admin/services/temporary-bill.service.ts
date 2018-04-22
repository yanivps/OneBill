import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TemporaryBillService {
  private baseUrl: string = environment.apiHost + "/temporary_bills/"

  constructor(private http: HttpClient) { }

  getAddresses(): Observable<any> {
    return this.http.get(this.baseUrl + 'addresses');
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + id);
  }

  create(temporaryBill: any) {
    return this.http.post(this.baseUrl, temporaryBill);
  }
}
