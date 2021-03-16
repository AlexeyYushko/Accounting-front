import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from "./components/loader/loader.component";

@NgModule ({
  declarations: [LoaderComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent
  ]
})
export class SharedModule {}
