import { Component, OnInit, ViewEncapsulation, HostListener } from "@angular/core";
import { MakerService } from "./maker-page.service";
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ContentChild } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: "app-maker-page",
  templateUrl: "./maker-page.component.html",
  styleUrls: ["./maker-page.component.css"],
  // encapsulation:ViewEncapsulation.None
})
export class MakerPageComponent implements OnInit {
  @ContentChild(NgbPagination) pagination: NgbPagination;
  nameForReady: string;
  // @HostListener('window:beforeunload', ['$event'])
  // public before() {
  //   return false
  // }
  // @HostListener('window:unload', ['$event'])
  // public after() {
  //   this.makerService.MyMethod()
  // }
  public navbarOpen: boolean;
  checkListTab: boolean = true;
  show = 2;
  dataOfNewRequests;
  dataOfApprovedRequest;
  numberOfRequests;
  filteredItems = []
  gotData: string;
  newData = [];
  rejectData = [];
  readyData = [];
  requestData = [];
  dataOfProject: any;
  dataOFUSER: string;
  listOfProductionInitiatedRequest = [];
  listOfProductionApprovedRequest =[];
  userData: any;
  firstName: any;
  lastLoggedIn: Date;
  name: any;
  selectedValue: any= "organisation";
  selectedValueForApproved: string = "organisation";
  filteredItemsForApproved: any = [];
  filteredItemsForReady: any = [];
  selectedValueRejected: string = "organisation";
  selectedValueReady: string = "organisation";
  filteredItemsForRejected: any = [];
  nameforApprove: any;
  nameforReject: any;
 
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
  
  constructor(
   
    private makerService: MakerService,
    private router: Router
  ) {}
/**
     * @author Kuldeep 
     * @description This function is used to logout the user 
     */
    logout(){
      this.makerService.logout(this.userData).then(logout=>{
      console.log("logout",logout);
      localStorage.clear();
      this.router.navigateByUrl('/authentication/Home');
      })
      }

    ngOnInit() {
      // this.filteredItems = ['']
      this.clearFilter()

    //for disabling back button
    this.clearFilter();
    this.userData = JSON.parse(localStorage.getItem("dataofUser"))
    this.firstName = this.userData[0].firstName
    if(localStorage.getItem("LastLoggedIn") != null){
      this.lastLoggedIn = new Date(localStorage.getItem("LastLoggedIn"))
      }
    window.history.pushState(null, "", window.location.href);
    this.makerService.getDetailsOfNotApproved().then(async data => {
      try{
   
      this.rejectData=[]
      this.dataOfNewRequests=[]
      console.log("New Request data -> ", data);
      for(var i=0;i<= data.length;i++){
        
      if(data[i].status!=null || data[i].status!=undefined){
        this.rejectData.push(data[i]);
      
        this.filteredItemsForRejected=this.rejectData.reverse();


      } 
      // else if(data[i].status == "Ready for Production Request Initiated"){
      //   this.readyData.push(data[i]);
      
      //   this.filteredItemsForReady=this.readyData.reverse();

      // }
      else {
        this.dataOfNewRequests.push(data[i])
        this.filteredItems=this.dataOfNewRequests.reverse()
        this.numberOfRequests = this.dataOfNewRequests.length;

      }
    }
   
    
      console.log("Total Number of Request/Reject -> ", this.rejectData, this.requestData);
  }catch(e){
    console.log("PRINT : EXCEPTION IN MAKER PAGE",e);
  }
    });
    this.makerService.getProjectbyIdN().then(data=>{
      console.log("this.data ",data);
      for(var i=0;i<data.length;i++){
        if(data[i].status =="Ready for Production Request Initiated"){
          this.listOfProductionInitiatedRequest.push(data[i]);
          this.listOfProductionInitiatedRequest.reverse();
          console.log("this.listOfProductionRequest",this.listOfProductionInitiatedRequest);
        }
      }
    })
    this.makerService.getProjectbyIdN().then(data=>{
      console.log("this.data ",data);
      for(var i=0;i<data.length;i++){
        if(data[i].status =="Ready for Production Verified"){
          this.listOfProductionApprovedRequest.push(data[i]);
          this.listOfProductionApprovedRequest.reverse();
          console.log("this.listOfProductionApprovedRequest",this.listOfProductionApprovedRequest);
        }
      }
    })

    this.makerService
      .getDetailsOfApproved()
      .then(async data => {
        this.dataOfApprovedRequest = data;
        console.log("PRINT : PROJECT LENGTH",this.dataOfApprovedRequest);
  
        console.log("this.data------",this.dataOfApprovedRequest)
        for (var i = 0; i < this.dataOfApprovedRequest.length; i++) {
          var value = this.dataOfApprovedRequest[i].makerApproval;
        
          if (value === true && this.dataOfApprovedRequest[i].roles[0] == "Customer") {
            this.newData.push(this.dataOfApprovedRequest[i]);
            
            this.filteredItemsForApproved=this.newData.reverse();
  
          }
          else{

          }
        }
       
      
      })
      .catch(e => {
       
      });
  }

 
  moreDetails(data) {
    console.log("Received args", data);
    this.gotData = data;
    this.dataOFUSER = JSON.stringify(this.gotData);
var dataForward=data.businessSpocUsername;
    localStorage.setItem("userDetails",dataForward);
    console.log("----------", this.gotData);
  
      localStorage.setItem("projectId", data.projectId);
      localStorage.setItem("approval","false");
      this.router.navigate(["/authentication/makerDetails"]);
  
  }
  toggleNavbar() {}
  increaseShow() {
    this.show += 10;
  }

  decreaseShow() {
    this.show -= 10;
  }
  /**
   * @author Sanchita
   * @param i
   * @description This function will be used for the display of approved data processing
   */
  approvedData(i) {
    console.log("--------=========>", i);
    this.gotData = i;
    this.dataOFUSER = JSON.stringify(this.gotData);
    var forwardData=i.businessSpocUsername;
    localStorage.setItem("userDetails",forwardData);
    
    localStorage.setItem("projectId", i.projectId);
      localStorage.setItem("approval","true");
      console.log("=============");
      this.router.navigate([
        "/authentication/makerDetails"
      ]);
   
  }

  rejectedData(i) {
    console.log("--------=========>", i);
    this.gotData = i;
    this.dataOFUSER = JSON.stringify(this.gotData);
    localStorage.setItem("userDetails", this.dataOFUSER);
  
    localStorage.setItem("projectId", i.projectId);
      localStorage.setItem("approval","false");
      console.log("=============");
      this.router.navigate([
        "/authentication/makerDetails"
      ]);
  
  }


  // changes made for new request filter
  clearFilter(){
    this.filteredItems = this.dataOfNewRequests
  }
   
   filterItem(){
     var search : string;
     
      if(this.name==''||this.name==undefined||this.name==null){
        this.clearFilter()
      }
      var filter = this.dataOfNewRequests.filter(
          item => {
            if(this.selectedValue=="organisation"){
              search= JSON.stringify(item.organisation)
            }else if(this.selectedValue=="emailIdBusinessSpoc"){
              search= JSON.stringify(item.emailIdBusinessSpoc)
            }else if(this.selectedValue=="mobileNumberBusinessSpoc"){
              search= JSON.stringify(item.mobileNumberBusinessSpoc)
            }else if(this.selectedValue=="accountManagerName"){
              search= JSON.stringify(item.accountManagerName)
            }
            else if(this.selectedValue=="productName"){
              search= JSON.stringify(item.productName)
            }
            else if(this.selectedValue=="serviceName"){
              search= JSON.stringify(item.serviceName)
            }
            else{
              search= JSON.stringify(item.organisation)
            }
           if(item&&search){
           return search.toLowerCase().indexOf(this.name.toLowerCase()) > -1
          }
          }
       )
       
      
      this.filteredItems = filter
      console.log("filter1",this.filteredItems)
    }

    // changes made for approved filter
    clearFilterForApproved(){
      this.filteredItemsForApproved = this.newData;
    }

    filterItemForApproved(){
      var search : string;
     
      if(this.nameforApprove==''||this.nameforApprove==undefined||this.nameforApprove==null){
        this.clearFilterForApproved()
      }
      var filter = this.newData.filter(
          item => {
            if(this.selectedValueForApproved=="organisation"){
              search= JSON.stringify(item.organisation)
            }else if(this.selectedValueForApproved=="emailIdBusinessSpoc"){
              search= JSON.stringify(item.emailIdBusinessSpoc)
            }else if(this.selectedValueForApproved=="mobileNumberBusinessSpoc"){
              search= JSON.stringify(item.mobileNumberBusinessSpoc)
            }else if(this.selectedValueForApproved=="createdBy"){
              search= JSON.stringify(item.createdBy)
            }
            else if(this.selectedValueForApproved=="accountManagerName"){
              search= JSON.stringify(item.accountManagerName)
            }
            else if(this.selectedValueForApproved=="productName"){
              search= JSON.stringify(item.productName)
            }
            else if(this.selectedValueForApproved=="serviceName"){
              search= JSON.stringify(item.serviceName)
            }
            else{
              search= JSON.stringify(item.organisation)
            }
           if(item&&search){
           return search.toLowerCase().indexOf(this.nameforApprove.toLowerCase()) > -1
          }
          }
       )
       
      
      this.filteredItemsForApproved = filter
      console.log("filter1",this.filteredItemsForApproved)
      
    }
  

    // changes made for rejection filter
    clearFilterForRejected(){
      this.filteredItemsForApproved = this.newData;
    }

    filterItemForRejected(){
      var search : string;
     
      if(this.nameforReject==''||this.nameforReject==undefined||this.nameforReject==null){
        this.clearFilterForRejected()
      }
      var filter = this.rejectData.filter(
          item => {
            if(this.selectedValueRejected=="organisation"){
              search= JSON.stringify(item.organisation)
            }else if(this.selectedValueRejected=="emailIdBusinessSpoc"){
              search= JSON.stringify(item.emailIdBusinessSpoc)
            }else if(this.selectedValueRejected=="mobileNumberBusinessSpoc"){
              search= JSON.stringify(item.mobileNumberBusinessSpoc)
            }
            else if(this.selectedValueRejected=="createdBy"){
              search= JSON.stringify(item.createdBy)
            }
            else if(this.selectedValueRejected=="accountManagerName"){
              search= JSON.stringify(item.accountManagerName)
            }
            else if(this.selectedValueRejected=="productName"){
              search= JSON.stringify(item.productName)
            }
            else if(this.selectedValueRejected=="serviceName"){
              search= JSON.stringify(item.serviceName)
            }
            else{
              search= JSON.stringify(item.organisation)
            }
           if(item&&search){
           return search.toLowerCase().indexOf(this.nameforReject.toLowerCase()) > -1
          }
          }
       )
       
      
      this.filteredItemsForRejected = filter
      console.log("filter1",this.filteredItemsForRejected)
      
    }

    // changes made for ready filter
    // clearFilterForReady(){
    //   this.filteredItemsForApproved = this.newData;
    // }

    // filterItemForReady(){
    //   var search : string;
     
    //   if(this.nameForReady==''||this.nameForReady==undefined||this.nameForReady==null){
    //     this.clearFilterForReady()
    //   }
    //   var filter = this.readyData.filter(
    //     item => {
    //       if(this.selectedValueReady=="organisation"){
    //         search= JSON.stringify(item.organisation)
    //       }else if(this.selectedValueReady=="emailIdBusinessSpoc"){
    //         search= JSON.stringify(item.emailIdBusinessSpoc)
    //       }else if(this.selectedValueReady=="mobileNumberBusinessSpoc"){
    //         search= JSON.stringify(item.mobileNumberBusinessSpoc)
    //       }else{
    //         search= JSON.stringify(item.organisation)
    //       }
    //      if(item&&search){
    //      return search.toLowerCase().indexOf(this.nameForReady.toLowerCase()) > -1
    //     }
    //     }
    //  )
     
    
    // this.filteredItemsForReady = filter
    // console.log("filter4",this.filteredItemsForReady)
    

    // }


    checkNewRequest(value){
      if(value == ""){
        this.filteredItems=this.dataOfNewRequests;
      }
    }
    checkApprove(value){
      if(value == ""){
        this.filteredItemsForApproved=this.newData;
      }
    }
    checkReject(value){
      if(value == ""){
        this.filteredItemsForRejected=this.rejectData;
      }
    }
    // checkReady(value){
    //   if(value == ""){
    //     this.filteredItemsForReady=this.readyData;
    //   }
    // }
    moveToProd(projectId){
      alert(projectId)
      // console.log("Project Id has been received",projectId);
      if(projectId!=null){
        this.checkListTab=false;
        this.router.navigate(["/authentication/checkproduction"]);
      }
  
    }
}
