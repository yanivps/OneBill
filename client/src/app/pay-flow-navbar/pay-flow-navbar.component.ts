import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pay-flow-navbar',
  templateUrl: './pay-flow-navbar.component.html',
  styleUrls: ['./pay-flow-navbar.component.css']
})
export class PayFlowNavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
