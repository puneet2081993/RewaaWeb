import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './list-view/list-view.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [ListViewComponent, ProductViewComponent, CreateComponent],
  imports: [
    CommonModule
  ]
})
export class InventoryModule { }
