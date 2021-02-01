import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../classes/product/product';
import {productsRoutesList} from '../constants/woogie-back-routes/products-routes-list';
import {Reaction} from '../classes/reaction/reaction';
import {reactionsRoutesList} from '../constants/woogie-back-routes/reactions-routes-list';
import {usersRoutesList} from '../constants/woogie-back-routes/users-routes-list';
import {User} from '../classes/user/user';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private http: HttpClient) { }

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

}
