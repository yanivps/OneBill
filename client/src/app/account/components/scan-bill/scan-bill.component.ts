import { Component, OnInit } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { NgForm } from '@angular/forms';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-scan-bill',
  templateUrl: './scan-bill.component.html',
  styleUrls: ['./scan-bill.component.css']
})
export class ScanBillComponent {
  uploadLoading: boolean;
  ocrComplete: boolean = false;
  loadingOcr: boolean = false;
  fileToUpload: File;
  imgSrc: any;
  pdfSrc: any;
  isLoaded: boolean = false;
  currentPage: number;
  numOfPages: number;
  constructor(private fileUploadService: FileUploadService, private router: Router, private alertService: AlertService) { }

  onFileSelected(files: FileList) {
    this.pdfSrc = this.imgSrc = '';
    if (!files || files.length == 0) return;

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.setPreview(e.target.result);
      };

      this.fileToUpload = files.item(0);
      this.readFile(reader, this.fileToUpload);
    }
  }

  private readFile(reader: FileReader, fileToUpload: File): any {
    if (fileToUpload.type.indexOf('image') != -1) {
      reader.readAsDataURL(fileToUpload);
    } else if (fileToUpload.type.indexOf('pdf') != -1) {
      reader.readAsArrayBuffer(fileToUpload);
    } else {
      this.alertService.error("Unsupported file");
    }
  }

  private setPreview(fileData): any {
    if (this.fileToUpload.type.indexOf('image') != -1) {
      this.imgSrc = fileData;
      this.isLoaded = true;
    } else if (this.fileToUpload.type.indexOf('pdf') != -1) {
      this.pdfSrc = fileData;
    } else {
      this.alertService.error("Unsupported file");
    }
  }

  onPdfLoadComplete(pdf: PDFDocumentProxy) {
    this.isLoaded = true;
    this.numOfPages = pdf.numPages;
    this.currentPage = 1;
  }

  nextPage() {
    this.currentPage += 1;
  }

  previousPage() {
    this.currentPage -= 1;
  }

  uploadFile(form: NgForm) {
    this.uploadLoading = true;
    this.fileUploadService.fileUpload(this.fileToUpload).subscribe(
      res => {
        this.uploadLoading = false;
        this.loadingOcr = true;
        setTimeout(() => {
          this.loadingOcr = false;
          this.ocrComplete = true;
          this.router.navigate(['/accounts']);
        }, 5000);
      },
      error => {
        this.uploadLoading = false;
        this.loadingOcr = false;
        alert("Error: " + error.error.description);
      }
    );
  }
}
