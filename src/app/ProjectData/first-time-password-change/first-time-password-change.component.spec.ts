import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimePasswordChangeComponent } from './first-time-password-change.component';

describe('FirstTimePasswordChangeComponent', () => {
  let component: FirstTimePasswordChangeComponent;
  let fixture: ComponentFixture<FirstTimePasswordChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimePasswordChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimePasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
