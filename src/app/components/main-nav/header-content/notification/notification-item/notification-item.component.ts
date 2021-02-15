import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../../../../../classes/notification/notification';
import {FollowStatusEnum} from '../../../../../classes/user/follow-status-enum';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

  @Input() notification: Notification;
  description: string;
  status: FollowStatusEnum;

  constructor() { }

  ngOnInit(): void {
    switch (this.notification.type) {
      case FollowStatusEnum.CONFIRMED:
        this.description = ' has confirmed your follow request';
        this.status = FollowStatusEnum.CONFIRMED;
        break;
      case FollowStatusEnum.FOLLOW_REQUEST:
        this.description = 'sent you a follow request';
        switch (this.notification.connectionStatus) {
          case FollowStatusEnum.PENDING:
            this.status = FollowStatusEnum.FOLLOW_REQUEST;
            break;
          case FollowStatusEnum.ACTIVE:
            this.status = FollowStatusEnum.CONFIRMED;
        }
    }
  }

}
