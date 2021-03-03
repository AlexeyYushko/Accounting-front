import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { WFMEvent } from '../../shared/models/wfmevent.model';
import * as moment from 'moment';
import { EventService } from '../../shared/services/event.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { User } from 'src/app/shared/models/user.model';
import {mergeMap} from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  user: User;
  message: Message;

  @Input() categories: Category[] = [];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor(private eventService: EventService,
              private billService: BillService) { }

  ngOnInit(): void {
    this.message = new Message('danger', '');
  }

  showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm): void {
    let {amount, description, category, type} = form.value;

    if (amount < 0)
      amount *= -1;

    const event = new WFMEvent(type, amount, category, moment().format(), description);

    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.billService.getBill(this.user.id)
      .subscribe((bill: Bill) => {
        let value = 0;

        if (type === 'outcome') {
          if (amount > bill.amount) {
            this.showMessage(`На счету недостаточно средств. Вам не хватает ${amount - bill.amount}`)

            return;
          }

          value = bill.amount - amount;
        }
        else {
          value = bill.amount + amount;
        }


        this.billService.edit({amount: value, currency: '', id: bill.id})
          .pipe(mergeMap(() => this.eventService.add(event)))
          .subscribe(() => {
            form.setValue({
              amount: 0,
              description: '',
              category: 1,
              type: 'outcome'
            });
          });
      });
  }
}
