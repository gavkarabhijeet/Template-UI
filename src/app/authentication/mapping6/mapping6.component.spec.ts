import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapping6Component } from './mapping6.component';

describe('Mapping6Component', () => {
  let component: Mapping6Component;
  let fixture: ComponentFixture<Mapping6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mapping6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mapping6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
