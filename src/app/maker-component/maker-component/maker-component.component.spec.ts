import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerComponentComponent } from './maker-component.component';

describe('MakerComponentComponent', () => {
  let component: MakerComponentComponent;
  let fixture: ComponentFixture<MakerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
