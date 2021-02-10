import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSidebarContentComponent } from './right-sidebar-content.component';

describe('RightSidebarContentComponent', () => {
  let component: RightSidebarContentComponent;
  let fixture: ComponentFixture<RightSidebarContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightSidebarContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSidebarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
