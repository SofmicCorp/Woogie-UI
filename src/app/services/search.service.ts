import { Injectable } from '@angular/core';
import {Product} from '../classes/product/product';
import {BehaviorSubject} from 'rxjs';
import {HttpService} from './http.service';
import {User} from '../classes/user/user';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  products = new BehaviorSubject<Product[]>(null);
  users = new BehaviorSubject<User[]>(null);

  constructor(private httpService: HttpService) { }

  searchProducts(params: any){
    this.httpService.searchProducts(params).subscribe(
      products => {
        this.products.next(products);
        console.log(products);
      }
    );
  }

  searchUsers(params: any){
    this.httpService.searchUsers(params).subscribe(
      users => {
        this.users.next(users);
      }
    );
  }

}
