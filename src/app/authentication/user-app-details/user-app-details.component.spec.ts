import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppDetailsComponent } from './user-app-details.component';

describe('UserAppDetailsComponent', () => {
  let component: UserAppDetailsComponent;
  let fixture: ComponentFixture<UserAppDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAppDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
