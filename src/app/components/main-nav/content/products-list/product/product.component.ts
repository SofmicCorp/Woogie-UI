import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../../classes/product/product';
import {HttpService} from '../../../../../services/http.service';
import {Reaction} from '../../../../../classes/reaction/reaction';
import {ReactionsEnum} from '../../../../../classes/reaction/reactions-enum';
import {UserService} from '../../../../../services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor(private httpService: HttpService, private userService: UserService) { }

  ngOnInit(): void {
  }

  createReaction(reactionType: ReactionsEnum){
    const myReaction: Reaction = {
      userId: this.userService.getUser().id,
      type: reactionType,
      id: null,
      active: true
    };
    this.httpService.createReaction(this.product, myReaction).subscribe( res => {
    });
  }

  inactiveReaction(){
    const body = {
      userId: this.userService.getUser().id,
      retailId: this.product.retailId,
      retailName: this.product.retailName
    };

    this.httpService.inactiveReaction(body).subscribe( res => {
    });
  }

}
