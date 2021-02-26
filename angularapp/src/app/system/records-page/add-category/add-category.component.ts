import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService) { }


  onSubmit(form: NgForm) {
    let { name, capacity} = form.value;

    if (capacity < 0)
      capacity*= -1;

      const category = new Category(name, capacity);

      this.categoryService.add(category)
      .subscribe((category: Category) => {
          form.reset();
          form.form.patchValue({capacity: 1});
          this.onCategoryAdd.emit(category);
      });   
  }
}
