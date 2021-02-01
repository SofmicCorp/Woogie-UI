import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../../services/http.service';
import {Product} from '../../../../classes/product/product';
import {SearchService} from '../../../../services/search.service';
import {Router} from '@angular/router';
import {WoogieFrontRoutes} from '../../../../constants/woogie-front-routes';

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
  @ViewChild('toggleProducts') ref: ElementRef;

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.packFormGroup();
    this.searchType = SearchType.PRODUCTS;
  }

  packFormGroup(){
    this.myForm = new FormGroup({
      q: new FormControl(null, Validators.required)
    });
  }

  onToggleChange(value: string){
    this.searchType = SearchType[value.toUpperCase()];
  }

  onSearchClick(){
    if (this.myForm.valid){
      if (this.searchType === SearchType.PRODUCTS) {
        this.router.navigateByUrl('/'  + WoogieFrontRoutes.home + '/' +  WoogieFrontRoutes.products);
        this.searchService.searchProducts(this.myForm.value);
      }else{
        this.router.navigateByUrl('/' + WoogieFrontRoutes.home + '/' + WoogieFrontRoutes.people);
        this.searchService.searchUsers(this.myForm.value);
      }
    }
  }

}
