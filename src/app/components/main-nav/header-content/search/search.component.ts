import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../../../../services/search.service';
import {Router} from '@angular/router';
import {WoogieFrontRoutes} from '../../../../constants/woogie-front-routes';
import {UserService} from '../../../../services/user.service';
import {General} from '../../../../constants/general';
import {SearchType} from '../../../../classes/search/searchType';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  myForm: FormGroup;
  searchType: SearchType;
  @ViewChild('toggleProducts') ref: ElementRef;

  constructor(private searchService: SearchService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.packFormGroup();
    this.subscriptions();
    this.router.url.endsWith(SearchType.PEOPLE) ? this.searchType = SearchType.PEOPLE : this.searchType = SearchType.PRODUCTS;
  }

  packFormGroup(){
    this.myForm = new FormGroup({
      q: new FormControl(null, Validators.required),
      sort: new FormControl(null),
      userId: new FormControl(this.userService.getUser().id),
      page: new FormControl(0),
      limit: new FormControl(General.usersLimit),
      offset: new FormControl(0),
    });
  }

  subscriptions(){
    this.searchService.filtersUpdatedBehaviorSubject.subscribe(filters => {
      if (filters != null) {
        let filtersStr = '';
        Object.keys(filters).forEach(key => {
          if (key !== 'sort' && filters[key] != null) {
            filtersStr += key + ':' + filters[key] + ',';
          }
        });

        if (filtersStr.length > 0) {
          filtersStr = filtersStr.slice(0, -1);
        }
        this.myForm.contains('filter')
          ? this.myForm.patchValue({sort: filters.sort, filter: filtersStr === '' ? null : filtersStr})
          : this.myForm.addControl('filter', new FormControl(filtersStr === '' ? null : filtersStr));
      }
    });
  }

  onToggleChange(value: string){
    this.searchType = SearchType[value.toUpperCase()];
  }

  onSearchClick(){
    if (this.myForm.valid){
      if (this.searchType === SearchType.PRODUCTS) {
        this.router.navigate(['/'  + WoogieFrontRoutes.home + '/' +  WoogieFrontRoutes.products], {state: {fromSearch: true}});
        this.searchService.searchProducts(this.myForm.value);
      }else{
        this.router.navigate(['/' + WoogieFrontRoutes.home + '/' + WoogieFrontRoutes.people], {state: {fromSearch: true}});
        this.searchService.searchUsers(this.myForm.value);
      }
    }
  }

}
