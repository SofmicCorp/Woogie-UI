import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../services/http.service';
import {UserService} from '../../../../services/user.service';
import {Action} from '../../../../classes/feed/action';
import {ScrollingService} from '../../../../services/scrolling.service';
import {General} from '../../../../constants/general';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {

  actions: Action[];
  lastPage: number;

  constructor(private userService: UserService, private httpService: HttpService, private scrollingService: ScrollingService) { }

  ngOnInit(): void {
    this.lastPage = 0;
    this.scrollingService.scrollUp('feedList');
    this.getFeed();
    this.scrollingService.scrollingMap.get('feedList').fetchNext.subscribe(fetchNext => {
      if (fetchNext) {
        this.lastPage++;
        this.getFeed();
      }
    });
  }

  getFeed(){
    this.httpService.getFeed(this.userService.getUser().id, {page: this.lastPage}).subscribe(actions => {
      console.log(actions)
      this.lastPage === 0 ? this.actions = actions : this.actions.concat(actions);
    });
  }

}
