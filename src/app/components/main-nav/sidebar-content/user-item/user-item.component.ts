import {Component, OnInit} from '@angular/core';
// import {UserService} from '../../../services/user-service/user.service';
// import {MercuryUser} from '../../../shared/models/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  // user: MercuryUser;

  constructor(/*private userService: UserService*/) { }

  ngOnInit(): void {
    // this.userService.user.subscribe(value => {
    //   this.user = value;
    // });
  }

}
