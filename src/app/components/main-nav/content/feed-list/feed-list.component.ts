import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../services/http.service';
import {UserService} from '../../../../services/user.service';
import {Action} from '../../../../classes/feed/action';
import {ScrollingService} from '../../../../services/scrolling.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {

  actions: Action[];
  lastPage: number;

  constructor(private userService: UserService, private httpService: HttpService, private scrollingService: ScrollingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.userBehaviorSubject.subscribe(user => {
      if (user != null) {
        this.lastPage = 0;
        this.scrollingService.scrollUp('feedList');
        this.authService.isLoggedInBehaviorSubject.subscribe(isLoggedIn => {
          if (isLoggedIn){
            this.getFeed();
          }
        });
        this.scrollingService.scrollingMap.get('feedList').fetchNext.subscribe(fetchNext => {
          if (fetchNext) {
            this.lastPage++;
            this.getFeed();
          }
        });
      }
    });
  }

  getFeed(){
    this.httpService.getFeed(this.userService.getUser().id, {page: this.lastPage}).subscribe(actions => {
      this.lastPage === 0 ? this.actions = actions : this.actions.concat(actions);
    });
  }

}
