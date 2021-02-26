import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';
import {WoogieFrontRoutes} from '../../../../constants/woogie-front-routes';
import {User} from '../../../../classes/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  user: User;

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  onClickProfile() {
    this.router.navigate(['/'  + WoogieFrontRoutes.home + '/' +  WoogieFrontRoutes.profile + '/' +  WoogieFrontRoutes.myProfile],
      {state: {user: {
          id: this.user.id,
          fullName: this.user.fullName,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
          image: this.user.image,
          status: this.user.status,
          type: this.user.type,
          updatedReaction: this.user.updatedReaction,
          mutualFollowingUsers: this.user.mutualFollowingUsers,
        }}
      });
  }
}
