import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../classes/product/product';
import {productsRoutesList} from '../constants/products-routes-list';

@Injectable({providedIn: 'root'})
export class HttpService {

  constructor(private http: HttpClient) { }

  searchProducts(params: any){
    return this.http.get<Product[]>(environment.woogieBackUrl + productsRoutesList.searchProducts, {params});
  }

}
