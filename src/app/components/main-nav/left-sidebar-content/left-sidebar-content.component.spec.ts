import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarContentComponent } from './left-sidebar-content.component';

describe('SidebarContentComponent', () => {
  let component: LeftSidebarContentComponent;
  let fixture: ComponentFixture<LeftSidebarContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSidebarContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
