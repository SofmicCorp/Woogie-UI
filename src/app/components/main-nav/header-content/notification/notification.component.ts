import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {HttpService} from '../../../../services/http.service';
import {Notification} from '../../../../classes/notification/notification';
import {WoogieFrontRoutes} from '../../../../constants/woogie-front-routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, AfterViewInit {

  notifications: Notification[];
  hidden: boolean;
  showDropDown: boolean;
  notificationIds: Array<string>;
  seenCounter: number;

  constructor(private userService: UserService, private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.seenCounter = 0;
    this.showDropDown = false;
    this.notifications = [];
    this.notificationIds = [];
  }

  ngAfterViewInit(): void {
    this.httpService.getNotifications({userId: this.userService.getUser().id}).subscribe(notifications => {
      if (notifications != null) {
        this.notifications = notifications;
        this.getNotificationIds();
        this.badgeVisibility();
      }
    });
  }

  getNotificationIds(){
    Object.keys(this.notifications).forEach(key => {
      this.notificationIds.push(this.notifications[key].id);
      if (!this.notifications[key].seen && !this.notifications[key].dirty) {
        this.seenCounter++;
      }
    });
  }

  badgeVisibility(){
    if (this.notifications == null || this.notifications.length === 0 || this.seenCounter === 0){
      this.hidden = true;
    }
  }

  onClick() {
    this.hidden = true;
    this.seenCounter = 0;
    this.showDropDown = !this.showDropDown;
    this.httpService.seenNotifications({ids: this.notificationIds}).subscribe(res => {});
  }

  openNotification(state: boolean) {
    this.showDropDown = state;
  }

}
