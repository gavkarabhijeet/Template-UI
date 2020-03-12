import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapping7Component } from './mapping7.component';

describe('Mapping7Component', () => {
  let component: Mapping7Component;
  let fixture: ComponentFixture<Mapping7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mapping7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mapping7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
