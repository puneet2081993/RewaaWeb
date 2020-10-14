import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  id : string;
  createProductForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  productError: string;
  pdata:{}
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private invService: InventoryService,
    private route: ActivatedRoute
    ){
      this.route.params.subscribe( params => this.id = params.id );
    }

  ngOnInit() {
   if(this.id){
      this.invService.fetchByID(this.id).subscribe((data) => {
        this.pdata = data;
      });
    }
    this.createProductForm = this.fb.group({
      pname: ['', Validators.required],
      ptype: ['', Validators.required],
      pqty: ['', Validators.required]
    });
  }

  get pname() { return this.createProductForm.get('pname'); }
  get ptype() { return this.createProductForm.get('ptype'); }
  get pqty() { return this.createProductForm.get('pqty'); }
  

  onSubmit() {
    this.submitted = true;
    let productData = {
      ptype: this.ptype.value,
      pname: this.pname.value,
      pqty: this.pqty.value,
    };

    if(!this.id){
      this.invService.create(productData).subscribe((data) => {
        console.log(data);
      });
    }
    else{
      console.log(productData);
    }
  }
  
  deleteProduct(){
    let confirmation = confirm("Are you sure you want to delete!");
    if(confirmation){
       this.invService.delete([this.id]).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
