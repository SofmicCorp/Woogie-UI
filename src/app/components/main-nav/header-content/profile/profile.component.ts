import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  image: string;

  ngOnInit(): void {
    this.image = this.userService.getUser().image;
  }

}
