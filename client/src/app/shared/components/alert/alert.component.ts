import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  message: any
  @ViewChild('messageDiv') messageHtmlElement: ElementRef;


  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => { 
      this.message = message; 
      if (!message) return;
       
      this.focusMessageElement();
    });
  }

  private focusMessageElement() {
    setTimeout(() => {
      if (this.messageHtmlElement.nativeElement) {
        this.messageHtmlElement.nativeElement.focus();
      }
    })
  }

}
