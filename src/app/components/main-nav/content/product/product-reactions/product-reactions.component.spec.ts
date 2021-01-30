import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReactionsComponent } from './product-reactions.component';

describe('ProductStatsComponent', () => {
  let component: ProductReactionsComponent;
  let fixture: ComponentFixture<ProductReactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
