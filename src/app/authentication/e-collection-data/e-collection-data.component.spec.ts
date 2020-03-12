import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ECollectionDataComponent } from './e-collection-data.component';

describe('ECollectionDataComponent', () => {
  let component: ECollectionDataComponent;
  let fixture: ComponentFixture<ECollectionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ECollectionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ECollectionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
