import { Injectable } from '@angular/core';
import {Product} from '../classes/product/product';
import {BehaviorSubject, pipe} from 'rxjs';
import {HttpService} from './http.service';
import {User} from '../classes/user/user';
import {Filters} from '../classes/search/filters';
import {ScrollingService} from './scrolling.service';
import {Search} from '../classes/search/search';
import {General} from '../constants/general';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  products = new BehaviorSubject<{products: Product[], shouldInitList: boolean}>(null);
  users = new BehaviorSubject<{users: User[], shouldInitList: boolean}>(null);
  filtersUpdatedBehaviorSubject = new BehaviorSubject<Filters>(null);
  lastSearchProducts: Search;
  lastSearchUsers: Search;

  constructor(private httpService: HttpService, private scrollingService: ScrollingService) {}

  searchProducts(params: Search){
    this.httpService.searchProducts(params).subscribe(
      products => {
        this.products.next({products, shouldInitList: params.page === 0});
      }
    );

    if (params.page === 0){
      this.scrollingService.scrollUp('productsList');
      this.lastSearchProducts = params;
      this.scrollingService.scrollingMap.get('productsList').fetchNext.subscribe(fetchNext => {
        if (fetchNext){
          this.lastSearchProducts.page++;
          this.searchProducts(this.lastSearchProducts);
        }
      });
    }
  }

  searchUsers(params: Search){
    this.scrollingService.scrollUp('usersList');
    this.httpService.searchUsers(params).subscribe(
      users => {
        this.users.next({users, shouldInitList: params.offset === 0});
      }
    );
    if (params.offset === 0){
      this.lastSearchUsers = params;
      this.scrollingService.scrollingMap.get('usersList').fetchNext.subscribe(fetchNext => {
        if (fetchNext){
          console.log('here')
          this.lastSearchUsers.offset += General.usersLimit;
          this.searchUsers(this.lastSearchUsers);
        }
      });
    }
  }

  filtersUpdated(filters: Filters){
    this.filtersUpdatedBehaviorSubject.next(filters);
  }

}
