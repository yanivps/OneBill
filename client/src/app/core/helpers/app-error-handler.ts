import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { AlertService } from '../../shared/services/alert.service';

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error) {
    this.alertService.error('An unexpected error occurred.');
    console.error(error);
  }


  private get alertService() : AlertService {
    return this.injector.get(AlertService);
  }

}
