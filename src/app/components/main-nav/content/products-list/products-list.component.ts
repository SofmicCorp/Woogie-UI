import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Product} from '../../../../classes/product/product';
import {SearchService} from '../../../../services/search.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductsListComponent /*implements OnInit*/ {

  constructor(private searchService: SearchService) {
  }
  items = new MyDataSource(this.searchService);

  // products: Product[];
  // items: string[];
  //
  // constructor(private searchService: SearchService) { }
  //
  // ngOnInit(): void {
  //   this.products = [];
  //   this.items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
    // this.products.push({
    //   productName: 'weafbehwavhwavfhkvFJSHBZDVHJFSBZHJLABFJBARSLJBFALJFBALJHFBLAHJBFJLABFJLH',
    //   priceCurrency: '$',
    //   retailName: 'ebay',
    //   totalPrice: 100,
    //   additionalImages: [''],
    //   adultOnly: false,
    //   apiItem: '',
    //   image: '',
    //   itemHref: '',
    //   priceValue: 0,
    //   reactions: undefined,
    //   retailId: '',
    //   shippingCost: 0,
    //   shippingCostType: '',
    //   shippingCurrency: '',
    //   thumbnailImage: ''
    // });
  //   this.subscriptions();
  // }
  //
  // subscriptions(){
  //   this.searchService.products.subscribe(products => {
  //     if (products != null) {
  //       for (let i = 0; i < products.length; i++) {
  //         this.products.push(products[i]);
  //       }
  //     }
  //     // this.products = products;
  //     console.log(this.products)
  //   });
  // }

}

export class MyDataSource extends DataSource<Product | undefined> {
  private length = 100;
  private pageSize = 25;
  private cachedData = Array.from<Product>({length: this.length});
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<(Product | undefined)[]>(this.cachedData);
  private subscription = new Subscription();

  constructor(private searchService: SearchService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Product | undefined)[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      console.log('start', range.start)
      console.log('end', range.end)
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end - 1);
      console.log('startPage', startPage)
      console.log('endPage', endPage)
      for (let i = startPage; i <= endPage; i++) {
        this.fetchPage(i);
      }
    }));
    this.searchService.products.subscribe(products => {
      if (products != null) {
        console.log('in subscription')
        this.cachedData.splice(this.searchService.lastSearchParams.page * this.pageSize, this.pageSize,
          ...Array.from({length: this.pageSize})
            .map((_, i) => products[i]));
        this.dataStream.next(this.cachedData);
      }
    });
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number) {
    console.log('in fetchPage')

    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    // Use `setTimeout` to simulate fetching data from server.
    // setTimeout(() => {
    //   this.cachedData.splice(page * this.pageSize, this.pageSize,
    //     ...Array.from({length: this.pageSize})
    //       .map((_, i) => `Item #${page * this.pageSize + i}`));
    //   this.dataStream.next(this.cachedData);
    // }, Math.random() * 1000 + 200);

    this.searchService.lastSearchParams.page ++;
    this.searchService.searchProducts(this.searchService.lastSearchParams);
  }
}
