import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapping3Component } from './mapping3.component';

describe('Mapping3Component', () => {
  let component: Mapping3Component;
  let fixture: ComponentFixture<Mapping3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mapping3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mapping3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
