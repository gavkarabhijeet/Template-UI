import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoLiveTabComponent } from './go-live-tab.component';

describe('GoLiveTabComponent', () => {
  let component: GoLiveTabComponent;
  let fixture: ComponentFixture<GoLiveTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoLiveTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoLiveTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
