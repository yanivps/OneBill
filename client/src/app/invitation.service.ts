import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InvitationService {
  private baseUrl: string = environment.apiHost + "/invitations/"
  private accountsUserUrl: string = environment.apiHost + "/accounts/users/"

  constructor(private http: HttpClient) { }

  get(invitationToken: string): Observable<any> {
    return this.http.get(this.baseUrl + `?invitation_token=${invitationToken}`);
  }

  activate(invitationToken: string) {
    return this.http.post(this.accountsUserUrl, {invitationToken: invitationToken});
  }
}
