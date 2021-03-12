import {Component, OnInit} from '@angular/core';
import {User} from '../../../../classes/user/user';
import {HttpService} from '../../../../services/http.service';
import {iconSvg} from '../../../../constants/icons-svg';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Product} from '../../../../classes/product/product';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {WoogieFrontRoutes} from '../../../../constants/woogie-front-routes';

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

  userId: string;
  user: User;
  tabIndexMap = ['loved', 'hated', 'interested', 'bought'];
  selectedType: string;
  products: Product[];
  isMyProfile: boolean;

  constructor(private httpService: HttpService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
    iconRegistry.addSvgIconLiteral('hated', sanitizer.bypassSecurityTrustHtml(HATED));
    iconRegistry.addSvgIconLiteral('loved', sanitizer.bypassSecurityTrustHtml(LOVED));
    iconRegistry.addSvgIconLiteral('interested', sanitizer.bypassSecurityTrustHtml(INTERESTED));
    iconRegistry.addSvgIconLiteral('bought', sanitizer.bypassSecurityTrustHtml(BOUGHT));
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.initProfilePage();
    });
    this.initProfilePage();
  }

  initProfilePage(){
    this.userService.userBehaviorSubject.subscribe(user => {
      if (user != null) {
        console.log('initProfilePage', user)
        if (this.router.url.endsWith(WoogieFrontRoutes.myProfile)) {
          this.userId = user.id.toString();
          this.isMyProfile = true;
        } else {
          this.userId = this.activatedRoute.snapshot.paramMap.get('id');
        }
        this.getUserWithFollowingDetails();
        this.products = [];
        this.selectedType = 'loved';
        this.getProductsByType();
      }
    });
  }

  getUserWithFollowingDetails(){
    console.log('this.userId', this.userId)
    this.httpService.getUserWithFollowingDetails(this.userId, {id: this.userService.getUser().id}).subscribe(user => {
      if (user != null) {
        this.user = user;
        console.log('getUserWithFollowingDetails', this.user);
      }
    });
  }

  onTabClick(tab: MatTabChangeEvent) {
    this.products = [];
    this.selectedType = this.tabIndexMap[tab.index];
    this.getProductsByType();
  }

  getProductsByType(){
    this.httpService.getAllReactionsByUserAndType({id: this.userService.getUser().id, userId: this.userId, type: this.selectedType, offset: 0, limit: 25}).subscribe(products => {
      this.products = products;
    });
  }

}
