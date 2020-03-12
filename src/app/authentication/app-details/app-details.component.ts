import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild,
  ElementRef
} from "@angular/core";
import '@polymer/paper-input/paper-input';
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
import { HttpClient } from "@angular/common/http";
import { SignupService } from "../signup/signup.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import * as moment from 'moment';
import { FileUploader } from "ng2-file-upload";
import * as CryptoJS from "crypto-js";
import { AppDetailsService } from "./app-details.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";

const baseUrl: string = config.url;
import { config } from "config";
const URL = "https://evening-anchorage-3159.herokuapp.com/api/";
@Component({
  selector: "app-app-details",
  templateUrl: "./app-details.component.html",
  styleUrls: ["./app-details.component.css"]
})
export class AppDetailsComponent {
  notSelectedService: any = true;
  toggleStatus = true;
  serviceForm: FormGroup;
  default: string = "SOAP Web Service";
  productValue: any;
  selectedIndex1: any;
  productvalue;
  private tabSet: NgbTabset;
  projectId: any;
  fileData: any;
  summaryProductDescription: any;
  directory: string;
  showICICIIntermediaryAccountNumber: boolean;
  activeId: string;
  mobNumber: string;
  Emailid: string;
  valueD: any;
  interacc;
  ogacc;
  newerr;
  porterr;
  invalid = [];
  servFields: any[];
  orgFields: any[];
  orgFields1: any[];
  disableInputProd = true;
  valueForAlert: any;
  invalid1 = [];
  communicationProtocolUAT: any;
  httpCertificateUAT: any;
  httpCertificateProdName: any;
  httpCertificateUATName: any;
  activeIds: string[] = [];
  activeIDs: string[] = [];
  actId: string[] = [];
  actID: string[] = [];
  activeI :string[] =[];
  activeID :string[] =[];
  fileFlag: any;
  fileFlag2: string;
  fileFlag3: string;
  fileFlag4: string;
  serv1Fields= [];
  org1Fields=[];
  current_datetime: Date;
  actIds: string[]=[];
  mandFlag: boolean = true;
  mandval: string = '';
  mandatoryval: string = '';
  flagMand: boolean = true;
  globalId: any;
  showService=[];
  imagePath: any;

  @ViewChild(NgbTabset) set content(content: NgbTabset) {
    this.tabSet = content;
  }
  file1;
  file2;
  selectedValue: string;
  httpsCertificate;
  uatPayUpdateURLFile;
  uatCustValidationURLFile;
  uatPaymentStatFile;
  livePayUpdateURLFile;
  liveCustValidationURLFile;
  livePaymentStatUploadedFile;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  addRegisterData: FormGroup;
  configURL = config.url;
  imageUrl = config.imageUrl;
  communicationProtocolArray = [
    {
      name: "HTTP",
      value: "HTTP"
    },
    {
      name: "HTTPS",
      value: "HTTPS"
    }
  ];
  communicationProtocolArrayUat = [
    {
      name: "HTTP",
      value: "POST"
    }
  ];
  encryptionMethodArray = [
    {
      name: "Yes",
      value: "Yes"
    },
    {
      name: "No",
      value: "No"
    }
  ];
  uploadOption = [
    {
      name: "Yes",
      value: "Yes"
    },
    {
      name: "No",
      value: "No"
    }
  ];
  eodMisValuesArray = [
    {
      name: "Host to Host",
      value: "hostToHost"
    },
    {
      name: "Email",
      value: "email"
    },
    {
      name: "Both",
      value: "both"
    }
  ];
  showForm;
  productDataNew=[];
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
  paymentArray=[]
  communicationProtocolProduction: any;
  disableInput: any = true;
  isError: any;
  productData: any;
  serviceData: any;
  dropdownData = [];
  summaryProductImage;
  summaryProductName;
  summaryServiceImage;
  summaryServiceName;
  selectedIndex;
  serviceName;
  productName;
  dataForService;
  radioVal = "yes";
  dataForRegister;
  dataForProject;
  displayAddition: Boolean = true;
  checkedId = "bankAccount";
  imageValue;
  dataFormatted: any[];
  exp = "appDetails";
  exp1 = "appDetails";
  userDetailsTab :boolean=true;
  serviceDetailsTab :boolean=true;
  appDetailsTab :boolean;
  uatFile1;
  uatFile2;
  prodFile1;
  prodFile2;
  flowName;
  browserValue;
  dataOfApproval: {
    projectId: string;
    makerApproval: string;
    status: string;
    username: string;
    createdBy: string;
    clientCodeProfund: string;
    formatCodeProfund: string;
    clientCodeIPS: string;
    formatCodeIPS: string;
    orgName: string;
    IFSCCode: any;
    enableTransactionReversalFileProcessing: any;
    enableEODMISforthisClient: any;
  };
  webServiceTypeArray = [
    {
      name: "SOAP Web Service",
      value: "SOAP/HTTP"
    },
    {
      name: "REST API - JSON",
      value: "REST/JSON"
    },
    {
      name: "REST API - XML",
      value: "REST/XML"
    }
  ];
  paymentDropDown=[
    {
      "paymentOption":"Accept Cash Deposits Only"
    },
    {
      "paymentOption":"Accept Instruments Only"
    },
    {
      "paymentOption":"Accept Cash & Instruments"
    }

  ];//payment dropdown for isurepay
  paymentFlag:Boolean=false;
  public slideConfig = {
    dots: false,
    infinite: false,
    speed: 300,
    nextArrow: '<div class="homenav-btn next-slide"></div>',
    prevArrow: '<div class="homenav-btn prev-slide"></div>',
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,

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
  selectedLevel: any;
  constructor(
    private ele: ElementRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,
    public signupservice: SignupService,
    private appservice: AppDetailsService
  ) {
    //   this.serviceForm = new FormGroup({
    //     webServiceType: new FormControl(null)
    // });
    // this.serviceForm.controls['webServiceType'].setValue(this.default, {onlySelf: true});
  }

  ngOnInit() {
    
    
    if (this.summaryServiceName != ""){
      if (this.exp == "appDetails") {
        console.log("2222")
        this.appDetailsTab = false;
        this.userDetailsTab = false;
        this.serviceDetailsTab = false;
        // this.exp = "userDetails";
        // this.tabSet.activeId = "userDetails"
      }
      // else{
      //   console.log("333")
      //   this.userDetailsTab = true;
      //   this.serviceDetailsTab = true;
      // }


    }
    // to open the first accordion
    this.actIds = ["static-1"];

    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    this.browserValue=localStorage.getItem("displayFlag1");
console.log("this.browserValue",this.browserValue);
    this.productvalue = localStorage.getItem("productData");
    this.productName = localStorage.getItem("productName");
    this.serviceName = localStorage.getItem("serviceName");

    this.serviceData = JSON.parse(this.serviceName);
    this.dataForService = this.serviceData;
    //   console.log("------------>", this.dataForService);
    this.productValue = JSON.parse(this.productvalue);
    console.log("------------> ngOninit", this.productValue);
    this.valueForAlert = this.productValue;


    if (
      this.productValue !== undefined &&
      this.productValue !== null &&
      this.productValue !== ""
    ) {
      this.showForm = this.productValue.productName;
    }
    //   console.log("serviceData", this.serviceData.serviceName);
    this.flowName = this.serviceData.serviceName;
    //   console.log("productValue", this.productValue);
    this.selectedIndex = this.productValue.productId;
    this.imagePath = this.productValue.fileName;
    this.selectedIndex1 = this.serviceData.serviceId;
    this.appservice.getProducts().then(data => {
      this.spinner.show();
      this.productData = data;
      this.spinner.hide();
     
      this.productDataNew.push(this.productValue);
    });

    this.appservice.getService().then(data => {
      this.showService.push(this.dataForService)
      console.log("this.showService: ",this.showService)
      for (var i = 0; i < data.length; i++) {
        this.imageValue = data[i].fileName;
        //   console.log("Image ", this.imageValue)
      }
    });
    if (
      this.dataForService.serviceName ===
      "ECollection with Two Level Validation at Bank and Client’s End" ||
      this.dataForService.serviceName ===
      "ECollection with Remitter Validation in Intermediary Account"
    ) {
      this.showICICIIntermediaryAccountNumber = true;
    } else {
      this.showICICIIntermediaryAccountNumber = false;
    }
    this.onPageLoadProductData(this.productValue);
    this.onPageLoadServiceData(this.serviceData);
  }
  keyPressAlpha(event) {
    //   console.log(event.keyCode)
    var key = event.keyCode;
    return (key >= 65 && key <= 90) || key == 8;
  }
  keyPress(event: any) {
    //   console.log("number", event.target.value.length);
    const pattern = /^[6-9][0-9]{8}$/;
    let result = pattern.test(event.target.value);
    //   console.log("result", result);
    if (result) {
      this.isError = "";
    } else if (event.target.value.length > 9) {
      this.isError = "";
    } else {
      this.isError = "Please enter valid mobile number";
    }
  
  }
selectedPaymentMode(value){
  this.paymentArray.push(value);
  console.log("Value for payment mode",value,this.paymentArray);
}
// nextTab() {
//   console.log("exp: ", this.exp)
//   console.log("activeid",this.tabSet.activeId);
//   if (this.summaryServiceName != "") {
//   if (this.tabSet.activeId == "appDetails") {
//   if(this.checkedId != 'bankAccount'){
//   // this.appDetailsTab = true;
//   // this.userDetailsTab = false;
//   // this.serviceDetailsTab = true;
//   this.exp = "userDetails";
  
//   }
//   else{
//     console.log("aaa",this.tabSet.activeId)
//     this.tabSet.activeId = "userDetails";
//     console.log("enter")
//   this.appDetailsTab = false;
//   this.userDetailsTab = false;
//   this.serviceDetailsTab = false;
//   this.exp = "userDetails";
  
//   }

//   }
//   else if (this.tabSet.activeId == "userDetails") {
//     console.log("aaa",this.tabSet.activeId)

//     console.log("enter1")
//   this.appDetailsTab = false;
//   this.userDetailsTab = false;
//   this.serviceDetailsTab = false;
//   this.actIds = ["static-1"];
//   this.activeIds = ["static-2"];
//   this.activeIDs = ["static-3"];
//   this.actId = ["uatDetails"];
//   this.actID = ["UATDetails"];
//   this.activeI=["prodDetails"];
//   this.activeID=["productionDetails"];
//   this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView();
//   this.exp="serviceDetails"
//   this.tabSet.activeId = "serviceDetails";
//   }
//   else if (this.tabSet.activeId == "serviceDetails") {
//     console.log("aaa",this.tabSet.activeId)
//     // this.tabSet.activeId = "userDetails";

//     console.log("enter2")
//   // this.appDetailsTab = false;
//   // this.userDetailsTab = false;
//   // this.serviceDetailsTab = false;
//   // this.exp = "userDetails";
  
//   }else if(this.tabSet.activeId == "appDetails"){
//    console.log("else if")
//     this.appDetailsTab = false;
//   this.userDetailsTab = true;
//   this.serviceDetailsTab = true;
//   }
//   } 
//   else{
//   var value = confirm("Please select a flow before going to next Tab");
//   console.log("Not allowed");
//   }
//   }
tabChange(event){
  console.log("tabset ID ====>",event)
  console.log("this.tabSet.activeId ====>",this.tabSet.activeId)
  if (this.tabSet.activeId == "appDetails") {
    $(window).scrollTop(0);
    console.log("tc1");
    console.log("----------",this.exp1)
   this.exp1 = "appDetails";
    this.tabSet.activeId = "appDetails"
  }
  if (this.tabSet.activeId == "userDetails") {
    console.log("tc2");  
    console.log("exp2",this.exp1)
    $(window).scrollTop(0);
      this.exp1 = "userDetails";

    this.tabSet.activeId = "userDetails"
    this.actIds = ["static-1"];
    this.activeIds = ["static-2"];
    this.activeIDs = ["static-3"];
    this.actId = ["uatDetails"];
    this.actID = ["UATDetails"];
    this.activeI=["prodDetails"];
    this.activeID=["productionDetails"];

  }
  if (this.tabSet.activeId == "serviceDetails") {
    console.log("tc3");
    console.log("exp3",this.exp1)
    $(window).scrollTop(0);
    this.exp1 = "serviceDetails";

    this.tabSet.activeId = "serviceDetails"
  }
  // if(event.nextId == "appDetails"){
  //   console.log("into if1")
  //    this.appDetailsTab = false;
  //    this.userDetailsTab = true;
  //    this.serviceDetailsTab = true;
  // }
}
nextTab(){
  console.log("exp: ", this.exp)
  console.log("activeid",this.tabSet.activeId);
  if (this.summaryServiceName != "") {
    if (this.tabSet.activeId == "appDetails") {
      console.log("11111111")
      if(this.globalId == "webService"){
        console.log("no no no")
            this.addRegisterData.reset();
                 this.appDetailsTab = false;
                 this.userDetailsTab = false;
                 this.serviceDetailsTab = true;
                 }
                 else{
      this.appDetailsTab = false;
      this.userDetailsTab = false;
      this.serviceDetailsTab = false;
                }
      this.exp = "userDetails";
      this.tabSet.activeId = "userDetails"
    }
  else if (this.tabSet.activeId == "userDetails") {
      this.appDetailsTab = false;
      this.userDetailsTab = false;
      this.serviceDetailsTab = false;
      this.exp = "serviceDetails";
      this.tabSet.activeId = "serviceDetails"
        this.actIds = ["static-1"];
    this.activeIds = ["static-2"];
    this.actId = ["uatDetails"];
    this.actID = ["UATDetails"];
    this.activeI=["prodDetails"];
    this.activeID=["productionDetails"];
    // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView();
    // $('html, body').animate({ scrollTop: 0 }, 1200);
    //       return false;
    $(window).scrollTop(0);
    }
   else if (this.tabSet.activeId == "serviceDetails") {
      this.appDetailsTab = false;
      this.userDetailsTab = false;
      this.serviceDetailsTab = false;
      // this.exp = "appDetails";
    }
  }
  else{
    var value = confirm("Please select a flow before going to next Tab");
    console.log("Not allowed");  
  }
}
  
  
  backTab() {
    if (this.tabSet.activeId == "userDetails") {
      console.log("aaa",this.tabSet.activeId)
      console.log("back")
      this.appDetailsTab = false;
      this.userDetailsTab = false;
      this.serviceDetailsTab = false;
      this.tabSet.activeId = "appDetails";
      this.exp = "appDetails";
      $(window).scrollTop(0);

    } else if (this.tabSet.activeId == "serviceDetails") {
      console.log("aaa",this.tabSet.activeId)
      this.tabSet.activeId = "userDetails";
      console.log("back1")
      this.appDetailsTab = false;
      this.userDetailsTab = false;
      this.serviceDetailsTab = false;
      this.exp = "userDetails";
      $(window).scrollTop(0);

    }
    
    
  }

  onChangePaymentOption(paymentValue){
   
    this.paymentOptionValue=paymentValue;
    console.log("PRINT : PAYMENT VALUE CHECK",this.paymentOptionValue);
    if(paymentValue=="Accept Instruments Only" || paymentValue=="Accept Cash & Instruments"){
      this.paymentFlag=true;
      console.log("PRINT : PAYMENT FLAG VALUE CHECK",this.paymentFlag);
    }else{
      this.paymentFlag=false;
    }
  }
  paymentOptionValue(arg0: string, paymentOptionValue: any) {
    throw new Error("Method not implemented.");
  }
  uatUpload1() {
    $(document).ready(function () {
      $("#uatUpload1").trigger("click");
    });
  }

  uatUpload2() {
    $(document).ready(function () {
      $("#uatUpload2").trigger("click");
    });
  }

  prodUpload1() {
    $(document).ready(function () {
      $("#prodUpload1").trigger("click");
    });
  }

  prodUpload2() {
    $(document).ready(function () {
      $("#prodUpload2").trigger("click");
    });
  }

  httpsUpload1() {
    $(document).ready(function () {
      $("#httpsUpload1").trigger("click");
    });
  }
  // changes here
  httpsCetificateUploadUAT1() {
    $(document).ready(function () {
      $("#httpsCetificateUploadUAT").trigger("click");
    });
  }
  httpsCetificateUploadProd1() {
    $(document).ready(function () {
      $("#httpsCetificateUploadProd").trigger("click");
    });
  }
  httpsProdUpload1() {
    $(document).ready(function () {
      $("#httpsProdUpload1").trigger("click");
    });
  }
  uatPayUpdateURL() {
    $(document).ready(function () {
      $("#uatPayUpdateURL").trigger("click");
    });
  }
  uatCustValidationURL() {
    $(document).ready(function () {
      $("#uatCustValidationURL").trigger("click");
    });
  }
  uatPaymentStat() {
    $(document).ready(function () {
      $("#uatPaymentStat").trigger("click");
    });
  }
  livePayUpdateURL() {
    $(document).ready(function () {
      $("#livePayUpdateURL").trigger("click");
    });
  }
  liveCustValidationURL() {
    $(document).ready(function () {
      $("#liveCustValidationURL").trigger("click");
    });
  }
  livePaymentStat() {
    $(document).ready(function () {
      $("#livePaymentStat").trigger("click");
    });
  }

  ngAfterViewInit() {
    //   console.log(this.tabSet);
  }
  httpCertificateUploadUAT($event) {
    this.httpCertificateUATName = $event.target.files[0].name;
    this.httpCertificateUAT = $event.target.files[0];
    $('#httpCertificate').css("border", "2px solid #D9D9D9");

    this.addRegisterData.controls["httpCertificate"].setValue(
      $event.target.files[0].name
    );
  }
  httpsCetificateUploadProd($event) {
    this.httpCertificateProdName = $event.target.files[0].name;
    this.httpCertificateProd = $event.target.files[0];
    this.addRegisterData.controls["httpProdCertificate"].setValue(
      $event.target.files[0].name
    );
    // console.log("httpProdCertificate", $event.target.files[0].name)
  }
  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in uatFile1 variable.
   */
  uatUpload1Uploaded($event) {    
    var uatfilename1=$event.target.files[0].name
    var ext = uatfilename1.substring(uatfilename1.lastIndexOf('.') + 1);
    console.log(ext)

    if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {
      
      this.uatFile1 = $event.target.files[0];
      console.log("ok")
      this.fileFlag="properFile";
    
      this.addRegisterData.controls["uatFile1"].setValue(
      $event.target.files[0].name

    );
    }
    else{
      this.fileFlag="notproperFile";
      console.log("invalid")

    
    }

    console.log(uatfilename1)
    
    //   console.log("uatUpload1Uploaded :", $event.target.files[0].name)
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in uatFile1 variable.
   */
  uatUpload2Uploaded($event) {
    var uatfilename2=$event.target.files[0].name

    var ext = uatfilename2.substring(uatfilename2.lastIndexOf('.') + 1);
    console.log(ext)

    if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {
      
      this.uatFile2 = $event.target.files[0];
      console.log("ok")
      this.fileFlag2="properFile";
    
      this.addRegisterData.controls["uatFile2"].setValue(
      $event.target.files[0].name

    );
    }
    else{
      this.fileFlag2="notproperFile";
      console.log("invalid")

    
    }
    // this.uatFile2 = $event.target.files[0];
    // this.addRegisterData.controls["uatFile2"].setValue(
    //   $event.target.files[0].name
    // );
    //   console.log("uatUpload2Uploaded :", $event.target.files[0].name)
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in prodFile1 variable.
   */
  prodUpload1Uploaded($event) {
    var prodfilename1=$event.target.files[0].name
    var ext = prodfilename1.substring(prodfilename1.lastIndexOf('.') + 1);
    console.log(ext)

    if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {
      
      this.prodFile1 = $event.target.files[0];
      console.log("ok")
      this.fileFlag3="properFile";
    
      this.addRegisterData.controls["prodFile1"].setValue(
      $event.target.files[0].name

    );
    }
    else{
      this.fileFlag3="notproperFile";
      console.log("invalid")

    
    }
    // this.prodFile1 = $event.target.files[0];
    // this.addRegisterData.controls["prodFile1"].setValue(
    //   $event.target.files[0].name
    // );
    //   console.log("prodUpload1Uploaded :", $event.target.files[0].name)
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in prodFile1 variable.
   */
  prodUpload2Uploaded($event) {
    var prodfilename2=$event.target.files[0].name
    var ext = prodfilename2.substring(prodfilename2.lastIndexOf('.') + 1);
    console.log(ext)

    if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {
      
      this.prodFile2 = $event.target.files[0];
      console.log("ok")
      this.fileFlag4="properFile";
    
      this.addRegisterData.controls["prodFile2"].setValue(
      $event.target.files[0].name

    );
    }
    else{
      this.fileFlag4="notproperFile";
      console.log("invalid")

    
    }
    //   console.log("prodUpload2Uploaded :", $event.target.files[0].name);
  }
  /**
   * @author Kuldeep
   * @param $event {file data}
   * @description This function will capture the file data of http certificate
   */
  httpsUpload1Uploaded($event) {
    this.httpsCertificate = $event.target.files[0];
    $('#httpCertificate').css("border", "2px solid #D9D9D9");
    this.addRegisterData.controls["httpCertificate"].setValue(
      $event.target.files[0].name
    );
    // console.log("httpsUpload1Uploaded :", $event.target.files[0].name)
  }
  httpCertificateProd($event) {
    this.httpsCertificate = $event.target.files[0];
    this.addRegisterData.controls["httpCertificate"].setValue(
      $event.target.files[0].name
    );
    console.log("httpCertificate :", $event.target.files[0].name)
  }
  uatPayUpdateURLUploaded($event) {
    this.uatPayUpdateURLFile = $event.target.files[0];
    this.addRegisterData.controls["uatPayUpdateURL"].setValue(
      $event.target.files[0].name
    );
    //   console.log("uatPayUpdateURL :", $event.target.files[0].name)
  }
  uatCustValidationURLUploaded($event) {
    this.uatCustValidationURLFile = $event.target.files[0];
    this.addRegisterData.controls["uatCustValidationURL"].setValue(
      $event.target.files[0].name
    );
    //   console.log("uatCustValidationURLUploaded :", this.uatCustValidationURLFile)
  }
  uatPaymentStatUploaded($event) {
    this.uatPaymentStatFile = $event.target.files[0];
    this.addRegisterData.controls["uatPaymentStat"].setValue(
      $event.target.files[0].name
    );
    //   console.log("uatPaymentStatUploaded :", this.uatPaymentStatFile)
  }
  livePayUpdateURLUploaded($event) {
    this.livePayUpdateURLFile = $event.target.files[0];
    this.addRegisterData.controls["livePayUpdateURL"].setValue(
      $event.target.files[0].name
    );
    //   console.log("livePayUpdateURLUploaded :", this.livePayUpdateURLFile)
  }
  liveCustValidationURLUploaded($event) {
    this.liveCustValidationURLFile = $event.target.files[0];
    this.addRegisterData.controls["liveCustValidationURL"].setValue(
      $event.target.files[0].name
    );
    //   console.log("liveCustValidationURLUploaded :", this.liveCustValidationURLFile)
  }
  livePaymentStatUploaded($event) {
    this.livePaymentStatUploadedFile = $event.target.files[0];
    this.addRegisterData.controls["livePaymentStat"].setValue(
      $event.target.files[0].name
    );
    //   console.log("livePaymentStatUploaded :", this.livePaymentStatUploadedFile)
  }
  addbusinessEmail(): FormGroup {
    return this.fb.group({
      email: [""]
    });
  }

  addbusinessSpocEmail(): void {
    this.displayAddition = false;
    (<FormArray>this.addRegisterData.get("emails")).push(
      this.addbusinessEmail()
    );
  }

  removebusinessSpocEmail(ifConditionGroupIndex: number): void {
    (<FormArray>this.addRegisterData.get("emails")).removeAt(
      ifConditionGroupIndex
    );
  }
  onPageLoadProductData(data) {
    console.log("onPageLoadProductData: ");
    this.selectedIndex = data.productId;
    let pdata = data;
    let ddData = [];
    this.summaryProductImage = this.imageUrl + "Images/Products/" + data.fileName;
    //   console.log("check product this.summaryProductImage------->", this.summaryProductImage);

    this.summaryProductName = data.productName;
    if (this.summaryProductName == "eCollections") {
      if (
        this.flowName ==
        "ECollection with Remitter Validation in Intermediary Account"
      ) {
        this.addRegisterData = this.fb.group(
          {
            // 'emails': this.fb.array([
            //     this.addbusinessEmail()
            // ]),
            organization: [
              "",
              [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
              ]
            ],
            iciciAccNo: [
              "",
              [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
            ],
            poolAccNo: [
              "",
              [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
            ],
            accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
            emailIdAM: [
              "",
              [
                Validators.pattern(
                  /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
                )
              ]
            ],
            firstNameBusinessSpoc: [
              "",
              [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]
            ],
            lastNameBusinessSpoc: [
              "",
              [Validators.required, Validators.pattern(/^[a-zA-Z]{1,}$/)]
            ],
            mobileNumberBusinessSpoc: [
              "",
              [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
            ],
            emailIdBusinessSpoc: [
              "",
              [
                Validators.required,
                Validators.pattern(
                  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                )
              ]
            ],
            firstNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            lastNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            mobileNumberITSpoc: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
            emailIdITSpoc: [
              "",
              [
                Validators.pattern(
                  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                )
              ]
            ],
            webServiceType: [""],
            communicationProtocol: [""],
            checksumControl: [""],
            encryptionMethod: [""],
            hostNameUat: ["", [Validators.required]],
            uatIp: [
              "",
              [
                Validators.required,
                Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)
              ]
            ],
            uatPort: [
              "9443",
              [
                Validators.required,
                Validators.pattern(
                  /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
                )
              ]
            ],
            httpCertificate: [""],
            serviceTimeOutUAT: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
            serviceURLUAT: [
              "",
              [
                Validators.pattern(
                  /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
                )
              ]
            ],
            serviceNameInputUAT: [""],
            uatFile1: [""],
            retryAttempts: [""],
            actionOnNoRes: [""],
            hostNameProd: [""],
            prodIp: [
              "",
              [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
            ],
            prodPort: [
              "9443",
              [
                Validators.pattern(
                  /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
                )
              ]
            ],
            httpProdCertificate: [""],
            serviceTimeOutProd: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
            serviceURLProd: [
              "",
              [
                 Validators.pattern(
                  /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
                )
              ]
            ],
            serviceNameInputProd: [""],
            prodFile1: [""],
            

          }
        );
      } 
      else if (
        this.flowName ==
        "ECollection with Two Level Validation at Bank and Client’s End"
      ) {
        this.addRegisterData = this.fb.group(
          {
            // 'emails': this.fb.array([
            //     this.addbusinessEmail()
            // ]),
            organization: [
              "",
              [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
              ]
            ],
            iciciAccNo: [
              "",
              [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
            ],
            poolAccNo: [
              "",
              [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
            ],
            accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
            emailIdAM: [
              "",
              [
                Validators.pattern(
                  /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
                )
              ]
            ],
            firstNameBusinessSpoc: [
              "",
              [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]
            ],
            lastNameBusinessSpoc: [
              "",
              [Validators.required, Validators.pattern(/^[a-zA-Z]{1,}$/)]
            ],
            mobileNumberBusinessSpoc: [
              "",
              [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
            ],
            emailIdBusinessSpoc: [
              "",
              [
                Validators.required,
                Validators.pattern(
                  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                )
              ]
            ],
            firstNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            lastNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            mobileNumberITSpoc: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
            emailIdITSpoc: [
              "",
              [
                Validators.pattern(
                  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                )
              ]
            ],
            webServiceType: [""],
            communicationProtocol: [""],
            checksumControl: [""],
            encryptionMethod: [""],
            hostNameUat: ["", [Validators.required]],
            uatIp: [
              "",
              [
                Validators.required,
                Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)
              ]
            ],
            uatPort: [
              "9443",
              [
                Validators.required,
                Validators.pattern(
                  /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
                )
              ]
            ],
            httpCertificate: [""],
            serviceTimeOutUAT: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
            serviceURLUAT: [
              "",
              [
                Validators.pattern(
                  /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
                )
              ]
            ],
            serviceNameInputUAT: [""],
            uatFile1: [""], 
            serviceTimeOutUAT2:["", [Validators.pattern(/^[0-9]{0,}$/)]],
            serviceURLUAT2: ["",[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
            )]],
            serviceNameInputUAT2: [""],
            uatFile2: [""],
            retryAttempts: [""],
            actionOnNoRes: [""],
            hostNameProd: [""],
            prodIp: [
              "",
              [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
            ],
            prodPort: [
              "9443",
              [
                Validators.pattern(
                  /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
                )
              ]
            ],
            httpProdCertificate: [""],
            serviceTimeOutProd: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
            serviceURLProd: [
              "",
              [
                 Validators.pattern(
                  /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
                )
              ]
            ],
            serviceNameInputProd: [""],
           
            prodFile1: [""],
         
            
            serviceTimeOutProd2: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
            serviceURLProd2: ["",
            [
              Validators.pattern(
            /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
            )
            ]],
            serviceNameInputProd2: [""],
            prodFile2: [""],
          }
        );
      } 
      else {
        this.addRegisterData = this.fb.group(
          {
            // 'emails': this.fb.array([
            //     this.addbusinessEmail()
            // ]),
            organization: [
              "",
              [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
              ]
            ],
            iciciAccNo: [
              "",
              [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
            ],
            accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
            emailIdAM: [
              "",
              [
                Validators.pattern(
                  /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
                )
              ]
            ],
            firstNameBusinessSpoc: [
              "",
              [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]
            ],
            lastNameBusinessSpoc: [
              "",
              [Validators.required, Validators.pattern(/^[a-zA-Z]{1,}$/)]
            ],
            mobileNumberBusinessSpoc: [
              "",
              [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
            ],
            emailIdBusinessSpoc: [
              "",
              [
                Validators.required,
                Validators.pattern(
                  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                )
              ]
            ],
            firstNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            lastNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            mobileNumberITSpoc: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
            emailIdITSpoc: [
              "",
              [
                Validators.pattern(
                  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                )
              ]
            ],
            webServiceType: [""],
            communicationProtocol: [""],
            checksumControl: [""],
            encryptionMethod: [""],
            hostNameUat: ["", [Validators.required]],
            uatIp: [
              "",
              [
                Validators.required,
                Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)
              ]
            ],
            uatPort: [
              "9443",
              [
                Validators.required,
                Validators.pattern(
                  /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
                )
              ]
            ],
            httpCertificate: [""],
            serviceTimeOutUAT: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
            serviceURLUAT: [
              "",
              [
                Validators.pattern(
                  /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
                )
              ]
            ],
            serviceNameInputUAT: [""],
            uatFile1: [""],
            retryAttempts: [""],
            actionOnNoRes: [""],
            hostNameProd: [""],
            prodIp: [
              "",
              [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
            ],
            prodPort: [
              "9443",
              [
                Validators.pattern(
                  /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
                )
              ]
            ],
            httpProdCertificate: [""],
            serviceTimeOutProd: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
            serviceURLProd: [
              "",
              [
                 Validators.pattern(
                  /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
                )
              ]
            ],
            serviceNameInputProd: [""],
            prodFile1: [""],
           
          }
        );
      }
    }
     else {
      this.addRegisterData = this.fb.group(
        {
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          organization: [
            "",
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
            ]
          ],
          iciciAccNo: [
            "",
            [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
          ],
          accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdAM: [
            "",
            [
              Validators.pattern(
                /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
              )
            ]
          ],
          firstNameBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]
          ],
          lastNameBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z]{1,}$/)]
          ],
          mobileNumberBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
          ],
          emailIdBusinessSpoc: [
            "",
            [
              Validators.required,
              Validators.pattern(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
              )
            ]
          ],
          firstNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          lastNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          mobileNumberITSpoc: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdITSpoc: [
            "",
            [
              Validators.pattern(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
              )
            ]
          ],
          webServiceType: [""],
          isure_communication_protocol: [""],
          checksumControl: [""],
          encryptionMethod: [""],
          txnPerday: ["", [Validators.pattern(/^[1-9]([0-9]{1,})?$/)]],
          reqParameter: [""],
          hostNameUat: ["", [Validators.required]],
          uatIp: [
            "",
            [
              Validators.required,
              Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)
            ]
          ],
          uatPort: [
            "9443",
            [
              Validators.required,
              Validators.pattern(
                /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
              )
            ]
          ],
          httpCertificate: [""],
          serviceTimeOutUAT: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLUAT: [
            "",
            [
              Validators.pattern(
                /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
              )
            ]
          ],
          serviceNameInputUAT1: [""],
          uatFile1: [""],
          serviceTimeOutUAT2: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLUAT2: ["",[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
          )]],
          serviceNameInputUAT2: [""],
          uatFile2: [""],
          hostNameProd: [""],
          prodIp: [
            "",
            [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
          ],
          prodPort: [
            "9443",
            [
              Validators.pattern(
                /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
              )
            ]
          ],
          httpProdCertificate: [""],
          serviceTimeOutProd: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLProd: [
            "",
            [
               Validators.pattern(
                /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
              )
            ]
          ],
          serviceNameInputProd1: [""],
          prodFile1: [""],
          serviceTimeOutProd2: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLProd2: ["",
          [
            Validators.pattern(
          /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
          )
          ]],
          serviceNameInputProd2: [""],
          prodFile2: [""],
         
          
         
        }
      );
    }
    this.addRegisterData.controls["uatPort"].setValue("9443");
    
    this.summaryProductDescription = data.description;
    this.appservice.getService().then(async data => {
      this.spinner.show();
      this.serviceData = data;
      for (var i = 0; i < this.serviceData.length; i++) {
        if (pdata.productId === this.serviceData[i].productId) {
          ddData.push(this.serviceData[i]);
        }
      }
      this.dropdownData = ddData;
      this.dataFormatted = [];
      var j = -1;

      for (var i = 0; i < this.dropdownData.length; i++) {
        if (i % 4 == 0) {
          j++;
          this.dataFormatted[j] = [];
          this.dataFormatted[j].push(this.dropdownData[i]);
        } else {
          this.dataFormatted[j].push(this.dropdownData[i]);
        }
      }
      //   console.log("---dataFormatted check point---", this.dataFormatted)
      this.spinner.hide();
    });
  }
  open2Accordian() {
    this.activeId = "ngb-panel-1";
  }
  // changes here by sanchita for selection on 19-December-2019 starts
  data(data) {
    console.log("data", data);
    console.log("this.productValue", this.productValue);
    if (data.productName == this.productValue.productName) {

    }
    else {
      var value = confirm("Would you like to change your product selection?");
      if (value == true) {
        this.productValue = data;
        console.log("product value ***", this.productValue);
        if (this.summaryServiceName != "") {
          console.log("into21")
        this.userDetailsTab = true;
        this.serviceDetailsTab = true;
        }
        else{
          this.userDetailsTab = false;
          this.serviceDetailsTab = false; 
        }
      }
      else if (value == false) {
        console.log("product value ****", this.productValue);
        if (this.summaryServiceName != "") {
          this.userDetailsTab = false;
          this.serviceDetailsTab = false;
          }
          else{
            this.userDetailsTab = true;
            this.serviceDetailsTab = true; 
          }
      }
    }
    
   
    this.selectedIndex = this.productValue.productId;
    let pdata = this.productValue;
    let ddData = [];
    this.summaryProductImage =
      this.imageUrl + "Images/Products/" + this.productValue.fileName;
    this.summaryProductName = this.productValue.productName;
    this.summaryProductDescription = this.productValue.description;

    console.log("this.selectedIndex1", this.selectedIndex1);
    this.summaryServiceImage = "";
    this.summaryServiceName = "";
    this.appservice.getService().then(async data => {
      this.spinner.show();
      this.serviceData = data;
      for (var i = 0; i < this.serviceData.length; i++) {
        if (pdata.productId === this.serviceData[i].productId) {
          ddData.push(this.serviceData[i]);
        }
      }
      this.dropdownData = ddData;
      this.dataFormatted = [];
      var j = -1;

      for (var i = 0; i < this.dropdownData.length; i++) {
        if (i % 4 == 0) {
          j++;
          this.dataFormatted[j] = [];
          this.dataFormatted[j].push(this.dropdownData[i]);
        } else {
          this.dataFormatted[j].push(this.dropdownData[i]);
        }
      }
      for (var i = 0; i < this.dropdownData.length; i++) {
        if (this.selectedIndex1 === this.dropdownData[i].serviceId) {
          this.summaryServiceImage = this.imageUrl + "Images/Services/" + this.dropdownData[i].fileName;
          this.summaryServiceName = this.dropdownData[i].serviceName;
        }
      }
      this.spinner.hide();
    });
    if (this.summaryProductName == "eCollections") {
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          organization: [
            "",
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
            ]
          ],
          iciciAccNo: [
            "",
            [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
          ],
          accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdAM: [
            "",
            [
              Validators.pattern(
                /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
              )
            ]
          ],
          firstNameBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]
          ],
          lastNameBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z]{1,}$/)]
          ],
          mobileNumberBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
          ],
          emailIdBusinessSpoc: [
            "",
            [
              Validators.required,
              Validators.pattern(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
              )
            ]
          ],
          firstNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          lastNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          mobileNumberITSpoc: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdITSpoc: [
            "",
            [
              Validators.pattern(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
              )
            ]
          ],
          webServiceType: [""],
          communicationProtocol: [""],
          checksumControl: [""],
          encryptionMethod: [""],
          hostNameUat: ["", [Validators.required]],
          uatIp: [
            "",
            [
              Validators.required,
              Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)
            ]
          ],
          uatPort: [
            "9443",
            [
              Validators.required,
              Validators.pattern(
                /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
              )
            ]
          ],
          httpCertificate: [""],
          serviceTimeOutUAT: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLUAT: [
            "",
            [
              Validators.pattern(
                /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
              )
            ]
          ],
          serviceNameInputUAT: [""],
          uatFile1: [""],
          retryAttempts: [""],
          actionOnNoRes: [""],
          hostNameProd: [""],
          prodIp: [
            "",
            [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
          ],
          prodPort: [
            "9443",
            [
              Validators.pattern(
                /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
              )
            ]
          ],
          httpProdCertificate: [""],
          serviceTimeOutProd: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLProd: [
            "",
            [
              Validators.pattern(
                /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
              )
            ]
          ],
          serviceNameInputProd: [""],
          prodFile1: [""],
         
         
        });
      
    } else {
      this.addRegisterData = this.fb.group({
        // 'emails': this.fb.array([
        //     this.addbusinessEmail()
        // ]),
        organization: [
          "",
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
          ]
        ],
        iciciAccNo: [
          "",
          [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
        ],
        accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
        emailIdAM: [
          "",
          [
            Validators.pattern(
              /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
            )
          ]
        ],
        firstNameBusinessSpoc: [
          "",
          [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]
        ],
        lastNameBusinessSpoc: [
          "",
          [Validators.required, Validators.pattern(/^[a-zA-Z]{1,}$/)]
        ],
        mobileNumberBusinessSpoc: [
          "",
          [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
        ],
        emailIdBusinessSpoc: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            )
          ]
        ],
        firstNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        lastNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        mobileNumberITSpoc: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
        emailIdITSpoc: [
          "",
          [
            Validators.pattern(
              /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            )
          ]
        ],
        webServiceType: [""],
        isure_communication_protocol: [""],
        checksumControl: [""],
        encryptionMethod: [""],
        txnPerday: ["", [Validators.pattern(/^[1-9]([0-9]{1,})?$/)]],
        reqParameter: [""],
        hostNameUat: ["", [Validators.required]],
        uatIp: [
          "",
          [
            Validators.required,
            Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)
          ]
        ],
        uatPort: [
          "9443",
          [
            Validators.required,
            Validators.pattern(
              /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
            )
          ]
        ],
        httpCertificate: [""],
        serviceTimeOutUAT: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
        serviceURLUAT: [
          "",
          [
            Validators.pattern(
              /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
            )
          ]
        ],
        serviceNameInputUAT1: [""],
        uatFile1: [""],
        serviceNameInputUAT2: [""],
        uatFile2: [""],
        hostNameProd: [""],
        prodIp: [
          "",
          [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
        ],
        prodPort: [
          "9443",
          [
            Validators.pattern(
              /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
            )
          ]
        ],
        httpProdCertificate: [""],
        serviceTimeOutProd: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
        serviceURLProd: [
          "",
          [
            Validators.pattern(
              /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
            )
          ]
        ],
        serviceNameInputProd1: [""],
        prodFile1: [""],
        serviceNameInputProd2: [""],
        prodFile2: [""],
        // changes
        serviceTimeOutUAT2: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
        serviceURLUAT2: ["",[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
        )]],
        serviceTimeOutProd2: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
        serviceURLProd2: ["",
        [
          Validators.pattern(
        /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
        )
        ]],
       
      });
    }

  }
  // changes here by sanchita for selection on 19-December-2019 ends

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  onPageLoadServiceData(value) {
    this.selectedIndex1 = value.serviceId;
    this.summaryServiceImage = this.imageUrl + "Images/Services/" + value.fileName;
    this.summaryServiceName = value.serviceName;
  }

  // changes here by sanchita for selection on 19-December-2019 starts
  data2(value) {
    if (this.summaryServiceName == value.serviceName) {
      console.log("not empty");
      console.log("this.summaryServiceName", this.summaryServiceName);
    }
    else {
      if (this.summaryServiceImage == "") {
        var dataValue = confirm(
          "Do you want to select this Service for " +
          this.productValue.productName +
          "?"
        );
        if(dataValue == true){
          if(this.globalId == "webService"){

            this.addRegisterData.reset();
                 this.appDetailsTab = false;
                 this.userDetailsTab = false;
                 this.serviceDetailsTab = true;
                 }
                 else if(this.globalId != "webService"){
        this.userDetailsTab = false;
        this.serviceDetailsTab = false;
                }
        }
        else if(dataValue == false){
          this.userDetailsTab = true;
        this.serviceDetailsTab = true;
        }
      } else {
        var dataValue = confirm(
          "Do you want to change selection of Service for " +
          this.productValue.productName +
          "?"
        );
        if(this.globalId == "webService"){

          this.addRegisterData.reset();
          console.log("back to normal")

               this.appDetailsTab = false;
               this.userDetailsTab = false;
               this.serviceDetailsTab = true;
               }
               else if(this.globalId == "bankAccount"){
                 console.log("normal")
        this.userDetailsTab = false;
        this.serviceDetailsTab = false;
               }
      }
    }
    
    if (dataValue === true) {

      $('#organization').css("border", "2px solid #D9D9D9");
      $('#iciciAccNo').css("border", "2px solid #D9D9D9");
      $('#poolAccNo').css("border", "2px solid #D9D9D9");
      $('#firstNameBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#lastNameBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#mobileNumberBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#emailIdBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#hostNameUat').css("border", "2px solid #D9D9D9");
      $('#uatIp').css("border", "2px solid #D9D9D9");
      $('#uatPort').css("border", "2px solid #D9D9D9");
      $('#httpCertificate').css("border", "2px solid #D9D9D9");
      $('#serviceTimeOutUAT').css("border", "2px solid #D9D9D9");
 $('#serviceURLUAT').css("border", "2px solid #D9D9D9");
   $('#uatFile1').css("border", "2px solid #D9D9D9");
   $('#prodIp').css("border", "2px solid #D9D9D9");
   $('#prodPort').css("border", "2px solid #D9D9D9");
   $('#serviceTimeOutProd').css("border", "2px solid #D9D9D9");

   $('#serviceURLProd').css("border", "2px solid #D9D9D9");
   $('#serviceTimeOutUAT2').css("border", "2px solid #D9D9D9");
   $('#serviceURLUAT2').css("border", "2px solid #D9D9D9");
   $('#serviceTimeOutProd2').css("border", "2px solid #D9D9D9");
   $('#serviceURLProd2').css("border", "2px solid #D9D9D9");
   $('#txnPerday').css("border", "2px solid #D9D9D9");
   $('#accountManagerName').css("border", "2px solid #D9D9D9");
 
 
   $('#mobileNumberAM').css("border", "2px solid #D9D9D9");
 
 
   $('#emailIdAM').css("border", "2px solid #D9D9D9");
 
 
   $('#firstNameITSpoc').css("border", "2px solid #D9D9D9");
 
 
   $('#lastNameITSpoc').css("border", "2px solid #D9D9D9");
   $('#mobileNumberITSpoc').css("border", "2px solid #D9D9D9");
 
 
   $('#emailIdITSpoc').css("border", "2px solid #D9D9D9");
   
        this.selectedIndex1 = value.serviceId;
      this.summaryServiceImage =
        this.imageUrl + "Images/Services/" + value.fileName;
      this.summaryServiceName = value.serviceName;
    } else if (dataValue === false) {
    }
    if (
      this.summaryServiceName ==
      "ECollection with Two Level Validation at Bank and Client’s End" ||
      this.summaryServiceName ===
      "ECollection with Remitter Validation in Intermediary Account"
    ) {
      this.showICICIIntermediaryAccountNumber = true;
    } else {
      this.showICICIIntermediaryAccountNumber = false;
    }

    if (this.summaryProductName == "eCollections") {
      if (
        this.summaryServiceName ==
        "ECollection with Remitter Validation in Intermediary Account"
      ) {
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          organization: [
            "",
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
            ]
          ],
          iciciAccNo: [
            "",
            [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
          ],
          poolAccNo: [
            "",
            [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
          ],
          accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdAM: [
            "",
            [
              Validators.pattern(
                /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
              )
            ]
          ],
          firstNameBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]
          ],
          lastNameBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z]{1,}$/)]
          ],
          mobileNumberBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
          ],
          emailIdBusinessSpoc: [
            "",
            [
              Validators.required,
              Validators.pattern(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
              )
            ]
          ],
          firstNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          lastNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          mobileNumberITSpoc: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdITSpoc: [
            "",
            [
              Validators.pattern(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
              )
            ]
          ],
          webServiceType: [""],
          communicationProtocol: [""],
          checksumControl: [""],
          encryptionMethod: [""],
          hostNameUat: ["", [Validators.required]],
          uatIp: [
            "",
            [
              Validators.required,
              Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)
            ]
          ],
          uatPort: [
            "9443",
            [
              Validators.required,
              Validators.pattern(
                /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
              )
            ]
          ],
          httpCertificate: [""],
          serviceTimeOutUAT: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLUAT: [
            "",
            [
              Validators.pattern(
                /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
              )
            ]
          ],
          serviceNameInputUAT: [""],
          uatFile1: [""],
          retryAttempts: [""],
          actionOnNoRes: [""],
          hostNameProd: [""],
          prodIp: [
            "",
            [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
          ],
          prodPort: [
            "9443",
            [
              Validators.pattern(
                /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
              )
            ]
          ],
          httpProdCertificate: [""],
          serviceTimeOutProd: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLProd: [
            "",
            [
              Validators.pattern(
                /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
              )
            ]
          ],
          serviceNameInputProd: [""],
          prodFile1: [""],
         

        });
      } else if (
        this.summaryServiceName ==
        "ECollection with Two Level Validation at Bank and Client’s End"
      ) {
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          organization: [
            "",
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
            ]
          ],
          iciciAccNo: [
            "",
            [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
          ],
          poolAccNo: [
            "",
            [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
          ],
          accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdAM: [
            "",
            [
              Validators.pattern(
                /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
              )
            ]
          ],
          firstNameBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]
          ],
          lastNameBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z]{1,}$/)]
          ],
          mobileNumberBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
          ],
          emailIdBusinessSpoc: [
            "",
            [
              Validators.required,
              Validators.pattern(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
              )
            ]
          ],
          firstNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          lastNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          mobileNumberITSpoc: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdITSpoc: [
            "",
            [
              Validators.pattern(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
              )
            ]
          ],
          webServiceType: [""],
          communicationProtocol: [""],
          checksumControl: [""],
          encryptionMethod: [""],
          hostNameUat: ["", [Validators.required]],
          uatIp: [
            "",
            [
              Validators.required,
              Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)
            ]
          ],
          uatPort: [
            "9443",
            [
              Validators.required,
              Validators.pattern(
                /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
              )
            ]
          ],
          httpCertificate: [""],
          serviceTimeOutUAT: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLUAT: [
            "",
            [
              Validators.pattern(
                /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
              )
            ]
          ],
          serviceNameInputUAT: [""],
          serviceNameInputUAT2: [""],
          uatFile1: [""],
          retryAttempts: [""],
          actionOnNoRes: [""],
          hostNameProd: [""],
          prodIp: [
            "",
            [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
          ],
          prodPort: [
            "9443",
            [
              Validators.pattern(
                /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
              )
            ]
          ],
          httpProdCertificate: [""],
          serviceTimeOutProd: [""],
          serviceURLProd: [
            "",
            [
              Validators.pattern(
                /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
              )
            ]
          ],
          serviceNameInputProd: [""],
          serviceNameInputProd2: [""],
          prodFile1: [""],
          uatFile2: [""],
          prodFile2: [""],
          serviceTimeOutUAT2: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLUAT2: ["",[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
          )]],
          serviceTimeOutProd2: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLProd2: ["",
[
 Validators.pattern(
/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
)
]],
         
        });
      } else {
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          organization: [
            "",
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
            ]
          ],
          iciciAccNo: [
            "",
            [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
          ],
          accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdAM: [
            "",
            [
              Validators.pattern(
                /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
              )
            ]
          ],
          firstNameBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]
          ],
          lastNameBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[a-zA-Z]{1,}$/)]
          ],
          mobileNumberBusinessSpoc: [
            "",
            [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
          ],
          emailIdBusinessSpoc: [
            "",
            [
              Validators.required,
              Validators.pattern(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
              )
            ]
          ],
          firstNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          lastNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          mobileNumberITSpoc: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdITSpoc: [
            "",
            [
              Validators.pattern(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
              )
            ]
          ],
          webServiceType: [""],
          communicationProtocol: [""],
          checksumControl: [""],
          encryptionMethod: [""],
          hostNameUat: ["", [Validators.required]],
          uatIp: [
            "",
            [
              Validators.required,
              Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)
            ]
          ],
          uatPort: [
            "9443",
            [
              Validators.required,
              Validators.pattern(
                /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/              )
            ]
          ],
          httpCertificate: [""],
          serviceTimeOutUAT: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLUAT: [
            "",
            [
              Validators.pattern(
                /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
              )
            ]
          ],
          serviceNameInputUAT: [""],
          uatFile1: [""],
          retryAttempts: [""],
          actionOnNoRes: [""],
          hostNameProd: [""],
          prodIp: [
            "",
            [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
          ],
          prodPort: [
            "9443",
            [
              Validators.pattern(
                /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
              )
            ]
          ],
          httpProdCertificate: [""],
          serviceTimeOutProd: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
          serviceURLProd: [
            "",
            [
             Validators.pattern(
                /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
              )
            ]
          ],
          serviceNameInputProd: [""],
          prodFile1: [""],
         
        
        
        });
      }
    } else {
      this.addRegisterData = this.fb.group({
        // 'emails': this.fb.array([
        //     this.addbusinessEmail()
        // ]),
        organization: [
          "",
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
          ]
        ],
        iciciAccNo: [
          "",
          [Validators.required, Validators.pattern(/^[0-9]{12}$/)]
        ],
        accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
        emailIdAM: [
          "",
          [
            Validators.pattern(
              /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
            )
          ]
        ],
        firstNameBusinessSpoc: [
          "",
          [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]
        ],
        lastNameBusinessSpoc: [
          "",
          [Validators.required, Validators.pattern(/^[a-zA-Z]{1,}$/)]
        ],
        mobileNumberBusinessSpoc: [
          "",
          [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
        ],
        emailIdBusinessSpoc: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            )
          ]
        ],
        firstNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        lastNameITSpoc: ["", [Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        mobileNumberITSpoc: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
        emailIdITSpoc: [
          "",
          [
            Validators.pattern(
              /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            )
          ]
        ],
        webServiceType: [""],
        isure_communication_protocol: [""],
        checksumControl: [""],
        encryptionMethod: [""],
        txnPerday: ["", [Validators.pattern(/^[1-9]([0-9]{1,})?$/)]],
        reqParameter: [""],
        hostNameUat: ["", [Validators.required]],
        uatIp: [
          "",
          [
            Validators.required,
            Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)
          ]
        ],
        uatPort: [
          "9443",
          [
            Validators.required,
            Validators.pattern(
              /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
            )
          ]
        ],
        httpCertificate: [""],
        serviceTimeOutUAT: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
        serviceURLUAT: [
          "",
          [
            Validators.pattern(
              /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
            )
          ]
        ],
        serviceNameInputUAT1: [""],
        uatFile1: [""],
        serviceNameInputUAT2: [""],
        uatFile2: [""],
        hostNameProd: [""],
        prodIp: [
          "",
          [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]
        ],
        prodPort: [
          "9443",
          [
            Validators.pattern(
              /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
            )
          ]
        ],
        httpProdCertificate: [""],
        serviceTimeOutProd: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
        serviceURLProd: [
          "",
          [
           Validators.pattern(
              /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
            )
          ]
        ],
        serviceNameInputProd1: [""],
        prodFile1: [""],
        serviceNameInputProd2: [""],
        prodFile2: [""],
        // changes
        serviceTimeOutUAT2: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
        serviceURLUAT2: ["",[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
        )]],
        serviceTimeOutProd2: ["", [Validators.pattern(/^[0-9]{0,}$/)]],
        serviceURLProd2: ["",
        [
         Validators.pattern(
        /^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
        )
        ]],
       
      });
    }
    this.addRegisterData.controls["uatPort"].setValue("9443");
  }
  // changes here by sanchita for selection on 19-December-2019 ends


  webServiceTypeFunction(value) {
    // console.log("value--------", value);
    
    if (value == "SOAP/HTTP") {
    $("#servername").prop("disabled", false);
    this.communicationProtocolArrayUat = [
    {
    name: "HTTP",
    value: "POST"
    }
    ];
    } else if (value == "REST/JSON" || value == "REST/XML") {
    $("#servername").prop("disabled", false);
    
    this.communicationProtocolArrayUat = [
    {
    name: "POST",
    value: "POST"
    },
    
    {
    name: "GET",
    value: "GET"
    }
    ];
    }
    
    }
    
  noAccountSubmission(details) {
    this.invalid1 = []
    this.activeIds = ["static-2"];
    const controls = this.addRegisterData.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        if (name == "organization" || name == "firstNameBusinessSpoc" || name == "lastNameBusinessSpoc" || name == "mobileNumberBusinessSpoc" || name == "emailIdBusinessSpoc") {
          this.invalid1.push(name);
        }
      }
    }
    if(this.invalid1.length>0){
      for(var i = 0; i < this.invalid1.length; i++){
        if(this.invalid1[i] == "organization"){
          this.addRegisterData.get("organization").setErrors({ abcd: true});
          $('#organization').css("border","1px solid red");
          this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView({block:"start"});
        }
        if(this.invalid1[i] == "firstNameBusinessSpoc"){
          this.addRegisterData.get("firstNameBusinessSpoc").setErrors({ abcd: true});
          $('#firstNameBusinessSpoc').css("border","1px solid red");
        }
        if(this.invalid1[i] == "lastNameBusinessSpoc"){
          this.addRegisterData.get("lastNameBusinessSpoc").setErrors({ abcd: true});
          $('#lastNameBusinessSpoc').css("border","1px solid red");
        }
        if(this.invalid1[i] == "mobileNumberBusinessSpoc"){
          this.addRegisterData.get("mobileNumberBusinessSpoc").setErrors({ abcd: true});
          $('#mobileNumberBusinessSpoc').css("border","1px solid red");
        }
        if(this.invalid1[i] == "emailIdBusinessSpoc"){
          this.addRegisterData.get("emailIdBusinessSpoc").setErrors({ abcd: true});
          $('#emailIdBusinessSpoc').css("border","1px solid red");
        }
      }
    }
    console.log("ivalid", this.invalid1)
    if (this.invalid1.length == 0) {
      alert(
        "Thank You, ICICI team is informed through Email...!"
      );
      this.router.navigateByUrl('authentication/Home')
    } else {
      alert(
        "Please Enter Mandatory fields!"
      );
      console.log("errors-----------",this.invalid1)

    }
  }
  submitDetails(details) {
    console.log("details", details);
    let now = moment();
    let formatted_date = moment().format('MMMM Do YYYY');
    var roles = [];
    roles.push("Customer")
    if(this.communicationProtocolUAT == undefined){
      this.communicationProtocolUAT = "HTTP";
      }
      if(this.communicationProtocolProduction == undefined){
      this.communicationProtocolProduction = "HTTP";
      }
    this.dataForRegister = {
      firstName: details.firstName,
      lastName: details.lastName,
      organisation: details.organization,
      email: details.email,
      phoneNumber: details.phoneno,
      have_an_ICICI_account: this.radioVal,
      bankAccountNumber: details.iciciAccNo,
      poolAccountNumber: details.poolAccNo,
      roles: roles
    };
    if (this.summaryProductName === "eCollections") {
      this.dataForProject = {
        products: [
          {
            productId: this.productValue.productId,
            services: [
              {
                serviceId: this.selectedIndex1,
                serviceName: this.summaryServiceName,
                webServiceType: details.webServiceType,
                communicationProtocol: details.communicationProtocol,
                emails: details.emails,
                httpCertificateUAT: this.httpCertificateUATName,
                httpCertificateProd: this.httpCertificateProdName,
                encryptionMethod: details.encryptionMethod,
                checksumControl: details.checksumControl,
                uatIp: details.uatIp,
                uatPort: details.uatPort,
                retryAttempts: details.retryAttempts,
                actionOnNoRes: details.actionOnNoRes,
                prodIp: details.prodIp,
                communicationProtocolUAT: this.communicationProtocolUAT,
                communicationProtocolProd: this.communicationProtocolProduction,
                prodUsername: details.prodUsername,
                prodPort: details.prodPort,
                prodSecret: details.prodSecret,
                prodPassword: details.prodPassword,
                uatFile1: details.uatFile1,
                uatFile2: details.uatFile2,
                prodFile1: details.prodFile1,
                prodFile2: details.prodFile2,
                uatURL1: details.uatURL1,
                uatURL2: details.uatURL2,
                prodURL1: details.prodURL1,
                prodURL2: details.prodURL2,
                hostNameUat: details.hostNameUat,
                hostNameProd: details.hostNameProd,
                serviceNameInputUAT: details.serviceNameInputUAT,
                serviceNameInputProd: details.serviceNameInputProd,
                serviceURLUAT: details.serviceURLUAT,
                serviceTimeOutUAT: details.serviceTimeOutUAT,
                serviceNameInputUAT2: details.serviceNameInputUAT2,
                serviceURLProd: details.serviceURLProd,
                serviceTimeOutProd: details.serviceTimeOutProd,
                serviceTimeOutUAT2: details.serviceTimeOutUAT2,
                serviceNameInputProd2: details.serviceNameInputProd2,
                serviceURLUAT2: details.serviceURLUAT2,
                serviceTimeOutProd2: details.serviceTimeOutProd2,
                serviceURLProd2: details.serviceURLProd2
              }
            ]
          }
        ],
        productName: "eCollection",
        // "version": details.appVersion,
        // "username": details.username,
        orgName: details.organization
      };
    } else if (this.productValue.productName === "iSurePay") {
      this.dataForProject = {
        products: [
          {
            productId: this.productValue.productId,
            ackReciept: details.ackReciept,
            modeOffered: details.modeOffered,
            paymentOptionType: this.paymentOptionValue,
            paymentDetails: this.paymentArray,
            amountField: details.amountField,
            services: [
              {
                txnPerday: details.txnPerday,
                hostNameUat: details.hostNameUat,
                hostNameProd: details.hostNameProd,
                reqParameter: details.reqParameter,
                serviceId: this.selectedIndex1,
                serviceName: this.summaryServiceName,
                httpCertificateUAT: this.httpCertificateUATName,
                httpCertificateProd: this.httpCertificateProdName,
                webServiceType: details.webServiceType,
                messageFormat: details.messageFormat,
                emails: details.emails,
                encryptionMethod: details.encryptionMethod,
                uatIp: details.uatIp,
                uatPort: details.uatPort,
                checksumControl: details.checksumControl,
                httpCertificate: details.httpCertificate,
                uatPayUpdateURL: details.uatPayUpdateURL,
                uatCustValidationURL: details.uatCustValidationURL,
                uatPaymentStat: details.uatPaymentStat,
                isure_communication_protocol:
                  details.isure_communication_protocol,
                prodIp: details.prodIp,
                methodType: this.valueD,
                prodPort: details.prodPort,
                communicationProtocolUAT: this.communicationProtocolUAT,
                communicationProtocolProd: this.communicationProtocolProduction,
                uatFile1: details.uatFile1,
                uatFile2: details.uatFile2,
                prodFile1: details.prodFile1,
                prodFile2: details.prodFile2,
                uatURL1: details.uatURL1,
                uatURL2: details.uatURL2,
                prodURL1: details.prodURL1,
                prodURL2: details.prodURL2,
                serviceNameInputUAT: details.serviceNameInputUAT1,
                serviceNameInputUAT2: details.serviceNameInputUAT2,
                serviceURLUAT: details.serviceURLUAT,
                serviceURLUAT2: details.serviceURLUAT2,
                serviceTimeOutUAT: details.serviceTimeOutUAT,
                serviceTimeOutUAT2: details.serviceTimeOutUAT2,
                serviceNameInputProd: details.serviceNameInputProd1,
                serviceNameInputProd2: details.serviceNameInputProd2,
                serviceURLProd: details.serviceURLProd,
                serviceURLProd2: details.serviceURLProd2,
                serviceTimeOutProd: details.serviceTimeOutProd,
                serviceTimeOutProd2: details.serviceTimeOutProd2,

              }
            ]
          }
        ],
        productName: "eCollection",
        orgName: details.organization
      };
    }
    
    console.log(" PRINT : PROJECT DATA ", JSON.stringify(this.dataForProject));

    this.appservice.projectData(this.dataForProject).then(data => {
      console.log("data of project", data);
      this.projectId = data["projectId"];
      console.log("projectId---------->", this.projectId);

      this.dataForRegister = {
        firstName: details.firstNameBusinessSpoc,
        lastName: details.lastNameBusinessSpoc,
        organisation: details.organization,
        email: details.emailIdBusinessSpoc,
        username: details.emailIdBusinessSpoc,
        have_an_ICICI_account: this.radioVal,
        bankAccountNumber: details.iciciAccNo,
        poolAccountNumber: details.poolAccNo,
        projectId: this.projectId,
        productName: this.productValue.productName,
        serviceName: this.summaryServiceName,
        firstNameBusinessSpoc: details.firstNameBusinessSpoc,
        lastNameBusinessSpoc: details.lastNameBusinessSpoc,
        mobileNumberBusinessSpoc: details.mobileNumberBusinessSpoc,
        emailIdBusinessSpoc: details.emailIdBusinessSpoc,
        firstNameITSpoc: details.firstNameITSpoc,
        lastNameITSpoc: details.lastNameITSpoc,
        mobileNumberITSpoc: details.mobileNumberITSpoc,
        emailIdITSpoc: details.emailIdITSpoc,
        businessSpocUsername: details.emailIdBusinessSpoc,
        itSpocUsername: details.emailIdITSpoc,
        accountManagerName: details.accountManagerName,
        mobileNumberAM: details.mobileNumberAM,
        emailIdAM: details.emailIdAM,
        roles: roles,
        subDate: formatted_date
      };
      this.appservice.registerData(this.dataForRegister).then(data => {
        console.log("Inside register data api call---", data);
        console.log("this.flowName", this.flowName);
        console.log("this.productName",this.productName);
        if (
          this.flowName ===
          "ECollection with Two Level Validation at Bank and Client’s End" ||
          this.productName === "iSurePay"
        ) {
          console.log("inside if condition");
          console.log("uatFile1",this.uatFile1);
          console.log("uatFile2",this.uatFile2);
          console.log("prodFile1",this.prodFile1);
          console.log("prodFile2",this.prodFile2);
          const formData1: any = new FormData();
          //   console.log("in isurePay------------------");
          formData1.append("files",this.uatFile1);
        var fileType1="uatFile1";
        this.appservice.uploadFile(this.projectId,formData1,fileType1).then(data1=>{
console.log("data for 1",data1);
if(data1.status == "200"){
  const formData2:any =new FormData();
  formData2.append("files", this.uatFile2);
              var fileType2 = "uatFile2";
  
  this.appservice.uploadFile(this.projectId,formData2,fileType2).then(data2 =>{
    console.log("data for 2",data2);
    if(data2.status == "200"){
      const formData3:any = new FormData();
      formData3.append("files",this.prodFile1);
      var fileType3="prodFile1";
      this.appservice.uploadFile(this.projectId,formData3,fileType3).then(data3=>{ 
      console.log("data of 3",data3);
      if(data3.status == "200"){
        const formData4:any = new FormData();
        formData4.append("files",this.prodFile2);
        var fileType4="prodFile2";
        this.appservice.uploadFile(this.projectId,formData4,fileType4).then(data4=>{ 
        console.log("data for 4",data4);
        });
      }
      });  
       }
  })
}
        })
                 } else {
          console.log("inside the else condition");
          const formData: any = new FormData();
          formData.append("files", this.uatFile1);


          var fileType = "uatFile1";

          console.log("api call for UAT");
          this.appservice.uploadFile(this.projectId, formData, fileType).then(data => {
            console.log("this.data of upload", data.status);

            if (data.status === "200") {

              if (this.prodFile1 === "") {
                console.log("inside if condition");
              } else {
                const formDataProd: any = new FormData();
                formDataProd.append("files", this.prodFile1);
                console.log("api call for prod");
                var filetype = "prodFile1"
                this.appservice
                  .uploadFileProd(this.projectId, formDataProd, filetype)
                  .then(data => {
                    console.log("data of production", data);

                  });
              }
            }



          });
        }


      });
    });

  }
  selected(methodType) {
    //   console.log(`method ------${methodType}`);
  }
  methodProdType(value) {
    this.communicationProtocolProduction = value;

    if (value == "HTTP") {
      this.disableInputProd = true;
    } else {
      this.disableInputProd = false;
    }
  }
  methodType(value) {
    this.communicationProtocolUAT = value;
    if (value == "HTTP") {
      this.addRegisterData.get('httpCertificate').clearValidators();
      this.valueD = value;
      this.disableInput = true;
    } else {
      this.addRegisterData.get('httpCertificate').setValidators([Validators.required]);
      this.valueD = value;
      this.disableInput = false;
    }
    this.addRegisterData.get('httpCertificate').updateValueAndValidity();
  }
  onSelect() {
    var checkedValue;
    var id;
    if ($('#customSwitch1').is(":checked"))
{
  checkedValue = 'Yes'
  id = 'bankAccount'
    console.log("checkValue: ",checkedValue,"id: ",id)
} else{
  checkedValue = 'No'
  id = 'webService'
  console.log("checkValue: ",checkedValue,"id: ",id)
}
    this.globalId = id;

    this.activeIds = ["static-2"];
    if(id == "webService"){
      console.log("bbb",this.tabSet.activeId)
      console.log("aab",this.globalId)

      this.addRegisterData.reset();
      this.appDetailsTab = false;
      this.userDetailsTab = false;
      this.serviceDetailsTab = true;
      $('#organization').css("border", "2px solid #D9D9D9");
      $('#firstNameBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#lastNameBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#mobileNumberBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#emailIdBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#iciciAccNo').css("border", "2px solid #D9D9D9");
      $('#poolAccNo').css("border", "2px solid #D9D9D9");
      $('#hostNameUat').css("border", "2px solid #D9D9D9");
      $('#uatIp').css("border", "2px solid #D9D9D9");
      $('#uatPort').css("border", "2px solid #D9D9D9");
    }
    else{
      console.log(id);
      this.addRegisterData.reset();
      this.appDetailsTab = false;
      this.userDetailsTab = false;
      this.serviceDetailsTab = false;
      $('#organization').css("border", "2px solid #D9D9D9");
      $('#firstNameBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#lastNameBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#mobileNumberBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#emailIdBusinessSpoc').css("border", "2px solid #D9D9D9");
      $('#iciciAccNo').css("border", "2px solid #D9D9D9");
      $('#poolAccNo').css("border", "2px solid #D9D9D9");
      $('#hostNameUat').css("border", "2px solid #D9D9D9");
      $('#uatIp').css("border", "2px solid #D9D9D9");
      $('#uatPort').css("border", "2px solid #D9D9D9");
    }
    this.checkedId = id;
    this.radioVal = checkedValue;
  }

  // onSelect(checkedValue, id) {
  //   this.activeIds = ["static-2"];
  //   if(id == "webService"){
  //     this.appDetailsTab = true;
  //     this.userDetailsTab = false;
  //     this.serviceDetailsTab = true;
  //     $('#organization').css("border", "2px solid #D9D9D9");
  //     $('#firstNameBusinessSpoc').css("border", "2px solid #D9D9D9");
  //     $('#lastNameBusinessSpoc').css("border", "2px solid #D9D9D9");
  //     $('#mobileNumberBusinessSpoc').css("border", "2px solid #D9D9D9");
  //     $('#emailIdBusinessSpoc').css("border", "2px solid #D9D9D9");
  //     this.addRegisterData.get("organization").setErrors({ abcd: false});
  //     this.addRegisterData.get("firstNameBusinessSpoc").setErrors({ abcd: false});
  //     this.addRegisterData.get("lastNameBusinessSpoc").setErrors({ abcd: false});
  //     this.addRegisterData.get("mobileNumberBusinessSpoc").setErrors({ abcd: false});
  //     this.addRegisterData.get("emailIdBusinessSpoc").setErrors({ abcd: false});
  //   }
  //   else{
  //     this.appDetailsTab = true;
  //     this.userDetailsTab = false;
  //     this.serviceDetailsTab = false;
  //     $('#organization').css("border", "2px solid #D9D9D9");
  //     $('#firstNameBusinessSpoc').css("border", "2px solid #D9D9D9");
  //     $('#lastNameBusinessSpoc').css("border", "2px solid #D9D9D9");
  //     $('#mobileNumberBusinessSpoc').css("border", "2px solid #D9D9D9");
  //     $('#emailIdBusinessSpoc').css("border", "2px solid #D9D9D9");
  //     this.addRegisterData.get("organization").setErrors({ abcd: false});
  //     this.addRegisterData.get("firstNameBusinessSpoc").setErrors({ abcd: false});
  //     this.addRegisterData.get("lastNameBusinessSpoc").setErrors({ abcd: false});
  //     this.addRegisterData.get("mobileNumberBusinessSpoc").setErrors({ abcd: false});
  //     this.addRegisterData.get("emailIdBusinessSpoc").setErrors({ abcd: false});
  //   }
  //   this.checkedId = id;
  //   this.radioVal = checkedValue.target.value;
  // }
  interaccval(interacc) {
    // taking value of interacc number
    console.log(interacc);
    this.interacc = interacc;
  }
  originalaccval(ogacc) {
    console.log(ogacc);
    // taking value of originalacc number

    this.ogacc = ogacc;
  }
  accCheck() {
    if (this.interacc === this.ogacc) {
      //newerr is for setting errors
      this.newerr = true;
    } else {
      this.newerr = false;
    }
    if(this.interacc == '' && this.ogacc == ''){
      this.newerr = false;

    }
  }
  
  portRange(pno) {
    //to check reserved port number
    // console.log(pno)
    if (pno >= 8050 && pno <= 8150) {
      // console.log("error")
      this.porterr = true;
    } else {
      this.porterr = false;
    }
  }
  // abvalidation
findInvalidControls(details) {
    console.log("+++++++++++++++++++", details);
    this.invalid = [];
    this.servFields = [];
    this.orgFields = [];
    this.serv1Fields = [];
    this.org1Fields = [];
    const controls = this.addRegisterData.controls;
    console.log("controls includes",controls);
    for (const name in controls) {
      if (controls[name].invalid) {
        this.invalid.push(name);
        console.log("main array",this.invalid)
      }
    }
   if(this.invalid.length == 0){
     this.submitDetails(details);
   }

    // same account number
    if(this.interacc == this.ogacc && this.interacc != "" && this.ogacc != ""){
      console.log("same no")
      console.log(this.interacc)
      console.log(this.ogacc)

        if(this.invalid[0]=="organization"){
          console.log("in one")
          // this.invalid[1].push("accountNo");
          this.invalid.splice(1,0,"accountNo")
          }
          else {
          // this.invalid[0].push("accountNo");
          this.invalid.splice(0,0,"accountNo")
          console.log("in two")
          
          }
          // else{
          //   console.log("final one")
          //   this.invalid.unshift("accountNo")
          // }
     
     }
     else if(this.interacc != this.ogacc){
       console.log("remove it")
      if(this.invalid[i] == 'accountNo'){

        this.invalid.splice(i,1);
      }
     }
    //  else{
    //   $('#iciciAccNo').css("border", "2px solid #D9D9D9");
    //   $('#poolAccNo').css("border", "2px solid #D9D9D9");
    //  }
     if(this.interacc == undefined && this.ogacc == undefined){
      console.log("into it")

      for(var i=0;i<this.invalid.length ;i++){

        if(this.invalid[i] == 'accountNo'){

          this.invalid.splice(i,1);
        }
      }

    }
    // same account number

    
    // console.log("invalid fields-------", this.invalid);
    // commenting for new changes
    // if (this.invalid.length > 0) {
    //   // alert(invalid);
    //   console.log("array",this.invalid);

    //   for (var i = 0; i < this.invalid.length; i++) {
    //     if(this.mobNumber.length == 0 && this.Emailid.length == 0){
    //       console.log("1")

    //     if (
    //       this.invalid[i] == "hostNameUat" ||
    //       this.invalid[i] == "uatIp" ||
    //       this.invalid[i] == "uatPort" ||
    //       this.invalid[i] == "httpCertificate"
    //     ) {
    //       this.servFields.push(this.invalid[i]);
    //     }
    //     else if(
    //       this.invalid[i] == "accountManagerName" ||
    //       this.invalid[i] == "firstNameITSpoc" ||
    //       this.invalid[i] == "lastNameITSpoc" ||
    //       this.invalid[i] == "mobileNumberITSpoc" ||
    //       this.invalid[i] == "emailIdITSpoc" 
    //     ){
    //       this.org1Fields.push(this.invalid[i]);
    //       console.log("this.org1Fields",this.org1Fields)
    //     }
    //     else if(
    //       this.invalid[i] == "serviceTimeOutUAT" ||
    //       this.invalid[i] == "serviceURLUAT" ||
    //       this.invalid[i] == "serviceNameInputUAT" ||
    //       this.invalid[i] == "serviceNameInputUAT1" ||
    //       this.invalid[i] == "uatFile1" ||
    //       this.invalid[i] == "serviceTimeOutUAT2" ||
    //       this.invalid[i] == "serviceURLUAT2" ||
    //       this.invalid[i] == "serviceNameInputUAT2" ||
    //       this.invalid[i] == "uatFile2" ||
    //       this.invalid[i] == "hostNameProd" ||
    //       this.invalid[i] == "prodIp" ||
    //       this.invalid[i] == "prodPort" ||
    //       this.invalid[i] == "serviceTimeOutProd" || 
    //       this.invalid[i] == "serviceURLProd"||
    //       this.invalid[i] == "serviceNameInputProd" ||
    //       this.invalid[i] == "prodFile1" ||
    //       this.invalid[i] == "serviceTimeOutProd2" ||
    //       this.invalid[i] == "serviceURLProd2"  ||
    //       this.invalid[i] == "serviceNameInputProd2" ||
    //       this.invalid[i] == "prodFile2" ||
    //       this.invalid[i] == "serviceNameInputUAT1" ||
    //       this.invalid[i] == "serviceNameInputProd1" ||
    //       this.invalid[i] == "txnPerday" ||
    //       this.invalid[i] == "reqParameter" 
           
    //     ){
    //       this.serv1Fields.push(this.invalid[i]);
    //       console.log("this.serv1Fields",this.serv1Fields)
    //     }
    //      else {
    //       this.orgFields.push(this.invalid[i]);
    //     }
    //   }
    //   else{
    //     console.log("2")
    //     if (
    //       this.invalid[i] == "hostNameUat" ||
    //       this.invalid[i] == "uatIp" ||
    //       this.invalid[i] == "uatPort" ||
    //       this.invalid[i] == "httpCertificate"
    //     ) {
    //       this.servFields.push(this.invalid[i]);
    //     }
    //     else if(
    //       this.invalid[i] == "firstNameITSpoc" ||
    //       this.invalid[i] == "lastNameITSpoc" ||
    //       this.invalid[i] == "mobileNumberITSpoc" ||
    //       this.invalid[i] == "emailIdITSpoc" 
    //     ){
    //       this.org1Fields.push(this.invalid[i]);
    //     }
    //     else if(
    //       this.invalid[i] == "serviceTimeOutUAT" ||
    //       this.invalid[i] == "serviceURLUAT" ||
    //       this.invalid[i] == "serviceNameInputUAT" ||
    //       this.invalid[i] == "serviceNameInputUAT1" ||
    //       this.invalid[i] == "uatFile1" ||
    //       this.invalid[i] == "serviceTimeOutUAT2" ||
    //       this.invalid[i] == "serviceURLUAT2" ||
    //       this.invalid[i] == "serviceNameInputUAT2" ||
    //       this.invalid[i] == "uatFile2" ||
    //       this.invalid[i] == "hostNameProd" ||
    //       this.invalid[i] == "prodIp" ||
    //       this.invalid[i] == "prodPort" ||
    //       this.invalid[i] == "serviceTimeOutProd" ||
    //       this.invalid[i] == "serviceNameInputProd" ||
    //       this.invalid[i] == "prodFile1" ||
    //       this.invalid[i] == "serviceTimeOutProd2" ||
    //       this.invalid[i] == "serviceNameInputProd2" ||
    //       this.invalid[i] == "prodFile2" ||
    //       this.invalid[i] == "serviceNameInputUAT1" ||
    //       this.invalid[i] == "serviceNameInputProd1" ||
    //       this.invalid[i] == "txnPerday" ||
    //       this.invalid[i] == "reqParameter" ||
    //       this.invalid[i] == "serviceURLProd"||
    //       this.invalid[i] == "serviceURLProd2"   
    //     ){
    //       this.serv1Fields.push(this.invalid[i]);
    //     }
    //      else {
    //       this.orgFields.push(this.invalid[i]);
    //     }
    //   }
    //   }
    //   console.log("serv", this.servFields);
    //   console.log("org", this.orgFields);
    // }
    //  else {
    //   this.submitDetails(details);
    // }
    // commenting for new changes

  }


toHide(){
  // $("#hide").click(function(){
  //   $("select>option.hides").wrap('<span>'); //no multiple wrappings
  // });
  // $(".hides").remove();
  // $(".hides").wrap('<span/>')
  // $("#xyz")[0].selectedIndex = 0;

}


  
  // abhishek
  // abhishek
  normalize(){
    $('#serviceTimeOutUAT').css("border", "2px solid #D9D9D9");

  }
  normalize1(){
    $('#serviceURLUAT').css("border", "2px solid #D9D9D9");
  }
  normalize2(){
    $('#uatFile1').css("border", "2px solid #D9D9D9");
  }
  normalize3(){
    $('#prodIp').css("border", "2px solid #D9D9D9");
  }
  normalize4(){
    $('#prodPort').css("border", "2px solid #D9D9D9");
  }
  normalize5(){
    $('#serviceTimeOutProd').css("border", "2px solid #D9D9D9");

  }
  normalize6(){
    $('#serviceURLProd').css("border", "2px solid #D9D9D9");
  }
  normalize7(){
    $('#serviceTimeOutUAT2').css("border", "2px solid #D9D9D9");
  }
  normalize8(){
    $('#serviceURLUAT2').css("border", "2px solid #D9D9D9");
  }
  normalize9(){
    $('#serviceTimeOutProd2').css("border", "2px solid #D9D9D9");
  }
  normalize10(){
    $('#serviceURLProd2').css("border", "2px solid #D9D9D9");
  }
  normalize11(){
    $('#txnPerday').css("border", "2px solid #D9D9D9");
  }
  normalize12(){
    $('#accountManagerName').css("border", "2px solid #D9D9D9");
  }
  normalize13(){
    $('#mobileNumberAM').css("border", "2px solid #D9D9D9");
  }
  normalize14(){
    $('#emailIdAM').css("border", "2px solid #D9D9D9");
  }
  normalize15(){
    $('#firstNameITSpoc').css("border", "2px solid #D9D9D9");
  }
  normalize16(){
    $('#lastNameITSpoc').css("border", "2px solid #D9D9D9");
  }
  normalize17(){
    $('#mobileNumberITSpoc').css("border", "2px solid #D9D9D9");
  }
  normalize18(){
    $('#emailIdITSpoc').css("border", "2px solid #D9D9D9");
  }

  normal() {
    $('#organization').css("border", "2px solid #D9D9D9");

  }
  normal1() {
    console.log("color Testing")

    if(this.ogacc==''){
      console.log("color Testing2")

      $('#iciciAccNo').css("border", "1px solid red");


    }
    if(this.interacc != this.ogacc && this.interacc ==undefined){
      console.log("color Testing3")
        $('#poolAccNo').css("border", "1px solid red");
        $('#iciciAccNo').css("border", "2px solid #D9D9D9");

      
      
    }
    else{
      console.log("color Testing5")

      $('#poolAccNo').css("border", "2px solid #D9D9D9");
      $('#iciciAccNo').css("border", "2px solid #D9D9D9");
      }

  }
  normal2() {
    if(this.interacc==''){
      console.log("color Testing2")

      $('#poolAccNo').css("border", "1px solid red");


    }
    if(this.interacc != this.ogacc && this.ogacc ==undefined){
      console.log("color Testing3")
        $('#iciciAccNo').css("border", "1px solid red");
        $('#poolAccNo').css("border", "2px solid #D9D9D9");

      
      
    }
    else{
      console.log("color Testing5")

      $('#poolAccNo').css("border", "2px solid #D9D9D9");
      $('#iciciAccNo').css("border", "2px solid #D9D9D9");
      }
  }
  normal3() {
    $('#firstNameBusinessSpoc').css("border", "2px solid #D9D9D9");

  }
  normal4() {
    $('#lastNameBusinessSpoc').css("border", "2px solid #D9D9D9");

  }
  normal5() {
    $('#mobileNumberBusinessSpoc').css("border", "2px solid #D9D9D9");

  }
  normal6() {
    $('#emailIdBusinessSpoc').css("border", "2px solid #D9D9D9");

  }
  normal7() {
    $('#hostNameUat').css("border", "2px solid #D9D9D9")

  }
  normal8() {
    $('#uatIp').css("border", "2px solid #D9D9D9")

  }
  normal9() {
    $('#uatPort').css("border", "2px solid #D9D9D9")

  }
  // abhishek
  openAcc(){
    this.mobNumber = this.addRegisterData.get("mobileNumberAM").value;
    if(this.mobNumber.length > 0){
      console.log("extraaa", this.mobNumber);
      this.addRegisterData.get('accountManagerName').setValidators([Validators.required,Validators.pattern(/^[a-zA-Z ]{3,}$/)]);
      this.addRegisterData.get('mobileNumberAM').setValidators([Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]);
      // this.addRegisterData.get('emailIdAM').setValidators([Validators.required,Validators.pattern(
      //   /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
      // )]);
    }
    else{
      this.addRegisterData.get('accountManagerName').setValidators([Validators.pattern(/^[a-zA-Z ]{3,}$/)]);
      this.addRegisterData.get('mobileNumberAM').setValidators([Validators.pattern(/^[6-9]\d{9}$/)]);
      // this.addRegisterData.get('emailIdAM').setValidators([Validators.pattern(
      //   /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
      // )]);
    $('#accountManagerName').css("border", "2px solid #D9D9D9");
    $('#mobileNumberAM').css("border", "2px solid #D9D9D9");
    $('#emailIdAM').css("border", "2px solid #D9D9D9");
    }
    this.addRegisterData.get('accountManagerName').updateValueAndValidity();
    this.addRegisterData.get('mobileNumberAM').updateValueAndValidity();
    // this.addRegisterData.get('emailIdAM').updateValueAndValidity();
    // for emailid
    if(this.mobNumber.length == 0){
    this.Emailid = this.addRegisterData.get("emailIdAM").value;
    console.log("extraaa", this.Emailid);
    if(this.Emailid.length>0){
      this.addRegisterData.get('accountManagerName').setValidators([Validators.required,Validators.pattern(/^[a-zA-Z ]{3,}$/)]);
      // this.addRegisterData.get('mobileNumberAM').setValidators([Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]);
      this.addRegisterData.get('emailIdAM').setValidators([Validators.required,Validators.pattern(
        /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
      )]);
    }
    else{
      this.addRegisterData.get('accountManagerName').setValidators([Validators.pattern(/^[a-zA-Z ]{3,}$/)]);
      // this.addRegisterData.get('mobileNumberAM').setValidators([Validators.pattern(/^[6-9]\d{9}$/)]);
      this.addRegisterData.get('emailIdAM').setValidators([Validators.pattern(
        /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
      )]);
    $('#accountManagerName').css("border", "2px solid #D9D9D9");
    $('#mobileNumberAM').css("border", "2px solid #D9D9D9");
    $('#emailIdAM').css("border", "2px solid #D9D9D9");
    }
    this.addRegisterData.get('accountManagerName').updateValueAndValidity();
    // this.addRegisterData.get('mobileNumberAM').updateValueAndValidity();
    this.addRegisterData.get('emailIdAM').updateValueAndValidity();
  }
    this.actIds = ["static-1"];
    this.activeIds = ["static-2"];
    this.actId = ["uatDetails"];
    this.actID = ["UATDetails"];
    this.activeI=["prodDetails"];
    this.activeID=["productionDetails"];
  }
//   restore1() {
//     if(this.interacc != this.ogacc){
//     $('#iciciAccNo').css("border", "2px solid #D9D9D9");
//     $('#poolAccNo').css("border", "2px solid #D9D9D9");
//   }
// }

  // abhishek
  errorPoint(e : any) {
  //  new changes
    if(this.invalid.length > 0){
      for(var i=0; i < this.invalid.length; i++){
        if(this.invalid[i] == 'accountManagerName'){
          $('#accountManagerName').css("border", "1px solid red");
        }
        if(this.invalid[i] == 'mobileNumberAM'){
          $('#mobileNumberAM').css("border", "1px solid red");
        }
        if(this.invalid[i] == 'emailIdAM'){
          $('#emailIdAM').css("border", "1px solid red");
        }
        if(this.invalid[i] == 'firstNameITSpoc'){
          $('#firstNameITSpoc').css("border", "1px solid red");
        }
        if(this.invalid[i] == 'lastNameITSpoc'){
          $('#lastNameITSpoc').css("border", "1px solid red");
        }
        if(this.invalid[i] == 'mobileNumberITSpoc'){
          $('#mobileNumberITSpoc').css("border", "1px solid red");
        }
        if(this.invalid[i] == 'emailIdITSpoc'){
          $('#emailIdITSpoc').css("border", "1px solid red");
        }

        if(this.invalid[i] == "serviceTimeOutUAT"){
          $('#serviceTimeOutUAT').css("border", "1px solid red");
        }
        if(this.invalid[i] == "serviceURLUAT"){
          $('#serviceURLUAT').css("border", "1px solid red");
        }
        if(this.invalid[i] == "serviceURLProd"){
          $('#serviceURLProd').css("border", "1px solid red");
        }
        if(this.invalid[i] == "serviceURLProd2"){
          $('#serviceURLProd2').css("border", "1px solid red");
        }
        if(this.invalid[i] == "uatFile1"){
          $('#uatFile1').css("border", "1px solid red");
        }
        if(this.invalid[i] == "prodIp"){
          $('#prodIp').css("border", "1px solid red");
        }
        if(this.invalid[i] == "prodPort"){
          $('#prodPort').css("border", "1px solid red");
        }
        if(this.invalid[i] == "serviceTimeOutProd"){
          $('#serviceTimeOutProd').css("border", "1px solid red");
        }
        
        if(this.invalid[i] == "serviceTimeOutUAT2"){
          $('#serviceTimeOutUAT2').css("border", "1px solid red");
        }
        if(this.invalid[i] == "serviceURLUAT2"){
          $('#serviceURLUAT2').css("border", "1px solid red");
        }
        if(this.invalid[i] == "serviceTimeOutProd2"){
          $('#serviceTimeOutProd2').css("border", "1px solid red");
        }
        
        if(this.invalid[i] == "txnPerday"){
          $('#txnPerday').css("border", "1px solid red");
        }

        if (this.invalid[i] == "hostNameUat") {
          this.addRegisterData.get("hostNameUat").setErrors({ abcd: true });
          $('#hostNameUat').css("border", "1px solid red");
          console.log("red");
          }
           if (this.invalid[i] == "uatIp") {
          this.addRegisterData.get("uatIp").setErrors({ abcd: true });
          $('#uatIp').css("border", "1px solid red")
          }
           if (this.invalid[i] == "uatPort") {
          this.addRegisterData.get("uatPort").setErrors({ abcd: true });
          $('#uatPort').css("border", "1px solid red")
          }



          if(this.invalid[i]=="organization"){
            this.addRegisterData.get("organization").setErrors({ abcd: true });
            $('#organization').css("border", "1px solid red");
            }
            if(this.invalid[i]=="accountNo"){
            $('#poolAccNo').css("border", "1px solid red");
            $('#iciciAccNo').css("border", "1px solid red");
       
          }    
          if (this.invalid[i] == "iciciAccNo") {
            this.addRegisterData.get("iciciAccNo").setErrors({ abcd: true });
            $('#iciciAccNo').css("border", "1px solid red");
            }
            if (this.invalid[i] == "poolAccNo") {
            this.addRegisterData.get("poolAccNo").setErrors({ abcd: true });
            $('#poolAccNo').css("border", "1px solid red");
    
          }
          if (this.invalid[i] == "accountManagerName") {
            this.addRegisterData.get("accountManagerName").setErrors({ abcd: true });
            $('#accountManagerName').css("border", "1px solid red");
    
          }
          if (this.invalid[i] == "mobileNumberAM") {
            this.addRegisterData.get("mobileNumberAM").setErrors({ abcd: true });
            $('#mobileNumberAM').css("border", "1px solid red");
    
          }
          if (this.invalid[i] == "emailIdAM") {
            this.addRegisterData.get("emailIdAM").setErrors({ abcd: true });
            $('#emailIdAM').css("border", "1px solid red");
    
          }
          if(this.invalid[i]=="firstNameBusinessSpoc"){
            console.log(this.productValue.productName)
            this.addRegisterData.get("firstNameBusinessSpoc").setErrors({ abcd: true});
            $('#firstNameBusinessSpoc').css("border","1px solid red");
          }
          if(this.invalid[i]=="lastNameBusinessSpoc"){
            this.addRegisterData.get("lastNameBusinessSpoc").setErrors({ abcd: true});
            $('#lastNameBusinessSpoc').css("border","1px solid red");
          }
          if(this.invalid[i]=="mobileNumberBusinessSpoc"){
            this.addRegisterData.get("mobileNumberBusinessSpoc").setErrors({ abcd: true});
            $('#mobileNumberBusinessSpoc').css("border","1px solid red");
          }
          if(this.invalid[i]=="emailIdBusinessSpoc"){
            this.addRegisterData.get("emailIdBusinessSpoc").setErrors({ abcd: true});
            $('#emailIdBusinessSpoc').css("border","1px solid red");
          }
      }
    }


  //  new changes

      // if(this.org1Fields.length > 0){
      //   for(var i=0; i < this.org1Fields.length;i++){
      //     if(this.org1Fields[i] == 'accountManagerName'){
      //       $('#accountManagerName').css("border", "1px solid red");
      //     }
      //     if(this.org1Fields[i] == 'mobileNumberAM'){
      //       $('#mobileNumberAM').css("border", "1px solid red");
      //     }
      //     if(this.org1Fields[i] == 'emailIdAM'){
      //       $('#emailIdAM').css("border", "1px solid red");
      //     }
      //     if(this.org1Fields[i] == 'firstNameITSpoc'){
      //       $('#firstNameITSpoc').css("border", "1px solid red");
      //     }
      //     if(this.org1Fields[i] == 'lastNameITSpoc'){
      //       $('#lastNameITSpoc').css("border", "1px solid red");
      //     }
      //     if(this.org1Fields[i] == 'mobileNumberITSpoc'){
      //       $('#mobileNumberITSpoc').css("border", "1px solid red");
      //     }
      //     if(this.org1Fields[i] == 'emailIdITSpoc'){
      //       $('#emailIdITSpoc').css("border", "1px solid red");
      //     }
      //   }
      // }
  
  
  
      // if(this.serv1Fields.length > 0){
      //   for(var i=0; i < this.serv1Fields.length;i++){
      //     if(this.serv1Fields[i] == "serviceTimeOutUAT"){
      //       $('#serviceTimeOutUAT').css("border", "1px solid red");
      //     }
      //     if(this.serv1Fields[i] == "serviceURLUAT"){
      //       $('#serviceURLUAT').css("border", "1px solid red");
      //     }
      //     if(this.serv1Fields[i] == "serviceURLProd"){
      //       $('#serviceURLProd').css("border", "1px solid red");
      //     }
      //     if(this.serv1Fields[i] == "serviceURLProd2"){
      //       $('#serviceURLProd2').css("border", "1px solid red");
      //     }
      //     if(this.serv1Fields[i] == "uatFile1"){
      //       $('#uatFile1').css("border", "1px solid red");
      //     }
      //     if(this.serv1Fields[i] == "prodIp"){
      //       $('#prodIp').css("border", "1px solid red");
      //     }
      //     if(this.serv1Fields[i] == "prodPort"){
      //       $('#prodPort').css("border", "1px solid red");
      //     }
      //     if(this.serv1Fields[i] == "serviceTimeOutProd"){
      //       $('#serviceTimeOutProd').css("border", "1px solid red");
      //     }
          
      //     if(this.serv1Fields[i] == "serviceTimeOutUAT2"){
      //       $('#serviceTimeOutUAT2').css("border", "1px solid red");
      //     }
      //     if(this.serv1Fields[i] == "serviceURLUAT2"){
      //       $('#serviceURLUAT2').css("border", "1px solid red");
      //     }
      //     if(this.serv1Fields[i] == "serviceTimeOutProd2"){
      //       $('#serviceTimeOutProd2').css("border", "1px solid red");
      //     }
          
      //     if(this.serv1Fields[i] == "txnPerday"){
      //       $('#txnPerday').css("border", "1px solid red");
      //     }
      //   }
      // }
  
      // if(this.invalid.length > 0){
      //   for (var i = 0; i < this.invalid.length; i++) {
      //     if (this.invalid[i] == "hostNameUat") {
      //       this.addRegisterData.get("hostNameUat").setErrors({ abcd: true });
      //       $('#hostNameUat').css("border", "1px solid red");
      //       console.log("red");
      //       if(this.productValue.productName == "eCollections"){
      //         if(this.orgFields.length == 0 && this.servFields.length > 0){
              
      //           // $([document.documentElement, document.body]).animate({ scrollTop: $("#uatDetails").offset().top }, 700); 
                
               
      //         }
              
      //       }
      //       // for isure
      //       if(this.productValue.productName == "iSurePay"){
      //         if(this.orgFields.length == 0 && this.servFields.length > 0){
              
      //           // $([document.documentElement, document.body]).animate({ scrollTop: $("#UATDetails").offset().top }, 700); 
                
               
      //         }
              
      //       }
      //     }
  
      //     if (this.invalid[i] == "uatIp") {
      //       this.addRegisterData.get("uatIp").setErrors({ abcd: true });
      //       $('#uatIp').css("border", "1px solid red")
      //       if(this.productValue.productName == "eCollections"){
      //         if(this.orgFields.length == 0 && this.servFields.length > 0){
              
      //           // $([document.documentElement, document.body]).animate({ scrollTop: $("#uatDetails").offset().top }, 700); 
                
               
      //         }
              
      //       }
      //       // for isure
      //       if(this.productValue.productName == "iSurePay"){
      //         if(this.orgFields.length == 0 && this.servFields.length > 0){
              
      //           // $([document.documentElement, document.body]).animate({ scrollTop: $("#UATDetails").offset().top }, 700); 
                
               
      //         }
              
      //       }
      //     }
      //     if (this.invalid[i] == "uatPort") {
      //       this.addRegisterData.get("uatPort").setErrors({ abcd: true });
      //       $('#uatPort').css("border", "1px solid red")
      //       if(this.productValue.productName == "eCollections"){
      //         if(this.orgFields.length == 0 && this.servFields.length > 0){
              
      //           // $([document.documentElement, document.body]).animate({ scrollTop: $("#uatDetails").offset().top }, 700); 
                
               
      //         }
              
      //       }
      //       // for isure
      //       if(this.productValue.productName == "iSurePay"){
      //         if(this.orgFields.length == 0 && this.servFields.length > 0){
              
      //           // $([document.documentElement, document.body]).animate({ scrollTop: $("#UATDetails").offset().top }, 700); 
                
               
      //         }
              
      //       }
      //     }
      //     if (this.invalid[i] == "httpCertificate") {
      //       this.addRegisterData.get("httpCertificate").setErrors({ abcd: true });
      //       $('#httpCertificate').css("border", "1px solid red")
      //     }
         
  
      //   }
      // ////////////////////////////////
      
      // }


      
      
    
//       if(this.orgFields.length > 0){
//         this.exp = "userDetails";
//         this.tabSet.activeId = "userDetails"
//    for(var j = 0; j< this.orgFields.length;j++){
//       if(this.orgFields[j]=="organization"){
//         this.addRegisterData.get("organization").setErrors({ abcd: true });
//         $('#organization').css("border", "1px solid red");
//         // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView();
//         // $('html, body').animate({ scrollTop: 0 }, 1200);
// // return false;

//       }
//       if(this.orgFields[j]=="accountNo"){
//         // this.addRegisterData.get("poolAccNo").setErrors({ abcd: true });
//         $('#poolAccNo').css("border", "1px solid red");
//         $('#iciciAccNo').css("border", "1px solid red");
//         // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView();

//       }

//       if (this.orgFields[j] == "iciciAccNo") {
//         this.addRegisterData.get("iciciAccNo").setErrors({ abcd: true });
//         $('#iciciAccNo').css("border", "1px solid red");
//         // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView();
// //         $('html, body').animate({ scrollTop: 0 }, 1200);
// // return false;

//       }
//       if (this.orgFields[j] == "poolAccNo") {
//         this.addRegisterData.get("poolAccNo").setErrors({ abcd: true });
//         $('#poolAccNo').css("border", "1px solid red");
//         // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView();

//       }
//       if (this.orgFields[j] == "accountManagerName") {
//         this.addRegisterData.get("accountManagerName").setErrors({ abcd: true });
//         $('#accountManagerName').css("border", "1px solid red");
//         // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView();

//       }
//       if (this.orgFields[j] == "mobileNumberAM") {
//         this.addRegisterData.get("mobileNumberAM").setErrors({ abcd: true });
//         $('#mobileNumberAM').css("border", "1px solid red");
//         // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView();

//       }
//       if (this.orgFields[j] == "emailIdAM") {
//         this.addRegisterData.get("emailIdAM").setErrors({ abcd: true });
//         $('#emailIdAM').css("border", "1px solid red");
//         // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView();

//       }
//       if(this.orgFields[j]=="firstNameBusinessSpoc"){
//         console.log(this.productValue.productName)
//         this.addRegisterData.get("firstNameBusinessSpoc").setErrors({ abcd: true});
//         $('#firstNameBusinessSpoc').css("border","1px solid red");
//         if(this.productValue.productName == "eCollections"){
       
//         // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView({block:"center"});
// //         $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
// // return false;
//         }
//         if(this.productValue.productName == "iSurePay"){
           
//         }

//       }
//       if(this.orgFields[j]=="lastNameBusinessSpoc"){
//         this.addRegisterData.get("lastNameBusinessSpoc").setErrors({ abcd: true});
//         $('#lastNameBusinessSpoc').css("border","1px solid red");
//         if(this.productValue.productName == "eCollections"){
       
//           // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView({block:"center"});
//           }
//           if(this.productValue.productName == "iSurePay"){
//             // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView({block:"center"});
//             // $([document.documentElement, document.body]).animate({ scrollTop: $("#static-2").offset().top }, 700); 
//           }

//       }
//       if(this.orgFields[j]=="mobileNumberBusinessSpoc"){
//         this.addRegisterData.get("mobileNumberBusinessSpoc").setErrors({ abcd: true});
//         $('#mobileNumberBusinessSpoc').css("border","1px solid red");
//         if(this.productValue.productName == "eCollections"){
       
//           // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView({block:"center"});
//           }
//           if(this.productValue.productName == "iSurePay"){
//             // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView({block:"center"});
//             // $([document.documentElement, document.body]).animate({ scrollTop: $("#static-2").offset().top }, 700); 
//           }
//       }
//       if(this.orgFields[j]=="emailIdBusinessSpoc"){
//         this.addRegisterData.get("emailIdBusinessSpoc").setErrors({ abcd: true});
//         $('#emailIdBusinessSpoc').css("border","1px solid red");
//         if(this.productValue.productName == "eCollections"){
       
//           // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView({block:"center"});
//           }
//           if(this.productValue.productName == "iSurePay"){
//             // this.ele.nativeElement.querySelector('#ngbTabset').scrollIntoView({block:"center"});
//             // $([document.documentElement, document.body]).animate({ scrollTop: $("#static-2").offset().top }, 700); 
//           }
//       }
//     }
//   }
//       if(this.invalid.length > 0){
//             this.exp = "userDetails";
//             this.tabSet.activeId = "userDetails"
//        for(var i = 0; i< this.invalid.length;i++){
//           if(this.invalid[i]=="organization"){
//             $('html, body').animate({ scrollTop: 0 }, 1200);
// return false;
  
//           }
//           if(this.invalid[i]=="accountNo"){
//             $('html, body').animate({ scrollTop: 0 }, 1200);
//             return false;
//           }

//           if (this.invalid[i] == "iciciAccNo") {
//            $('html, body').animate({ scrollTop: 0 }, 1200);
// return false;
  
//           }
//           if (this.invalid[i] == "poolAccNo") {
//             $('html, body').animate({ scrollTop: 0 }, 1200);
//             return false;
          
//           }
//           if (this.invalid[i] == "accountManagerName") {
//             $('html, body').animate({ scrollTop: $(document).height()/7 }, 1200);
//             return false;
          
//           }
//           if (this.invalid[i] == "mobileNumberAM") {
//             $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
//             return false;
          
//           }
//           if (this.invalid[i] == "emailIdAM") {
//             $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
//             return false;
          
//           }
//           if(this.invalid[i]=="firstNameBusinessSpoc"){
//             console.log(this.productValue.productName)
//             if(this.productValue.productName == "eCollections"){
           
//             $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
// return false;
//             }
//             if(this.productValue.productName == "iSurePay"){
//               $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
// return false; 
               
//             }
  
//           }
//           if(this.invalid[i]=="lastNameBusinessSpoc"){
//             if(this.productValue.productName == "eCollections"){
//               $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
//               return false;
//             }
//               if(this.productValue.productName == "iSurePay"){
//                 $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
//                 return false;  
//               }
  
//           }
//           if(this.invalid[i]=="mobileNumberBusinessSpoc"){
//             if(this.productValue.productName == "eCollections"){
//               $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
//               return false;
//                }
//               if(this.productValue.productName == "iSurePay"){
//                 $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
//                 return false; 
//               }
//           }
//           if(this.invalid[i]=="emailIdBusinessSpoc"){
//             if(this.productValue.productName == "eCollections"){
//               $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
//               return false;
//             }
//               if(this.productValue.productName == "iSurePay"){
//                 $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
//                 return false;
//               }
//           }
//         }
//       }
   
//       if(this.invalid.length > 0){
//         this.exp = "userDetails";
//         this.tabSet.activeId = "userDetails"
//         for(var i = 0; i< this.invalid.length;i++){
//           if(this.invalid[i] == "accountManagerName"){
//             $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200); 
//             return false;  
//           }
//           if(this.invalid[i] == "firstNameITSpoc"){
//             $('html, body').animate({ scrollTop: $(document).height()/2 }, 1200);
//             return false;
//           }
//           if(this.invalid[i] == "lastNameITSpoc"){
//             $('html, body').animate({ scrollTop: $(document).height()/2 }, 1200);
//             return false;  
//           }
//           if(this.invalid[i] == "mobileNumberITSpoc"){
//             $('html, body').animate({ scrollTop: $(document).height()/2 }, 1200);
//             return false;  
//           }
//           if(this.invalid[i] == "emailIdITSpoc"){
//             $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
//             return false;  
//           }
//         }
//       }

//       if(this.invalid.length > 0){
//         for (var i = 0; i < this.invalid.length; i++) {
//           if (this.invalid[i] == "hostNameUat") {
         
//             if(this.productValue.productName == "eCollections"){
//               if(this.orgFields.length == 0 && this.servFields.length > 0){
              
//                 $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
//                 return false;
               
//               }
              
//             }
//             // for isure
//             if(this.productValue.productName == "iSurePay"){
//               if(this.orgFields.length == 0 && this.servFields.length > 0){
//                 $('html, body').animate({ scrollTop: $(document).height()/5 }, 1200);
//                 return false;
                
               
//               }
              
//             }
//           }
  
//           if (this.invalid[i] == "uatIp") {
//              if(this.productValue.productName == "eCollections"){
//               if(this.orgFields.length == 0 && this.servFields.length > 0){
              
//                 $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
//                 return false;
               
//               }
              
//             }
//             // for isure
//             if(this.productValue.productName == "iSurePay"){
//               if(this.orgFields.length == 0 && this.servFields.length > 0){
              
//                 $('html, body').animate({ scrollTop: $(document).height()/5 }, 1200);
//                 return false; 
               
//               }
              
//             }
//           }
//           if (this.invalid[i] == "uatPort") {
//             if(this.productValue.productName == "eCollections"){
//               if(this.orgFields.length == 0 && this.servFields.length > 0){
              
//                 $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
//                 return false; 
               
//               }
              
//             }
//             // for isure
//             if(this.productValue.productName == "iSurePay"){
//               if(this.orgFields.length == 0 && this.servFields.length > 0){
              
//                 $('html, body').animate({ scrollTop: $(document).height()/5 }, 1200);
//                 return false;  
               
//               }
              
//             }
//           }
//           if (this.invalid[i] == "httpCertificate") {
//             this.addRegisterData.get("httpCertificate").setErrors({ abcd: true });
//             $('#httpCertificate').css("border", "1px solid red")
//           }
         
  
//         }
//       ////////////////////////////////
      
//       }

//       if(this.invalid.length > 0){
//         for(var i = 0; i < this.invalid.length; i++){
//           if(this.invalid[i] == "txnPerday"){
//             $('html, body').animate({ scrollTop: $(document).height()/8 }, 1200);
//             return false;  
//           }
//           if(this.invalid[i] == "serviceTimeOutUAT"){
//             $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
//             return false;  
//           } 
//           if(this.invalid[i] == "serviceURLUAT"){
//             $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
//             return false;  
//           } 
//           if(this.invalid[i] == "serviceNameInputUAT1"){
//             $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
//             return false;  
//           } 
          
//           if(this.invalid[i] == "serviceTimeOutUAT2"){
//             $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
//             return false;  
//           } 
//           if(this.invalid[i] == "serviceURLUAT2"){
//             $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
//             return false;  
//           } 
//           if(this.invalid[i] == "serviceNameInputUAT2"){
//             $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
//             return false;  
//           } 
//           if(this.invalid[i] == "prodIp"){
//             $('html, body').animate({ scrollTop: $(document).height()/2 }, 1200);
//             return false;  
//           } 
//           if(this.invalid[i] == "prodPort"){
//             $('html, body').animate({ scrollTop: $(document).height()/2 }, 1200);
//             return false;  
//           } 
//           if(this.invalid[i] == "serviceTimeOutProd"){
//             $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
//             return false;  
//           } 
//           if(this.invalid[i] == "serviceURLProd"){
//             $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
//             return false;  
//           } 
//           if(this.invalid[i] == "serviceNameInputProd1"){
//             $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
//             return false;  
//           } 
//           if(this.invalid[i] == "serviceTimeOutProd2"){
//             $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
//             return false;  
//           }
//           if(this.invalid[i] == "serviceURLProd2"){
//             $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
//             return false;  
//           }
//           if(this.invalid[i] == "serviceNameInputProd2"){
//             $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
//             return false;  
//           }  
//         }
//       }

    if(this.invalid.length > 0){
      for(var i = 0; i < this.invalid.length; i++){
        if(this.invalid[i]=="organization"){
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: 0 }, 1200);
          return false;
        }
        if(this.invalid[i]=="accountNo"){
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: 0 }, 1200);
          return false;
        }
        if (this.invalid[i] == "iciciAccNo") {
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: 0 }, 1200);
          return false;
         }
         if (this.invalid[i] == "poolAccNo") {
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: 0 }, 1200);
          return false;
        
        }
        if (this.invalid[i] == "accountManagerName") {
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: $(document).height()/7 }, 1200);
          return false;
        
        }
        if (this.invalid[i] == "mobileNumberAM") {
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
          return false;
        
        }
        if (this.invalid[i] == "emailIdAM") {
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
          return false;
        
        }
        if(this.invalid[i]=="firstNameBusinessSpoc"){
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          console.log(this.productValue.productName)
          if(this.productValue.productName == "eCollections"){
         
          $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
return false;
          }
          if(this.productValue.productName == "iSurePay"){
            $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
return false; 
             
          }

        }
        if(this.invalid[i]=="lastNameBusinessSpoc"){
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          if(this.productValue.productName == "eCollections"){
            $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
            return false;
          }
            if(this.productValue.productName == "iSurePay"){
              $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
              return false;  
            }

        }
        if(this.invalid[i]=="mobileNumberBusinessSpoc"){
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          if(this.productValue.productName == "eCollections"){
            $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
            return false;
             }
            if(this.productValue.productName == "iSurePay"){
              $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
              return false; 
            }
        }
        if(this.invalid[i]=="emailIdBusinessSpoc"){
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          if(this.productValue.productName == "eCollections"){
            $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
            return false;
          }
            if(this.productValue.productName == "iSurePay"){
              $('html, body').animate({ scrollTop: $(document).height()/4 }, 1200);
              return false;
            }
        }
        if(this.invalid[i] == "firstNameITSpoc"){
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: $(document).height()/2 }, 1200);
          return false;
        }
        if(this.invalid[i] == "lastNameITSpoc"){
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: $(document).height()/2 }, 1200);
          return false;  
        }
        if(this.invalid[i] == "mobileNumberITSpoc"){
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: $(document).height()/2 }, 1200);
          return false;  
        }
        if(this.invalid[i] == "emailIdITSpoc"){
          this.exp = "userDetails";
          this.tabSet.activeId = "userDetails"
          $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
          return false;  
        }
        if(this.invalid[i] == "txnPerday"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/8 }, 1200);
          return false;  
        }
        if(this.invalid[i] == "httpCertificate"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
          return false;  
        }
        if(this.invalid[i] == "serviceTimeOutUAT"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
          return false;  
        } 
        if(this.invalid[i] == "serviceURLUAT"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
          return false;  
        } 
        if(this.invalid[i] == "serviceNameInputUAT1"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
          return false;  
        } 
        
        if(this.invalid[i] == "serviceTimeOutUAT2"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
          return false;  
        } 
        if(this.invalid[i] == "serviceURLUAT2"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
          return false;  
        } 
        if(this.invalid[i] == "serviceNameInputUAT2"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/3 }, 1200);
          return false;  
        } 
        if(this.invalid[i] == "prodIp"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/2 }, 1200);
          return false;  
        } 
        if(this.invalid[i] == "prodPort"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/2 }, 1200);
          return false;  
        } 
        if(this.invalid[i] == "serviceTimeOutProd"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
          return false;  
        } 
        if(this.invalid[i] == "serviceURLProd"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
          return false;  
        } 
        if(this.invalid[i] == "serviceNameInputProd1"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
          return false;  
        } 
        if(this.invalid[i] == "serviceTimeOutProd2"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
          return false;  
        }
        if(this.invalid[i] == "serviceURLProd2"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
          return false;  
        }
        if(this.invalid[i] == "serviceNameInputProd2"){
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          $('html, body').animate({ scrollTop: $(document).height()/1.5 }, 1200);
          return false;  
        }
        if (this.invalid[i] == "hostNameUat") {
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          if(this.productValue.productName == "eCollections"){
           
            
              $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
              return false;
             
            
            
          }
          // for isure
          if(this.productValue.productName == "iSurePay"){
          
              $('html, body').animate({ scrollTop: $(document).height()/5 }, 1200);
              return false;
              
             
            
            
          }
        }

        if (this.invalid[i] == "uatIp") {
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
           if(this.productValue.productName == "eCollections"){
           
            
              $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
              return false;
             
           
            
          }
          // for isure
          if(this.productValue.productName == "iSurePay"){
           
              $('html, body').animate({ scrollTop: $(document).height()/5 }, 1200);
              return false; 
             
         
          }
        }
        if (this.invalid[i] == "uatPort") {
          this.exp = "serviceDetails";
          this.tabSet.activeId = "serviceDetails"
          if(this.productValue.productName == "eCollections"){
          
              $('html, body').animate({ scrollTop: $(document).height()/6 }, 1200);
              return false; 
             
          
          }
          // for isure
          if(this.productValue.productName == "iSurePay"){
           
              $('html, body').animate({ scrollTop: $(document).height()/5 }, 1200);
              return false;  
          
            
          }
        }
      }
    }




    }
    mand(mand) {
      // this.addRegisterData.get('emailIdAM').setValidators([Validators.pattern(/^[a-zA-Z ]{3,}$/)]);
      // this.addRegisterData.get('emailIdAM').updateValueAndValidity();
      console.log("event called on email id", mand)
      this.mandval = mand
      // console.log(this.Emailid)
      // console.log(this.mandval)
  
      if (this.mandval == '') {
        console.log("email id is empty")
        this.mandFlag = true
      }
  
      else {
        console.log("email id is non-empty")
        this.mandFlag = false
      }
      this.finalMand();
  
    }
    mandt(mandatory) {
      // this.addRegisterData.get('mobileNumberAM').setValidators([Validators.pattern(/^[a-zA-Z ]{3,}$/)]);
      // this.addRegisterData.get('mobileNumberAM').updateValueAndValidity();
      console.log("event called on mobile number", mandatory)
      this.mandatoryval = mandatory
      if (this.mandatoryval == '') {
        console.log("mobile number is empty")
        this.flagMand = true;
      }
      else {
        console.log("mobile number is non-empty")
        this.flagMand = false;
      }
      this.finalMand();
    }
  
  
    finalMand() {
      console.log("into final::: this.flagMand ====> ", this.flagMand, " this.mandFlag ====> ", this.mandFlag)
  
      if (this.mandval != '' && this.mandatoryval == '') {
        console.log("if this.mandval and this.mandatoryval are non-empty ")
        this.flagMand = true;

        // this.mandFlag = true;
      }
      else if(this.mandval == '' && this.mandatoryval != ''){
        // this.mandFlag = true;
        this.flagMand = false;
  
      }
      else if(this.mandval != '' && this.mandatoryval != ''){
        // this.mandFlag = true;
        this.flagMand = true;

  
  
      }
      else if(this.mandval == '' || this.mandatoryval == ''){
        // this.mandFlag = true;
        // this.flagMand = true;
        $('#accountManagerName').css("border", "2px solid #D9D9D9");
        this.addRegisterData.get('accountManagerName').setValidators([Validators.pattern(/^[a-zA-Z ]{3,}$/)]);
        this.addRegisterData.get('accountManagerName').updateValueAndValidity();
        this.addRegisterData.get('mobileNumberAM').setValidators([Validators.pattern(/^[6-9]\d{9}$/)]);
        this.addRegisterData.get('mobileNumberAM').updateValueAndValidity();
        this.addRegisterData.get('emailIdAM').setValidators([Validators.pattern(
          /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
        )]);
        this.addRegisterData.get('emailIdAM').updateValueAndValidity();

  
      }
      
    }
    // mand(mand){
    //   this.mandval=mand
    //   // console.log(this.Emailid)
    //   console.log(this.mandval)

    //   if(this.mandval == ""){
    //     console.log("hide *");
    //     this.mandFlag = true
    //   }
    
    //   else{
    //     console.log("show *");
    //     this.mandFlag = false
    //   }
    //   this.finalMand();

    // }
    // mandt(mandatory){
    //   this.mandatoryval = mandatory
    //   if(this.mandatoryval == ''){
    //     this.flagMand = true;
    //   }
    //   else{
    //     this.flagMand = false;
    //   }
    //   this.finalMand();
    // }
    // finalMand(){
    //   console.log("into final1")

    //   if(this.mandval !='' && this.mandatoryval != ''){
    //     this.flagMand = true;
    //     console.log("into final")
    //   }
    // }
}
// export class AccValidation {
//   // static MatchAcc(AC: AbstractControl) {
//   //   let iciciAccNo  // to get value in input tag
//   //   let poolAccNo // to get value in input tag
//   //   var element1 = AC.get("iciciAccNo");
//   //   if (element1 != null) {
//   //     iciciAccNo = element1.value;
//   //   } else {
//   //     iciciAccNo = null;
//   //   }
//   //   var element2 = AC.get("poolAccNo");
//   //   if (element2 != null) {
//   //     poolAccNo = element2.value;
//   //   } else {
//   //     poolAccNo = null;
//   //   }
//   //   //    let currDate = AC.get('toDate').value; // to get value in input tag
//   //   //console.log("!!!!!!!!!!", Password);
//   //   //console.log("#########", confirmPassword);
//   //   if (poolAccNo && iciciAccNo) {
//   //     if (iciciAccNo != poolAccNo) {
//   //       return null;
//   //     } else {
//   //       //console.log('false');
//   //       AC.get("poolAccNo").setErrors({ MatchAcc: true });
//   //     }
//   //   }
//   // }


// }