import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../classes/user/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

}
