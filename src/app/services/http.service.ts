import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../classes/product/product';
import {productsRoutesList} from '../constants/products-routes-list';
import {Reaction} from '../classes/reaction/reaction';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private http: HttpClient) { }

  searchProducts(params: any){
    return this.http.get<Product[]>(environment.woogieBackUrl + productsRoutesList.searchProducts, {params});
  }

  createReaction(product: Product, reaction: Reaction){
    return this.http.post<any>(environment.woogieBackUrl + productsRoutesList.createReaction, {product, reaction});
  }

  inactiveReaction(body: {retailId: string, retailName: string, userId: string}){
    return this.http.put<any>(environment.woogieBackUrl + productsRoutesList.inactiveReaction, body);
  }

}
