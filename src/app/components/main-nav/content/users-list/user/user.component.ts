import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../../classes/user/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  mutualFollowingUsersStr: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
    if (this.user.mutualFollowingUsers != null){
      if (this.user.mutualFollowingUsers.length > 0){
        this.mutualFollowingUsersStr = 'Followed by ' + this.user.mutualFollowingUsers[0];
        if (this.user.mutualFollowingUsers.length > 1){
          this.mutualFollowingUsersStr += ' and ' + (this.user.mutualFollowingUsers.length - 1) + ' others';
        }
      }
    }
  }

}
