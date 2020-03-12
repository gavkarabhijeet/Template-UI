import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  HostListener
} from "@angular/core";
import {
  MyProfileService
} from "./profile.service";
import {
  ActivatedRoute, NavigationExtras
} from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import {
  NgxSpinnerService
} from "ngx-spinner";
import { NgbModalConfig , NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Router
} from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule
} from "@angular/forms";
import { config } from "config";
import { MakerService } from "../maker-page/maker-page.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
  // @HostListener('window:beforeunload', ['$event'])
  // public before() {
  //   return false
  // }
  // @HostListener('window:unload', ['$event'])
  // public after() {
  //   this.makerService.MyMethod()
  // }
  version: string = config.version;
  getAppResponse;
  queryparamProjectId: any;
  error: String;
  getAuditTrailResponse; //property declared for audit trail output binding
  timeLine: any = [];
  timeLineFinalArray: any; //This property is used for final time line display
  show = 2;
  hide = 2;
  dataValue;
  appResponseData = [];
  dataValueServices;
  serviceResponseData = [];
  userData;
  dataOfUser;
  username: any;
  organisationName: any;
  public navbarOpen: boolean;
  enableTransactionReversalFileProcessing: boolean;


  stopRequest: boolean = false;
  testingTab = false;
  initiateUATFlag: any = "false";
  activeTabName = 'tab2'
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
  datta: string;
  appData: any;
  descriptionValue: any;
  featureName: any;
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
  communicationProtocolArray = [{
    name: "HTTP",
    value: "HTTP"
  },
  {
    name: "HTTPS",
    value: "HTTPS"
  }
  ];
  disableInput: any = true;
  serviceNameOfUser: any;
  clientCodeIPS: string;
  clientCode: string;
  clientCodeProfunds: string;
  readyForProductionFlag: string ="false";
  showButton: boolean;
  summaryServiceName: any;
  valueD: any;
  updateProductionData: FormGroup;
  updateProductionDataiSurePay: FormGroup;
  prodFile1: any;
  prodFile2: any;
  dataOfProduction: any;
  prodFileName1: any;
  prodFileName2: any;
  httpCertificate: any;
  httpCertificatName: any;
  tab: any;
  firstName: any;
  lastLoggedIn: Date;
  fileFlag: string;
  fileFlag2: string;
  uatfileEmpty:boolean = false;
  uatFileName1: any;
  uatFile1: any;
  fileFlagUAT1: string;
  uatFileName2: any;
  uatFile2: any;
  fileFlagUAT2: string;
  projectId: string;
  serviceName: string;
  constructor(
    private makerService: MakerService,
    private myProfileService: MyProfileService,
    private router: Router,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    configure: NgbModalConfig
  ) {
    this.actRoute.queryParams.subscribe(params => {
      this.queryparamProjectId = params['projectId'];
      // console.log("Project id fromQuery params using ActivatedRoute ->", this.queryparamProjectId);
      localStorage.setItem("projectId", this.queryparamProjectId);
    });
    configure.backdrop = 'static';
    configure.keyboard = false;

  }
  /**
     * @author Kuldeep 
     * @description This function is used to logout the user 
     */
  logout() {
    this.myProfileService.logout(this.userData).then(logout => {
      console.log("logout", logout);
      localStorage.clear();
      this.router.navigateByUrl('/authentication/Home');
    })
  }

  ngOnInit() {
    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    this.projectId=localStorage.getItem("projectId")
    this.serviceName=localStorage.getItem("serviceName")

    

    this.updateProductionData = this.fb.group({
      'hostNameProd': ["", [Validators.required]],
      'prodIp': [
        "",
        [Validators.required, Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
      ],
      'prodPort': ['9443',
        [
          Validators.required, Validators.pattern(
            /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
          )
        ]],
      'serviceTimeOutProd1': ["", [Validators.required, Validators.pattern(/^[0-9]{0,}$/)]],
      'serviceUrlProd1': [
        "",
        [
          Validators.required, Validators.pattern(
            /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
          )
        ]
      ],
      'serviceNameProd1': ['', [Validators.required]],
      'httpCertificate': [],
      'prodFile1': [],
      'serviceTimeOutProd2': ["", [Validators.pattern(/^[0-9]{0,}$/)]],
      'serviceUrlProd2': ["", [Validators.pattern(
        /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]
      ],
      'serviceNameProd2': [""],
      'prodFile2': [],
      'serviceTimeOutUAT1': ["", [ Validators.pattern(/^[0-9]{0,}$/)]],
      'serviceUrlUAT1': [
        "",
        [
           Validators.pattern(
            /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
          )
        ]
      ],
      'serviceNameUAT1': ['', ],
      'serviceTimeOutUAT2': ["", [ Validators.pattern(/^[0-9]{0,}$/)]],
      'serviceUrlUAT2': [
        "",
        [
           Validators.pattern(
            /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
          )
        ]
      ],
      'serviceNameUAT2': [''],
      'uatFile1':[],
      'uatFile2':[]
    })


    this.updateProductionDataiSurePay = this.fb.group({
      'hostNameProd': ["", [Validators.required]],
      'prodIp': [
        "",
        [Validators.required, Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
      ],
      'prodPort': ['9443',
        [
          Validators.required, Validators.pattern(
            /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
          )
        ]],
      'serviceTimeOutProd1': ["", [Validators.required, Validators.pattern(/^[0-9]{0,}$/)]],
      'serviceUrlProd1': [
        "",
        [
          Validators.required, Validators.pattern(
            /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
          )
        ]
      ],
      'httpCertificate': [''],
      'serviceNameProd1': ['', [Validators.required]],
      'prodFile1': [],
      'serviceTimeOutProd2': ["", [Validators.required, Validators.pattern(/^[0-9]{0,}$/)]],
      'serviceUrlProd2': [
        "",
        [
          Validators.required, Validators.pattern(
            /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
          )
        ]
      ],
      'serviceNameProd2': ["", [Validators.required]],
      'prodFile2': [],
      'serviceTimeOutUAT1': ["", [ Validators.pattern(/^[0-9]{0,}$/)]],
      'serviceUrlUAT1': [
        "",
        [
          Validators.pattern(
            /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
          )
        ]
      ],
      'serviceNameUAT1': ['', ],
      'serviceTimeOutUAT2': ["", [ Validators.pattern(/^[0-9]{0,}$/)]],
      'serviceUrlUAT2': [
        "",
        [
          Validators.pattern(
            /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
          )
        ]
      ],
      'serviceNameUAT2': ['', ],
      'uatFile1':[],
      'uatFile2':[]
    })

    // changes made by sanchita
    this.readyForProductionFlag = localStorage.getItem("status");

    console.log("PRINT : READY FOR PRODUCTION FLAG STATE", this.readyForProductionFlag);
    if (this.readyForProductionFlag == 'true') {
      console.log("Inside this function????")
      this.showButton = true;
      this.initiateUATFlag = "true"
    }
    else if(this.readyForProductionFlag == 'false'){
      console.log("Inside this function!!!")
      this.showButton = false;
      this.initiateUATFlag = "false";

    }
console.log("this.initiateUATFlag",this.initiateUATFlag);
    var tabId = this.displayActivities[3].status.split("_").pop();
    this.stopRequest = false;
    this.userData = localStorage.getItem("data");
    this.dataOfUser = JSON.parse(this.userData);
    console.log("PRINT : USER DATA OBJECT  ", this.dataOfUser);
    this.firstName = this.dataOfUser.firstNameBusinessSpoc
    console.log("PRINT : BUSSINESS SPOC ", this.dataOfUser.firstNameBusinessSpoc)
    if (localStorage.getItem("LastLoggedIn") != null) {
      this.lastLoggedIn = new Date(localStorage.getItem("LastLoggedIn"))
    }


    this.serviceNameOfUser = this.dataOfUser.serviceName;
    this.enableTransactionReversalFileProcessing = this.dataOfUser.enableTransactionReversalFileProcessing
    this.clientCodeIPS = this.dataOfUser.clientCodeIPS;

    this.clientCodeProfunds = this.dataOfUser.clientCodeProfund;
    if (this.enableTransactionReversalFileProcessing == false) {
      localStorage.setItem("clientCode", this.clientCodeProfunds);
    }
    else {
      localStorage.setItem("clientCode", this.clientCodeIPS);
    }

    this.myProfileService.getApp(this.queryparamProjectId).then(async data => {
      this.getAppResponse = data;

      for (var i = 0; i < this.getAppResponse.length; i++) {
        if (
          this.dataOfUser.organisation === this.getAppResponse[i].orgName
        ) {
          for (var j = 0; j < this.getAppResponse[i].products.length; j++) {
            var productId = this.getAppResponse[i].products[0].productId;

            this.myProfileService.getProductById(productId).then(data => {
              this.dataValue = data;
              this.featureName = this.dataValue[0].serviceName;
              this.appResponseData.push(this.dataValue[0]);
              this.descriptionValue = this.dataValue[0].description;
            });
          }
        }
      }
      for (var i = 0; i < this.getAppResponse.length; i++) {
        for (
          var j = 0; j < this.getAppResponse[i].products[0].services.length; j++
        ) {
          var serviceId = this.getAppResponse[i].products[0].services[0]
            .serviceId;
          if (
            this.dataOfUser.organisation === this.getAppResponse[i].orgName
          ) {
            this.myProfileService.getServiceById(serviceId).then(data => {
              this.dataValueServices = data;
              this.serviceResponseData.push(this.dataValueServices[0]);
            });
          }
        }
      }

    });
    this.myProfileService.getAuditTrailByProjectId(this.queryparamProjectId).then(async data => {
      let lengthOfauditTrail = data.length;
      this.getAuditTrailResponse = data;
      console.log("PRINT : AUDIT TRAIL DATA", this.getAuditTrailResponse)
      for (let t = 0; t < lengthOfauditTrail; t++) {
        console.log("inside the value check");
        console.log("status",this.getAuditTrailResponse[t].status);
        if (this.getAuditTrailResponse[t].status == "Draft") {
          var  prepareTimeLineObject = [
            {
              "orgName": this.getAuditTrailResponse[t].orgName,
              "projectId": this.getAuditTrailResponse[t].projectId,
              "status": "Subscription Request Raised",
              "timeStamp": this.getAuditTrailResponse[t].timeStamp
            }
          ]
          await this.timeLine.push(prepareTimeLineObject);
          this.timeLineFinalArray = this.timeLine[0];
          break;
        } else {
          let errorForTimeLine = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "No status updated",

          }
          await this.timeLine.push(errorForTimeLine);
          this.timeLineFinalArray = this.timeLine[0];
          break;
        }

      }
      // for (let t = 0; t < lengthOfauditTrail; t++) {
      //   if (this.getAuditTrailResponse[t].status == "Ready for Transformation") {
      //     let prepareTimeLineObject2 =
      //     {
      //       "orgName": this.getAuditTrailResponse[t].orgName,
      //       "projectId": this.getAuditTrailResponse[t].projectId,
      //       "status": this.getAuditTrailResponse[t].status,
      //       "timeStamp": this.getAuditTrailResponse[t].timeStamp
      //     }
      //     await this.timeLine[0].push(prepareTimeLineObject2);
      //     this.timeLineFinalArray = this.timeLine[0];
      //     break;
      //   }
      // }

      for (let t = 0; t < lengthOfauditTrail; t++) {
        if (this.getAuditTrailResponse[t].status == "Subscription Request Approved") {
          let prepareTimeLineObject2 =
          {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": this.getAuditTrailResponse[t].status,
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          await this.timeLine[0].push(prepareTimeLineObject2);
          this.timeLineFinalArray = this.timeLine[0];

          break;
        }
      }

      for (let t = 0; t < lengthOfauditTrail; t++) {
        if (this.getAuditTrailResponse[t].status == "Ready for Deployment-SIT") {
          let prepareTimeLineObject2 = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": this.getAuditTrailResponse[t].status,
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          await this.timeLine[0].push(prepareTimeLineObject2);
          this.timeLineFinalArray = this.timeLine[0];
          break;
        }
      }

      for (let t = 0; t < lengthOfauditTrail; t++) {
        if (this.getAuditTrailResponse[t].status == "Ready for Deployment-UAT") {
          let prepareTimeLineObject2 = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": this.getAuditTrailResponse[t].status,
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          await this.timeLine[0].push(prepareTimeLineObject2);
          this.timeLineFinalArray = this.timeLine[0];
          break;
        }
      }

      for (let t = 0; t < lengthOfauditTrail; t++) {

        if (this.getAuditTrailResponse[t].status == "Ready for Production Request Initiated") {
          let prepareTimeLineObject2 = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": this.getAuditTrailResponse[t].status,
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          await this.timeLine[0].push(prepareTimeLineObject2);
          this.timeLineFinalArray = this.timeLine[0];
          break;
        }

      }
      for (let t = 0; t < lengthOfauditTrail; t++) {

        if (this.getAuditTrailResponse[t].status == " Ready for Production Verified") {
          let prepareTimeLineObject2 = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": this.getAuditTrailResponse[t].status,
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          await this.timeLine[0].push(prepareTimeLineObject2);
          this.timeLineFinalArray = this.timeLine[0];
          return true;
        }

      }

    });



    this.actRoute.queryParams.subscribe((params) => {
      if (params.tab) {
        this.tab = params.tab;
        console.log("PRINT : Tab property", this.tab);
        this.nextTab(this.tab);
        console.log("PRINT : Move to Go Live");

      }
    });
    // var content="#contentForProd"
    // this.initiateProd(content);

    // this.modalService.open("#contentForProd", { size: 'lg' });

  $('#initiateProdButton').click();
    

  }

  nextTab(msg) {
    console.log("Next Tab Parent: ", msg)
    this.testingTab = false;
    this.activeTabName = msg
  }

  fetchTabChange(event) {
    // console.log("Active Id: ", event.nextId)
    this.activeTabName = event.nextId
  }

  mappingPage() {
    this.router.navigate(["/authentication/mapping"]);
  }
  toggleNavbar() {

  }
  goToOverView() {
    this.router.navigate(["/authentication/user-profile"]);
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
    this.show -= 1;
  }
  editProject(contentForProd) {
    this.modalService.open(contentForProd, { size: 'lg' });
    // this.fileUploadProjectName = data.projectId;
  }


  initiateProd(dataOFModal) {
    this.userData = JSON.parse(localStorage.getItem("data"));
    console.log("---------->", this.userData);
    this.myProfileService.getApp(this.projectId).then(data => {
      console.log("projectData after api call", data);
      this.getAppResponse = data;

      try {
        if(data[0].products[0].services[0].uatFile1 == ''){
                this.uatfileEmpty=true;
        }
        if (data[0].products[0].services[0].hostNameProd == '' || data[0].products[0].services[0].prodIp == '' || data[0].products[0].services[0].prodPort == '' || data[0].products[0].services[0].prodFile1 == '' && data[0].status != "Ready for Production Request Initiated") {
          console.log("into initiate prod");

          var id = data[0].products[0].services[0].serviceId;
          this.myProfileService.getServiceById(id).then((servicedata) => {
            console.log("data", servicedata);
            this.summaryServiceName = servicedata[0].serviceName;
          })
          // var contentForProd=contentForProd;
          this.editProject(dataOFModal);
          // this.initiateUATFlag = "false";

        }
        else {

       
      
        }
      } catch (e) {
        console.log("PRINT : EXCEPTION IN PRODUCTION PAGE")
      }

    });
  }
  

  finalProcess(){

    this.initiateUATFlag = "true";
          alert("ICICI Bank Implementation Team has been notified.")

          let flagData = {
            "projectId": this.projectId,
            "status": "Ready for Production Request Initiated",



          }
          this.myProfileService.updateProjectData(flagData).then(data => {
            console.log("Update data -> ", data)
          })
          this.myProfileService.getApp(this.getAppResponse[0].projectId).then(data => {
            data[0].flag = "Ready for prod deployment"
            console.log("Getting application details with flag -> ", data);
            this.showButton=true;
          });
          console.log("this.dataOfProduction---->", this.getAppResponse);

}

  methodType(value) {
    // console.log(`method ------${value}`);
    if (value == 'HTTP') {
      this.updateProductionData.get('httpCertificate').clearValidators();
      this.updateProductionDataiSurePay.get('httpCertificate').clearValidators();
      this.valueD = value;
      this.disableInput = true
    } else {
      this.updateProductionData.get('httpCertificate').setValidators([Validators.required]);
      this.updateProductionDataiSurePay.get('httpCertificate').setValidators([Validators.required]);

      this.valueD = value;
      this.disableInput = false

    }
    this.updateProductionData.get('httpCertificate').updateValueAndValidity();
    this.updateProductionDataiSurePay.get('httpCertificate').updateValueAndValidity();


  }
  /**
  * @author Sanchtia 
  * @description This function will be used to update the production data of eCollection
  */
  productionDetails(data) {
    console.log("summaryServiceName::", this.serviceName);
    console.log("data", data);


    if (this.serviceName == 'ECollection Intimation' || this.serviceName == 'ECollection with Remitter Validation' || this.serviceName == 'ECollection with Remitter Validation in Intermediary Account') {
      if (this.valueD == 'HTTP') {
        this.dataOfProduction = {
          'hostNameProd': data.hostNameProd,
          'prodIp': data.prodIp,
          'prodPort': data.prodPort,
          'serviceTimeOutProd1': data.serviceTimeOutProd1,
          'serviceUrlProd1': data.serviceUrlProd1,
          'communicationProtocolProd': this.valueD,
          'serviceNameProd1': data.serviceNameProd1,
          'prodFile1': this.prodFileName1
        }
      }
      else {
        this.dataOfProduction = {
          'hostNameProd': data.hostNameProd,
          'prodIp': data.prodIp,
          'prodPort': data.prodPort,
          'serviceTimeOutProd1': data.serviceTimeOutProd1,
          'serviceUrlProd1': data.serviceUrlProd1,
          'communicationProtocolProd': this.valueD,
          'serviceNameProd1': data.serviceNameProd1,
          'httpCertificate': this.httpCertificatName,
          'prodFile1': this.prodFileName1
        }
        console.log("this.dataOfProduction", this.dataOfProduction);
      }
      console.log("this.dataOfProduction", this.dataOfProduction);
      console.log("PRINT getAppResponse----->", this.getAppResponse);
     
      console.log("this.dataOfProduction",this.dataOfProduction);
    this.getAppResponse[0].products[0].services[0].communicationProtocolProd=this.dataOfProduction.communicationProtocolProd;
    this.getAppResponse[0].products[0].services[0].hostNameProd = this.dataOfProduction.hostNameProd;
      this.getAppResponse[0].products[0].services[0].prodIp = this.dataOfProduction.prodIp;
      this.getAppResponse[0].products[0].services[0].prodPort = this.dataOfProduction.prodPort;
      this.getAppResponse[0].products[0].services[0].serviceNameInputProd = this.dataOfProduction.serviceNameProd1;
      this.getAppResponse[0].products[0].services[0].serviceTimeOutProd = this.dataOfProduction.serviceTimeOutProd1;
      this.getAppResponse[0].products[0].services[0].serviceURLProd = this.dataOfProduction.serviceUrlProd1;
      this.getAppResponse[0].products[0].services[0].prodFile1 = this.dataOfProduction.prodFile1;
      if(this.uatfileEmpty == true){
        this.getAppResponse[0].products[0].services[0].uatFile1=this.uatFileName1,
        this.getAppResponse[0].products[0].services[0].serviceNameInputUAT=data.serviceNameUAT1,
        this.getAppResponse[0].products[0].services[0].serviceTimeOutUAT=data.serviceTimeOutUAT1,
        this.getAppResponse[0].products[0].services[0].serviceURLUAT=data.serviceUrlUAT1
      }
    
      console.log("PRINT getAppResponse----->", this.getAppResponse);

      this.myProfileService.putProjectData(this.getAppResponse[0]).then((data) => {
        console.log("data", data);
        const formData1: any = new FormData();
        formData1.append('files', this.uatFile1);
        var fileType="uatFile1"
        this.myProfileService.uploadFile(this.getAppResponse[0].projectId, formData1,fileType).then((data) => {
          console.log("---------", data);
      
        })
        const formData: any = new FormData();
        formData.append('files', this.prodFile1);
        var fileType="prodFile1"
        this.myProfileService.uploadFile(this.getAppResponse[0].projectId, formData,fileType).then((data) => {
          console.log("---------", data);
      
        })
      })

      this.modalService.dismissAll();
    }
    else {
      if (this.valueD == 'HTTP') {
        this.dataOfProduction = {
          'hostNameProd': data.hostNameProd,
          'prodIp': data.prodIp,
          'prodPort': data.prodPort,
          'serviceTimeOutProd1': data.serviceTimeOutProd1,
          'serviceUrlProd1': data.serviceUrlProd1,
          'serviceNameProd1': data.serviceNameProd1,
          'communicationProtocolProd': this.valueD,
          'prodFile1': this.prodFileName1,
          'serviceTimeOutProd2': data.serviceTimeOutProd2,
          'serviceUrlProd2': data.serviceUrlProd2,
          'serviceNameProd2': data.serviceNameProd2,
          'prodFile2': this.prodFileName2
        }
        console.log("this.dataOfProduction", this.dataOfProduction);

      }
      else {
        this.dataOfProduction = {
          'hostNameProd': data.hostNameProd,
          'prodIp': data.prodIp,
          'prodPort': data.prodPort,
          'serviceTimeOutProd1': data.serviceTimeOutProd1,
          'serviceUrlProd1': data.serviceUrlProd1,
          'serviceNameProd1': data.serviceNameProd1,
          'communicationProtocolProd': this.valueD,
          'prodFile1': this.prodFileName1,
          'httpCertificate': this.httpCertificatName,
          'serviceTimeOutProd2': data.serviceTimeOutProd2,
          'serviceUrlProd2': data.serviceUrlProd2,
          'serviceNameProd2': data.serviceNameProd2,
          'prodFile2': this.prodFileName2
        }
        console.log("this.dataOfProduction", this.dataOfProduction);
      }
      this.getAppResponse[0].products[0].services[0].hostNameProd = this.dataOfProduction.hostNameProd;
      this.getAppResponse[0].products[0].services[0].prodIp = this.dataOfProduction.prodIp;
      this.getAppResponse[0].products[0].services[0].prodPort = this.dataOfProduction.prodPort;
      this.getAppResponse[0].products[0].services[0].communicationProtocolProd=this.dataOfProduction.communicationProtocolProd;

      this.getAppResponse[0].products[0].services[0].serviceTimeOutProd = this.dataOfProduction.serviceTimeOutProd1;
      this.getAppResponse[0].products[0].services[0].serviceNameInputProd = this.dataOfProduction.serviceNameProd1;
      this.getAppResponse[0].products[0].services[0].serviceURLProd = this.dataOfProduction.serviceUrlProd1;
      this.getAppResponse[0].products[0].services[0].prodFile1 = this.dataOfProduction.prodFile1;
      this.getAppResponse[0].products[0].services[0].serviceTimeOutProd2 = this.dataOfProduction.serviceTimeOutProd2;
      this.getAppResponse[0].products[0].services[0].serviceNameInputProd2 = this.dataOfProduction.serviceNameProd2;
      this.getAppResponse[0].products[0].services[0].serviceURLProd2 = this.dataOfProduction.serviceUrlProd2;
      this.getAppResponse[0].products[0].services[0].prodFile2 = this.dataOfProduction.prodFile2;
      if(this.uatfileEmpty == true){
        this.getAppResponse[0].products[0].services[0].uatFile1=this.uatFileName1,
        this.getAppResponse[0].products[0].services[0].serviceNameInputUAT=data.serviceNameUAT1,
        this.getAppResponse[0].products[0].services[0].serviceTimeOutUAT=data.serviceTimeOutUAT1,
        this.getAppResponse[0].products[0].services[0].serviceURLUAT=data.serviceUrlUAT1,
        this.getAppResponse[0].products[0].services[0].serviceNameInputUAT2=data.serviceNameUAT2,
        this.getAppResponse[0].products[0].services[0].serviceTimeOutUAT2=data.serviceTimeOutUAT2,
        this.getAppResponse[0].products[0].services[0].serviceURLUAT2=data.serviceURLUAT2,
        this.getAppResponse[0].products[0].services[0].uatFile2=this.uatFileName2


      }
      console.log("PRINT getAppResponse----->", this.getAppResponse);
      const formData1: any = new FormData();
      formData1.append('files', this.uatFile1);
      var fileType="uatFile1"
      this.myProfileService.uploadFile(this.getAppResponse[0].projectId, formData1,fileType).then((data) => {
        console.log("---------", data);
    
      });
      const formData2: any = new FormData();
      formData2.append('files', this.uatFile2);
      var fileType="uatFile2"
      this.myProfileService.uploadFile(this.getAppResponse[0].projectId, formData2,fileType).then((data) => {
        console.log("---------", data);
    
      });

      this.myProfileService.putProjectData(this.getAppResponse[0]).then((data) => {
        console.log("data", data);
        const formData: any = new FormData();
        formData.append('files', this.prodFile1);
        var fileType="prodFile1";
        this.myProfileService.uploadFile(this.getAppResponse[0].projectId, formData,fileType).then((data) => {
          console.log("---------", data);
          const formData1: any = new FormData();
          formData1.append('files', this.prodFile2);
          var fileType2="prodFile2";
          this.myProfileService.uploadFile(this.getAppResponse[0].projectId, formData1,fileType2).then((data) => {
            console.log("---------", data);
           

          })
        })
      })

      this.modalService.dismissAll();
    }
  }
  /**
  * @author Sanchita 
  * @description This function will be used to update the production Data of iSurePay
  */
  productionDetailsiSurePay(data) {
    console.log("data", data);
    if (this.valueD == 'HTTP') {
      this.dataOfProduction = {
        'hostNameProd': data.hostNameProd,
        'prodIp': data.prodIp,
        'prodPort': data.prodPort,
        'serviceTimeOutProd1': data.serviceTimeOutProd1,
        'serviceUrlProd1': data.serviceUrlProd1,
        'serviceNameProd1': data.serviceNameProd1,
        'communicationProtocolProd': this.valueD,
        'prodFile1': this.prodFileName1,
        'serviceTimeOutProd2': data.serviceTimeOutProd2,
        'serviceUrlProd2': data.serviceUrlProd2,
        'serviceNameProd2': data.serviceNameProd2,
        'prodFile2': this.prodFileName2
      }
      console.log("this.dataOfProduction", this.dataOfProduction);
    }
    else {
      this.dataOfProduction = {
        'hostNameProd': data.hostNameProd,
        'prodIp': data.prodIp,
        'prodPort': data.prodPort,
        'serviceTimeOutProd1': data.serviceTimeOutProd1,
        'serviceUrlProd1': data.serviceUrlProd1,
        'serviceNameProd1': data.serviceNameProd1,
        'communicationProtocolProd': this.valueD,
        'prodFile1': this.prodFileName1,
        'serviceTimeOutProd2': data.serviceTimeOutProd2,
        'serviceUrlProd2': data.serviceUrlProd2,
        'serviceNameProd2': data.serviceNameProd2,
        'prodFile2': this.prodFileName2,
        'httpCertificate': this.httpCertificatName
      }
      console.log("this.dataOfProduction", this.dataOfProduction);
    }
    this.getAppResponse[0].products[0].services[0].hostNameProd = this.dataOfProduction.hostNameProd;
    this.getAppResponse[0].products[0].services[0].prodIp = this.dataOfProduction.prodIp;
    this.getAppResponse[0].products[0].services[0].prodPort = this.dataOfProduction.prodPort;
    this.getAppResponse[0].products[0].services[0].communicationProtocolProd=this.dataOfProduction.communicationProtocolProd;
    this.getAppResponse[0].products[0].services[0].serviceTimeOutProd = this.dataOfProduction.serviceTimeOutProd1;
    this.getAppResponse[0].products[0].services[0].serviceNameInputProd = this.dataOfProduction.serviceNameProd1;
    this.getAppResponse[0].products[0].services[0].serviceURLProd = this.dataOfProduction.serviceUrlProd1;
    this.getAppResponse[0].products[0].services[0].prodFile1 = this.dataOfProduction.prodFile1;
    this.getAppResponse[0].products[0].services[0].serviceTimeOutProd2 = this.dataOfProduction.serviceTimeOutProd2;
    this.getAppResponse[0].products[0].services[0].serviceNameInputProd2 = this.dataOfProduction.serviceNameProd2;
    this.getAppResponse[0].products[0].services[0].serviceURLProd2 = this.dataOfProduction.serviceUrlProd2;
    this.getAppResponse[0].products[0].services[0].prodFile2 = this.dataOfProduction.prodFile2;
    if(this.uatfileEmpty == true){
      this.getAppResponse[0].products[0].services[0].uatFile1=this.uatFileName1,
      this.getAppResponse[0].products[0].services[0].serviceNameInputUAT=data.serviceNameUAT1,
      this.getAppResponse[0].products[0].services[0].serviceTimeOutUAT=data.serviceTimeOutUAT1,
      this.getAppResponse[0].products[0].services[0].serviceURLUAT=data.serviceUrlUAT1,
      this.getAppResponse[0].products[0].services[0].serviceNameInputUAT2=data.serviceNameUAT2,
      this.getAppResponse[0].products[0].services[0].serviceTimeOutUAT2=data.serviceTimeOutUAT2,
      this.getAppResponse[0].products[0].services[0].serviceURLUAT2=data.serviceURLUAT2,
      this.getAppResponse[0].products[0].services[0].uatFile2=this.uatFileName2
    }

    const formData1: any = new FormData();
    formData1.append('files', this.uatFile1);
    var fileType="uatFile1"
    this.myProfileService.uploadFile(this.getAppResponse[0].projectId, formData1,fileType).then((data) => {
      console.log("---------", data);
      const formData2: any = new FormData();
      formData2.append('files', this.uatFile2);
      var fileType="uatFile2"
      this.myProfileService.uploadFile(this.getAppResponse[0].projectId, formData2,fileType).then((data) => {
        console.log("---------", data);
    
      });
    });
   
    console.log("PRINT getAppResponse----->", this.getAppResponse);
    this.myProfileService.putProjectData(this.getAppResponse[0]).then((data) => {
      console.log("data isure", data);
      const formData: any = new FormData();
      formData.append('files', this.prodFile1);
      var fileType1="prodFile1";
      this.myProfileService.uploadFile(this.getAppResponse[0].projectId, formData,fileType1).then((data) => {
        console.log("---------", data);
        const formData1: any = new FormData();
        formData1.append('files', this.prodFile2);
        var fileType2="prodFile2";
        this.myProfileService.uploadFile(this.getAppResponse[0].projectId, formData1,fileType2).then((data) => {
          
        })
      })
    })

    this.modalService.dismissAll();
  }
  /**
  * @author Sanchita 
  * @description This function to upload File 
  */
  prodUpload1() {
    $(document).ready(function () {
      $("#prodUpload1").trigger("click");
    })
  }
  uatUpload1(){
    $(document).ready(function () {
      $("#uatUpload1").trigger("click");
    })
  }
  uatUpload1Uploaded($event) {
    this.uatFile1 = $event.target.files[0];
    this.uatFileName1 = $event.target.files[0].name;

    if (this.getAppResponse[0].productName == 'eCollections') {
      var ext = this.uatFileName1.substring(this.uatFileName1.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {

        this.uatFile1 = $event.target.files[0];
        console.log("ok")
        this.fileFlagUAT1 = "properFile";

        this.updateProductionData.controls["uatFile1"].setValue(
          $event.target.files[0].name

        );
      }
      else {
        this.fileFlagUAT1 = "notproperFile";
        console.log("invalid")


      }
    }
    else if (this.getAppResponse[0].productName == 'iSurePay') {
      var ext = this.uatFileName1.substring(this.uatFileName1.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {

        this.uatFile1 = $event.target.files[0];
        console.log("ok")
        this.fileFlagUAT1 = "properFile";

        this.updateProductionDataiSurePay.controls["uatFile1"].setValue(
          $event.target.files[0].name

        );
      }
      else {
        this.fileFlagUAT1 = "notproperFile";
        console.log("invalid")


      }
    }

  }
  uatUpload2(){
    $(document).ready(function () {
      $("#uatUpload2").trigger("click");
    })
  }
  uatUpload2Uploaded($event) {
    this.uatFile2 = $event.target.files[0];
    this.uatFileName2 = $event.target.files[0].name;

    if (this.getAppResponse[0].productName == 'eCollections') {
      var ext = this.uatFileName2.substring(this.uatFileName2.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {

        this.uatFile2 = $event.target.files[0];
        console.log("ok")
        this.fileFlagUAT2 = "properFile";

        this.updateProductionData.controls["uatFile2"].setValue(
          $event.target.files[0].name

        );
      }
      else {
        this.fileFlagUAT2 = "notproperFile";
        console.log("invalid")


      }
    }
    else if (this.getAppResponse[0].productName == 'iSurePay') {
      var ext = this.uatFileName2.substring(this.uatFileName2.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {

        this.uatFile2 = $event.target.files[0];
        console.log("ok")
        this.fileFlagUAT2 = "properFile";

        this.updateProductionDataiSurePay.controls["uatFile2"].setValue(
          $event.target.files[0].name

        );
      }
      else {
        this.fileFlagUAT2 = "notproperFile";
        console.log("invalid")


      }
    }

  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in prodFile1 variable.
   */
  prodUpload1Uploaded($event) {
    this.prodFile1 = $event.target.files[0];
    this.prodFileName1 = $event.target.files[0].name;

    if (this.getAppResponse[0].productName == 'eCollections') {
      var ext = this.prodFileName1.substring(this.prodFileName1.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {

        this.prodFile1 = $event.target.files[0];
        console.log("ok")
        this.fileFlag = "properFile";

        this.updateProductionData.controls["prodFile1"].setValue(
          $event.target.files[0].name

        );
      }
      else {
        this.fileFlag = "notproperFile";
        console.log("invalid")


      }
    }
    else if (this.getAppResponse[0].productName == 'iSurePay') {
      var ext = this.prodFileName1.substring(this.prodFileName1.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {

        this.prodFile1 = $event.target.files[0];
        console.log("ok")
        this.fileFlag = "properFile";

        this.updateProductionDataiSurePay.controls["prodFile1"].setValue(
          $event.target.files[0].name

        );
      }
      else {
        this.fileFlag = "notproperFile";
        console.log("invalid")


      }
    }

  }
  /**
  * @author Sanchita 
  * @description This function to upload File 
  */
  prodUpload2() {
    $(document).ready(function () {
      $("#prodUpload2").trigger("click");
    })
  }
  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in prodFile1 variable.
   */
  prodUpload2Uploaded($event) {
    this.prodFile2 = $event.target.files[0];
    this.prodFileName2 = $event.target.files[0].name;

    if (this.getAppResponse[0].productName == 'eCollections') {
      var ext1 = this.prodFileName2.substring(this.prodFileName2.lastIndexOf('.') + 1);
      if (ext1.toLowerCase() == 'yaml' || ext1.toLowerCase() == 'wsdl') {

        this.prodFile2 = $event.target.files[0];
        console.log("ok")
        this.fileFlag2 = "properFile";

        this.updateProductionData.controls["prodFile2"].setValue(
          $event.target.files[0].name

        );
      }
      else {
        this.fileFlag2 = "notproperFile";
        console.log("invalid")


      }
    }
    else if (this.getAppResponse[0].productName == 'iSurePay') {
      var ext1 = this.prodFileName2.substring(this.prodFileName2.lastIndexOf('.') + 1);
      if (ext1.toLowerCase() == 'yaml' || ext1.toLowerCase() == 'wsdl') {

        this.prodFile2 = $event.target.files[0];
        console.log("ok")
        this.fileFlag2 = "properFile";

        this.updateProductionDataiSurePay.controls["prodFile2"].setValue(
          $event.target.files[0].name

        );
      }
      else {
        this.fileFlag2 = "notproperFile";
        console.log("invalid")


      }
    }

  }
  httpsProdUpload1() {
    $(document).ready(function () {
      $("#httpsProdUpload1").trigger("click");
    })
  }
  httpsUpload1Uploaded($event) {
    this.httpCertificatName = $event.target.files[0];
    this.httpCertificatName = $event.target.files[0].name;

    if (this.getAppResponse[0].productName == 'eCollections') {
      this.updateProductionData.controls['httpCertificate'].setValue($event.target.files[0].name);
    }
    else if (this.getAppResponse[0].productName == 'iSurePay') {
      this.updateProductionDataiSurePay.controls['httpCertificate'].setValue($event.target.files[0].name);
    }

  }
  //changes by sanchita ends
  goToCreateApp() {
    var projectId;
    this.actRoute.queryParams.subscribe(params => {
      projectId = params['projectId'];
      console.log("projectId: ", projectId)
      let navigationExtras: NavigationExtras = {
        queryParams: { 'projectId': projectId }
      };
      this.router.navigate(['/create-app/createApp'], navigationExtras);
    });
  }

}