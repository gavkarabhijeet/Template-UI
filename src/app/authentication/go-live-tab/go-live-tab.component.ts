import { Component, OnInit, HostListener } from '@angular/core';
import {
  MyProfileService
} from "../profile/profile.service";
import { Output, EventEmitter } from '@angular/core';
import { elementStyleProp } from '@angular/core/src/render3';
import { MakerService } from "../maker-page/maker-page.service";
import { hardcode } from "hardcodedata";
import { ThrowStmt } from '@angular/compiler';

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
  selector: 'app-go-live-tab',
  templateUrl: './go-live-tab2.component.html',
  styleUrls: ['./go-live-tab.component.css']
})
export class GoLiveTabComponent implements OnInit {
  // @HostListener('window:beforeunload', ['$event'])
  // public before() {
  //   return false
  // }
  // @HostListener('window:unload', ['$event'])
  // public after() {
  //   this.makerService.MyMethod()
  // }
  @Output() someEvent = new EventEmitter<string>();
  readyForProductionFlag: string ="false";
  showButton: boolean=true;
  initiateUATFlag: boolean;
  userData;
  dataOfUser;
  projectValue;
  getAppResponse;
  readyForProd:boolean=true;
  
  displayActivities: any[] = [{
    activity: " DevOps: Code Checked-Out",
    status: "code_checked_out SUCCESS"
  },
  {
    activity: "DevOps: Application Deployment Unit Created",
    status: "application_deployment_unit_created SUCCESS"
  },
  {
    activity: "DevOps: Application Deployment Unit Configuration Updated",
    status: "application_deployment_unit_configuration_updated SUCCESS"
  },
  {
    activity: "DevOps: Application Proxy Deployed (IBM APIC)",
    status: "application_proxy_deployed FAILED"
  },
  {
    activity: "DevOps: Application Deployed (IBM ACE)",
    status: "application_deployed FAILED"
  },
  {
    activity: "DevOps: Test Data Prepared",
    status: "code_checked_out FAILED"
  },
  {
    activity: "DevOps: Test Data Deployed",
    status: "code_checked_out FAILED"
  },
  {
    activity: "DevOps: Running Tests",
    status: "code_checked_out FAILED"
  },
  {
    activity: "DevOps: Test Run Completed",
    status: "code_checked_out FAILED"
  },
  {
    activity: "DevOps: Recording Test Results",
    status: "code_checked_out FAILED"
  }
  ];
  clientCode: any;
  projectId: string;
  projectName: any;
  version: any;
  productName: any;
  constructor(private makerService: MakerService, private myProfileService: MyProfileService) { }

  ngOnInit() {
   var uatCertified=localStorage.getItem("uatCertified");
   console.log("uatCertified",uatCertified);
   this.projectId=localStorage.getItem("projectId")
    this.userData = localStorage.getItem("data");
    this.dataOfUser = JSON.parse(this.userData);
  //   if (this.dataOfUser[0].productName == "iSurePay") {

  //     this.clientCode = clientCode;
  
  // }
  
  // else {
  
  //     this.clientCode = clientCode;
  
  // }
  this.clientCode = clientCode;
    console.log("PRINT : USER DATA OBJECT  ", this.dataOfUser);
    this.readyForProductionFlag = localStorage.getItem("status");
    
    console.log("PRINT : READY FOR PRODUCTION FLAG STATE", this.readyForProductionFlag);
    if (this.readyForProductionFlag == 'true') {
      console.log("Inside this function????")
      this.showButton = true;
      this.initiateUATFlag = true
     
    }
    else if(this.readyForProductionFlag == 'false'){
      console.log("Inside this function!!!")
      this.showButton = false;
      this.initiateUATFlag = false;
      this.myProfileService.getProjectById(this.projectId).then(data => {
        this.projectValue = data[0];
        console.log(" PROJECT DATA ", data[0]);
        this.projectName=data[0].projectName;
        this.version=data[0].version
        this.productName=data[0].productName

        console.log(" PROJECT NAME ", data[0].projectName)
        console.log("event name", data[0].event);
        if (data[0].status === "Ready for Production Request Initiated" || data[0].status === "Ready for Production Verified" ) {
            this.readyForProd = true;
            this.initiateUATFlag=true;
        }
        else if(data[0].event == null ||uatCertified == null){
          this.readyForProd=true;
          this.initiateUATFlag=false;
        }
        else if(data[0].event=="recording_test_results-UAT" || data[0].event ==="recording_test_results_TXN_REV-UAT") {
            this.readyForProd = false;
            this.initiateUATFlag=false;
        }
        else{
          this.readyForProd = true;
          this.initiateUATFlag=false;
        }

    });
  }
  }
  finalProcess(){

    this.initiateUATFlag = true;
          alert("ICICI Bank Implementation Team has been notified.")

          let flagData = {
            "projectId": this.dataOfUser[0].projectId,
            "status": "Ready for Production Request Initiated",


          }
          this.myProfileService.updateProjectData(flagData).then(data => {
            console.log("Update data -> ", data)
          })
          this.myProfileService.getApp(this.dataOfUser[0].projectId).then(data => {
            data[0].flag = "Ready for prod deployment"
            console.log("Getting application details with flag -> ", data);
            this.showButton=true;
            this.initiateUATFlag=true;

          });
          // console.log("flagData---->", flagData);

}
}
