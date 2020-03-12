import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapping5Component } from './mapping5.component';

describe('Mapping5Component', () => {
  let component: Mapping5Component;
  let fixture: ComponentFixture<Mapping5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mapping5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mapping5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
