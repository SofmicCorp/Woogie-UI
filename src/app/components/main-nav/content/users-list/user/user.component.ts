import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../../classes/user/user';
import {Action} from '../../../../../classes/feed/action';
import {Router} from '@angular/router';
import {WoogieFrontRoutes} from '../../../../../constants/woogie-front-routes';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Input() isFeed: boolean;
  @Input() action: Action;
  actionStr: string;
  mutualFollowingUsersStr: string;
  feedUserName: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.mutualFollowingUsersHandler();
    this.feedHandler();
  }

  mutualFollowingUsersHandler(){
    if (this.user.mutualFollowingUsers != null){
      if (this.user.mutualFollowingUsers.length > 0){
        this.mutualFollowingUsersStr = 'Followed by ' + this.user.mutualFollowingUsers[0];
        if (this.user.mutualFollowingUsers.length > 1){
          this.mutualFollowingUsersStr += ' and ' + (this.user.mutualFollowingUsers.length - 1) + ' others';
        }
      }
    }
  }

  feedHandler(){
    if (this.action != null){
      const usersKeys = Object.keys(this.action.users);
      if (usersKeys.length === 1){
        this.feedUserName = this.action.users[usersKeys[0]];
        this.actionStr = ' started to follow ';
      }else if (usersKeys.length > 1){
        this.actionStr = ' and '  + (usersKeys.length - 1) + ' others started to follow ';
      }
    }
  }

  onClickUser(){
    this.router.navigate(['/'  + WoogieFrontRoutes.home + '/' +  WoogieFrontRoutes.profile, this.user.id],
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
