import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  id : string;
  pdata : any;
  
  constructor(
    private route: ActivatedRoute,
    private invService: InventoryService
    ){
        this.route.params.subscribe( params => this.id = params.id );
    }

  ngOnInit(): void {
    this.invService.fetch(this.id).subscribe((data) => {
      this.pdata = data[0];
    });
  }

  deleteProduct(){
    let confirmation = confirm("Are you sure you want to delete!");
    if(confirmation){
       this.invService.delete([this.id]).subscribe((data) => {
          alert(data.changedRows+" products deleted successfully");
      });
    }
  }

}
