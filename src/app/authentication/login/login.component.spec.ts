import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SchemaMetadata } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginService } from './login.service';
import { ToastrModule } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";

const baseUrl: string = config.url;

import 'rxjs/add/operator/map';
/**
 * @author Suchheta
 * @description unit test cases for LoginComponent
 */
describe('LoginComponent', () => {
    let NO_ERRORS_SCHEMA: SchemaMetadata;
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let submitLoginEl: DebugElement;
    let loginUsernameEl: DebugElement;
    let loginPasswordEl: DebugElement;
    let resetLoginEl: DebugElement;
    let resetUsernameEl: DebugElement;
    let resetPasswordEl: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                BrowserModule,
                FormsModule,
                RouterModule,
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientModule,
                // ToastrModule.forRoot()
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [{ provide: ToastrService, useValue: ToastrService },
            { provide: LoginService, useClass: LoginService },

            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoginComponent);
            component = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('form'));
            el = de.nativeElement;
            submitLoginEl = fixture.debugElement.query(By.css('form[id=loginform]'));
            loginUsernameEl = fixture.debugElement.query(By.css('input[id=loginUsername]'));
            loginPasswordEl = fixture.debugElement.query(By.css('input[id=loginPassword]'));
            resetLoginEl = fixture.debugElement.query(By.css('form[id = resetLogin]'));
            resetUsernameEl = fixture.debugElement.query(By.css('input[id=resetUsername]'));
            resetPasswordEl = fixture.debugElement.query(By.css('input[id=resetPassword]'));
        })
    }))
    it('Defining LoginComponent component', () => {
        expect(component).toBeDefined();
    })
    it('Login form should be invalid when empty', () => {
        expect(component.addLoginData.valid).toBeFalsy();
    })
    it('Reset Form should be invalid when empty', () => {
        expect(component.resetLoginData.valid).toBeFalsy();
    })
    it('should be submitted when values are entered', async(() => {
        component.addLoginData.controls['username'].setValue('pallavi');
        component.addLoginData.controls['password'].setValue(1234);
        expect(component.addLoginData.valid).toBeTruthy();
    }))
    it('should be submitted when valid values are entered', async(() => {
        component.resetLoginData.controls['username'].setValue('pallavi');
        component.resetLoginData.controls['newPassword'].setValue(12345);
        component.resetLoginData.controls['confirmPassword'].setValue(12345);
        expect(component.resetLoginData.valid).toBeTruthy();
    }))
    it('should be submitted when invalid values are entered', async(() => {
        component.resetLoginData.controls['username'].setValue('cateina');
        component.resetLoginData.controls['newPassword'].setValue(12345);
        component.resetLoginData.controls['confirmPassword'].setValue(12);
        expect(component.resetLoginData.valid).toBeFalsy();
    }))
    it("offers two-way binding on the name", () => {
        component.username = "Jane";
        fixture.detectChanges();
        expect(component.username).toBe("Jane");
    });
    let value = {
        username: "sanchita",
        password: "12345",
    }
    it('should run a test that finishes eventually in Angular', async(() => {
        component.loginService.loginStub(value).subscribe(
            (successResult) => {
                console.log("done");
             expect(successResult.message).toBe("Login Successful.");
                // console.log("successResult", successResult.message);
                // if(successResult === "Login Successful."){
                //     expect(successResult.message).toContain("Login Successful.")
                //     console.log("proper");
                // }
                // else if (successResult === "Username or password is incorrect"){
                //     expect(successResult.message).toContain("Username or password is incorrect")
                //     console.log("not proper");
                // }
          
            })
    }));
});