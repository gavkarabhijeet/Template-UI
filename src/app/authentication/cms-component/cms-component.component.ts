import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import {CMSComponentService} from './cms-component.service';
import { MakerService } from "../maker-page/maker-page.service";
@Component({
  selector: 'app-cms-component',
  templateUrl: './cms-component.component.html',
  styleUrls: ['./cms-component.component.css']
})
export class CmsComponentComponent implements OnInit {
  // @HostListener('window:beforeunload', ['$event'])
  // public before() {
  //   return false
  // }
  // @HostListener('window:unload', ['$event'])
  // public after() {
  //   this.makerService.MyMethod()
  // }
  getAppResponse;
  public navbarOpen:boolean;
  checkListTab:boolean=true;
  show = 2;
  dataValue;
  appResponseData = [];
  dataValueServices;
  serviceResponseData = [];
  dataOfNewRequests;
  dataOfApprovedRequest;
  numberOfRequests;
  dataOfApprovedRequests;
  gotData: string;
  newData = [];
  dataOfProject: any;
  dataOfUser: string;
  dataofProjectFromService: string;
  dataOFUSER: string;
  listOfProductionInitiatedRequest=[];
  userData: any;
  firstName: any;
  lastLoggedIn: Date;
  constructor(private makerService: MakerService, private router: Router,private cmsService:CMSComponentService) { }
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
    ngOnInit() {
    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    this.userData = JSON.parse(localStorage.getItem("dataofUser"))
    this.firstName = this.userData[0].firstName
    if(localStorage.getItem("LastLoggedIn") != null){
      this.lastLoggedIn = new Date(localStorage.getItem("LastLoggedIn"))
      }
    this.cmsService.getDetailsOfNotApproved().then(async data => {
      this.dataOfNewRequests = data;
      // console.log("New Request data -> ", this.dataOfNewRequests);
      this.numberOfRequests = this.dataOfNewRequests.length;
      // console.log("Total Number of Request -> ", this.numberOfRequests);
      
    });
  
    this.cmsService.getDetailsOfApproved().then(async data => {
      this.dataOfApprovedRequest = data;
      for(let j=0;j<this.dataOfApprovedRequest.length;j++){

        // console.log("Extract Project Id -> ",this.dataOfApprovedRequest[j].projectId);
        if(this.dataOfApprovedRequest[j].projectId!=undefined || this.dataOfApprovedRequest[j].projectId!=null ){

        this.cmsService.getProjectbyId(this.dataOfApprovedRequest[j].projectId).then(data => {
         if(data[0].status!=undefined && data[0].status!=null && data[0].status=="Ready for Production Request Initiated"){
         this.listOfProductionInitiatedRequest.push(data[0]);
        //  console.log("Track Iteration -> ",this.listOfProductionInitiatedRequest.length);
         
         }else if(this.dataOfApprovedRequest[j].projectId==undefined || this.dataOfApprovedRequest[j].projectId==null ){
          // console.log("Status undefined  returning false beacuse status undefined");  
         }else{
          // console.log("Status else condition");  
         }
        });
      }else{
        // console.log("Project id is undefined ,Return  false");
        
      }

      }
     
      for (var i = 0; i < this.dataOfApprovedRequest.length; i++) {
        var value = this.dataOfApprovedRequest[i].makerApproval;
        // console.log(this.dataOfApprovedRequest[i].makerApproval);
        if (value === "true") {
          this.newData.push(this.dataOfApprovedRequest[i]);
        }
      }
      this.newData.reverse();
      // console.log("--------------newData", this.newData);
    }).catch(e=>{
      // console.log("print error -> ",e);
    })
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  moveToProd(projectId){
    alert(projectId)
    // console.log("Project Id has been received",projectId);
    if(projectId!=null){
      this.checkListTab=false;
      // this.router.navigateByUrl('production');
      this.router.navigate(['/authentication/checkproduction']);
    }

  }
  /**
     * @author Kuldeep 
     * @description This function is used to logout the user 
     */
    logout(){
      this.cmsService.logout(this.userData).then(logout=>{
      console.log("logout",logout);
      localStorage.clear();
      this.router.navigateByUrl('/authentication/Home');
      })
      }
}
