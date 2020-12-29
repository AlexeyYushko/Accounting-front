import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';
import { Currency } from '../../shared/models/currency.model';

@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {


  @Input() bill: Bill;
  @Input() currency: Array<Currency>;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit(): void {
    this.dollar = this.currency.find((value)=> value.currency == "USD").rate * this.bill.amount;
    this.euro = this.currency.find((value)=> value.currency == "EUR").rate * this.bill.amount;
  }
}
