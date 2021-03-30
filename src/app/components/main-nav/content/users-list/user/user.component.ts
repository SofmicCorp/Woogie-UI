import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../../classes/user/user';
import {Action} from '../../../../../classes/feed/action';
import {Router} from '@angular/router';
import {WoogieFrontRoutes} from '../../../../../constants/woogie-front-routes';
import {iconSvg} from '../../../../../constants/icons-svg';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ReactionsEnum} from "../../../../../classes/reaction/reactions-enum";
import {UserService} from '../../../../../services/user.service';

const HATED = iconSvg.hated;
const LOVED = iconSvg.loved;
const INTERESTED = iconSvg.interested;
const BOUGHT = iconSvg.bought;

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
  reactionColor: string;
  myUserId: string;

  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private userService: UserService) {
    iconRegistry.addSvgIconLiteral('hated', sanitizer.bypassSecurityTrustHtml(HATED));
    iconRegistry.addSvgIconLiteral('loved', sanitizer.bypassSecurityTrustHtml(LOVED));
    iconRegistry.addSvgIconLiteral('interested', sanitizer.bypassSecurityTrustHtml(INTERESTED));
    iconRegistry.addSvgIconLiteral('bought', sanitizer.bypassSecurityTrustHtml(BOUGHT));
  }

  ngOnInit(): void {
    this.myUserId = this.userService.getUser().id;
    this.mutualFollowingUsersHandler();
    this.feedHandler();

    switch (this.user.type) {
      case ReactionsEnum.BOUGHT:
        this.reactionColor = 'green';
        break;
      case ReactionsEnum.HATED:
        this.reactionColor = 'saddlebrown';
        break;
      case ReactionsEnum.INTERESTED:
        this.reactionColor = 'blue';
        break;
      case ReactionsEnum.LOVED:
        this.reactionColor = 'red';
        break;
    }

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
      this.feedUserName = this.action.users[usersKeys[0]];
      if (usersKeys.length === 1){
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
