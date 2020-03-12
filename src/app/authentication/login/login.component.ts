
import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "./login.service";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { config } from "../../../../config";
import * as CryptoJS from "crypto-js";
import * as bcrypt from "bcryptjs";
import { ThrowStmt } from "@angular/compiler";
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [NgbCarouselConfig],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  // formGroup of login
  pageUrl = config.pageUrl;
  encyptedData;
  encryptSecretKey = "ICICI2218";
  addLoginData: FormGroup;
  resetLoginData: FormGroup;
  // variables to check login
  dataObj;
  resetObj;
  loginform;
  recoverform;
  response;
  username: any;
  loggedUserName: any;
  password: any;
  showNavigationIndicators = true;
  orgainsationName;
  isMobileResolution: boolean;
  role;
  responseForAdmin;
  userData;
  getAllUsers = [];
  imageData;
  // changes made by sanchita 18-December-2019 for the change of roles value starts
  roles = [
    {
      name: "Customer",
      value: "Customer"
    },
    {
      name: "Checker",
      value: "checker"
    },
    {
      name: "Maker",
      value: "maker"
    },
    {
      name: "CMS_Ops",
      value: "CMS_Ops"
    }
  ];
  // changes made by sanchita 18-December-2019 for the change of roles value starts
  slides = [
    {
      img: "assets/images/1280_iXpress Logo_V2-23 (1).jpg",
      description:
        "iXpress Connect – A new way of Banking! Engage yourself in the revolutionary way of getting on-boarded for API based solutions and make your journey quick yet simple and seamless. iXpress Connect provides you a self-service platform to ‘design & develop’ and ‘test & try’ on the fly. Make changes, see what best suits your requirements with full freedom and go live when you are ready. Banking with ICICI, now at your fingertips."
    },
    { img: "assets/images/iXC_1-2-3.JPG" },
    {
      img: "assets/images/eCollection.png",
      description:
        "eCollections product enables a Corporate Customers to receive payments through NEFT/RTGS/IMPS/FT channels without disclosing their actual account number and also allows them to identify who has transferred funds on real time. Remitters use Virtual Account Numbers instead of actual numeric account number of the Corporate Customer. VAN is combination of unique code generated by Bank for the Corporate Customer and unique identifier assigned to remitter by the Corporate Customer. In this way, VAN becomes unique to each remitter and Corporate Customer can identify who is the remitter. The most widely used and seamless variant of this is API based eCollection. API based eCollection allows the Corporate Customers to integrate their systems with the Bank application using defined APIs to intimate Corporates on real time of inward transaction. Corporate Customers can validate data and instruct Bank if funds are to be accepted or rejected. Bank necessitates action in accordance with the response."
    },
    {
      img: "assets/images/iSurePay.png",
      description:"iSurePay product enables a Corporate Customers to receive payments through Cash, Cheque, DD, Pay Orders, and Fund Transfer. It also allows Corporates to identify the remitter on real time. iSurePay product allows the Corporate Customers to integrate their systems with the Bank application using defined APIs to intimate Corporates on real time whenever depositor is at ICICI Bank Branch for deposition. Corporate Customer can validate the details received from ICICI Bank regarding the deposition and validate whether funds are to be accepted or not. If Corporate Customer wants to accept funds then only transaction is processed further and acknowledgment is given to depositor. If Corporate Customer does not want to accept funds then transaction is not processed further and depositor is intimated of the same. The process is completed in two legs. In first leg, remitter and amount details are sent to Corporate Customer. Corporate Customer validates the details and responds to Bank informing next course of action. In second leg, Bank either processes transaction or rejects it and intimates to Corporate Customer as well as to depositor. Using the final confirmation from Bank, Corporate Customers can reconcile the details in ERP."
    }
    // { img: "assets/images/ecol1.png" },
    // { img: "assets/images/ecol2.png" },
    // { img: "assets/images/ecol3.png" },
    // { img: "assets/images/ecol4.png" },
    // { img: "assets/images/isure1.png" },
    // { img: "assets/images/isure2.png" }
  ];
  options = {
    theme: "light", // two possible values: light, dark
    dir: "ltr", // two possible values: ltr, rtl
    layout: "vertical", // fixed value. shouldn't be changed.
    sidebartype: "full", // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: "fixed", // two possible values: fixed, absolute
    headerpos: "fixed", // two possible values: fixed, absolute
    boxed: "full", // two possible values: full, boxed
    navbarbg: "skin1", // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: "skin6", // six possible values: skin(1/2/3/4/5/6)
    logobg: "skin6" // six possible values: skin(1/2/3/4/5/6)
  };
  public slideConfig = {
    dots: false,
    infinite: false,
    speed: 300,
    nextArrow: '<div class="loginnav-btn next-slide"></div>',
    prevArrow: '<div class="loginnav-btn prev-slide"></div>',
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
  data: string;
  productvalue: string;
  dataOfUserToSend;
  public navbarOpen: boolean;
  code: string;
  cap = false;
  invalid: any;
  capvalid: boolean;
  dataToSendForChangePs: string;
  error1: string;
  error2: string;
  browserValue;
  error3: string;

  constructor(
    Config: NgbCarouselConfig,
    private fb: FormBuilder,
    public loginService: LoginService,
    private http: HttpClient,
    private router: Router,
    public toastr: ToastrService
  ) {
    Config.interval = 10000;
    Config.wrap = true;
    Config.keyboard = true;
    Config.showNavigationIndicators = true;
    this.addLoginData = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      selectRole: ["", [Validators.required]],
      captchaField: ["", [Validators.required]]
    });
    this.resetLoginData = this.fb.group({
      username: ["", [Validators.required]]
      // 'newPassword': ['', [Validators.required]],
      // 'confirmPassword': ['', [Validators.required, confirmPasswordValidator]]
    });
    // code to change background for responsiveness
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }
  /**
   * @author Sanchita
   * @description reset between login and forgotPassword form
   */
  showRecoverForm() {
    $(document).ready(function() {
      $("#loginform").hide();
      $("#recoverform").show();
    });
    this.addLoginData.reset();
    this.resetLoginData.reset();
  }
 
  /**
   * @author Sanchita
   * @param value {username,password}
   * @description function called to login the user and perform some actions based on it
   */
  loginData(value) {
    var rolePresent = false;
    this.username = value.username;
    this.password = value.password;
    this.dataObj = {
      username: this.username,
      password: this.password
    };
  
  if(this.addLoginData.invalid){
    // this.toastr.info(
    //   "Please Enter All the Fields"
    //   , "", {
    //     timeOut: 2000
    //   });
    // this.error1="Please Enter All the Fields";
      // $(".myalert").show();
      // setTimeout(function(){
      // $("#a").css("display", "block")}, 2000);
      $("#a").css("display","block").delay(2000).fadeOut(200);
      // $("#a").css("display", "block");

      this.addLoginData.reset();
      $("#xyz")[0].selectedIndex = 0;
      this.createCaptcha();
  }
  else if(this.capvalid== true){

  }
  else{
    this.loginService.userDetails(this.dataObj.username).then(data => {
      this.userData = data;
      console.log("this.userData",this.userData);
      this.loginService.getUserAudit(this.dataObj.username).then(auditData => {
        if(auditData != null && auditData != undefined && auditData != ''){
          localStorage.setItem("LastLoggedIn",auditData.Date);
          }
      if (this.userData.length === 0) {
        // this.toastr.error("Please Enter valid Username and Password", "", { timeOut: 3000 });
        $("#f").css("display","block").delay(2000).fadeOut(200);
        
        this.addLoginData.reset();
        $("#xyz")[0].selectedIndex = 0;
        this.createCaptcha();
      }
      else if (this.userData[0].makerApproval === false && this.userData[0].rejectReason != null) {
        $("#c").css("display","block").delay(3000).fadeOut(200);

        this.addLoginData.reset();
        $("#xyz")[0].selectedIndex = 0;
        this.createCaptcha();
        // this.addLoginData.controls["selectRole"].setValue("");
      }  
      else if(this.userData[0].makerApproval === false) {
        
        
          $("#b").css("display","block").delay(3000).fadeOut(200);this.addLoginData.reset();
          $("#xyz")[0].selectedIndex = 0;
          this.createCaptcha();
        
        
        // this.addLoginData.controls["selectRole"].setValue("");
      }
      if (this.userData[0].roles.length == 0) {
        rolePresent = true;
      }
      for (var i = 0; i < this.userData[0].roles.length; i++) {
        console.log("roles: ", value.selectRole, this.userData[0].roles[i]);
        if (value.selectRole == this.userData[0].roles[i]) {
          rolePresent = true;
          break;
        }
      }
      if (rolePresent == true) {
        if (value.selectRole == "checker") {
          this.loginService.login(this.dataObj).then(data => {
            this.responseForAdmin = data;
            if (this.responseForAdmin.message == "Login Successful.") {
              $("#d").css("display","block").delay(1000).fadeOut(200);
              setTimeout(() => {this.router.navigate(["/authentication/Checker"])}, 1100);
              setTimeout(() => {this.addLoginData.reset()}, 1110);
              localStorage.setItem('token',this.responseForAdmin.response.token);
              this.dataToSendForChangePs=JSON.stringify(this.userData);
              localStorage.setItem('selectedRole',value.selectRole)
              localStorage.setItem("userDataForChecker",this.dataToSendForChangePs);

              // this.router.navigate(["/authentication/Checker"]);
              // this.toastr.success("Logged In Successfully", "", {
              //   timeOut: 2000
              // });
              
              
              
              localStorage.setItem("username", this.dataObj.username);
              localStorage.setItem("dataofUser", JSON.stringify(this.userData));
            } else if (
              this.responseForAdmin.message ==
              "Username or password is incorrect"
            ) {
              // this.toastr.error("Username or password is incorrect", "", {
              //   timeOut: 3000
              // });
              $("#e").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              $("#xyz")[0].selectedIndex = 0;
              this.createCaptcha();
            } else if (this.username === "" || this.password === "") {
              // this.toastr.error("Please Enter Username and Password", "", {
              //   timeOut: 3000
              // });
              $("#f").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (
              (this.username != "" && this.password === "",
              "",
              { timeOut: 3000 })
            ) {
              // this.toastr.error("Please Enter Password", "", { timeOut: 3000 });
              $("#g").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username === "" && this.password != "") {
              // this.toastr.error("Please Enter Username", "", { timeOut: 3000 });
              $("#h").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            }
            else{
              $("#wrong").css("display","block").delay(3000).fadeOut(200);
              // this.toastr.error(this.response.message, "", { timeOut: 3000 });
              this.addLoginData.reset();
              this.createCaptcha();
            }
          });
        } 
        else if (value.selectRole === "maker") {
          this.loginService.login(this.dataObj).then(data => {
            this.responseForAdmin = data;
            if (this.responseForAdmin.message == "Login Successful.") {
              localStorage.setItem('token',this.responseForAdmin.response.token);
              this.dataToSendForChangePs=JSON.stringify(this.userData);
              localStorage.setItem("userDataForChecker",this.dataToSendForChangePs);
              localStorage.setItem('selectedRole',value.selectRole)
              // this.router.navigate(["/maker/home"]);
              // this.toastr.success("Logged In Successfully");

              $("#d").css("display","block").delay(1000).fadeOut(200);
              setTimeout(() => {this.router.navigate(["/maker/home"])}, 1100);
              setTimeout(() => {this.addLoginData.reset()}, 1110);



              // $("#d").css("display","block").delay(3000).fadeOut(200);

              localStorage.setItem("username", this.dataObj.username);

localStorage.setItem("dataofUser", JSON.stringify(this.userData));
            } else if (
              this.responseForAdmin.message ==
              "Username or password is incorrect"
            ) {
              // this.toastr.error("Username or password is incorrect", "", { timeOut: 3000 });
              $("#e").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              $("#xyz")[0].selectedIndex = 0;
              this.createCaptcha();
            } else if (this.username === "" || this.password === "") {
              // this.toastr.error("Please Enter Username and Password", "", { timeOut: 3000 });
              $("#f").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username != "" && this.password === "") {
              // this.toastr.error("Please Enter Password", "", { timeOut: 3000 });
              $("#g").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username === "" && this.password != "") {
              // this.toastr.error("Please Enter Username", "", { timeOut: 3000 });
              $("#h").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            }
            else{
              $("#wrong").css("display","block").delay(3000).fadeOut(200);
              // this.toastr.error(this.response.message, "", { timeOut: 3000 });
              this.addLoginData.reset();
              $("#xyz")[0].selectedIndex = 0;
              this.createCaptcha();
            }
          });
        }
         else if (value.selectRole === "CMS_Ops") {
          this.loginService.login(this.dataObj).then(data => {
            this.responseForAdmin = data;
            if (this.responseForAdmin.message == "Login Successful.") {
              $("#d").css("display","block").delay(1000).fadeOut(200);
              setTimeout(() => {this.router.navigate(["/cms/production"])}, 1100);
              setTimeout(() => {this.addLoginData.reset()}, 1110);
              localStorage.setItem('token',this.responseForAdmin.response.token);
              localStorage.setItem('selectedRole',value.selectRole)
              this.dataToSendForChangePs=JSON.stringify(this.userData);
              localStorage.setItem("userDataForChecker",this.dataToSendForChangePs);
              // this.router.navigate(["/cms/production"]);
              // this.toastr.success("Logged In Successfully");
              // $("#d").css("display","block").delay(2000).fadeOut(200);
             


              localStorage.setItem("username", this.dataObj.username);
              localStorage.setItem("dataofUser", JSON.stringify(this.userData));
            } else if (
              this.responseForAdmin.message ==
              "Username or password is incorrect"
            ) {
              // this.toastr.error("Username or password is incorrect", "", { timeOut: 3000 });
              $("#e").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              $("#xyz")[0].selectedIndex = 0;
              this.createCaptcha();
            } else if (this.username === "" || this.password === "") {
              // this.toastr.error("Please Enter Username and Password", "", { timeOut: 3000 });
              $("#f").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username != "" && this.password === "") {
              // this.toastr.error("Please Enter Password", "", { timeOut: 3000 });
              $("#g").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username === "" && this.password != "") {
              // this.toastr.error("Please Enter Username", "", { timeOut: 3000 });
              $("#h").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            }
            else{
              $("#wrong").css("display","block").delay(3000).fadeOut(200);
              // this.toastr.error(this.response.message, "", { timeOut: 3000 });
              this.addLoginData.reset();
              $("#xyz")[0].selectedIndex = 0;
              this.createCaptcha();
            }
          });
        } 
        else if (
          this.userData[0].makerApproval === true &&
          value.selectRole == "Customer"
        ) {
          
          this.role = this.userData[0].roles[0];
          this.loginService.login(this.dataObj).then(data => {
            this.response = data;
          console.log("this.response ----------->",this.response);
            if (this.response.message == "Login Successful.") {
              $("#d").css("display","block").delay(1000).fadeOut(200);
              setTimeout(() => {this.router.navigate(["/authentication/user-profile"])}, 1100);
              setTimeout(() => {this.addLoginData.reset()}, 1110);
              


              localStorage.setItem('token',this.response.response.token);
              localStorage.setItem('selectedRole',value.selectRole)
              this.dataToSendForChangePs=JSON.stringify(this.userData);
              localStorage.setItem("userDataForChecker",this.dataToSendForChangePs);
              // this.router.navigate(["/authentication/user-profile"]);
              this.dataOfUserToSend = JSON.stringify(this.userData);
              localStorage.setItem("dataofUser", this.dataOfUserToSend);
              localStorage.setItem("adminLogin", this.role);
              localStorage.setItem("username", value.username);
              // this.toastr.success("Logged In Successfully", "", {
              //   timeOut: 2000
              // });
              // $("#d").css("display","block").delay(3000).fadeOut(200);

            } else if (this.response.message == "") {
              // this.toastr.error("Please Enter Username and Password", "", {
              //   timeOut: 3000
              // });
              $("#f").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              $("#xyz")[0].selectedIndex = 0;
              this.createCaptcha();
            } else if (this.username === "" || this.password === "") {
              // this.toastr.error("Please Enter Username and Password", "", {
              //   timeOut: 3000
              // });
              $("#f").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username != "" && this.password === "") {
              // this.toastr.error("Please Enter Password", "", { timeOut: 3000 });
              $("#g").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username === "" && this.password != "") {
              // this.toastr.error("Please Enter Username", "", { timeOut: 3000 });
              $("#h").css("display","block").delay(3000).fadeOut(200);

              this.addLoginData.reset();
              this.createCaptcha();
              this.addLoginData.controls["selectRole"].setValue("");
            }
            else{
              console.log("inside this function")
              $("#wrong").css("display","block").delay(3000).fadeOut(200);
              // this.toastr.error(this.response.message, "", { timeOut: 3000 });
              this.addLoginData.reset();
              $("#xyz")[0].selectedIndex = 0;
               this.createCaptcha();
            }
          });
        }
      } else {
        // this.toastr.info(
        //   value.selectRole + " Role is not present for the user!"
        //   , "", { timeOut: 3000 });
        $("#i").css("display","block").delay(3000).fadeOut(200);

        this.addLoginData.reset();
        this.createCaptcha();
        this.addLoginData.controls["selectRole"].setValue("");
      }
    })
    })
  }
  
  }

  /**
   * @author Kuldeep Narvekar
   * @param value {username,newPassword,confirmPassword}
   * @description Send Reset Password Link from Email
   */
  loginResetData(value) {
    console.log("value: ", value);
    this.resetObj = {
      username: value.username,
      pageUrl: this.pageUrl + "authentication/reset?username="
    };
    this.loginService.loginResetLink(this.resetObj).then(data => {
      this.response = data;
      // this.toastr.info("Link has been sent to your Registered Email Id");
      $("#j").css("display","block").delay(3000).fadeOut(200);
      
      // this.loginform = !this.loginform;
      // this.recoverform = !this.recoverform;
      // console.log("this.loginform: ",this.loginform,this.recoverform)
      this.ngOnInit();
    });
  }
  /**
   * @author Sanchita
   * @description  Function called on back button
   */
  backButton() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
    ngOnInit() {
    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    $("#wrong").css("display", "none");
    $("#a").css("display", "none");
    $("#b").css("display", "none"); 
    $("#c").css("display", "none"); 
    $("#d").css("display", "none"); 
    $("#e").css("display", "none"); 
    $("#f").css("display", "none"); 
    $("#g").css("display", "none"); 
    $("#h").css("display", "none"); 
    $("#i").css("display", "none"); 
    $("#j").css("display", "none"); 


    localStorage.clear();
    $(document).ready(function() {
      $("#loginform").show();
      $("#recoverform").hide();
    });
    this.createCaptcha();
    this.addLoginData.reset();
    this.resetLoginData.reset();
    //   this.loginService.getProductsData().then((data)=>{
    //     this.imageData=data;
    // })
    this.BrowserDetection();
    this.browserValue=localStorage.getItem("displayFlag1");

    this.productvalue = localStorage.getItem("productData");
    this.addLoginData.controls["selectRole"].setValue("");
  }
  slickInit(e) {
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }
  createCaptcha() {
    this.cap=false;
    console.log("new check captcha refresh");
    this.addLoginData.controls['captchaField'].setValue(""); 
    // var code;
    //clear the contents of captcha div first
    document.getElementById("captcha").innerHTML = "";
    var charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    

    var lengthOtp = 6;
    var captcha = [];

    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array

      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 90;
    canv.height = 40;
    var ctx = canv.getContext("2d");
    ctx.font = "20px Times New Roman";
    ctx.strokeText(captcha.join(""), 0, 30);
    // ctx.fillText(charsArray.split("").join(' '), 0, 110);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
    // console.log(code)
  }

  capCheck(capValue) {
    // console.log(calValue)
    if (capValue.length != 0 && capValue != this.code  ) {
      this.cap = true;
      // console.log("match1");
      // console.log(capValue.length)
      // console.log(this.cap);
      this.capvalid = true;
    } 
    else if(capValue.length == 0){
      this.cap = false;
      // console.log("match2")

    }
   else {
      // console.log("match");
      this.cap = false;
      this.capvalid = false;

    }
  }
  BrowserDetection() {
    //   //Check if browser is IE
    //   if (navigator.userAgent.search("MSIE") ) {
    //     insert conditional IE code here
    //      console.log("IE Browser")
    //  }
    //  else if (navigator.userAgent.search("Firefox") ) {
    //   insert conditional Firefox Code here
    //    console.log("Firefox Browser")
  
    // // // }
    // // if (user.browser.family === 'Safari') {
    // //   alert('You\'re using the Safari browser');   
    // // }
    // // const browser = detect();
    var objAgent = navigator.userAgent;
    var objbrowserName  = navigator.appName;
    var nAgt = navigator.userAgent;
    var nameOffset,verOffset;
    var objOffsetVersion;
    var ver = navigator.userAgent;
    var browserName  = navigator.appName;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var fullVersion  = ''+parseFloat(navigator.appVersion); 
    var objfullVersion  = ''+parseFloat(navigator.appVersion); 
      // if ((objOffsetVersion=objAgent.indexOf("Firefox"))!=-1) {
      // objbrowserName = "Firefox";
      // console.log("yes")
      // }
       if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        // browserName = "Microsoft Internet Explorer";
        // fullVersion = nAgt.substring(verOffset+5);
        // alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        console.log("yes IE")
        // document.getElementById('b').classList.remove('title');
        // $('#a').removeClass("offset-md-2").addClass( "yourClass" );
        // document.getElementById("img0").classList.remove('');
        var value="true";
        localStorage.setItem("displayFlag1",value);
        // console.log(a)
      }
  

      else{
        console.log("no")
        var value="false";
        localStorage.setItem("displayFlag1",value);
        // localStorage.setItem("displayFl","11");
              
      }
    }
}
/**
 * @author Sanchita
 * @param value
 * @description  custom validator to check if password and confirmPassword is same
 */
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }
  const password = control.parent.get("newPassword");
  const confirmPassword = control.parent.get("confirmPassword");
  if (!password || !confirmPassword) {
    return null;
  }
  if (confirmPassword.value === "") {
    return null;
  }
  if (password.value === confirmPassword.value) {
    return null;
  }
  return { passwordsNotMatching: true };
};
