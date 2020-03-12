import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { AppDetailsService } from "../app-details/app-details.service";
import { ActivatedRoute,Router } from "@angular/router";
import { MakerDetailsService } from "../maker-details/maker-details.service";
import { config } from "config";
import { UserAppDetailsService} from './user-app-details.service';
import { MakerService } from "../maker-page/maker-page.service";

@Component({
 selector: "app-user-app-details",
 templateUrl: "./user-app-details.component.html",
 styleUrls: ["./user-app-details.component.css"]
})

export class UserAppDetailsComponent implements OnInit {
 tabSet: NgbTabset;
 updatedUatFile1: any;
 uploadFlag: string;
 updatedProdFile1: any;
 uploadFlag2: string;
 uploadFlagProd2: string;
 queryparamProjectId: any;
//  @HostListener('window:beforeunload', ['$event'])
//  public before() {
//  return false
//  }
//  @HostListener('window:unload', ['$event'])
//  public after() {
//  this.makerService.MyMethod()
//  }
 public navbarOpen:boolean;
 updateRegisterData: FormGroup;
 dataOfUser: string;
 dataToDisplay;
 dataOfProductToDisplay: any;
 dataOfProduct: any;
 productData: any;
 productImage: string;
 dataOfService: any;
 serviceName: any;
 serviceImage: string;
 productName: string;
 selectedIndex1: any;
 summaryServiceImage: string;
 summaryServiceName: any;
 productvalue: string;
 serviceData: any;
 appData;
 appDetails: string;
 dataToShow: any;
 configURL = config.url;
 uatFile1: any;
 dataOfproject: any;
 productToDisplay: any;
 productId: any;
 serviceId: any;
 emailArray: any[];
 radiodata: any;
 uatFile3: any;
 displayTransactionReversal: any;
 transactionReversal: any;
 fileDataForReversal: { 'file': any; 'fileName': string; };
 uatFile: any;
 readyForProductionFlag;
 fileFlag: string;
 serviceTimeoutReversal1: any;
 serviceNameReversal1: any;
 serviceUrlReversal1: any;
 updatedObject: any;
 displayInputReversalForUAT: boolean = true;
 displayInputReversalForUAT2: boolean = true;
 displayInputReversalForProd1 :boolean= true;
 displayInputReversalForProd2 :boolean= true;
 serviceTimeoutReversalProd1: any;
 serviceUrlReversalProd1: any;
 serviceNameReversalProd1: any;
 reveralFileProd1: any;
 reveralFileProd2: any;
 serviceNameReversalProd2: any;
 serviceUrlReversalProd2: any;
 serviceTimeoutReversalProd2: any;
 serviceNameReversal2: any;
 serviceUrlReversal2: any;
 serviceTimeoutReversal2: any;
 message2: string;
 messageProd2: string;
 messageProd1: string;
 fileFlag3: string;
 fileFlag2: string;
 fileFlag4: string;
 @ViewChild(NgbTabset) set content(content: NgbTabset) {
 this.tabSet = content;
 }
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
 dataForService;
 radioVal;
 dataForRegister;
 dataForProject;
 projectId: any;
 fileData: any;
 productValue: any;
 hide:any;
 service_name:any;
 message:any;
 showUploads:boolean=true;
 uploadFlagProd;
 uploadFlagUAT2;
 constructor(
 private makerService: MakerService,
 private fb: FormBuilder,
 private appservice: AppDetailsService,
 private makerDetailsService: MakerDetailsService,
 private router: Router,
 private userAppDetailsService: UserAppDetailsService,
 private actRoute: ActivatedRoute,
 ) {
 this.actRoute.queryParams.subscribe(params => {
 this.queryparamProjectId = params['projectId'];
 console.log("Project id fromQuery params using ActivatedRoute ->", this.queryparamProjectId);
 });
 }

 ngOnInit() {
 //for disabling back button
 window.history.pushState(null, "", window.location.href);
 this.readyForProductionFlag=localStorage.getItem("status");
 console.log("PRINT : READY FOR PRODUCTION STATUS ",this.readyForProductionFlag);
 // this.appDetails = localStorage.getItem("appData");
 // this.appData = JSON.parse(this.appDetails);
 this.productName = localStorage.getItem("productName");
 this.serviceName = localStorage.getItem("serviceName");
 // console.log("PRINT : APPLICATION DATA ", this.appData);
 this.serviceData = JSON.parse(this.serviceName);
 this.dataForService = this.serviceData;
 this.dataOfUser = localStorage.getItem("dataofUser");
 this.dataToShow = JSON.parse(this.dataOfUser);
 this.dataToDisplay = this.dataToShow[0];
 
 console.log("PRINT : USER DATA TO BE DISPLAYED ", this.dataToDisplay);

 this.makerDetailsService
 .getProjectDetails(this.queryparamProjectId)
 .then(data => {
 this.dataOfProductToDisplay = data;
 this.productToDisplay=this.dataOfProductToDisplay[0];
 console.log("this.dataOfpProduct",this.dataOfProductToDisplay);
 this.displayTransactionReversal=this.dataOfProductToDisplay[0].enableTransactionReversalFileProcessing;
 localStorage.setItem("retryRule",this.dataOfProductToDisplay[0].products[0].services[0].retryAttempts)
 console.log("PRINT : USER APP DETAILS FOR PRODUCT DISPLAY", this.dataOfProductToDisplay[0].products[0].services[0]);
 for (var i = 0; i < this.dataOfProductToDisplay.length; i++) {
 if (
 this.queryparamProjectId != null
 ) {
 this.productToDisplay = this.dataOfProductToDisplay[i];
 if(this.productToDisplay.products[0].services[0].reversalFile1 == null){
 this.displayInputReversalForUAT=true;
 }
 else{
 this.displayInputReversalForUAT=false;
 }
 if(this.productToDisplay.products[0].services[0].reversalFileProd1 == null){
 this.displayInputReversalForProd1=true;
 }
 else{
 this.displayInputReversalForProd1=false;
 }
 if(this.productToDisplay.products[0].services[0].reversalFileProd2 == null){
 this.displayInputReversalForProd2=true;
 }
 else{
 this.displayInputReversalForProd2=false;
 }
 if(this.productToDisplay.products[0].services[0].reversalFile2 == null){
 this.displayInputReversalForUAT2=true;
 }
 else{
 this.displayInputReversalForUAT2=false;
 }
 console.log("data of Product to Display:",this.productToDisplay);
 
 if(this.productToDisplay.status=== "SUCCESS" ||this.productToDisplay.status === "FAILED" || this.productToDisplay.status=== "Ready for Deployment-SIT" ||this.productToDisplay.status === "Ready for Production Request Initiated" || this.productToDisplay.status === "Ready for Production Verified"){
 this.showUploads=false;
 }
 else{
 this.showUploads=true;
 }
 
 this.productId = this.dataOfProductToDisplay[
 i
 ].products[0].productId;
 this.serviceId = this.dataOfProductToDisplay[
 i
 ].products[0].services[0].serviceId;
 this.makerDetailsService
 .getProductDetails(this.productId)
 .then(data => {
 this.dataOfProduct = data;
 console.log("this.dataOfProduct", data);
 this.productData = this.dataOfProduct[0].productName;
 this.productImage =
 config.url + "Images/Products/" + data[0].fileName;
 console.log("PRINT : SERVICE ID ", this.serviceId);
 this.makerDetailsService
 .getServiceDetails(this.serviceId)
 .then(data => {
 this.dataOfService = data;
 console.log("PRINT : SERVICE DATA ", this.dataOfService);
 this.serviceName = data[0].serviceName;
 this.serviceImage =
 config.url + "Images/Services/" + data[0].fileName;
 });
 });
 } else {
 console.log("PRINT : let it go");
 }
 }
 this.makerDetailsService
 .getServiceDetails(
 this.dataOfProductToDisplay[0].products[0].services[0].serviceId
 )
 .then(data => {
 this.dataOfService = data;
 this.serviceName = this.dataOfService[0].serviceName;

 this.serviceImage =
 this.configURL +
 "Images/Services/" +
 this.dataOfService[0].fileName;
 });
 console.log("this.dataOfProductToDisplay",this.dataOfProductToDisplay);
 if (
 this.productToDisplay.products[0].services[0].ackReciept !==
 "undefined"
 ) {
 console.log("check inside user register object->",this.updateRegisterData);
 console.log("this.dataToDisplay.organization:", this.dataToDisplay);
 
 //Compare service name and show browse to upload
 this.service_name=this.dataToDisplay.serviceName;
 console.log("Service name -->",this.service_name);
 this.updateRegisterData.controls["firstName"].setValue(
 this.dataToDisplay.firstName
 );
 this.updateRegisterData.controls["lastName"].setValue(
 this.dataToDisplay.lastName
 );
 this.updateRegisterData.controls["organization"].setValue(
 this.dataToDisplay.organisation
 );
 this.updateRegisterData.controls["email"].setValue(
 this.dataToDisplay.email
 );
 this.updateRegisterData.controls["username"].setValue(
 this.dataToDisplay.username
 );
 this.updateRegisterData.controls["phoneNumber"].setValue(
 this.dataToDisplay["phoneNumber"]
 );
 this.updateRegisterData.controls["bankAccountNumber"].setValue(
 this.dataToDisplay.bankAccountNumber
 );
 this.updateRegisterData.controls["poolAccountNumber"].setValue(
 this.dataToDisplay.poolAccountNumber
 );
 this.updateRegisterData.controls["webServiceType"].setValue(
 this.productToDisplay.products[0].services[0].webServiceType
 );
 // changes by sanchita
 this.updateRegisterData.controls["communicationProtocol"].setValue(
 this.productToDisplay.products[0].services[0].communicationProtocol
 );
 

 this.updateRegisterData.controls["encryptionMethod"].setValue(
 this.productToDisplay.products[0].services[0].encryptionMethod
 );
 this.updateRegisterData.controls["uatPort"].setValue(
 this.productToDisplay.products[0].services[0].uatPort
 );
 this.updateRegisterData.controls["uatIp"].setValue(
 this.productToDisplay.products[0].services[0].uatIp
 );
 
 this.updateRegisterData.controls["uatPassword"].setValue(
 this.productToDisplay.products[0].services[0].uatPassword
 );
 this.updateRegisterData.controls["uatFile1"].setValue(
 this.productToDisplay.products[0].services[0].uatFile1
 );
 this.updateRegisterData.controls["uatFile2"].setValue(
 this.productToDisplay.products[0].services[0].uatFile2
 );
 this.updateRegisterData.controls["uatFile3"].setValue(
 this.productToDisplay.products[0].services[0].uatFile3
 );
 this.updateRegisterData.controls["prodIp"].setValue(
 this.productToDisplay.products[0].services[0].prodIp
 );
 this.updateRegisterData.controls["prodPort"].setValue(
 this.productToDisplay.products[0].services[0].prodPort
 );
 this.updateRegisterData.controls["prodPassword"].setValue(
 this.productToDisplay.products[0].services[0].prodPassword
 );
 this.updateRegisterData.controls["prodSecret"].setValue(
 this.productToDisplay.products[0].services[0].prodSecret
 );
 this.updateRegisterData.controls["prodUsername"].setValue(
 this.productToDisplay.products[0].services[0].prodUsername
 );
 this.updateRegisterData.controls["prodFile1"].setValue(
 this.productToDisplay.products[0].services[0].prodFile1
 );
 this.updateRegisterData.controls["retryAttempts"].setValue(
 this.productToDisplay.products[0].services[0].retryAttempts
 );
 this.updateRegisterData.controls["actionOnNoRes"].setValue(
 this.productToDisplay.products[0].services[0].actionOnNoRes
 );
 this.updateRegisterData.controls["firstNameBusinessSpoc"].setValue(
 this.dataToDisplay.firstNameBusinessSpoc
 );
 this.updateRegisterData.controls["lastNameBusinessSpoc"].setValue(
 this.dataToDisplay.lastNameBusinessSpoc
 );
 this.updateRegisterData.controls["mobileNumberBusinessSpoc"].setValue(
 this.dataToDisplay.mobileNumberBusinessSpoc
 );
 this.updateRegisterData.controls["emailIdBusinessSpoc"].setValue(
 this.dataToDisplay.emailIdBusinessSpoc
 );
 this.updateRegisterData.controls["firstNameITSpoc"].setValue(
 this.dataToDisplay.firstNameITSpoc
 );
 this.updateRegisterData.controls["lastNameITSpoc"].setValue(
 this.dataToDisplay.lastNameITSpoc
 );
 this.updateRegisterData.controls["mobileNumberITSpoc"].setValue(
 this.dataToDisplay.mobileNumberITSpoc
 );
 this.updateRegisterData.controls["emailIdITSpoc"].setValue(
 this.dataToDisplay.emailIdITSpoc
 );
 } else {
 this.updateRegisterData.controls["firstName"].setValue(
 this.dataToDisplay.firstName
 );
 this.updateRegisterData.controls["lastName"].setValue(
 this.dataToDisplay.lastName
 );
 this.updateRegisterData.controls["organization"].setValue(
 this.dataToDisplay.organization
 );
 this.updateRegisterData.controls["email"].setValue(
 this.dataToDisplay.email
 );
 this.updateRegisterData.controls["username"].setValue(
 this.dataToDisplay.username
 );
 this.updateRegisterData.controls["phoneNumber"].setValue(
 this.dataToDisplay.phoneNumber
 );
 this.updateRegisterData.controls["bankAccountNumber"].setValue(
 this.dataToDisplay.bankAccountNumber
 );
 this.updateRegisterData.controls["poolAccountNumber"].setValue(
 this.dataToDisplay.poolAccountNumber
 );
 this.updateRegisterData.controls["webServiceType"].setValue(
 this.productToDisplay.products[0].services[0].webServiceType
 );
 this.updateRegisterData.controls["communicationProtocol"].setValue(
 this.productToDisplay.products[0].services[0].communicationProtocol
 );
 this.updateRegisterData.controls["messageFormat"].setValue(
 this.productToDisplay.products[0].services[0].messageFormat
 );
 this.updateRegisterData.controls["emails"].setValue(
 this.productToDisplay.products[0].services[0].emails
 );
 this.updateRegisterData.controls["encryptionMethod"].setValue(
 this.productToDisplay.products[0].services[0].encryptionMethod
 );
 this.updateRegisterData.controls["uatPort"].setValue(
 this.productToDisplay.products[0].services[0].uatPort
 );
 this.updateRegisterData.controls["uatIp"].setValue(
 this.productToDisplay.products[0].services[0].uatIp
 );
 this.updateRegisterData.controls["prodIp"].setValue(
 this.productToDisplay.products[0].services[0].prodIp
 );
 this.updateRegisterData.controls["prodPort"].setValue(
 this.productToDisplay.products[0].services[0].prodPort
 );
 this.updateRegisterData.controls["retryAttempts"].setValue(
 this.productToDisplay.products[0].services[0].retryAttempts
 );

 this.updateRegisterData.controls["actionOnNoRes"].setValue(
 this.productToDisplay.products[0].services[0].actionOnNoRes
 );

 this.updateRegisterData.controls["firstNameBusinessSpoc"].setValue(
 this.dataToDisplay.firstNameBusinessSpoc
 );
 
 
 this.updateRegisterData.controls["firstNameBusinessSpoc"].setValue(
 this.dataToDisplay.firstNameBusinessSpoc
 );
 this.updateRegisterData.controls["lastNameBusinessSpoc"].setValue(
 this.dataToDisplay.lastNameBusinessSpoc
 );
 this.updateRegisterData.controls["mobileNumberBusinessSpoc"].setValue(
 this.dataToDisplay.mobileNumberBusinessSpoc
 );
 this.updateRegisterData.controls["emailIdBusinessSpoc"].setValue(
 this.dataToDisplay.emailIdBusinessSpoc
 );
 this.updateRegisterData.controls["firstNameITSpoc"].setValue(
 this.dataToDisplay.firstNameITSpoc
 );
 this.updateRegisterData.controls["lastNameITSpoc"].setValue(
 this.dataToDisplay.lastNameITSpoc
 );
 this.updateRegisterData.controls["mobileNumberITSpoc"].setValue(
 this.dataToDisplay.mobileNumberITSpoc
 );
 this.updateRegisterData.controls["emailIdITSpoc"].setValue(
 this.dataToDisplay.emailIdITSpoc
 );
 }


 this.productName = localStorage.getItem("productName");
 });

 this.updateRegisterData = this.fb.group({
 serviceNameInput:[''],
 emails: this.fb.array([]),
 appName: [""],
 appVersion: [""],
 modeOffered: [""],
 txnPerday: [""],
 txnLimit: [""],
 reqParameter: [""],
 amountField: [""],
 ackReciept: [""],
 firstName: [""],
 lastName: [""],
 organization: [""],
 email: [""],
 username: [""],
 phoneno: [""],
 password: [""],
 confirmPassword: [""],
 bankAccountNumber: [""],
 poolAccountNumber: [""],
 webServiceType: [""],
 communicationProtocol: [""],
 httpCertificate: [{ value: "", disabled: true }],
 encryptionMethod: [""],
 uatIp: [""],
 uatPort: [""],
 uatSecret: [""],
 uatUsername: [""],
 uatPassword: [""],
 uatFile:[""],
 uatFile1: [{ value: "", disabled: true }],
 uatFile2: [{ value: "", disabled: true }],
 uatFile3: [{ value: "", disabled: true }],
 uatURL1: [{ value: "", disabled: true }],
 uatURL2: [{ value: "", disabled: true }],
 retryAttempts: [""],
 actionOnNoRes: [""],
 prodIp: [""],
 prodUsername: [""],
 transactionReversal:[''],
 prodPort: [""],
 prodSecret: [""],
 prodPassword: [""],
 prodFile1:[{ value: "", disabled: true }],
 prodFile2:[{ value: "", disabled: true }],
 prodFile3:[{ value: "", disabled: true }],
 prodURL1: [{ value: "", disabled: true }],
 prodURL2: [{ value: "", disabled: true }],
 messageFormat: [""],
 uatPayUpdateURL: [{ value: "", disabled: true }],
 uatCustValidationURL: [{ value: "", disabled: true }],
 uatPaymentStat: [{ value: "", disabled: true }],
 checksumReq: [""],
 livePayUpdateURL: [{ value: "", disabled: true }],
 liveCustValidationURL: [{ value: "", disabled: true }],
 livePaymentStat: [{ value: "", disabled: true }],
 phoneNumber: [""],
 firstNameBusinessSpoc: [""],
 lastNameBusinessSpoc: [""],
 mobileNumberBusinessSpoc: [""],
 emailIdBusinessSpoc: [""],
 firstNameITSpoc: [""],
 lastNameITSpoc: [""],
 mobileNumberITSpoc: [""],
 emailIdITSpoc: [""],
 uploadTransactionReversal2:[''],
 uploadTransactionReversal:[''],
 reveralFileProd1:[''],
 reversalprodFile2:[''],
 updateUploadUatFile:[''],
 updateUploadProdFile:[''],
 updateUploadUatFile2:[''],
 updateUploadProdFile2:['']
 });
 }
 // revised uat file 1 upload 
 updateUploadUatFile(){
 $(document).ready(function () {
 $("#updateUploadUatFile").trigger("click");
 })
 }

 updateUploadUatFileEvent($event){
 var newFilename = $event.target.files[0].name
 var exp = newFilename.substring(newFilename.lastIndexOf('.') + 1);
 console.log("exp",exp);
 if (exp.toLowerCase() == 'yaml' || exp.toLowerCase() == 'wsdl') {
 this.updatedUatFile1 = $event.target.files[0];
 console.log("uatFile1",this.updatedUatFile1)
 this.uploadFlag="properFile";
 this.updateRegisterData.controls['updateUploadUatFile'].setValue($event.target.files[0].name);
 this
 const formData:any =new FormData();
 formData.append("files", this.updatedUatFile1);
 var fileType = "uatFile1";
 console.log("this.dataofProductToDisplay",this.productToDisplay);
 this.productToDisplay.products[0].services[0].uatFile1=newFilename;
 delete this.productToDisplay["_id"];
 console.log("projectData",this.productToDisplay.projectId)
 this.appservice.uploadFile(this.queryparamProjectId, formData,fileType).then((data) => {
 console.log("data of file fot tx revrsal", data);
 this.userAppDetailsService.updateprojectData(this.productToDisplay).then((projectdata)=>{
 console.log("project update data",projectdata);
 })
 });
 }
 else{
 this.uploadFlag="notproperFile";
 console.log("invalid")
 }
 

 }
 
 
 // revised uatFile 1 upload ends

 // revised prod file 1 upload 
 updateUploadProdFile(){
 $(document).ready(function () {
 $("#updateUploadProdFile").trigger("click");
 })
 }

 updateUploadProdFileEvent($event){
 var newFilename = $event.target.files[0].name
 var exp = newFilename.substring(newFilename.lastIndexOf('.') + 1);
 console.log("exp",exp);
 if (exp.toLowerCase() == 'yaml' || exp.toLowerCase() == 'wsdl') {
 this.updatedProdFile1 = $event.target.files[0];
 console.log("uatFile1",this.updatedUatFile1)
 this.uploadFlagProd="properFile";
 this.updateRegisterData.controls['updateUploadProdFile'].setValue($event.target.files[0].name);
 this
 const formData:any =new FormData();
 formData.append("files", this.updatedProdFile1);
 var fileType = "prodFile1";
 console.log("this.dataofProductToDisplay",this.productToDisplay);
 this.productToDisplay.products[0].services[0].prodFile1=newFilename;
 delete this.productToDisplay["_id"];
 console.log("projectData",this.productToDisplay.projectId)
 this.appservice.uploadFile(this.queryparamProjectId, formData,fileType).then((data) => {
 console.log("data of file fot tx revrsal", data);
 this.userAppDetailsService.updateprojectData(this.productToDisplay).then((projectdata)=>{
 console.log("project update data",projectdata);
 })
 });
 }
 else{
 this.uploadFlag="notproperFile";
 console.log("invalid")
 }
 

 }
 
 
 // revised prodFile 1 upload ends
 
 // revised uat file 2 upload 
 updateUploadUatFile2(){
 $(document).ready(function () {
 $("#updateUploadUatFile2").trigger("click");
 })
 }

 updateUploadUatFileEvent2($event){
 var newFilename = $event.target.files[0].name
 var exp = newFilename.substring(newFilename.lastIndexOf('.') + 1);
 console.log("exp",exp);
 if (exp.toLowerCase() == 'yaml' || exp.toLowerCase() == 'wsdl') {
 this.updatedUatFile1 = $event.target.files[0];
 console.log("uatFile1",this.updatedUatFile1)
 this.uploadFlagUAT2="properFile";
 this.updateRegisterData.controls['updateUploadUatFile2'].setValue($event.target.files[0].name);
 this
 const formData:any =new FormData();
 formData.append("files", this.updatedUatFile1);
 var fileType = "uatFile2";
 console.log("this.dataofProductToDisplay",this.productToDisplay);
 this.productToDisplay.products[0].services[0].uatFile2=newFilename;
 delete this.productToDisplay["_id"];
 console.log("projectData",this.productToDisplay.projectId)
 this.appservice.uploadFile(this.queryparamProjectId, formData,fileType).then((data) => {
 console.log("data of file fot tx revrsal", data);
 this.userAppDetailsService.updateprojectData(this.productToDisplay).then((projectdata)=>{
 console.log("project update data",projectdata);
 })
 });
 }
 else{
 this.uploadFlagUAT2="notproperFile";
 console.log("invalid")
 }
 

 }
 // revised prod file 1 upload 
 updateUploadProdFile2(){
 $(document).ready(function () {
 $("#updateUploadProdFile2").trigger("click");
 })
 }

 updateUploadProdFileEvent2($event){
 var newFilename = $event.target.files[0].name
 var exp = newFilename.substring(newFilename.lastIndexOf('.') + 1);
 console.log("exp",exp);
 if (exp.toLowerCase() == 'yaml' || exp.toLowerCase() == 'wsdl') {
 this.updatedProdFile2 = $event.target.files[0];
 console.log("uatFile1",this.updatedProdFile2)
 this.uploadFlagProd2="properFile";
 this.updateRegisterData.controls['updateUploadProdFile2'].setValue($event.target.files[0].name);
 this
 const formData:any =new FormData();
 formData.append("files", this.updatedProdFile2);
 var fileType = "prodFile2";
 console.log("this.dataofProductToDisplay",this.productToDisplay);
 this.productToDisplay.products[0].services[0].prodFile2=newFilename;
 delete this.productToDisplay["_id"];
 console.log("projectData",this.productToDisplay.projectId)
 this.appservice.uploadFile(this.queryparamProjectId, formData,fileType).then((data) => {
 console.log("data of file fot tx revrsal", data);
 this.userAppDetailsService.updateprojectData(this.productToDisplay).then((projectdata)=>{
 console.log("project update data",projectdata);
 })
 });
 }
 else{
 this.uploadFlagProd2="notproperFile";
 console.log("invalid")
 }
 

 }
 updatedProdFile2(arg0: string, updatedProdFile2: any) {
 throw new Error("Method not implemented.");
 }
 
 
 // revised prodFile 1 upload ends
 
 
 // revised uatFile 2 upload ends
 
 addbusinessEmail(): FormGroup {
 return this.fb.group({
 email: [""]
 });
 }
 uatUpload2() {
 $(document).ready(function () {
 $("#uatUpload2").trigger("click");
 })
 }
 uatUpload2Uploaded($event) {
 this.transactionReversal = $event.target.files[0];
 this.updateRegisterData.controls['uatFile2'].setValue($event.target.files[0].name);
 // console.log("uatUpload2Uploaded :", $event.target.files[0].name)
 }
 addbusinessSpocEmail(): void {
 (<FormArray>this.updateRegisterData.get("emails")).push(
 this.addbusinessEmail()
 );
 }
 removebusinessSpocEmail(ifConditionGroupIndex: number): void {
 (<FormArray>this.updateRegisterData.get("emails")).removeAt(
 ifConditionGroupIndex
 );
 }
 uatUpload3() {
 $(document).ready(function () {
 $("#uatUpload2").trigger("click");
 })
 }
 uploadTransactionReversal2(){
 $(document).ready(function () {
 $("#uploadTransactionReversal2").trigger("click");
 })
 }
 uatUpload() {
 $(document).ready(function () {
 $("#uatUpload").trigger("click");
 })
 }
 reversalFileprodUpload1(){
 $(document).ready(function () {
 $("#prodReversal1").trigger("click");
 })

 }
 toggleNavbar(){ 
 }
 uatUploadUploaded($event){
 this.uatFile = $event.target.files[0]
 this.updateRegisterData.controls['uatFile'].setValue($event.target.files[0].name);
 // console.log("uatUpload1Uploaded :", $event.target.files[0].name)
 }
 uploadTransactionReversal2Event($event){

 var uatfilename1=$event.target.files[0].name
 var ext = uatfilename1.substring(uatfilename1.lastIndexOf('.') + 1);
 console.log(ext)

 if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {
 
 this.uatFile1 = $event.target.files[0];
 console.log("ok")
 this.fileFlag="properFile";
 this.updateRegisterData.controls['uploadTransactionReversal2'].setValue($event.target.files[0].name);
 if($event.target.files[0]!=null){
 console.log("FILE DATA IS NOT NULL");
 this.message="File Uploaded Successfully.."
 }
 this.uatFile3 = $event.target.files[0]
 console.log("FIle Uploaded for transaction revrsal",this.uatFile3)
 console.log("uatUpload1Uploaded :", $event.target.files[0].name);
 const formData: any = new FormData();
 formData.append('files',this.uatFile3);
 this.productToDisplay.products[0].services[0].serviceTimeoutReversal1=this.serviceTimeoutReversal1;
 this.productToDisplay.products[0].services[0].serviceUrlReversal1=this.serviceUrlReversal1;
 this.productToDisplay.products[0].services[0].reversalFile1=uatfilename1;
 this.productToDisplay.products[0].services[0].serviceNameReversal1=this.serviceNameReversal1;
 delete this.productToDisplay["_id"];
 
 console.log(" PRINT : UPDATED PRODUCT OBJECT ",this.productToDisplay);
 var fileTyperev="uatReversalFile1"
 this.appservice.uploadFile(this.queryparamProjectId, formData,fileTyperev).then((data) => {
 console.log("data of file fot tx revrsal", data);
 this.userAppDetailsService.updateprojectData(this.productToDisplay).then((projectdata)=>{
 console.log("project update data",projectdata);
 })

 })
 }
 else{
 this.fileFlag="notproperFile";
 console.log("invalid")
 
 
 }
 
 
 }

 uatUpload3Uploaded($event) {
 this.uatFile3 = $event.target.files[0]
 this.updateRegisterData.controls['uatFile3'].setValue($event.target.files[0].name);
 // console.log("uatUpload1Uploaded :", $event.target.files[0].name)
 }

 submitDetails(details) {
 // console.log("projectId",this.dataToDisplay.projectId);
 const formData1: any = new FormData();
 formData1.append("files", this.transactionReversal);
 
 this.userAppDetailsService.uploadFile(this.queryparamProjectId, formData1).then((data) => {
 // console.log("data of file", data);
 });
 // console.log("details", details);

 this.router.navigate(["/authentication/mapping"]);
 }
 uatUpload1Uploaded($event) {
 this.uatFile1 = $event.target.files[0];
 this.updateRegisterData.controls["uatFile1"].setValue(
 $event.target.files[0].name
 );
 // console.log("uatUpload1Uploaded :", $event.target.files[0].name);
 }
 uatUpload1() {
 $(document).ready(function() {
 $("#uatUpload1").trigger("click");
 });
 }
 setInsertedEmails(email): FormGroup {
 return this.fb.group({
 email: [email]
 });
 }
// changes made for production file upload 
prodUpload1(){
 $(document).ready(function(){
 $("#prodUpload1").trigger("click");
 });
}
prodUpload1Uploaded($event){

 var prodfilename1=$event.target.files[0].name
 var ext = prodfilename1.substring(prodfilename1.lastIndexOf('.') + 1);
 console.log(ext)

 if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {
 
 this.uatFile1 = $event.target.files[0];
 console.log("ok")
 this.fileFlag3="properFile";
 this.updateRegisterData.controls['reveralFileProd1'].setValue($event.target.files[0].name);
 if($event.target.files[0]!=null){
 console.log("FILE DATA IS NOT NULL");
 this.messageProd1="File Uploaded Successfully.."
 }
 this.reveralFileProd1 = $event.target.files[0]
 // console.log("FIle Uploaded for transaction revrsal",this.uatFile3)
 console.log("uatUpload1Uploaded :", $event.target.files[0].name);
 const formData: any = new FormData();
 formData.append('files',this.reveralFileProd1);
 this.productToDisplay.products[0].services[0].serviceTimeoutReversalProd1=this.serviceTimeoutReversalProd1;
 this.productToDisplay.products[0].services[0].serviceUrlReversalProd1= this.serviceUrlReversalProd1;
 this.productToDisplay.products[0].services[0].serviceNameReversalProd1=this.serviceNameReversalProd1;
 this.productToDisplay.products[0].services[0].reversalFileProd1=prodfilename1;
 delete this.productToDisplay["_id"];

 console.log(" PRINT : UPDATED PRODUCT OBJECT ",this.productToDisplay);
 var fileTyperev="prodReversalFile1"
 this.appservice.uploadFile(this.queryparamProjectId, formData,fileTyperev).then((data) => {
 console.log("data of file fot tx revrsal", data);
 this.userAppDetailsService.updateprojectData(this.productToDisplay).then((projectdata)=>{
 console.log("project update data",projectdata);
 })

})
 }
 else{
 this.fileFlag3="notproperFile";
 console.log("invalid")
 
 
 } 
}
prodUpload2(){
 $(document).ready(function(){
 $("#prodUpload2").trigger("click");
 });
}
prodUpload2Uploaded($event){

 var prodfilename2=$event.target.files[0].name
 var ext = prodfilename2.substring(prodfilename2.lastIndexOf('.') + 1);
 console.log(ext)

 if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {
 
 this.uatFile1 = $event.target.files[0];
 console.log("ok")
 this.fileFlag4="properFile";
 this.updateRegisterData.controls['reversalprodFile2'].setValue($event.target.files[0].name);
 if($event.target.files[0]!=null){
 console.log("FILE DATA IS NOT NULL");
 this.messageProd2="File Uploaded Successfully.."
 }
 this.reveralFileProd2 = $event.target.files[0]
 console.log("FIle Uploaded for transaction revrsal",this.reveralFileProd2)
 console.log("uatUpload1Uploaded :", $event.target.files[0].name);
 const formData: any = new FormData();
 formData.append('files',this.reveralFileProd2);
 this.productToDisplay.products[0].services[0].serviceTimeoutReversalProd2=this.serviceTimeoutReversalProd2;
 this.productToDisplay.products[0].services[0].serviceUrlReversalProd2= this.serviceUrlReversalProd2;
 this.productToDisplay.products[0].services[0].serviceNameReversalProd2=this.serviceNameReversalProd2;
 this.productToDisplay.products[0].services[0].reversalFileProd2=prodfilename2;
 delete this.productToDisplay["_id"];

 console.log(" PRINT : UPDATED PRODUCT OBJECT ",this.productToDisplay);
 var fileTypeRev="prodReversalFile2"
 this.appservice.uploadFile(this.queryparamProjectId, formData,fileTypeRev).then((data) => {
 console.log("data of file fot tx revrsal", data);
 this.userAppDetailsService.updateprojectData(this.productToDisplay).then((projectdata)=>{
 console.log("project update data",projectdata);
 })

})
 }
 else{
 this.fileFlag4="notproperFile";
 console.log("invalid")
 
 
 } 
}
uploadTransactionReversal(){
 $(document).ready(function () {
 $("#uploadTransactionReversal").trigger("click");
 })
}

uploadTransactionReversalEvent($event){

 var uatfilename2=$event.target.files[0].name
 var ext = uatfilename2.substring(uatfilename2.lastIndexOf('.') + 1);
 console.log(ext)

 if (ext.toLowerCase() == 'yaml' || ext.toLowerCase() == 'wsdl') {
 
 this.uatFile1 = $event.target.files[0];
 console.log("ok")
 this.fileFlag2="properFile";
 this.updateRegisterData.controls['uploadTransactionReversal'].setValue($event.target.files[0].name);
 if($event.target.files[0]!=null){
 console.log("FILE DATA IS NOT NULL");
 this.message2="File Uploaded Successfully.."
 }
 this.reversalFile2 = $event.target.files[0]
 console.log("FIle Uploaded for transaction revrsal",this.uatFile3)
 console.log("uatUpload1Uploaded :", $event.target.files[0].name);
 const formData: any = new FormData();
 formData.append('files',this.reversalFile2);
 this.productToDisplay.products[0].services[0].serviceTimeoutReversal2=this.serviceTimeoutReversal2;
 this.productToDisplay.products[0].services[0].serviceUrlReversal2=this.serviceUrlReversal1;
 this.productToDisplay.products[0].services[0].reversalFile2=uatfilename2;
 this.productToDisplay.products[0].services[0].serviceNameReversal2=this.serviceNameReversal2;
 delete this.productToDisplay["_id"];

 console.log(" PRINT : UPDATED PRODUCT OBJECT ",this.productToDisplay);
 var fileTyperev="uatReversalFile2";
 this.appservice.uploadFile(this.queryparamProjectId, formData,fileTyperev).then((data) => {
 console.log("data of file fot tx revrsal", data);
 this.userAppDetailsService.updateprojectData(this.productToDisplay).then((projectdata)=>{
 console.log("project update data",projectdata);
 })

})
 }
 else{
 this.fileFlag2="notproperFile";
 console.log("invalid")
 
 
 }
 
 
}
 reversalFile2(arg0: string, reversalFile2: any) {
 throw new Error("Method not implemented.");
 }


 // changes made by sanchita
 
 serviceTimeoutRev1(event){
 this.serviceTimeoutReversal1=event;
 }
 serviceUrlRev1(event){
 this.serviceUrlReversal1=event;
 }
 serviceNameRev1(event){
 this.serviceNameReversal1=event;
 }
 serviceTimeoutRev2(event){
 this.serviceTimeoutReversal2=event;
 }
 serviceUrlRev2(event){
 this.serviceUrlReversal2=event;
 }
 serviceNameRev2(event){
 this.serviceNameReversal2=event;
 }
 serviceTimeoutRevProd1(event){
 this.serviceTimeoutReversalProd1=event;
 console.log("event",event);
 }
 serviceUrlRevProd1(event){
 this.serviceUrlReversalProd1=event;
 }
 serviceNameRevProd1(event){
 this.serviceNameReversalProd1=event;
 }
 serviceTimeoutRevProd2(event){
 this.serviceTimeoutReversalProd2=event;
 }
 serviceUrlRevProd2(event){
 this.serviceUrlReversalProd2=event;
 }
 serviceNameRevProd2(event){
 this.serviceNameReversalProd2=event;
 }
}