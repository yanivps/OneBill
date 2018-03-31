import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/catch";
import { NotFoundError } from './shared/models/not-found-error';
import { AppError } from './shared/models/app-error';
import { InvitationTokenInvalidError, InvitationAlreadyUsedError, InvitationExpiredError } from './invitation-errors';

@Injectable()
export class InvitationService {
  private baseUrl: string = environment.apiHost + "/invitations/"
  private accountsUserUrl: string = environment.apiHost + "/accounts/users/"

  constructor(private http: HttpClient) { }

  get(invitationToken: string): Observable<any> {
    return this.http.get(this.baseUrl + `?invitation_token=${invitationToken}`)
      .catch(this.handleError);
  }

  activate(invitationToken: string) {
    return this.http.post(this.accountsUserUrl, {invitationToken: invitationToken})
      .catch(this.handleError);
  }

  private handleError(response: HttpErrorResponse) {
    if (response.status == 404) {
      return Observable.throw(new NotFoundError(response.error));
    }
    if (response.error.message == "invitation_already_used") {
      return Observable.throw(new InvitationAlreadyUsedError(response.error));
    }
    if (response.error.message == "invalid_invitation_token") {
      return Observable.throw(new InvitationTokenInvalidError(response.error));
    }
    if (response.error.message == "invitation_was_expired") {
      return Observable.throw(new InvitationExpiredError(response.error));
    }

    return Observable.throw(new AppError(response.error));
  }
}
