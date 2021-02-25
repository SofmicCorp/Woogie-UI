import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';
import {WoogieFrontRoutes} from '../../../../constants/woogie-front-routes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  image: string;

  ngOnInit(): void {
    this.image = this.userService.getUser().image;
  }

  onClickProfile() {
    this.router.navigateByUrl('/'  + WoogieFrontRoutes.home + '/' +  WoogieFrontRoutes.profile);
  }
}
