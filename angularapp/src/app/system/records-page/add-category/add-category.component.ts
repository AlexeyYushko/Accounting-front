import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm) {
    let { name, capacity} = form.value;

    if (capacity < 0)
      capacity*= -1;
  }
}
