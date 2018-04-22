import { Component, OnInit } from '@angular/core';
import { TemporaryBillService } from '../../services/temporary-bill.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  addressSelection = 'newAddress';
  existingAddresses: any[];

  existingAddressId = '';
  bill = {};
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
  constructor(private temporaryBillSerivce: TemporaryBillService) { }

  ngOnInit() {
    this.temporaryBillSerivce.getAddresses().subscribe(
      res => this.existingAddresses = res
    );
    this.temporaryBillSerivce.getAll().subscribe(
      res => this.bills = res
    );
  }

  savePendingBill() {
    this.bill['periodStart'] = `${this.bill['periodStart'].year}-${this.bill['periodStart'].month}-${this.bill['periodStart'].day}`
    this.bill['periodEnd'] = `${this.bill['periodEnd'].year}-${this.bill['periodEnd'].month}-${this.bill['periodEnd'].day}`
    this.bill['payUntil'] = `${this.bill['payUntil'].year}-${this.bill['payUntil'].month}-${this.bill['payUntil'].day}`
    this.temporaryBillSerivce.create(this.bill).subscribe(
      res => this.bills.push(res),
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
}
