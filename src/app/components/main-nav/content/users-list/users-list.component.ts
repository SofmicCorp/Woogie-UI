import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../../../services/search.service';
import {User} from '../../../../classes/user/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.subscriptions();
  }

  subscriptions(){
    console.log("simba")
    this.searchService.users.subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

}
