import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../../classes/product/product';
import {HttpService} from '../../../../../services/http.service';
import {Reaction} from '../../../../../classes/reaction/reaction';
import {ReactionsEnum} from '../../../../../classes/reaction/reactions-enum';
import {UserService} from '../../../../../services/user.service';
import {Action} from '../../../../../classes/feed/action';
import {retailImgPaths} from '../../../../../constants/retail-img-paths';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Input() isFeed: boolean;
  @Input() action: Action;
  feedUserName: string;
  actionStr: string;
  retailImgPaths: {};

  constructor(private httpService: HttpService, private userService: UserService) { }

  ngOnInit(): void {
    this.retailImgPaths = retailImgPaths;
    this.feedHandler();
  }

  feedHandler(){
    if (this.action != null){
      const usersKeys = Object.keys(this.action.users);
      this.feedUserName = this.action.users[usersKeys[0]];
      if (usersKeys.length === 1){
        this.actionStr = ' reacted on this product';
      }else if (usersKeys.length > 1){
        this.actionStr = ' and '  + (usersKeys.length - 1) + ' more of your followings reacted on this product';
      }
    }
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

  onClick(itemHref: string) {
    window.open(itemHref, "_blank");
  }
}
