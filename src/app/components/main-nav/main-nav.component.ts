import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.setUser({
      id: '1',
      fullName: 'Mor Soferian',
      firstName: ' Mor',
      lastName: 'Soferian',
      email: 'morsof48@gmail.com',
      phoneNumber: '0548128675',
      image: 'https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/52974078_10219567634645312_4529992776930033664_n.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=Tq_PTBCa7RwAX_uL3mr&_nc_ht=scontent.ftlv6-1.fna&oh=135300268ba769fecf475fbaad583b61&oe=603D3A7D',
      mutualFollowingUsers: null,
      status: null,
      createdAt: new DateTimeFormat(),
      updatedAt: new DateTimeFormat()
    });
  }

}
