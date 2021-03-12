import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import DateTimeFormat = Intl.DateTimeFormat;
import {ScrollingService} from '../../services/scrolling.service';
import {Router} from '@angular/router';
import {SearchType} from '../../classes/search/searchType';
import {WoogieFrontRoutes} from '../../constants/woogie-front-routes';

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

  onClickLogo() {
    this.router.navigateByUrl('/'  + WoogieFrontRoutes.home);
  }
}
