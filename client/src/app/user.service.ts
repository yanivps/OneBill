import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {
  private baseUrl: string = environment.apiHost + "/users"

  constructor(private http: HttpClient) { }

  create(user, invitationToken: string): Observable<any> {
    user.invitationToken = invitationToken;
    user.name = user.firstName + ' ' + user.lastName;
    return this.http.post(this.baseUrl, user);
  }

  sendVerificationCodeSms(userId: string, phoneNumber: string): Observable<any> {
    let params = {id: userId, phoneNumber: phoneNumber};
    return this.http.post(this.baseUrl + '/send_verification_code_sms', params);
  }

  verify(userId: string, verificationCode: string) {
    let params = { id: userId, code: verificationCode };
    return this.http.post(this.baseUrl + '/verify', params);
  }
}
