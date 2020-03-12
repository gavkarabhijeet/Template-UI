import { Component, OnInit , ChangeDetectionStrategy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordService } from './change-password.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers:[ToastrService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent implements OnInit {
  // formGroup variables
  addChangeData: FormGroup;
  // variables 
  dataObj;
  // @HostListener('window:beforeunload', ['$event'])
  // public before() {
  //   return false
  // }
  // @HostListener('window:unload', ['$event'])
  // public after() {
  //   this.changePasswordService.MyMethod()
  // }
  recoverform:boolean;
  slides = [
    {
      img: "assets/images/1280_iXpress Logo-07.png",
      description:
        "iXpress Connect – A new way of Banking! Engage yourself in the revolutionary way of getting on-boarded for API based solutions and make your journey quick yet simple and seamless. iXpress Connect provides you a self-service platform to ‘design & develop’ and ‘test & try’ on the fly. Make changes, see what best suits your requirements with full freedom and go live when you are ready. Banking with ICICI, now at your fingertips."
    },
    { img: "assets/images/iXC_1-2-3.JPG" },
    { img: "assets/images/ecol1.png" },
    { img: "assets/images/ecol2.png" },
    { img: "assets/images/ecol3.png" },
    { img: "assets/images/ecol4.png" },
    { img: "assets/images/isure1.png" },
    { img: "assets/images/isure2.png" }
  ];
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
  public slideConfig = {
    dots: false,
    infinite: false,
    speed: 300,
    nextArrow:'<div class="loginnav-btn next-slide"></div>',
    prevArrow:'<div class="loginnav-btn prev-slide"></div>',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  navbarOpen = false;
  response;
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  exp1: any;
  abc: any;
  userRole: string;
  userData: any;
  firstName: any;
  lastLoggedIn: Date;
  lastName: any;
  conpass: any;
  newpass: any;
  pass: boolean;
  oldpass: any;
  constructor(Config: NgbCarouselConfig,private fb: FormBuilder, private http: HttpClient, private changePasswordService: ChangePasswordService, private router: Router, private toastr: ToastrService) {
    Config.interval = 10000;
    Config.wrap = true;
    Config.keyboard = true;
    Config.showNavigationIndicators = true;
    this.addChangeData = this.fb.group({
      'oldPassword': ['', Validators.required],
      'newPassword': ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      'confirmPassword': ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  /**
     * @author Kuldeep 
     * @description This function is used to logout the user 
     */
    logout(){
      this.changePasswordService.logout(this.userData).then(logout=>{
      console.log("logout",logout);
      localStorage.clear();
      this.router.navigateByUrl('/authentication/Home');
      })
      }
  /**
     * @author Sanchita
     * @param value {username,oldPassword,newPassword,confirmPassword}
     * @description changes password of existing user
     */
  changeData(value) {
    console.log(" CALLED CHANGE PASSWORD ",value);
    if(value.oldPassword===value.newPassword){
      // this.toastr.error("New password should not be same as old password.");
      $("#a").css("display","block").delay(2000).fadeOut(200);
      this.addChangeData.reset();


    }else{
    this.dataObj = {
      'username':this.username,
        'oldPassword': value.oldPassword,
        'newPassword': value.newPassword,
        'confirmPassword':value.confirmPassword
     
    }
    console.log("----",this.dataObj)
    this.changePasswordService.changePassword(this.dataObj).then((data) => {
      this.response = data;
      console.log("RESPONSE FROM CHANGE PASSWORD API",this.response.message);
     
      if (this.response.message == "oldPassword is incorrect.") {
        
        // this.toastr.error("UserName or Password is incorrect");
        $("#b").css("display","block").delay(2000).fadeOut(200);
        this.addChangeData.reset();

      }
      else if (this.response.message ==  "You have used old password.") {
        // this.toastr.error("You have used old password.");
        $("#c").css("display","block").delay(2000).fadeOut(200);
        this.addChangeData.reset();

      }
      else if (this.response.message ==  "Choose the right password") {
        // this.toastr.error("You have used old password.");
        $("#c").css("display","block").delay(2000).fadeOut(200);
        this.addChangeData.reset();

      }
      else {
        // this.toastr.success("Password changed sucessfully");
        // this.router.navigate(['/authentication/login'])
        $("#d").css("display","block").delay(1000).fadeOut(200);
        setTimeout(() => {this.router.navigate(["/authentication/login"])}, 1100);
        console.log("pass changed")
      }
    })
  }
  }
  jump(){
    console.log("exp: ", this.exp)
      
     let roles = this.abc[0].roles[0]; 
       if (roles == 'maker' ) {
           // console.log(roles);
           this.router.navigate(['/maker/home']);
 
       } 
       else if (roles == 'checker') {
         // console.log(roles);
 
         this.router.navigate(['/authentication/Checker']);
 
       }
       else if (roles == 'Customer' || roles == undefined) {
         // console.log(roles);
 
         this.router.navigate(['/authentication/user-profile']);
 
       }
      //  abvalidation
       else{
         // console.log(roles);
 
         this.router.navigate(['/cms/production']);
 
 
       }
      //  this.exp1 = roles; 
      
  }
  /**
     * @author Sanchita
     * @param value 
     * @description Back Button click
     */
  backButton() {
       console.log("exp: ", this.exp)
      
     let roles = this.abc[0].roles[0]; 
       if (roles == 'maker' ) {
           // console.log(roles);
           this.router.navigate(['/maker/home']);
 
       } 
       else if (roles == 'checker') {
         // console.log(roles);
 
         this.router.navigate(['/authentication/Checker']);
 
       }
       else if (roles == 'Customer' || roles == undefined) {
         // console.log(roles);
 
         this.router.navigate(['/authentication/user-profile']);
 
       }
      //  abvalidation
       else{
         // console.log(roles);
 
         this.router.navigate(['/cms/production']);
 
 
       }
      //  this.exp1 = roles; 
      }
  exp(arg0: string, exp: any) {
    throw new Error("Method not implemented.");
  }
    ngOnInit() {
      $("#a").css("display", "none");
      $("#b").css("display", "none"); 
      $("#c").css("display", "none");
      $("#d").css("display", "none"); 
      $("#e").css("display", "none"); 

      this.userRole = localStorage.getItem("selectedRole")
      this.userData = JSON.parse(localStorage.getItem("dataofUser"))
      if(this.userRole == 'Customer'){
        this.firstName = this.userData[0].firstNameBusinessSpoc;
        this.lastName = this.userData[0].lastNameBusinessSpoc;
      } else {
    this.firstName = this.userData[0].firstName;
    this.lastName=this.userData[0].lastName;
      }
    if(localStorage.getItem("LastLoggedIn") != null){
      this.lastLoggedIn = new Date(localStorage.getItem("LastLoggedIn"))
      }
    window.history.pushState(null, "", window.location.href);
    this.username=localStorage.getItem("username");
    console.log("this.username",this.username);
    this.abc = JSON.parse(localStorage.getItem("userDataForChecker"));
    console.log("abc",this.abc);

  }

  passCheck1(val){
    // console.log(val)
    this.newpass=val
    this.pass = false;

    // this.conpass=val
    // console.log(this.newpass)
    // console.log(this.conpass)
    
    // if(this.newpass!=this.conpass){
    //   this.pass=true
    //   console.log("not matched")
    // }
    // if(this.newpass == '' && this.conpass == ''){
    //   this.pass = false;
    //   console.log("blank")

    // }
  }

  passCheck2(val){
    // console.log(val)
    this.conpass=val
    this.pass = false;

    
  }
  passCheck4(val){
    // console.log(val)
    this.oldpass=val
    this.pass = false;
    console.log(this.oldpass)
    
  }
  passCheck3(){
    console.log("data of form")
    console.log(this.newpass)
    console.log(this.conpass)
    console.log(this.oldpass)
    this.dataObj = {
      'username':this.username,
      'oldPassword': this.oldpass,
      'newPassword': this.newpass,
      'confirmPassword':this.conpass
     
    }

    if(this.newpass!=this.conpass){
        this.pass=true
        console.log("not matched")
        this.addChangeData.reset();

      }
      else if(this.newpass == '' && this.conpass == ''){
        this.pass = false;
        console.log("blank")
        this.addChangeData.reset();

  
      }
      else if(this.newpass == 'undefined' && this.conpass == 'undefined' && this.oldpass == 'undefined'){
        $("#e").css("display","block").delay(2000).fadeOut(200);
      this.addChangeData.reset();
        
  
      }
     else if(this.newpass==this.conpass){
        this.pass = false;
        this.changeData(this.dataObj)
        
        console.log("matched")
      }
      
      console.log("+++",this.dataObj)

    }
}
/**
   * @author Sanchita
   * @param value 
   * @description  custom validator to check if password and confirmPassword is same 
   */
// export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   if (!control.parent || !control) {
//     return null;
//   }
//   const password = control.parent.get('newPassword');
//   const confirmPassword = control.parent.get('confirmPassword');
//   console.log("password",password);
//   console.log("data",confirmPassword);
  
//   if (!password || !confirmPassword) {
//     // this.change=true

//     return null;
//   }
//   if (confirmPassword.value === '') {
//     // this.change=true

//     return null;
//   }
//   if (password.value === '') {
//     // this.change=true

//     return null;
//   }
//   if(password.value != confirmPassword.value){
//     // this.change=true
//     console.log("fail")
  
    

//   }
//   if ( confirmPassword.value != password.value) {
    
//     return null;
    
//   }
//   if ( confirmPassword.value === password.value) {
    
//     return null;
    
//   }
//   if (password.value === confirmPassword.value) {
    
//     return null;
    
//   }
  
//   return { 'passwordsNotMatching': true };
// };