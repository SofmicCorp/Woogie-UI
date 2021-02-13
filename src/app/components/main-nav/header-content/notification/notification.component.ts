import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {HttpService} from '../../../../services/http.service';
import {Notification} from '../../../../classes/notification/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: Notification[];
  hidden: boolean;
  showNotifications: boolean;

  constructor(private userService: UserService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.showNotifications = false;
    this.notifications = [];
    this.httpService.getNotifications({userId: this.userService.getUser().id}).subscribe(notifications => {
      this.notifications = notifications;
      console.log(this.notifications);
      this.badgeVisibility();
    });
  }

  badgeVisibility(){
    if (this.notifications == null || this.notifications.length === 0){
      this.hidden = true;
    }
  }

  onClick() {
    this.showNotifications = true;
  }

  openNotification(state: boolean) {
    console.log(state);
    this.showNotifications = state;
  }
}
