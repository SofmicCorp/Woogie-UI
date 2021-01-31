import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../../classes/product/product';
import {HttpService} from '../../../../../services/http.service';
import {Reaction} from '../../../../../classes/reaction/reaction';
import {ReactionsEnum} from '../../../../../classes/reaction/reactions-enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  createReaction(reactionType: ReactionsEnum){
    const myReaction: Reaction = {
      userId: '2',
      type: reactionType,
      id: '',
      active: true
    };

    this.httpService.createReaction(this.product, myReaction).subscribe( res => {
      console.log(res);
    });
  }

  inactiveReaction(){
    const body = {
      userId: '2',
      retailId: this.product.retailId,
      retailName: this.product.retailName
    };

    this.httpService.inactiveReaction(body).subscribe( res => {
      console.log(res);
    });
  }

}
