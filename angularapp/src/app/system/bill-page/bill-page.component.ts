import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Bill } from '../shared/models/bill.model';
import { Currency } from '../shared/models/currency.model';
import { BillService } from '../shared/services/bill.service';
import { CurrencyService } from '../shared/services/currency.service';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {
  user: User;
  bill: Bill;
  currency: Array<Currency>;
  isLoaded = false;

  constructor(
    private billService: BillService,
    private currencyService: CurrencyService)
    { }

  ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.billService.getBill(this.user.id)
    .subscribe((bill: Bill) => {
      this.bill = bill;
      this.onRefresh();
    });
  }

  onRefresh() {
    this.isLoaded = false;

    this.currencyService.getCurrency(this.bill.currency)
    .subscribe((currency) => {
      this.currency = currency;
      this.isLoaded = true;
    })
  }
}
