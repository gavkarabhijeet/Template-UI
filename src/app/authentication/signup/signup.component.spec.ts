import { SignupComponent } from './signup.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SignupService } from './signup.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { SignupStubService } from './signup.service.stub';  
import { Router } from '@angular/router';


/**
 * @author Sanchita
 * @description unit test cases for SignupComponent
 */
describe('SignupComponent', () => {
        let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    let de: DebugElement;
    let username: DebugElement;
    let firstName: DebugElement;
    let lastName: DebugElement;
    let mobileNumber: DebugElement;
    let email: DebugElement;
    let password: DebugElement;
    let confirmPassword: DebugElement;
    let router: Router;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [SignupComponent],
            imports: [HttpClientModule, RouterTestingModule, RouterTestingModule.withRoutes([
            ]),FormsModule, ReactiveFormsModule, BrowserModule , ToastrModule.forRoot()],
            providers: [
                // { provide: ToastrService, useClass: ToastrService },
            // { provide: SignupStubService, useValue: SignupStubService }
            { provide: SignupService, useClass: SignupService },
            { provide: ToastrService, useClass: ToastrService },
        ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SignupComponent);
            component = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('form'));
            router = TestBed.get(Router)
            username = fixture.debugElement.query(By.css('input[id=username]'));
            firstName = fixture.debugElement.query(By.css('input[id=firstName]'));
            lastName = fixture.debugElement.query(By.css('input[id=lastName]'));
            mobileNumber = fixture.debugElement.query(By.css('input[id=mobileNumber]'));
            email = fixture.debugElement.query(By.css('input[id=email]'));
            password = fixture.debugElement.query(By.css('input[id=password]'));
            confirmPassword = fixture.debugElement.query(By.css('input[id=confirmPassword]'));
        });
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('Defining SignupComponent component', () => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeDefined();
    })
    it('should create component', () => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
    it('SignUp form is inValid when empty', () => {
        expect(component.addRegisterData.invalid).toBeTruthy();
    });
    it('should be submitted when values are entered', () => {
        component.addRegisterData.controls['username'].setValue("pallavi");
        component.addRegisterData.controls['firstName'].setValue("pallavi");
        component.addRegisterData.controls['lastName'].setValue("rane");
        component.addRegisterData.controls['mobileNumber'].setValue("9866556532");
        component.addRegisterData.controls['email'].setValue("abc@gmail.com");
        component.addRegisterData.controls['password'].setValue("1234");
        component.addRegisterData.controls['confirmPassword'].setValue("1234");
        expect(component.addRegisterData.valid).toBeTruthy();
    })
    it('email should be of proper pattern', () => {
        component.addRegisterData.controls['email'].setValue("abc@gmail.com");
        expect(component.addRegisterData.controls["email"].valid).toBeTruthy();
    })
    it('password and confirm password should match', () => {
        component.addRegisterData.controls['password'].setValue("1234");
        component.addRegisterData.controls['confirmPassword'].setValue("1234");
        expect(component.addRegisterData.controls["confirmPassword"].valid).toBeTruthy();
    })
    it('should call RegisterData', () => {
        component.addRegisterData.controls['username'].setValue("pallavi");
        component.addRegisterData.controls['firstName'].setValue("pallavi");
        component.addRegisterData.controls['lastName'].setValue("rane");
        component.addRegisterData.controls['mobileNumber'].setValue("9866556532");
        component.addRegisterData.controls['email'].setValue("abc@gmail.com");
        component.addRegisterData.controls['password'].setValue("1234");
        component.addRegisterData.controls['confirmPassword'].setValue("1234");
        let value = {
            'username':"xxxx",
            'firstName': "xxxx",
            'lastName': "xxxx",
            'mobileNumber': mobileNumber,
            'email': email,
            'password': "xxxx",
            'confirmPassword': confirmPassword
        }
        spyOn(component, 'RegisterData');
        // component.RegisterData(value);
        component.RegisterData( component.addRegisterData);
        expect(component.RegisterData).toHaveBeenCalled();
    });
    it('should call function', () => {
        component.addRegisterData.controls['username'].setValue("xxxx");
        component.addRegisterData.controls['firstName'].setValue("xxxx");
        component.addRegisterData.controls['lastName'].setValue("xxxxx");
        component.addRegisterData.controls['mobileNumber'].setValue("56456545");
        component.addRegisterData.controls['email'].setValue("xxx@gmail.com");
        component.addRegisterData.controls['password'].setValue("xxx");
        component.addRegisterData.controls['confirmPassword'].setValue("xxx");


        let value = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
  
        spyOn(component.signupservice, 'register').and.callThrough();
        component.RegisterData( value);
        expect(component.signupservice.register).toHaveBeenCalledWith( value);
    });
    // it('should navigate', () => {
    //     let component = fixture.componentInstance;
    //     let navigateSpy = spyOn(router, 'navigate');
    //     component.goSomewhere();
    //     expect(navigateSpy).toHaveBeenCalledWith(['/authentication/login']);
    // });
})