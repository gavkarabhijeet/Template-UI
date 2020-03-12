import { Component, OnInit } from '@angular/core';
import { MakerComponentService } from './maker-component.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-maker-component',
  templateUrl: './maker-component.component.html',
  styleUrls: ['./maker-component.component.css']
})
export class MakerComponentComponent implements OnInit {
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

 
  recentActivity = [
    {
      date: "MM/DD/YYYY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
    },
    {
      date: "MM/DD/YYYY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
    },
    {
      date: "MM/DD/YYYY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
    },
    {
      date: "MM/DD/YYYY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
    }
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
  constructor(
    private makerService: MakerComponentService,
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
    this.userData = JSON.parse(localStorage.getItem("dataofUser"))
    this.firstName = this.userData[0].firstName
    if(localStorage.getItem("LastLoggedIn") != null){
      this.lastLoggedIn = new Date(localStorage.getItem("LastLoggedIn"))
      }
    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    this.makerService.getDetailsOfNotApproved().then(async data => {
      this.dataOfNewRequests = data;
      console.log("New Request data -> ", this.dataOfNewRequests);
      this.numberOfRequests = this.dataOfNewRequests.length;
      // console.log("Total Number of Request -> ", this.numberOfRequests);
    });

    this.makerService
      .getDetailsOfApproved()
      .then(async data => {
        this.dataOfApprovedRequest = data;
        console.log("this.dataOfApprovedRequest",this.dataOfApprovedRequest);
        for (let j = 0; j < this.dataOfApprovedRequest.length; j++) {
          // console.log("Extract Project Id -> ",this.dataOfApprovedRequest[j].projectId);
          if (
            this.dataOfApprovedRequest[j].projectId != undefined ||
            this.dataOfApprovedRequest[j].projectId != null
          ) {
            this.makerService
              .getProjectbyId(this.dataOfApprovedRequest[j].projectId)
              .then(data => {
                if (
                  data[0].status != undefined &&
                  data[0].status != null &&
                  data[0].status == "Ready for Production Request Initiated"
                ) {
                  this.listOfProductionInitiatedRequest.push(data[0]);
                  //  console.log("Track Iteration -> ",this.listOfProductionInitiatedRequest.length);
                } else if (
                  this.dataOfApprovedRequest[j].projectId == undefined ||
                  this.dataOfApprovedRequest[j].projectId == null
                ) {
                  // console.log("Status undefined  returning false beacuse status undefined");
                } else {
                  // console.log("Status else condition");
                }
              });
          } else {
            // console.log("Project id is undefined ,Return  false");
          }
        }
        console.log("this.data------",this.dataOfApprovedRequest)
        for (var i = 0; i < this.dataOfApprovedRequest.length; i++) {
          var value = this.dataOfApprovedRequest[i].makerApproval;
          console.log("value",value);
          console.log("data2",this.dataOfApprovedRequest[i]);
          if (value === true && this.dataOfApprovedRequest[i].roles[0] == "Customer") {
            this.newData.push(this.dataOfApprovedRequest[i]);
            console.log("---------->",this.newData);
            this.newData.reverse();
          }
          else{

          }
        }
       
        // console.log("--------------newData", this.newData);
      })
      .catch(e => {
        // console.log("print error -> ",e);
      });
  }

  moveToProd(projectId){
    alert(projectId)
    // console.log("Project Id has been received",projectId);
    if(projectId!=null){
      this.checkListTab=false;
      this.router.navigate(["/authentication/Checker"]);
    }

  }
  moreDetails(data) {
    this.gotData = data;
    this.dataOFUSER = JSON.stringify(this.gotData);
    localStorage.setItem("userDetails", this.dataOFUSER);
    // console.log("----------", this.gotData);
    this.makerService.getProjectbyId(this.gotData["projectId"]).then(data => {
      this.dataOfProject = data[0].projectId;
      localStorage.setItem("projectId", this.dataOfProject);

      this.router.navigate(["/authentication/makerDetails"]);
    });
  }
  toggleNavbar(){}
  increaseShow() {
    this.show += 10;
  }

  decreaseShow() {
    this.show -= 10;
  }
}
