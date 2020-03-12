import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerPageComponent } from './maker-page.component';

describe('MakerPageComponent', () => {
  let component: MakerPageComponent;
  let fixture: ComponentFixture<MakerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
