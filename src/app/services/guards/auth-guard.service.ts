import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {WoogieFrontRoutes} from '../../constants/woogie-front-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try {
      console.log('here1')
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn != null) {
        return true;
      }
      this.router.navigate(['/' + WoogieFrontRoutes.login]);
      return false;
    } catch (e) {
      console.log('here2')
      this.router.navigate(['/' + WoogieFrontRoutes.login]);
    }
  }
}
