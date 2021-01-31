import { Injectable } from '@angular/core';
import {Product} from '../classes/product/product';
import {BehaviorSubject} from 'rxjs';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  products = new BehaviorSubject<Product[]>(null);

  constructor(private httpService: HttpService) { }

  searchProducts(params: any){
    this.httpService.searchProducts(params).subscribe(
      products => {
        this.products.next(products);
        console.log(this.products);
      }
    );
  }

}
