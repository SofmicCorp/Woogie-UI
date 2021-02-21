import { Injectable } from '@angular/core';
import {Product} from '../classes/product/product';
import {BehaviorSubject, pipe} from 'rxjs';
import {HttpService} from './http.service';
import {User} from '../classes/user/user';
import {Filters} from '../classes/search/filters';
import {ScrollingService} from './scrolling.service';
import {Search} from '../classes/search/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  products = new BehaviorSubject<Product[]>(null);
  users = new BehaviorSubject<User[]>(null);
  filtersUpdatedBehaviorSubject = new BehaviorSubject<Filters>(null);
  lastSearchProducts: Search;
  lastSearchUsers: Search;

  constructor(private httpService: HttpService, private scrollingService: ScrollingService) {}

  searchProducts(params: Search){
    this.httpService.searchProducts(params).subscribe(
      products => {
        this.products.next(products);
      }
    );

    if (params.page === 0){
      this.lastSearchProducts = params;
      this.scrollingService.scrollingMap.get('productsList').fetchNext.subscribe(fetchNext => {
        if (fetchNext){
          this.lastSearchProducts.page++;
          this.searchProducts(this.lastSearchProducts);
        }
      });
    }
  }

  searchUsers(params: any){
    this.httpService.searchUsers(params).subscribe(
      users => {
        this.users.next(users);
      }
    );
    if (params.page === 0){
      this.lastSearchUsers = params;
      this.scrollingService.scrollingMap.get('usersList').fetchNext.subscribe(fetchNext => {
        if (fetchNext){
          this.lastSearchUsers.page++;
          this.searchProducts(this.lastSearchUsers);
        }
      });
    }
  }

  filtersUpdated(filters: Filters){
    this.filtersUpdatedBehaviorSubject.next(filters);
  }

}
