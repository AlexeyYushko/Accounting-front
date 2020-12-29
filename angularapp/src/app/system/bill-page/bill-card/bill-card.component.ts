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

  constructor() { }

  ngOnInit(): void {
  }

}
