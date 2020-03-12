import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder,FormArray, ValidationErrors, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SignupService } from './signup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignupComponent {
  // formGroup of login
  addRegisterData: FormGroup;
  // variables to check login
  username: any;
  firstName: any;
  lastName: any;
  mobileNumber: any;
  email: any;
  password: any;
  confirmPassword: any;
  dataObj:any;
  displayVan:Boolean =false;
  displayEmail:Boolean;
  radioValueArray=['Yes','No'];
  registerData;
  public navbarOpen:boolean;
  //encrypted data
  encryptedUsername;
  encryptedFirstName
  encryptedLastName
  encryptedMobileNumber
  encryptedEmail
  encryptedPassword
  encryptedConfirmpassword
  isCollapsed:boolean;
  //decrypted data
  decryptedUsername;
  decryptedFirstName
  decryptedLastName
  decryptedMobileNumber
  decryptedEmail
  decryptedPassword
  decryptedConfirmpassword
  displayEmailBusinessSPOC:Boolean;
  displayEmailITSPOC:Boolean;
  displayAddition:Boolean=true;
 myPassword =  "prominentProj234"


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
     public toastr: ToastrService, public signupservice: SignupService, ) {
      this.addRegisterData=this.fb.group({
        'username': ['', [Validators.required]],
        'firstName': ['', [Validators.required]],
        'lastName': ['', [Validators.required]],
        'companyName':['',[Validators.required]],
        'email': ['', [Validators.required, Validators.pattern("^[a-z]+[a-z0-9._-]+@[a-z]+\.[a-z.]{2,5}$")]],
        'contactNumber': ['', [Validators.required, Validators.pattern('^[1-9]{1}[0-9]{9}$')]],
        'password': ['', [Validators.required]],
        'bankAccountNumber':[''],
        'poolAccountNumber':[''],
        'organisationName':[''],
        'vanNo':[''],
        'IFSCCode':[''],
       
        'creditAccountNumber':[''],
        'businessSpocName':[''],
        'businessSpocEmails':this.fb.array([
          this.addbusinessEmail()
        ]),
        'businessSpocMobileNumber':[''],
        'ITSpocName':[''],
        'ITSpocEmails':this.fb.array([
          this.additEmail()
        ]),
        'ITSpocMobileNumber':[''],
        'webService':[''],
        'uatPublicIP':[''],
        'uatPortNo':[''],
        'livePublicIP':[''],
        'livePortNo':['']
      })
      // this.addRegisterData = this.fb.group({
    //   'username': ['', [Validators.required]],
    //   'firstName': ['', [Validators.required]],
    //   'lastName': ['', [Validators.required]],
    //   'mobileNumber': ['', [Validators.required, Validators.pattern('^[1-9]{1}[0-9]{9}$')]],
    //   'email': ['', [Validators.required, Validators.pattern("^[a-z]+[a-z0-9._-]+@[a-z]+\.[a-z.]{2,5}$")]],
    //   'password': ['', [Validators.required]],
    //   'confirmPassword': ['', [Validators.required, confirmPasswordValidator]],
    //   'organisationName':[],
    //   'accountNumber':[],
    //   'uatUrl':[],
    //   'uatPortNo':[]
    // })
  }

/**
 * @author Sanchita 
 * @description This formGroup function will be used to add multiple emails for business SPOC
 */
  addbusinessEmail(): FormGroup {
    return this.fb.group({
      'businessSpocEmail':['']
    });
  }
  toggleSidebarType(){
    
  }
/**
 * @author Sanchita 
 * @description This formGroup function will be used to add multiple emails for it SPOC
 */
  additEmail(): FormGroup {
    return this.fb.group({
      'ITSpocEmail':['']
    });
  }
  /**
   * @author Sanchita
   * @description This function will be used to add a new email field for business SPOC
   */
  addbusinessSpocEmail(): void {
    this.displayAddition=false;
    (<FormArray>this.addRegisterData.get('businessSpocEmails')).push(this.addbusinessEmail());
  }
   /**
   * @author Sanchita
   * @description This function will be used to add a new email field for it SPOC
   */
  additSpocEmail(): void {
    (<FormArray>this.addRegisterData.get('ITSpocEmails')).push(this.additEmail());
  }
   /**
   * @author Sanchita
   * @description This function will be used to remove a  email field for business SPOC
   */
  removebusinessSpocEmail(ifConditionGroupIndex: number): void {
    (<FormArray>this.addRegisterData.get('businessSpocEmails')).removeAt(ifConditionGroupIndex);
  }
   /**
   * @author Sanchita
   * @description This function will be used to remove a email field for it SPOC
   */
  removeitSpocEmail(ifConditionGroupIndex: number): void {
    (<FormArray>this.addRegisterData.get('ITSpocEmails')).removeAt(ifConditionGroupIndex);
  }
  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'vertical', // fixed value. shouldn't be changed.
    sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: 'fixed', // two possible values: fixed, absolute
    headerpos: 'fixed', // two possible values: fixed, absolute
    boxed: 'full', // two possible values: full, boxed
    navbarbg: 'skin1', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
    logobg: 'skin6' // six possible values: skin(1/2/3/4/5/6)
  };
    ngOnInit() {
    //for disabling back button
    window.history.pushState(null, "", window.location.href);}

  RegisterData(value){
    this.registerData=JSON.stringify(value);
   console.log("this.registerData",this.registerData);
  //  this.signupservice.register(value).then((data) => {
  //   console.log("data",data);
  // });
  }

  /**
   * @author Sanchita
   * @param value 
   * @description This function will be called on the click of radio button to check the display of further details
   */
  radioValue(value){
    var discission=value.target.value;
    if(discission === 'Yes'){
      this.displayVan=true;
    }
    else{
      this.displayVan=false;
    }
  }
//   /**
//      * @author Sanchita
//      * @param value {username,firstName,lastName,mobileNumber,email,password,confirmPassword}
//      * @description  Register a new User
//      */
//   RegisterData(value) {


//     this.username = value.username;
//     this.firstName = value.firstName;
//     this.lastName = value.lastName;
//     this.mobileNumber = value.mobileNumber;
//     this.email = value.email;
//     this.password = value.password;
//     this.confirmPassword = value.confirmPassword;


// this.encryptedUsername = CryptoJS.AES.encrypt(this.username, this.myPassword);
// this.encryptedFirstName = CryptoJS.AES.encrypt(this.firstName, this.myPassword);
// this.encryptedLastName = CryptoJS.AES.encrypt(this.lastName, this.myPassword);
// this.encryptedMobileNumber = CryptoJS.AES.encrypt(this.mobileNumber, this.myPassword);
// this.encryptedEmail = CryptoJS.AES.encrypt(this.email, this.myPassword);
// this.encryptedPassword = CryptoJS.AES.encrypt(this.password, this.myPassword);
// this.encryptedConfirmpassword = CryptoJS.AES.encrypt(this.confirmPassword, this.myPassword);

// console.log ("this.encryptedUsername ",this.encryptedUsername )
// console.log (" this.encryptedFirstName",this.encryptedFirstName)
// console.log (" this.encryptedLastName",this.encryptedLastName)
// console.log ("this.encryptedMobileNumber ",this.encryptedMobileNumber)
// console.log ("this.encryptedEmail ",this.encryptedEmail)
// console.log ("this.encryptedPassword ",this.encryptedPassword)
// console.log ("this.encryptedConfirmpassword ",this.encryptedConfirmpassword)

// //decrypted data
// this.decryptedUsername = CryptoJS.AES.decrypt(this.encryptedUsername, this.myPassword).toString(CryptoJS.enc.Utf8);;
// this.decryptedFirstName= CryptoJS.AES.decrypt(this.encryptedFirstName, this.myPassword).toString(CryptoJS.enc.Utf8);;
// this.decryptedLastName= CryptoJS.AES.decrypt(this.encryptedLastName, this.myPassword).toString(CryptoJS.enc.Utf8);;
// this.decryptedMobileNumber= CryptoJS.AES.decrypt(this.encryptedMobileNumber, this.myPassword).toString(CryptoJS.enc.Utf8);;
// this.decryptedEmail= CryptoJS.AES.decrypt(this.encryptedEmail, this.myPassword).toString(CryptoJS.enc.Utf8);;
// this.decryptedPassword= CryptoJS.AES.decrypt(this.encryptedPassword, this.myPassword).toString(CryptoJS.enc.Utf8);;
// this.decryptedConfirmpassword= CryptoJS.AES.decrypt(this.encryptedConfirmpassword, this.myPassword).toString(CryptoJS.enc.Utf8);;

// console.log("this.decryptedUsername = " ,this.decryptedUsername )

// console.log("this.decryptedFirstName = " ,this.decryptedFirstName )
// console.log("this.decryptedLastName = " ,this.decryptedLastName )
// console.log("this.decryptedMobileNumber = " ,this.decryptedMobileNumber )
// console.log("this.decryptedEmail = " ,this.decryptedEmail)

// console.log("this.decryptedPassword = " ,this.decryptedPassword )
// console.log("this.decryptedConfirmpassword = " ,this.decryptedConfirmpassword )

//     this.dataObj = {
//       'username': this.username,
//       'firstName': this.firstName,
//       'lastName': this.lastName,
//       'mobileNumber': this.mobileNumber,
//       'email': this.email,
//       'password': this.password,
//       'confirmPassword': this.confirmPassword
//     }
//     console.log("this.dataObj",this.dataObj);
//     this.signupservice.register(this.dataObj).then((data) => {
//       if (data.message == "data is already exist") {
//         this.toastr.error("Already Registered!");
//       }
//       else {
//         this.router.navigate(['/authentication/login']);
//       }
//     })
//     .catch(e => console.log("reject = ", e))
//   }
}
/**
   * @author Sanchita
   * @param value 
   * @description  custom validator to check if password and confirmPassword is same 
   */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }
  const password = control.parent.get('password');
  const confirmPassword = control.parent.get('confirmPassword');
  if (!password || !confirmPassword) {
    return null;
  }
  if (confirmPassword.value === '') {
    return null;
  }
  if (password.value === confirmPassword.value) {
    return null;
  }
  return { 'passwordsNotMatching': true };
};