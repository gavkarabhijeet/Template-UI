import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsurePayMappingComponent } from './isure-pay-mapping.component';

describe('IsurePayMappingComponent', () => {
  let component: IsurePayMappingComponent;
  let fixture: ComponentFixture<IsurePayMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsurePayMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsurePayMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
