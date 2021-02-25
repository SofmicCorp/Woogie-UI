import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../classes/user/user';
import {HttpService} from '../../../../services/http.service';
import {iconSvg} from '../../../../constants/icons-svg';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Product} from '../../../../classes/product/product';

const HATED = iconSvg.hated;
const LOVED = iconSvg.loved;
const INTERESTED = iconSvg.interested;
const BOUGHT = iconSvg.bought;

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @Input() otherUser;
  user: User;
  followStats: {numOfFollowing: string, numOfFollowers: string};
  tabIndexMap = ['loved', 'hated', 'interested', 'bought'];
  selectedType: string;
  products: Product[];

  constructor(private userService: UserService, private httpService: HttpService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.products = [];
    iconRegistry.addSvgIconLiteral('hated', sanitizer.bypassSecurityTrustHtml(HATED));
    iconRegistry.addSvgIconLiteral('loved', sanitizer.bypassSecurityTrustHtml(LOVED));
    iconRegistry.addSvgIconLiteral('interested', sanitizer.bypassSecurityTrustHtml(INTERESTED));
    iconRegistry.addSvgIconLiteral('bought', sanitizer.bypassSecurityTrustHtml(BOUGHT));
  }

  ngOnInit(): void {
    this.user = this.otherUser == null ? this.userService.getUser() : this.otherUser;
    this.selectedType = 'loved';
    this.getProductsByType();
    this.httpService.getUserFollowStat(this.user.id).subscribe(followStats => {
      this.followStats = followStats;
    });
  }

  onTabClick(tab: MatTabChangeEvent) {
    this.products = [];
    this.selectedType = this.tabIndexMap[tab.index];
    this.getProductsByType();
  }

  getProductsByType(){
    this.httpService.getAllReactionsByUserAndType({id: this.userService.getUser().id, userId: this.user.id, type: this.selectedType, offset: 0, limit: 25}).subscribe(products => {
      this.products = products;
      console.log(products);
    });
  }

}
