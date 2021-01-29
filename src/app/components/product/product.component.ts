import {Component, Input, OnInit} from '@angular/core';
import {ProductsReactionsClickedMap} from '../../classes/product/productsReactionsClickedMap';
import {Product} from '../../classes/product/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  productsReactionsClickedMap: ProductsReactionsClickedMap;

  constructor() { }

  ngOnInit(): void {

  }

}
