import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerPageComponent } from './checker-page.component';

describe('CheckerPageComponent', () => {
  let component: CheckerPageComponent;
  let fixture: ComponentFixture<CheckerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
