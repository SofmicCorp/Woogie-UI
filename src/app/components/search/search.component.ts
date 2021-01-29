import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {Product} from '../../classes/product/product';

enum SearchType {
  PRODUCTS = 'products',
  PEOPLE = 'people',
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  myForm: FormGroup;
  searchType: SearchType;
  products: Product[];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.packFormGroup();
    this.searchType = SearchType.PRODUCTS;
  }

  packFormGroup(){
    this.myForm = new FormGroup({
      q: new FormControl(null, Validators.required)
    });
  }

  onSearchClick(){
    if (this.myForm.valid){
      if (this.searchType === SearchType.PRODUCTS) {
        this.httpService.searchProducts(this.myForm.value).subscribe(
          products => {
            this.products = products;
            console.log(this.products);
          }
        );
      }else{
        // Add the search people endpoint
      }
    }
  }

}
