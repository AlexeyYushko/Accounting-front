import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Bill } from '../shared/models/bill.model';
import { BillService } from '../shared/services/bill.service';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {
  user: User;
  bill: Bill;

  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.billService.getBill(this.user.id)
    .subscribe((bill: Bill) => {
      this.bill = bill;
    });
  }
}
