import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../classes/product/product';
import {SearchService} from '../../../../services/search.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {

  products: Product[];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.products = [];
    this.subscriptions();
  }

  subscriptions(){
    this.searchService.products.subscribe(products => {
      if (products != null) {
        if (products.shouldInitList){
          this.products = products.products;
          return;
        }
        this.products = this.products.concat(products.products);
      }
    });
  }

}
