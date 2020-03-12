import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerDetailsPageComponent } from './maker-details-page.component';

describe('MakerDetailsPageComponent', () => {
  let component: MakerDetailsPageComponent;
  let fixture: ComponentFixture<MakerDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
