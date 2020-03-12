import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChangePasswordService } from './change-password.service'
/** 
 * @author Suchheta
 * @description Unit test case to verify ChangePassword Component  
*/
describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let submitLoginEl: DebugElement;
  let changePUsernameEl: DebugElement;
  let oldPassEl: DebugElement;
  let newPassEl: DebugElement;
  let confirmPassEl: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        
         ToastrModule.forRoot()
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],

      // { provide: ToastrService, useValue: ToastrService },
      // providers: [ ChangePasswordService ,
        providers: [  { provide: ChangePasswordService, useClass: ChangePasswordService },]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitLoginEl = fixture.debugElement.query(By.css('form[id=changePassForm]'));
    oldPassEl = fixture.debugElement.query(By.css('input[id=oldPass]'));
    newPassEl = fixture.debugElement.query(By.css('input[id = newPass]'));
    confirmPassEl = fixture.debugElement.query(By.css('input[id = confirmPass]'));
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Defining ChangePasswordComponent component', () => {
    expect(component).toBeDefined();
  })
  it(' form should be invalid when empty', () => {
    expect(component.addChangeData.valid).toBeFalsy();
  })
  it('should be submitted when valid values are entered', async(() => {
    component.addChangeData.controls['oldPassword'].setValue(12345);
    component.addChangeData.controls['newPassword'].setValue(12345);
    component.addChangeData.controls['confirmPassword'].setValue(12345);
    expect(component.addChangeData.valid).toBeTruthy();
  }))
  it('should be submitted when invalid values are entered', async(() => {
    component.addChangeData.controls['oldPassword'].setValue(12345);
    component.addChangeData.controls['newPassword'].setValue(12);
    component.addChangeData.controls['confirmPassword'].setValue(12345);
    expect(component.addChangeData.valid).toBeFalsy();
  }))
});
