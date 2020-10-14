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
  pdata = {};
  
  constructor(
    private route: ActivatedRoute,
    private invService: InventoryService
    ){
        this.route.params.subscribe( params => this.id = params.id );
    }

  ngOnInit(): void {
    this.invService.fetch(this.id).subscribe((data) => {
      this.pdata = data;
    });
  }

}
