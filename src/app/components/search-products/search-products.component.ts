import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  myForm: FormGroup;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.packFormGroup();
  }

  packFormGroup(){
    this.myForm = new FormGroup({
      q: new FormControl(null, Validators.required)
    });
  }

  onSearchClick(){
    if (this.myForm.valid){
      this.httpService.searchProducts(this.myForm.value).subscribe(
        products => {
          console.log(products);
        }
      );
    }
  }

}
