import {Component, Input, OnInit} from '@angular/core';
import {FollowStatusEnum} from '../../../classes/user/follow-status-enum';
import {HttpService} from '../../../services/http.service';
import {User} from '../../../classes/user/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {

  @Input() user: User;
  buttonText: string;
  color: string;

  constructor(private httpService: HttpService, private userService: UserService) { }

  ngOnInit(): void {
    switch (this.user.status){
      case FollowStatusEnum.ACTIVE:
        this.buttonText = 'Unfollow';
        this.color = null;
        break;
      case FollowStatusEnum.INACTIVE:
        this.buttonText = 'Follow';
        this.color = 'primary';
        break;
      case FollowStatusEnum.PENDING:
        this.buttonText = 'Requested';
        break;
    }
  }

  onClick(){
    switch (this.user.status){
      case FollowStatusEnum.INACTIVE:
        this.buttonText = 'Requested';
        this.color = null;
        this.user.status = FollowStatusEnum.PENDING;
        this.httpService.followUser(this.userService.getUser().id, {followId: this.user.id}).subscribe(user => {});
        break;
      case FollowStatusEnum.ACTIVE:
      case FollowStatusEnum.PENDING:
        this.buttonText = 'Follow';
        this.color = 'primary';
        this.user.status = FollowStatusEnum.INACTIVE;
        this.httpService.unfollowUser(this.userService.getUser().id, {userId: this.user.id}).subscribe(user => {});
        break;
    }
  }

}
