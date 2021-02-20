import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../services/http.service';
import {UserService} from '../../../../services/user.service';
import {Action} from '../../../../classes/feed/action';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {

  actions: Action[];

  constructor(private userService: UserService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getFeed(this.userService.getUser().id, {}).subscribe(actions => {
      this.actions = actions;
    });
  }

}
