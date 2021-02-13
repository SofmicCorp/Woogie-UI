import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../classes/product/product';
import {productsRoutesList} from '../constants/woogie-back-routes/products-routes-list';
import {Reaction} from '../classes/reaction/reaction';
import {reactionsRoutesList} from '../constants/woogie-back-routes/reactions-routes-list';
import {usersRoutesList} from '../constants/woogie-back-routes/users-routes-list';
import {User} from '../classes/user/user';
import {Action} from '../classes/feed/action';
import {Notification} from '../classes/notification/notification';
import {notificationsRoutesList} from '../constants/woogie-back-routes/notifications-routes-list';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private http: HttpClient) { }

  // Feed
  getFeed(urlParam: any, params){
    return this.http.get<Action[]>(environment.woogieBackUrl  + usersRoutesList.baseUsers + urlParam +  usersRoutesList.feed, {params});
  }

  // Products
  searchProducts(params: any){
    return this.http.get<Product[]>(environment.woogieBackUrl + productsRoutesList.searchProducts, {params});
  }

  createReaction(product: Product, reaction: Reaction){
    return this.http.post<any>(environment.woogieBackUrl + reactionsRoutesList.createReaction, {product, reaction});
  }

  // Reactions
  inactiveReaction(body: {retailId: string, retailName: string, userId: string}){
    return this.http.put<any>(environment.woogieBackUrl + reactionsRoutesList.inactiveReaction, body);
  }

  // Users
  searchUsers(params: any){
    return this.http.get<User[]>(environment.woogieBackUrl + usersRoutesList.searchUser, {params});
  }

  followUser(urlParam: string , body: {followId: string}){
    return this.http.post<User>(environment.woogieBackUrl + usersRoutesList.baseUsers + urlParam + usersRoutesList.followUser, body);
  }

  confirmUser(urlParam: string , body: {userId: string}){
    return this.http.put<User>(environment.woogieBackUrl + usersRoutesList.baseUsers + urlParam + usersRoutesList.confirmUser, body);
  }

  unfollowUser(urlParam: string , body: {userId: string}){
    return this.http.put<User>(environment.woogieBackUrl + usersRoutesList.baseUsers + urlParam + usersRoutesList.unfollowUser, body);
  }

  // Notifications
  getNotifications(params: any){
    return this.http.get<Notification[]>(environment.woogieBackUrl + notificationsRoutesList.baseNotifications, {params});
  }

}
