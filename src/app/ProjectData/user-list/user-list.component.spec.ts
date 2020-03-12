import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserListComponent } from './user-list.component';
import { RouterModule, Routes } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports : [NgxSpinnerModule , RouterModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
