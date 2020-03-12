import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSequenceComponent } from './master-sequence.component';

describe('MasterSequenceComponent', () => {
  let component: MasterSequenceComponent;
  let fixture: ComponentFixture<MasterSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
