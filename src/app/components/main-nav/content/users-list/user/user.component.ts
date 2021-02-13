import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../../classes/user/user';
import {Action} from '../../../../../classes/feed/action';

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

  constructor() { }

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

}
