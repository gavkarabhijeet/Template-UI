import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsurepayMapping2Component } from './isurepay-mapping2.component';

describe('IsurepayMapping2Component', () => {
  let component: IsurepayMapping2Component;
  let fixture: ComponentFixture<IsurepayMapping2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsurepayMapping2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsurepayMapping2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
