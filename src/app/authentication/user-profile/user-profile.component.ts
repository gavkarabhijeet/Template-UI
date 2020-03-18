import { Component, OnInit,ViewEncapsulation, HostListener } from '@angular/core';
import { MyProfileService } from "../profile/profile.service";
import { Router } from "@angular/router";
import { MakerService } from "../maker-page/maker-page.service";
import { hardcode } from "hardcodedata";

const productName : string = hardcode.productName;
const productId : string = hardcode.productId;
const serviceId : string = hardcode.serviceId;
const serviceName : string = hardcode.serviceName;
const clientCodeIPS : string = hardcode.clientCodeIPS;
const clientCodeProfunds : string = hardcode.clientCodeProfunds;
const ifscCode : string = hardcode.ifscCode;
const clientName :string = hardcode.clientName;
const clientCode : string =hardcode.clientCode;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
 
})
export class UserProfileComponent implements OnInit {
  // @HostListener('window:beforeunload', ['$event'])
  // public before() {
  //   return false
  // }
  // @HostListener('window:unload', ['$event'])
  // public after() {
  //   this.makerService.MyMethod()
  // }
  getAppResponse;
  getAuditTrailResponse; //property declared for audit trail output binding
  show = 2;
  hide = 2;
  dataValue;
  appResponseData = [];
  dataValueServices;
  serviceResponseData = [];
  userData;
  dataOfUser;
  public navbarOpen:boolean;

  stopRequest: boolean = false;

  initiateUATFlag: any = "false";

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
  serviceName:any;
  appData: any;
  setFlag: string;
  firstName: any;
  lastLoggedIn: Date;
  projectId;
  orgName: any;
  data: string;
  dataforproces: any;
  
  constructor(
    private makerService: MakerService,
    private myProfileService: MyProfileService,
    private router: Router
  ) {}
/**
     * @author Kuldeep 
     * @description This function is used to logout the user 
     */
    logout(){
      this.myProfileService.logout(this.userData).then(logout=>{
      console.log("logout",logout);
      localStorage.clear();
      this.router.navigateByUrl('/authentication/Home');
      })
      }
    ngOnInit() {
      // $(".modal-backdrop").removeClass("modal-backdrop fade show")
    //for disabling back button
    // localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZWQ0ZjQ3MjJjZTIxZTZhYTc4ZGIiLCJpYXQiOjE1ODA5ODU3MzZ9.KECi38Pln-X1zXYYkwgot7mQJFbeiyda2HiVuTh4xV8")
    // $(".modal-backdrop").css("opacity","0")
    // $(".modal-backdrop").removeClass("modal-backdrop fade show")
    // $(".modal-backdrop").remove()


    window.history.pushState(null, "", window.location.href);
    this.data=localStorage.getItem("data")
    this.dataforproces=JSON.parse(this.data)
    this.stopRequest = false;
    this.projectId = this.dataforproces[0].projectId;
    // this.userData=localStorage.getItem("data");
    // this.dataOfUser = JSON.parse(this.userData);
    this.orgName=this.dataforproces[0].organisation
    this.orgName=localStorage.getItem("orgname")
    console.log("org",this.orgName)

    console.log("here1====> ",this.userData);
  
  
    this.firstName = this.dataforproces[0].firstNameBusinessSpoc
    console.log("here2 ====>",this.firstName)
    if(localStorage.getItem("LastLoggedIn") != null){
      this.lastLoggedIn = new Date(localStorage.getItem("LastLoggedIn"))
      }
    console.log("Logged In User Details -> ",  this.projectId);
    this.myProfileService.getApp(this.projectId).then( data => {
    this.getAppResponse = data;
    console.log("this.userData",this.getAppResponse[0]);
      // Changes by sanchita
      if(this.getAppResponse[0].status === "Ready for Production Request Initiated" || this.getAppResponse[0].status === "Ready for Production Verified"){
        this.setFlag="true";
        localStorage.setItem("status",this.setFlag);
      }
      else{
        this.setFlag="false";
        localStorage.setItem("status",this.setFlag);
      }
      console.log("Api response for particular projectId -> ",this.getAppResponse);
      var serviceId = this.getAppResponse[0].products[0].services[0].serviceId;
      console.log("Extract Servide ID -> ",serviceId)
      this.serviceName = this.getAppResponse[0].products[0].services[0].serviceName;
      // this.myProfileService.getServiceById(serviceId).then(data => {
      //   console.log("data in getServiceById",data);
      //   this.serviceName = data[0].serviceName;
      //   // console.log("Finding Service Name for displaying service name-> ", this.serviceName);
      // });
     
    });
  
  }
  

  mappingPage() {
    this.router.navigate(["/authentication/mapping"]);
  }
  toggleNavbar() {
  }
  appPage(data) {
    // console.log("dtata", data);
    this.appData = JSON.stringify(data);
    localStorage.setItem("appData", this.appData);

    this.router.navigate(['/authentication/userAppDetails']);
  }

  increaseShow() {
    this.show += 1;
  }

  decreaseShow() {
    this.show -= 1  ;
  }
  initiateProd() {
    this.initiateUATFlag = "true";
    alert("ICICI Bank Implementation Team has been notified.")
    // console.log(this.initiateUATFlag);
    
  }
}
