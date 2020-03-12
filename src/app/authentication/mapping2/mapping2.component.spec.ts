import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapping2Component } from './mapping2.component';

describe('Mapping2Component', () => {
  let component: Mapping2Component;
  let fixture: ComponentFixture<Mapping2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mapping2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mapping2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
