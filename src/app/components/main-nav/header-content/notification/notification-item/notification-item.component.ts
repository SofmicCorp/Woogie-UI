import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../../../../../classes/notification/notification';
import {FollowStatusEnum} from '../../../../../classes/user/follow-status-enum';
import {WoogieFrontRoutes} from '../../../../../constants/woogie-front-routes';
import {HttpService} from '../../../../../services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

  @Input() notification: Notification;
  description: string;
  status: FollowStatusEnum;

  constructor(private httpService: HttpService, private router: Router) { }

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

  onNotificationClick(notification: Notification) {
    this.httpService.dirtyNotifications(notification.id).subscribe(res => {});
    notification.dirty = true;
    this.router.navigate(['/'  + WoogieFrontRoutes.home + '/' +  WoogieFrontRoutes.profile, notification.senderId],
      {state: {user: {
            id: notification.senderId,
            fullName: notification.senderFullname,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
            image: notification.senderImage,
            status: notification.connectionStatus,
            type: null,
            updatedReaction: null,
            mutualFollowingUsers: null,
          }}
      });
  }

}
