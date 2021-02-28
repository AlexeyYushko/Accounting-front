import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/shared/models/message.model';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId: string;
  currentCategory: Category = {
    capacity: 0,
    name: ''
  };
  message: Message;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.message = new Message('success', '');
  }

  onCategoryChange() {
    this.currentCategory = this.categories
    .find((c) => c.id === this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;

    if (capacity < 0)
      capacity *= -1;

    let category = new Category(name, capacity, this.currentCategoryId);

    this.categoryService.edit(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категория успешно отредактирована.';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }
}
