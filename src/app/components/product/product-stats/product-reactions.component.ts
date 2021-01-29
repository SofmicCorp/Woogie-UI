import {Component, Input, OnInit} from '@angular/core';
import {ProductsReactionsClickedMap} from '../../../classes/product/productsReactionsClickedMap';

@Component({
  selector: 'app-product-stats',
  templateUrl: './product-reactions.component.html',
  styleUrls: ['./product-reactions.component.css']
})
export class ProductReactionsComponent implements OnInit {

  @Input() productsReactionsClickedMap: ProductsReactionsClickedMap;

  constructor() { }

  ngOnInit(): void {
  }

  onClicked(key: string, value: boolean){
    if (this.productsReactionsClickedMap[key].clicked){
      this.productsReactionsClickedMap[key].clicked = false;
      return;
    }
    Object.keys(this.productsReactionsClickedMap).forEach((type ) => {
      if (this.productsReactionsClickedMap[type].clicked){
        this.productsReactionsClickedMap[type].clicked = false;
        this.productsReactionsClickedMap[type].reactionCount--;
      }
    });
    this.productsReactionsClickedMap[key].clicked = value;
    this.productsReactionsClickedMap[key].reactionCount++;
  }

}
