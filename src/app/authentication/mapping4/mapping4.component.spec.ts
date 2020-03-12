import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapping4Component } from './mapping4.component';

describe('Mapping4Component', () => {
  let component: Mapping4Component;
  let fixture: ComponentFixture<Mapping4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mapping4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mapping4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
