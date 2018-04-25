import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/* Naming NOTE
  The API's file field is `fileItem` thus, we name it the same below
  it's like saying <input type='file' name='fileItem' />
  on a standard file field
*/


@Injectable()
export class FileUploadService {
  private baseUrl: string = environment.apiHost + "/files/bill"
  constructor(private http: HttpClient) { }

  fileUpload(fileItem: File, extraData?: object) {
    const formData: FormData = new FormData();

    formData.append('fileItem', fileItem, fileItem.name);
    if (extraData) {
      for (let key in extraData) {
        // iterate and set other form data
        formData.append(key, extraData[key])
      }
    }

    const req = new HttpRequest('POST', this.baseUrl, formData, {
      reportProgress: true // for progress data
    });
    // Re enable for progress data
    // return this.http.request(req)
    return this.http.post(this.baseUrl, formData);
  }

  // optionalFileUpload(fileItem?: File, extraData?: object): any {
  //   let apiCreateEndpoint = `${this.baseUrl}files/create/`
  //   const formData: FormData = new FormData(); //?
  //   let fileName;
  //   if (extraData) {
  //     for (let key in extraData) {
  //       // iterate and set other form data
  //       if (key == 'fileName') {
  //         fileName = extraData[key]
  //       }
  //       formData.append(key, extraData[key])
  //     }
  //   }

  //   if (fileItem) {
  //     if (!fileName) {
  //       fileName = fileItem.name
  //     }
  //     formData.append('image', fileItem, fileName);
  //   }
  //   const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
  //     reportProgress: true // for progress data
  //   });
  //   return this.http.request(req)
  // }

}
