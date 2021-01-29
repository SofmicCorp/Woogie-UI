import {Component, Input, OnInit} from '@angular/core';
import {ProductsReactionsClickedMap} from '../../classes/product/productsReactionsClickedMap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() image;
  @Input() productsReactionsClickedMap: ProductsReactionsClickedMap;

  constructor() { }

  ngOnInit(): void {

  }

}
