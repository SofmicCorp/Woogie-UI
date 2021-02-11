import { Injectable } from '@angular/core';
import {Product} from '../classes/product/product';
import {BehaviorSubject} from 'rxjs';
import {HttpService} from './http.service';
import {User} from '../classes/user/user';
import {Filters} from '../classes/search/filters';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  products = new BehaviorSubject<Product[]>(null);
  users = new BehaviorSubject<User[]>(null);
  filtersUpdatedBehaviorSubject = new BehaviorSubject<Filters>(null);

  constructor(private httpService: HttpService) { }

  searchProducts(params: any){
    this.httpService.searchProducts(params).subscribe(
      products => {
        this.products.next(products);
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

  filtersUpdated(filters: Filters){
    this.filtersUpdatedBehaviorSubject.next(filters);
  }

}
