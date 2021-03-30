import { Injectable } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {BehaviorSubject} from 'rxjs';
import {User} from '../classes/user/user';
import {HttpService} from './http.service';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {WoogieFrontRoutes} from '../constants/woogie-front-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  idToken: string;
  isLoggedIn: boolean;
  isLoggedInBehaviorSubject = new BehaviorSubject<boolean>(null);

  constructor(private authService: SocialAuthService, private httpService: HttpService, userService: UserService, private router: Router) {
    this.authService.authState.subscribe((user) => {
      if (user != null){
        this.isLoggedIn = true;
        this.isLoggedInBehaviorSubject.next(this.isLoggedIn);
        this.idToken = user.idToken;
        localStorage.setItem('isLoggedIn', 'true');

        const body = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.photoUrl
        };
        this.httpService.sign(body).subscribe(woogieUser => {
          if (woogieUser != null){
            userService.setUser(woogieUser);
          }
        });
      } else {
        localStorage.removeItem('isLoggedIn');
        userService.setUser(null);
        this.isLoggedIn = false;
        this.isLoggedInBehaviorSubject.next(this.isLoggedIn);
      }
    });
  }

  signInWithGoogle() {
    try {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser => {
        if (socialUser != null) {
          this.router.navigate(['/'  + WoogieFrontRoutes.home]);
        }else{
          this.router.navigate(['/'  + WoogieFrontRoutes.login]);
        }
      });
    } catch (e) {
      this.router.navigate(['/' + WoogieFrontRoutes.login]);
    }
  }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut().then(res => {
      this.isLoggedIn = false;
      this.isLoggedInBehaviorSubject.next(this.isLoggedIn);
      localStorage.removeItem('isLoggedIn');
      this.router.navigate(['/'  + WoogieFrontRoutes.login]);
    });
  }}
