import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  selectedProduct: string[] = [];
  submitted = false;
  returnUrl: string;
  error :{};
  pdata : [{"pid":"12","pname":"xxyyzz","selected":false}];x
  productError: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private invService: InventoryService
    ) { }

  ngOnInit(): void {
    this.invService.fetch().subscribe((data) => {
      this.pdata = data;
    });
  }

  checkbox(id:string){
    if(this.selectedProduct.find(x=>x == id))
    {
      this.selectedProduct.splice(this.selectedProduct.indexOf(id),1)
    }
    else{
      this.selectedProduct.push(id);
    } 
    console.log(this.selectedProduct);
  }

  deleteProduct(){
    let confirmation = confirm("Are you sure you want to delete these products !");

    if(confirmation){
      this.invService.delete(this.selectedProduct).subscribe((data) => {
        console.log(data);
      });
      const redirect = '/';
      this.router.navigate([redirect]);
    }
  }


}
