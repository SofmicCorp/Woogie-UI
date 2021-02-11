import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../classes/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  userBehaviorSubject = new BehaviorSubject<User>(null);

  constructor() { }

  updateUser(user: User){
    this.userBehaviorSubject.next(user);
  }

  setUser(user: User){
    this.user = user;
    this.updateUser(this.user);
  }

  getUser(){
    return Object.assign({}, this.user);
  }

}
