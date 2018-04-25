import { Component, OnInit } from '@angular/core';
import { TemporaryBillService } from '../../services/temporary-bill.service';
import { NgForm, NgModel } from '@angular/forms';
import { IntPhonePrefixComponent } from 'ng4-intl-phone';
import { InvitationService } from '../../../invitation/services/invitation.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  sendInvitationLoading: boolean = false;
  phoneNumber: string = '';
  accountIdToInvite: string = '';

  addressSelection = 'newAddress';
  existingAddresses: any[];

  existingAddressId = '';
  bill: any = {};
  // BILL_EXAMPLE = {
  //   municipalityAccountNumber: "1",
  //   amount: 30.5,
  //   billNumber: "1",
  //   category: "2",
  //   payUntil: { year: 2018, month: 6, day: 23 },
  //   periodEnd: { year: 2018, month: 5, day: 20 },
  //   periodStart: { year: 2018, month: 4, day: 22 },
  //   physicalAddressId: "1"
  // }

  bills: any[];
  categories = [
    { key: "3", name: "Property Tax" },
    { key: "1", name: "Electricity" },
    { key: "2", name: "Water" }
  ]
  constructor(
    private temporaryBillSerivce: TemporaryBillService,
    private invitationService: InvitationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.temporaryBillSerivce.getAddresses().subscribe(
      res => this.existingAddresses = res
    );
    this.temporaryBillSerivce.getAll().subscribe(
      res => this.bills = res
    );
  }

  savePendingBill(form: NgForm) {
    this.bill['periodStart'] = `${this.bill['periodStart'].year}-${this.bill['periodStart'].month}-${this.bill['periodStart'].day}`
    this.bill['periodEnd'] = `${this.bill['periodEnd'].year}-${this.bill['periodEnd'].month}-${this.bill['periodEnd'].day}`
    this.bill['payUntil'] = `${this.bill['payUntil'].year}-${this.bill['payUntil'].month}-${this.bill['payUntil'].day}`
    this.temporaryBillSerivce.create(this.bill).subscribe(
      res => {
        this.bills.push(res)
        form.reset();
      },
      error => {
        alert("Failed to create bill: " + error.error.exception);
        console.log(error);
      }
    )
  }

  deleteTemporaryBill(temporaryBill: any) {
    let index = this.bills.indexOf(temporaryBill);
    if (index == -1) return;

    this.bills.splice(index, 1);
    this.temporaryBillSerivce.delete(temporaryBill.id).subscribe(
      null,
      error => {
        console.log(error);
        alert('Failed to delete temporary bill');
        // Return to list
        this.bills.splice(index, 0, temporaryBill);
      }
    )
  }

  displayAddress(bill) {
    if (bill.physicalAddressId) {
      for (const address of this.existingAddresses) {
        if (address.key == bill.physicalAddressId) return address.value
      }
      return '';
    }
    return `${bill.street} ${bill.houseNumber}, ${bill.city}`;
  }

  displayCategory(categoryId) {
    for (const category of this.categories) {
      if (category.key == categoryId) return category.name;
    }
    return '';
  }

  sendInvitation(phoneNumberInput: NgModel) {
    let selectedCountry = (phoneNumberInput.valueAccessor as IntPhonePrefixComponent).selectedCountry;
    if (!selectedCountry) {
      phoneNumberInput.control.setErrors({ 'requiredCountryCode': true });
      return;
    }

    let formattedPhoneNumber = this.phoneNumber;
    if (formattedPhoneNumber.indexOf("+" + selectedCountry.dialCode + " ") == -1) {
      formattedPhoneNumber = formattedPhoneNumber.replace("+" + selectedCountry.dialCode, "+" + selectedCountry.dialCode + " ")
    }
    this.sendInvitationLoading = true;
    this.invitationService.create(formattedPhoneNumber, this.accountIdToInvite).subscribe(
      res => {
        this.sendInvitationLoading = false;
        this.accountIdToInvite = '';
        this.phoneNumber = '';
        this.alertService.success('Invitation was sent!');
      },
      error => {
        this.sendInvitationLoading = false;
        alert("Failed to invite: " + error.originalError.description);
        console.log(error);
      }
    );
  }
}
