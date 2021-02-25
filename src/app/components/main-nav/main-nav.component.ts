import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {fromEvent, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map, pairwise, share, shareReplay, throttleTime} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import DateTimeFormat = Intl.DateTimeFormat;
import {CdkScrollable} from '@angular/cdk/overlay';
import {MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {ScrollingService} from '../../services/scrolling.service';
import {ExtendedScrollToOptions} from '@angular/cdk/scrolling/scrollable';
import {Router} from '@angular/router';
import {SearchType} from '../../classes/search/searchType';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  @ViewChild('sidenavContent') sidenavContent: ElementRef<HTMLInputElement>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService, private scrollingService: ScrollingService, private router: Router) {}

  ngOnInit(): void {
    this.scrollingService.initById('productsList', 1500, 'mat-sidenav-content');
    this.scrollingService.initById('usersList', 200, 'mat-sidenav-content');
    this.scrollingService.initById('feedList', 1500, 'mat-sidenav-content');
    this.userService.setUser({
      id: '2',
      userId: null,
      fullName: 'Mor Soferian',
      firstName: 'Mor',
      lastName: 'Soferian',
      email: 'morsof48@gmail.com',
      phoneNumber: '0548128675',
      image: 'https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.0-9/52974078_10219567634645312_4529992776930033664_n.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=Tq_PTBCa7RwAX_uL3mr&_nc_ht=scontent.ftlv6-1.fna&oh=135300268ba769fecf475fbaad583b61&oe=603D3A7D',
      mutualFollowingUsers: null,
      type: null,
      updatedReaction: true,
      status: null,
      createdAt: new DateTimeFormat(),
      updatedAt: new DateTimeFormat()
    });
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

@HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (this.router.url.endsWith(SearchType.PRODUCTS)) {
      this.scrollingService.update('productsList', event);
    } else if (this.router.url.endsWith(SearchType.PEOPLE)){
      this.scrollingService.update('usersList', event);
    } else if (this.router.url.endsWith('home')){
      this.scrollingService.update('feedList', event);
    }
}

}
