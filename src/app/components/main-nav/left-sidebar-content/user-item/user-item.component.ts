import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../classes/user/user';
import {WoogieFrontRoutes} from "../../../../constants/woogie-front-routes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  onClickProfile() {
    this.router.navigateByUrl('/'  + WoogieFrontRoutes.home + '/' +  WoogieFrontRoutes.profile);
  }
}
