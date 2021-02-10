import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-sidebar-content',
  templateUrl: './right-sidebar-content.component.html',
  styleUrls: ['./right-sidebar-content.component.css']
})
export class RightSidebarContentComponent implements OnInit {

  selectedValue: string;
  sortOptions = [
    {value: 'steak-0', viewValue: 'Lowest Price + Shipping'},
    {value: 'pizza-1', viewValue: 'Highest Price + Shipping'},
    {value: 'tacos-2', viewValue: 'Newly Listed'}
  ];

  conditionOptions = [
    {value: 'steak-0', viewValue: 'Any'},
    {value: 'pizza-1', viewValue: 'New'},
    {value: 'tacos-2', viewValue: 'Used'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
