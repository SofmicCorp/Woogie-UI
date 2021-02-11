import { Component, OnInit } from '@angular/core';
import {SortEnum} from '../../../classes/search/sort-enum';
import {ConditionEnum} from '../../../classes/search/condition-enum';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchService} from '../../../services/search.service';

@Component({
  selector: 'app-right-sidebar-content',
  templateUrl: './right-sidebar-content.component.html',
  styleUrls: ['./right-sidebar-content.component.css'],
})
export class RightSidebarContentComponent implements OnInit {

  selectedValue: string;
  myForm: FormGroup;
  sortOptions: Array<{}>;
  conditionOptions: Array<{}>;
  minPrice: '';
  maxPrice: '';

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {

    this.sortOptions = [
      {value: SortEnum.LOWEST_PRICE, viewValue: 'Lowest Price + Shipping'},
      {value: SortEnum.HIGHEST_PRICE, viewValue: 'Highest Price + Shipping'},
      {value: SortEnum.NEWLY_LISTED, viewValue: 'Newly Listed'}
    ];

    this.conditionOptions = [
      {value: ConditionEnum.UNSPECIFIED, viewValue: 'Any'},
      {value: ConditionEnum.NEW, viewValue: 'New'},
      {value: ConditionEnum.USED, viewValue: 'Used'}
    ];

    this.packFormGroup();
    this.subscriptions();
  }

  subscriptions(){
    this.myForm.valueChanges.subscribe(filters => {
      this.searchService.filtersUpdated(filters);
    });
  }

  packFormGroup(){
    this.myForm = new FormGroup({
      sort: new FormControl(null),
      conditions: new FormControl(null),
      freeShipping: new FormControl(null),
      price: new FormControl(null),
    });
  }

  priceFormatting() {
    let priceFilter: string = null;
    if (this.minPrice != null && this.maxPrice != null) {
      priceFilter = '[' + this.minPrice + '..' + this.maxPrice + ']';
    } else if (this.minPrice != null && this.maxPrice == null) {
      priceFilter = '[' + this.minPrice + ']';
    } else if (this.minPrice == null && this.maxPrice != null) {
      priceFilter = '[' + '..' + this.maxPrice + ']';
    }else{
      return;
    }
    this.myForm.patchValue({price: priceFilter + ',priceCurrency:USD'});
    return priceFilter;
  }

  onMinPriceChanged($event: any) {
    if ($event != null && $event.target != null){
      this.minPrice = $event.target.value;
      this.priceFormatting();
    }
  }

  onMaxPriceChanged($event: any) {
    if ($event != null && $event.target != null){
      this.maxPrice = $event.target.value;
      this.priceFormatting();
    }
  }

}
