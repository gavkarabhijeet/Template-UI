// import { Component, OnInit } from '@angular/core';
import { Component, ViewChild, ViewContainerRef, OnInit, HostListener } from "@angular/core";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { MakerDetailsService } from "./maker-details.service";
import { config } from "config";
import { Router, ActivatedRoute } from "@angular/router";
import 'jspdf-autotable';
import * as jspdf from 'jspdf';
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";
import { elementStyleProp } from "@angular/core/src/render3";
import { MakerService } from "../maker-page/maker-page.service";
const projectVerson: string = config.version;
@Component({
 selector: "app-maker-details",
 templateUrl: "./maker-details.component.html",
 styleUrls: ["./maker-details.component.css"]
})
export class MakerDetailsComponent implements OnInit {
 private tabSet: NgbTabset;
 public navbarOpen: boolean;
//  @HostListener('window:beforeunload', ['$event'])
//  public before() {
//    return false
//  }
//  @HostListener('window:unload', ['$event'])
//  public after() {
//    this.makerService.MyMethod()
//  }
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
 addRegisterData: FormGroup;
 productName: string;
 makerData: any;
 projectVersion = projectVerson;
 checkedId = "bankAccount";
 radioVal: any;
 show = "econ";
 dataOfUser;
 valueUsed = [];
 productEmail;
 dataToDisplay;
 ifscCodes: any;
 dataOfProductToDisplay;
 // productData: any;
 serviceName: any;
 serviceImage: string;
 productImage: string;
 displayAddition: boolean;
 dataOfProduct;
 dataOfService;
 imageUrl=config.imageUrl;
 obj: { username: any; makerApproval: string };
 dataOfApproval;
 userDetails: any;
 dataOfproject: string;
 dataOfProjecttoDisplay: any;
 dataOFUSER: string;
 username: string;
 serviceId: any;
 productId: any;
 productToDisplay;
 eodMIS;
 transReversal: boolean = false;
 approval: any;
 serviceDetailsTab: boolean;
 userDetailsTab: boolean;
 exp;
 invalid = [];
 nameProj: any;
 projName: string;
 flowId: string;
 rev: string;
 // changes made by sanchita on 18-December-2019 for project update
 projectdata: { projectId: any; projectName:any };
 updatedProjectName: string;
 invalid2 = [];
 userData: any;
 firstName: any;
 lastLoggedIn: Date;
 IFSCCCODE:boolean=false;
 displayReasonError:boolean=true;
  clientCode;
  current_datetime: any;
 @ViewChild(NgbTabset) set content(content: NgbTabset) {
 this.tabSet = content;
 }

 constructor(
 private makerService: MakerService,
 private fb: FormBuilder,
 private makerDetailsService: MakerDetailsService,
 private router: Router,
 private _route: ActivatedRoute,
 public toastr: ToastrService
 ) {
 
 this.addRegisterData = this.fb.group({
 // emails: this.fb.array([this.addbusinessEmail()]),
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
 phoneNumber: [""],
 password: [""],
 confirmPassword: [""],
 bankAccountNumber: [""],
 accountManagerName: ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
 poolAccountNumber: [""],
 webServiceType: [""],
 communicationProtocol: [""],
 httpCertificate: [""],
 encryptionMethod: [""],
 uatIp: [""],
 uatPort: [""],
 uatSecret: [""],
 uatUsername: [""],
 uatPassword: [""],
 retryAttempts: [""],
 retryInterval: [""],
 prodIp: [""],
 prodUsername: [""],
 prodPort: [""],
 prodSecret: [""],
 prodPassword: [""],
 messageFormat: [""],
 uatPayUpdateURL: [""],
 uatCustValidationURL: [""],
 uatPaymentStat: [""],
 // 'checksumReq':[''],
 livePayUpdateURL: [""],
 liveCustValidationURL: [""],
 livePaymentStat: [""],
 clientCodeProfund: ["",[Validators.required,Validators.pattern(/^(?:[A-Za-z0-9]{3}|[A-Za-z0-9]{4}|[A-Za-z0-9]{6})$/)]],
 formatCodeProfund: [""],
 clientCodeIPS: ["",[Validators.required]],
 formatCodeIPS: [""],
 clientcodeProfunds: ["",],
 formatcodeProfunds: [""],
 ifscCode: ["",[Validators.required]],
 collectionCode: ["",[Validators.required]],
 iCoreClientCode: ["",[Validators.required]],
 rejectReason: ["", [Validators.required]],
 mobileNumberAM: ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
          emailIdAM: [
            "",
            [
              Validators.pattern(
                /^([a-z]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@(ext.)?(icicibank.com)$/
              )
            ]
          ],
formatCode:[""]
 });
 }
 /**
 * @author Kuldeep 
 * @description This function is used to logout the user 
 */
 logout(){
 this.makerDetailsService.logout(this.userData).then(logout=>{
 console.log("logout",logout);
 localStorage.clear();
 this.router.navigateByUrl('/authentication/Home');
 })
 }

 ngAfterViewInit() {}

 ngOnInit() {
  $("#a").css("display", "none");
  $("#b").css("display", "none"); 
 this.userData = JSON.parse(localStorage.getItem("dataofUser"))
 this.firstName = this.userData[0].firstName
 if(localStorage.getItem("LastLoggedIn") != null){
 this.lastLoggedIn = new Date(localStorage.getItem("LastLoggedIn"))
 } 
 window.history.pushState(null, "", window.location.href);


 this.approval=localStorage.getItem("approval");
 this.username = localStorage.getItem("username");
 this.dataOfproject = localStorage.getItem("projectId");

 this.dataOFUSER = localStorage.getItem("userDetails");
//  this.dataToDisplay = JSON.parse(this.dataOFUSER);
 console.log("this.data",this.dataOFUSER);
 this.makerDetailsService.getUserDetails(this.dataOFUSER).then(data =>{
   console.log("user details",data);
   console.log("accountManagerName",data[0].accountManagerName);
   this.dataToDisplay=data[0];
 })
 

 this.makerDetailsService
 .getProjectDetails(this.dataOfproject)
 .then(data => {
 
 this.dataOfProductToDisplay = data;
 console.log("------------>", this.dataOfProductToDisplay);
 this.productToDisplay = this.dataOfProductToDisplay[0];
 this.productId = this.dataOfProductToDisplay[
 0
 ].products[0].productId;
 this.serviceId = this.dataOfProductToDisplay[
 0
 ].products[0].services[0].serviceId;
 
 this.makerDetailsService
 .getProductDetails(this.productId)
 .then(data => {
 this.dataOfProduct = data;
 
 this.productName = this.dataOfProduct[0].productName;
 this.productImage =
 "assets/images/accounts_dark_hover.svg";

 this.makerDetailsService
 .getServiceDetails(this.serviceId)
 .then(data => {
 this.dataOfService = data;

 this.serviceName = data[0].serviceName;
 this.serviceImage =
 this.imageUrl + "Images/Services/" + data[0].fileName;
 });
 });
 if (
 this.dataOfProductToDisplay[0].products[0].services[0].ackReciept !==
 "undefined"
 ) {
 this.addRegisterData.patchValue({
 organisation: this.dataToDisplay.organisation,
 email: this.dataToDisplay.email,
 username: this.dataToDisplay.username,
 phoneNumber: this.dataToDisplay.phoneNumber,
 bankAccountNumber: this.dataToDisplay.bankAccountNumber,
 poolAccountNumber: this.dataToDisplay.poolAccountNumber,
 accountManagerName:this.dataToDisplay.accountManagerName,
 mobileNumberAM:this.dataToDisplay.mobileNumberAM,
 emailIdAM:this.dataToDisplay.emailIdAM,
 webServiceType: this.dataOfProductToDisplay[0].products[0]
 .services[0].webServiceType,
 encryptionMethod: this.dataOfProductToDisplay[0].products[0]
 .services[0].encryptionMethod,
 uatIp: this.dataOfProductToDisplay[0].products[0].services[0].uatIp,
 uatPort: this.dataOfProductToDisplay[0].products[0].services[0]
 .uatPort,
 prodIp: this.dataOfProductToDisplay[0].products[0].services[0]
 .prodIp,
 prodPort: this.dataOfProductToDisplay[0].products[0].services[0]
 .prodPort
 });
 } else if (
 this.dataOfProductToDisplay[0].products[0].services[0].ackReciept ===
 ""
 ) {
 this.addRegisterData.patchValue({
 firstName: this.dataToDisplay.firstName,
 lastName: this.dataToDisplay.lastName,
 organization: this.dataToDisplay.organisation,
 email: this.dataToDisplay.email,
 username: this.dataToDisplay.username,
 phoneNumber: this.dataToDisplay.phoneNumber,
 bankAccountNumber: this.dataToDisplay.bankAccountNumber,
 poolAccountNumber: this.dataToDisplay.poolAccountNumber,
 webServiceType: this.dataOfProductToDisplay[0].products[0]
 .services[0].webServiceType,
 communicationProtocol: this.dataOfProductToDisplay[0].products[0]
 .services[0].communicationProtocol,
 uatIp: this.dataOfProductToDisplay[0].products[0].services[0].uatIp,
 uatPort: this.dataOfProductToDisplay[0].products[0].services[0]
 .uatPort,
 uatSecret: this.dataOfProductToDisplay[0].products[0].services[0]
 .uatSecret,
 uatUsername: this.dataOfProductToDisplay[0].products[0].services[0]
 .uatUsername,
 uatPassword: this.dataOfProductToDisplay[0].products[0].services[0]
 .uatPassword,
 prodIp: this.dataOfProductToDisplay[0].products[0].services[0]
 .prodIp,
 prodUsername: this.dataOfProductToDisplay[0].products[0].services[0]
 .prodUsername,
 prodPort: this.dataOfProductToDisplay[0].products[0].services[0]
 .prodPort,
 prodSecret: this.dataOfProductToDisplay[0].products[0].services[0]
 .prodSecret,
 prodPassword: this.dataOfProductToDisplay[0].products[0].services[0]
 .prodPassword,
 retryAttempts: this.dataOfProductToDisplay[0].products[0]
 .services[0].retryAttempts,
 retryInterval: this.dataOfProductToDisplay[0].products[0]
 .services[0].retryInterval
 });
 }

 });
 }

 addbusinessSpocEmail() {
 this.displayAddition = false;
 (<FormArray>this.addRegisterData.get("emails")).push(
 this.addbusinessEmail()
 );
 }

 checkBoxvalue1(event) {
 this.eodMIS = event.target.checked;
 }
 checkBoxvalue2(event) {
 this.transReversal = event.target.checked;
 }
 
 codeOfIFSC(event){
 console.log("---------->",event.target.value);
 var value=event.target.value;
 if(value.length === 3){
 var data='ICIC0000103';
 this.addRegisterData.controls['ifscCode'].setValue(data); 
 this.IFSCCCODE=true;
 }
 else if(value.length === 4){
 var data='ICIC0000104';
 this.addRegisterData.controls['ifscCode'].setValue(data);
 this.IFSCCCODE=true;
 }
 else{
 var data='ICIC0000106';
 this.addRegisterData.controls['ifscCode'].setValue(data); 
 this.IFSCCCODE=true;
 }
 }

 approveData(value) {
 console.log("------>>>>>>", value);
 if(value.accountManagerName ==""){
   value.accountManagerName=this.dataToDisplay.accountManagerName;
 }
 if(value.mobileNumberAM == ""){
  value.mobileNumberAM= this.dataToDisplay.mobileNumberAM;
 }
 if(value.emailIdAM ==""){
   value.emailIdAM =this.dataToDisplay.emailIdAM;
 }

 if(this.dataOfProduct[0].productName=="eCollections"){
 console.log("ecollection")
 this.invalid = []; 
 const controls = this.addRegisterData.controls;
 for (const name in controls) 
 {
 if(controls[name].invalid)
 {
 console.log(name)
 if(name === "clientCodeIPS" || name === "ifscCode" || name === "clientCodeProfund"){

 this.invalid.push(name);
 }
 console.log("-------------->",this.invalid);

 }
 }
 }
 else{
 console.log("iSure")

 this.invalid2 = []; 
 const controls1 = this.addRegisterData.controls;
 for (const name1 in controls1) 
 {
 if(controls1[name1].invalid)
 {
 console.log(name1)
 if(name1 === "collectionCode" || name1 === "iCoreClientCode"){
 this.invalid2.push(name1);
 }
 console.log("-------------->",this.invalid2);

 }
 }

 }
 console.log("invald control name: ",this.invalid.length)
 
 if(this.invalid.length > 0 || this.invalid2.length > 0 ){
 if(this.dataOfProduct[0].productName=="eCollections"){
 console.log("----------------")
 for (var i = 0; i < this.invalid.length; i++) {
 if(this.invalid[i] == "clientCodeIPS"){
 console.log("this.invalid[i]: ",this.invalid[i])
 this.addRegisterData.get("clientCodeIPS").setErrors({ acc: true });
 }
 if(this.invalid[i] == "ifscCode"){
 this.addRegisterData.get("ifscCode").setErrors({ acc: true });
 }
 if(this.invalid[i] == "clientCodeProfund"){
 this.addRegisterData.get("clientCodeProfund").setErrors({ acc: true });
 }
 }
 }
 else {
 for (var i = 0; i < this.invalid2.length; i++) {
 console.log("*****************");
 if(this.invalid2[i] == "collectionCode"){
 console.log("this.invalid[i]: ",this.invalid2[i])
 this.addRegisterData.get("collectionCode").setErrors({ acc: true });
 }
 if(this.invalid2[i] == "iCoreClientCode"){
 console.log("this.invalid[i]: ",this.invalid2[i])

 this.addRegisterData.get("iCoreClientCode").setErrors({ acc: true });
 }
 }
 }
 
 }
 // abhijeet
 else{
 console.log(this.dataOfProduct[0].productName)
 if(this.dataOfProduct[0].productName=="eCollections")
 {
 console.log("done1")
 let now = moment();
let formatted_date =moment().format('MMMM Do YYYY');
 this.dataOfApproval = {
 projectId: this.dataToDisplay.projectId,
 makerApproval: true,
 status: "Subscription Request Approved",
 username: this.dataToDisplay.email,
 createdBy: this.username,
 clientCodeProfund: value.clientCodeProfund,
 formatCodeProfund: value.clientCodeProfund,
 clientCodeIPS: value.clientCodeIPS,
 formatCodeIPS: value.clientCodeIPS,
 // changes by sanchita 14-December
 accountManagerName: value.accountManagerName,
 mobileNumberAM:value.mobileNumberAM,
 emailIdAM:value.emailIdAM,
 IFSCCode: value.ifscCode,
 orgName: this.dataToDisplay.organisation,
 enableTransactionReversalFileProcessing: this.transReversal,
 enableEODMISforthisClient: this.eodMIS,
 formatCode:value.formatCode,
 approvedDate:formatted_date
 };
 
 }
 else{
 console.log("done")
 let now = moment();
let formatted_date =moment().format('MMMM Do YYYY');
 this.dataOfApproval = {
 projectId: this.dataToDisplay.projectId,
 makerApproval: true,
 status: "Subscription Request Approved",
 username: this.dataToDisplay.email,
 createdBy: this.username,
 clientCodeProfund: value.clientCodeProfund,
 formatCodeProfund: value.clientCodeProfund,
 clientCodeIPS: value.clientCodeIPS,
 formatCodeIPS: value.clientCodeIPS,
 iCoreClientCode:value.iCoreClientCode,
 // changes by sanchita 14-December
 accountManagerName: value.accountManagerName,
 mobileNumberAM:value.mobileNumberAM,
 emailIdAM:value.emailIdAM,
 collectionCode: value.collectionCode,
 orgName: this.dataToDisplay.organisation,
 enableTransactionReversalFileProcessing: this.transReversal,
 enableEODMISforthisClient: this.eodMIS,
 formatCode:value.formatCode,
 approvedDate:formatted_date
 };

 }
 
 this.nameProj = this.dataOfService[0].serviceName
 if(this.dataOfProduct[0].productName=="eCollections"){
 this.projName="eColl"
 if(this.nameProj=="ECollection Intimation")
 {
 console.log("-----------");
 this.flowId = "1a"
 }
 else if(this.nameProj=="ECollection with Remitter Validation")
 {
 console.log("-----------");

 this.flowId = "2a"
 }
 else if(this.nameProj == "ECollection with Remitter Validation in Intermediary Account")
 {
 console.log("-----------");

 this.flowId = "3a"
 }
 else if(this.nameProj == "ECollection with Two Level Validation at Bank and Client’s End"){ 
 console.log("-----------");

 this.flowId = "4a"
 }
 }
 else {
 this.projName="iSure"
 if(this.nameProj == "iSurePay-Real Time Cheque and Cash Collection Validation")
 {
 this.flowId = "5a"
 }
 else{
 this.flowId = "6a"
 }
 }
 // changes by sanchita on 18-December-2019 for replacing productName to updatedProjectName starts
 if(this.transReversal == true){
 this.rev = "rev"
 this.updatedProjectName = value.clientCodeIPS+"_"+this.projName+"_"+this.flowId+"_"+this.rev
 console.log("this.projectname--------->",this.updatedProjectName)
 this.projectdata={
 projectId: this.dataToDisplay.projectId,
 projectName: this.updatedProjectName
 }
 this.clientCode = {
  type: "ips",
  clientCode : value.clientCodeIPS
  }
 }else{
 this.rev= ""
 if(this.projName == "eColl")
{

 this.updatedProjectName = value.clientCodeProfund+"_"+this.projName+"_"+this.flowId;
 console.log("this.projectname------->>",this.updatedProjectName)
 this.projectdata={
 projectId: this.dataToDisplay.projectId,
 projectName: this.updatedProjectName
 }
 this.clientCode = {
  type: "profund",
  clientCode : value.clientCodeProfund
  }
}
else{
  this.updatedProjectName = value.iCoreClientCode+"_"+this.projName+"_"+this.flowId;
 console.log("this.projectname------->>",this.updatedProjectName)
 this.projectdata={
 projectId: this.dataToDisplay.projectId,
 projectName: this.updatedProjectName
 }
 this.clientCode = {
  type: "icore",
  clientCode : value.iCoreClientCode
  }
}
 }
 
 // changes by sanchita on 18-December-2019 for replacing productName to updatedProjectName ends
// console.log("datacode",this.clientCode);
console.log("data for approval",this.dataOfApproval);
this.makerDetailsService.checkClientCode(this.clientCode).then(result => {
  console.log("result",this.clientCode.type=="profund",result,result.message==this.clientCode.clientCode+" client code is already exist.")
  if(this.clientCode.type == "ips" && result.message == this.clientCode.clientCode+" client code is already exist."){
    alert("The IPS Client Code "+'"'+this.clientCode.clientCode+'"'+" already exists for "+this.dataToDisplay.organisation+" against "+this.dataToDisplay.productName+": "+this.dataToDisplay.serviceName+". Kindly validate the IPS back-end configuration and use a unique/non-duplicate Client Code for this request approval. Thanks!")
    this.addRegisterData.get("clientCodeIPS").setErrors({ acc1: true });
  }else if(this.clientCode.type == "profund" && result.message == this.clientCode.clientCode+" client code is already exist."){
    alert("The Profunds Client Code "+'"'+this.clientCode.clientCode+'"'+" already exists for "+this.dataToDisplay.organisation+" against "+this.dataToDisplay.productName+": "+this.dataToDisplay.serviceName+". Kindly validate the Profunds back-end configuration and use a unique/non-duplicate Client Code for this request approval. Thanks!")
    this.addRegisterData.get("clientCodeProfund").setErrors({ acc1: true });
  }else if(this.clientCode.type == "icore" && result.message == this.clientCode.clientCode+" client code is already exist."){
    alert("The iCore Client Code "+'"'+this.clientCode.clientCode+'"'+" already exists for "+this.dataToDisplay.organisation+" against "+this.dataToDisplay.productName+": "+this.dataToDisplay.serviceName+". Kindly validate the iCore back-end configuration and use a unique/non-duplicate Client Code for this request approval. Thanks!")
    this.addRegisterData.get("iCoreClientCode").setErrors({ acc1: true });
  }else{
         this.makerDetailsService.approveUser(this.dataOfApproval).then(data => {
         this.makerDetailsService.updateProjectName(this.projectdata).then(value =>{
         console.log("data",value);
         $("#a").css("display","block").delay(1000).fadeOut(200);
         setTimeout(() => {this.router.navigate(["/authentication/Checker"])}, 1300);
         //  this.toastr.success("Subscription Approved Sucessfully!");
        //  this.router.navigate(["/authentication/Checker"]);
         }); 
      });
  }
  

})
 }
 }
 
 projectName(arg0: string, projectName: any) {
 throw new Error("Method not implemented.");
 }
 removebusinessSpocEmail(ifConditionGroupIndex: number): void {
 (<FormArray>this.addRegisterData.get("emails")).removeAt(
 ifConditionGroupIndex
 );
 }
 toggleNavbar() {}
 addbusinessEmail(): FormGroup {
 return this.fb.group({
 email: [""]
 });
 }
 onSelect(checkedValue, id) {
 // console.log("Value ", checkedValue.type);
 // console.log("ID1", id, checkedValue.target.value);
 this.checkedId = id;
 this.radioVal = checkedValue.target.value;
 // console.log("ID ", this.checkedId);
 }
 change(value) {
 this.show = value;
 }
 ifscCode(event) {
 this.ifscCodes = event.target.value;
 // console.log("value-------", this.ifscCodes);
 }
 // changes by sanchita 14-December-2019
 backTab(tabName) {
 // console.log("exp: ", this.exp)
 if (tabName == "userDetails") {
 this.userDetails = true;
 this.serviceDetailsTab = false;
 } else if (tabName == "serviceDetails") {
 // this.appDetailsTab = true;
 this.userDetails = true;
 this.serviceDetailsTab = false;
 }
 this.exp = tabName;
 }
 nextTab(tabName) {
 // console.log("exp: ", this.exp)
 if (tabName == "userDetails") {
 // this.appDetailsTab = true;
 this.userDetailsTab = false;
 } else if (tabName == "serviceDetails") {
 // this.appDetailsTab = true;
 this.userDetailsTab = true;
 this.serviceDetailsTab = false;
 }
 this.exp = tabName;
 }
 // changes by sanchita 14-December-2019 ends
 rejectData(value) {
    console.log("PRINT : REJECT OBJECT ", JSON.stringify(value));
    console.log("PRINT : REJECT REASON ", value.rejectReason);
    console.log("PRINT: REJECT METHOD CALLED");
    if(value.rejectReason == ''){
      this.displayReasonError=true;
    }
    else{
      this.displayReasonError=false;
      this.dataOfApproval = {
        projectId: this.dataToDisplay.projectId,
        makerApproval: false,
        status: "Subscription Request Rejected",
        username: this.dataToDisplay.email,
        createdBy: this.username,
        clientCodeProfund: value.clientCodeProfund,
        formatCodeProfund: "",
        clientCodeIPS: "",
        accountManagerName: value.accountManagerName,
        formatCodeIPS: "",
        rejectReason: value.rejectReason,
        IFSCCode: value.ifscCode,
        orgName: this.dataToDisplay.organisation,
        enableTransactionReversalFileProcessing: this.transReversal,
        enableEODMISforthisClient: this.eodMIS
      };
      // console.log(" Reject ", this.dataOfApproval);
  
      this.makerDetailsService.approveUser(this.dataOfApproval).then(data => {
        console.log("PRINT : RESPONSE FOR APPROVE/REJECT ", data);
        $("#b").css("display","block").delay(1000).fadeOut(200);
        setTimeout(() => {this.router.navigate(["/authentication/Checker"])}, 1300);
        // this.toastr.success("Subscription Rejected Sucessfully!");
        // this.router.navigate(["/authentication/Checker"]);
      });
    }
 
   
  }

  /**
   * @author abhijeet
   * @description This function will be used for the generation of PDF
   */

  capture(){
    var doc = new jspdf('l', 'pt', 'a4');
    var imgData ='data:image/png;base64,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'
    doc.addImage(imgData, 'PNG', 40, 7, 150, 40);

    console.log("test2")

    ///////Ecollection Intimation////
    if(this.dataToDisplay.serviceName==="ECollection Intimation"){
      console.log("test3")
      ////ORG Details////
      var cols = [{ title: 'Organization Name', dataKey: 'organization' },
      { title: 'Current Account Number', dataKey: 'currentAccNumber' },
      { title: 'AM/IM Name', dataKey: 'amName' }, { title: 'AM/IM Number', dataKey: 'amNumber' },
      { title: 'AM/IM Email Id', dataKey: 'amEmail' }]
     
      var tableData = [];
     
      tableData.push({
      'id': this.dataToDisplay.id, 'organization': this.dataToDisplay.organisation, 'currentAccNumber': this.dataToDisplay.bankAccountNumber, 'interAccnumber': this.dataToDisplay.poolAccountNumber,
      'amName': this.dataToDisplay.accountManagerName, 'amNumber': this.dataToDisplay.mobileNumberAM, 'amEmail': this.dataToDisplay.emailIdAM
      })
      doc.autoTable(cols, tableData,{
      margin : {top :120}
     
      })

      doc.setFontType('bold')
      doc.setTextColor('#053c6d')
      // doc.setMargin(100)
      doc.text(40, 100, 'Organization Details');
     
      ////Business Contact Details
      var cols = [{ title: 'First Name', dataKey: 'fName' },
      { title: 'Last Name', dataKey: 'lName' }, { title: 'Mobile Number', dataKey: 'mobileNumber' },
      { title: 'Email Id', dataKey: 'emailId' }]
      // console.log(this.dataToDisplay,"adad")
      var tableData = [];
      tableData.push({
      'id': this.dataToDisplay.id, 'fName':this.dataToDisplay.firstNameBusinessSpoc
      , 'lName':this.dataToDisplay.lastNameBusinessSpoc ,
      'mobileNumber':this.dataToDisplay.mobileNumberBusinessSpoc
      ,'emailId':this.dataToDisplay.emailIdBusinessSpoc
     
      })
      doc.autoTable(cols, tableData,{
      // margin : {top :260}
      startY: doc.autoTable.previous.finalY + 60,
     
      })
      doc.setFontType('bold')
      doc.setTextColor('#053c6d')
      // doc.setMargin(100)
      doc.text(40, 200, 'Business Contact Details');

          /////////////IT Contact Details////////////////////
          var cols = [{ title: 'First Name', dataKey: 'fName' },
          { title: 'Last Name', dataKey: 'lName' }, { title: 'Mobile Number', dataKey: 'mobileNumber' },
          { title: 'Email Id', dataKey: 'emailId' }]
          // console.log(this.dataToDisplay,"adad")
          var tableData = [];
          tableData.push({
          'id': this.dataToDisplay.id, 'fName':this.dataToDisplay.firstNameITSpoc
          , 'lName':this.dataToDisplay.lastNameITSpoc ,
          'mobileNumber':this.dataToDisplay.mobileNumberITSpoc
          ,'emailId':this.dataToDisplay.emailIdITSpoc
         
          })
          doc.autoTable(cols, tableData,{
          // margin : {top :60}
          startY: doc.autoTable.previous.finalY + 60,
         
          })
         
          doc.setFontType('bold')
          doc.setTextColor('#053c6d')
          // doc.setMargin(100)
          doc.text(40, 300, 'IT Contact Details');

              ///////serviceDetails//////////////////

              var cols = [{ title: 'Type of Web Service', dataKey: 'webService' },
              { title: 'Communication http method Type', dataKey: 'httpMethod' }, { title: 'Checksum', dataKey: 'checksum' },
              { title: 'Encryption Method', dataKey: 'encryptionMethod' }]
              // console.log(this.dataToDisplay,"adad")
              var tableData = [];
              tableData.push({
              'id': this.dataToDisplay.id, 'webService': this.dataOfProductToDisplay[0].products[0]
              .services[0].webServiceType
              , 'checksum': this.dataOfProductToDisplay[0].products[0]
              .services[0].checksumControl,
              'encryptionMethod': this.dataOfProductToDisplay[0].products[0]
              .services[0].encryptionMethod,
              'httpMethod': this.dataOfProductToDisplay[0].products[0]
              .services[0].communicationProtocol
              })

              doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 60,
               
                })
                doc.setFontType('bold')
                doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                doc.text(40, 400, 'Service Details');

                    ///////////////////UAT & PROD details////////////
                    var cols = [{ title: 'UAT IP', dataKey: 'uIP' },
                    { title: 'UAT Port', dataKey: 'uPort' }, { title: 'UAT File', dataKey: 'uFile' },{ title: 'Communication Protocol for UAT', dataKey: 'uProtocol' },
                    { title: 'Prod IP', dataKey: 'pIP' },{ title: 'Prod Port', dataKey: 'pPort' },{ title: 'Prod File', dataKey: 'pFile' },{ title: 'Communication Protocol for Prod', dataKey: 'prodProtocol' }]
                    // console.log(this.dataToDisplay,"adad")
                    var tableData = [];
                    tableData.push({
                    'id': this.dataToDisplay.id, 'uIP':this.dataOfProductToDisplay[0].products[0].services[0].uatIp
                    , 'uPort':this.dataOfProductToDisplay[0].products[0].services[0]
                    .uatPort ,
                    'uFile':this.dataOfProductToDisplay[0].products[0].services[0]
                    .uatFile1 ,
                    'uProtocol':this.dataOfProductToDisplay[0].products[0].services[0]
                    .communicationProtocolUAT
                    ,'pIP':this.dataOfProductToDisplay[0].products[0].services[0]
                    .prodIp,'pPort':this.dataOfProductToDisplay[0].products[0].services[0]
                    .prodPort,'pFile':this.dataOfProductToDisplay[0].products[0].services[0].
                    prodFile1,
                    'prodProtocol':this.dataOfProductToDisplay[0].products[0].services[0]
                    .communicationProtocolProd
                    })
                    doc.autoTable(cols, tableData,{
                    margin : {top :70},
                    startY: 750,columnStyles: {
                   
                    0: {columnWidth: 50},
                    2: {columnWidth: 200},
                    4: {columnWidth: 50},
                    6: {columnWidth: 200},
                    1: {columnWidth: 35},
                    5: {columnWidth: 35}




                   
                   
                    }
                   
                    })
                    doc.setFontType('bold')
                    doc.setTextColor('#053c6d')
                    // doc.setMargin(100)
                    doc.text(40,50, 'UAT & Prod Details');
   
        /////////////UAT Swagger ////////////
        doc.setFontType('bold')
         doc.setTextColor('#053c6d')
        // doc.setMargin(100)
        doc.text(40,doc.autoTable.previous.finalY + 60, 'Uploaded Swagger for your API (UAT)');
        var cols = [{ title: 'Service Timeout ', dataKey: 'serTimeout' },
        { title: 'Service URL ', dataKey: 'serURL' }, { title: 'Service Name ', dataKey: 'serName1' },
        { title: 'Validation request/response ', dataKey: 'validationFile' }]
        // console.log(this.dataToDisplay,"adad")
        var tableData = [];
        tableData.push({
        'serURL': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLUAT,
        'serName1':this.dataOfProductToDisplay[0].products[0].services[0]
        .serviceNameInputUAT ,
        'validationFile':this.dataOfProductToDisplay[0].products[0].services[0]
        .uatFile1
        ,'serTimeout':this.dataOfProductToDisplay[0].products[0].services[0]
        .serviceTimeOutUAT
        })
        doc.autoTable(cols, tableData,{
        // margin : {top :60}
        startY: doc.autoTable.previous.finalY + 70,
       
        })
       

            /////////////PROD Swagger ////////////
            doc.setFontType('bold')
             doc.setTextColor('#053c6d')
              // doc.setMargin(100)
             doc.text(40,doc.autoTable.previous.finalY + 60, 'Uploaded Swagger for your API (Prod)');

            var cols = [{ title: 'Service Timeout ', dataKey: 'serTimeout' },
            { title: 'Service URL ', dataKey: 'serURL' }, { title: 'Service Name ', dataKey: 'serName1' },
            { title: 'Validation request/response ', dataKey: 'validationFile' }]
            // console.log(this.dataToDisplay,"adad")
            var tableData = [];
            tableData.push({
            'serURL': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLProd,
            'serName':this.dataOfProductToDisplay[0].products[0].services[0]
            .serviceNameInputProd ,
            'validationFile':this.dataOfProductToDisplay[0].products[0].services[0]
            .prodFile1
            ,'serTimeout':this.dataOfProductToDisplay[0].products[0].services[0]
            .serviceTimeOutProd
            })
            doc.autoTable(cols, tableData,{
            // margin : {top :60}
            startY: doc.autoTable.previous.finalY + 70,
           
            })
           

             
                    ////////////Profund////////
                    if(this.dataToDisplay.makerApproval == true){

                      doc.setFontType('bold')
                      doc.setTextColor('#053c6d')
                      // doc.setMargin(100)
                      doc.text(40,doc.autoTable.previous.finalY + 60, ' Profund/IPS Backend Configuration ');
                      var cols = [{ title: 'Profund Client Code ', dataKey: 'clientCodeProfund' },{ title: 'eCollection IFSC', dataKey: 'ifscCode' },
                { title: 'IPS Client Code ', dataKey: 'clientCodeIPS' },{ title: 'IPS Format Code ', dataKey: 'formatCode' }]
                // console.log(this.dataToDisplay,"adad")
                var tableData = [];
                tableData.push({
                'id': this.dataToDisplay.id, 'ifscCode':this.dataToDisplay.IFSCCode , 'clientCodeIPS':this.dataToDisplay.clientCodeIPS
                ,'clientCodeProfund':this.dataToDisplay.clientCodeProfund,'formatCode':this.dataToDisplay.formatCode
               
                })
 
                doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 70,
     
                 })
               
                }
                else{
                  doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                   doc.text(40,doc.autoTable.previous.finalY + 50, ' Profund/IPS Backend Configuration ');
                  doc.setFontType('bold');
                  doc.setTextColor('#053c6d');
                  // doc.setMargin(100)
                  // doc.setFontSize(9);
                  doc.text(40,doc.autoTable.previous.finalY + 70, 'Note : Subscription has been rejected hence "Profund/IPS Backend Configuration" is not available. ');
                  doc.setFontType('bold');
                  // doc.setFontSize(30);

                 
                }
               

              ///////////extra/////
              var cols = [{ title: 'Retry Attempts On Failure / No Response', dataKey: 'retry' },
              { title: 'Action to be taken on No Response', dataKey: 'Action' }]
              // console.log(this.dataToDisplay,"adad")
              var tableData = [];
              tableData.push({
              'id': this.dataToDisplay.id, 'retry':this.dataOfProductToDisplay[0].products[0].services[0].retryAttempts
              , 'Action':this.dataOfProductToDisplay[0].products[0].services[0].actionOnNoRes
             
              })
              doc.autoTable(cols, tableData,{
              // margin : {top :60}
              startY: doc.autoTable.previous.finalY + 210,
             
              })

              ////Product Details////
              doc.setFontType('bold')
              doc.setTextColor('#053c6d')
              // doc.setMargin(100)
              doc.text(40,doc.autoTable.previous.finalY + 60, ' Product Details ');

              var cols = [{ title: 'Product name', dataKey: 'prodName' },
              { title: 'Flow Name', dataKey: 'flowName' }]
              // console.log(this.dataToDisplay,"adad")
              var tableData = [];
              tableData.push({
              'id': this.dataToDisplay.id, 'prodName':this.dataToDisplay.productName
              , 'flowName':this.dataToDisplay.serviceName
             
              })
              doc.autoTable(cols, tableData,{
              // margin : {top :60}
              startY: doc.autoTable.previous.finalY + 70,
              margin : {top :80},
              // startY: 750
             
             
              })
             


              /////subsription status///

              if(this.dataToDisplay.makerApproval == false){
                console.log("test2")

                doc.setFontType('bold')
                doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                doc.text(40,doc.autoTable.previous.finalY + 60, ' Subscription Status ');
               
                var cols = [{ title: 'Organization name', dataKey: 'orgName' },
                { title: 'Status', dataKey: 'status' },{title: 'Created by', dataKey: 'createdBy'},{title: 'Reason', dataKey: 'reason'}]
                // console.log(this.dataToDisplay,"adad")
                var tableData = [];
                tableData.push({
                'id': this.dataToDisplay.id, 'orgName':this.dataToDisplay.orgName
                , 'status':this.dataToDisplay.status,'createdBy':this.dataToDisplay.createdBy,'reason':this.dataToDisplay.rejectReason
               
                })
                doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 70,
                // margin : {top :80},
                // startY: 750
               
               
                })
               
               
                }
                else
                {

                  doc.setFontType('bold')
                  doc.setTextColor('#053c6d')
                  // doc.setMargin(100)
                  doc.text(40,doc.autoTable.previous.finalY + 60, ' Subscription Status ');

                  console.log("test3")
                  var cols = [{ title: 'Organization name', dataKey: 'orgName' },
                  { title: 'Status', dataKey: 'status' },{title: 'Created by', dataKey: 'createdBy'}]
                  // console.log(this.dataToDisplay,"adad")
                  var tableData = [];
                  tableData.push({
                  'id': this.dataToDisplay.id, 'orgName':this.dataToDisplay.orgName
                  , 'status':this.dataToDisplay.status,'createdBy':this.dataToDisplay.createdBy
                 
                  })
                  doc.autoTable(cols, tableData,{
                  // margin : {top :60}
                  startY: doc.autoTable.previous.finalY + 70,
                  // margin : {top :80},
                  // startY: 750
                 
                 
                  })
                 
                  }

      }
    ///////End of Ecollection Intimation////

    ////////ECollection with Remitter Validation/////////////
    if(this.dataToDisplay.serviceName==="ECollection with Remitter Validation"){
       ////ORG Details////
       var cols = [{ title: 'Organization Name', dataKey: 'organization' },
       { title: 'Current Account Number', dataKey: 'currentAccNumber' },
       { title: 'AM/IM Name', dataKey: 'amName' }, { title: 'AM/IM Number', dataKey: 'amNumber' },
       { title: 'AM/IM Email Id', dataKey: 'amEmail' }]
       
       var tableData = [];
       
       tableData.push({
       'id': this.dataToDisplay.id, 'organization': this.dataToDisplay.organisation, 'currentAccNumber': this.dataToDisplay.bankAccountNumber, 'interAccnumber': this.dataToDisplay.poolAccountNumber,
       'amName': this.dataToDisplay.accountManagerName, 'amNumber': this.dataToDisplay.mobileNumberAM, 'amEmail': this.dataToDisplay.emailIdAM
       })
       doc.autoTable(cols, tableData,{
       margin : {top :120}
       
       })
 
       doc.setFontType('bold')
       doc.setTextColor('#053c6d')
       // doc.setMargin(100)
       doc.text(40, 100, 'Organization Details');
       
       ////Business Contact Details
       var cols = [{ title: 'First Name', dataKey: 'fName' },
       { title: 'Last Name', dataKey: 'lName' }, { title: 'Mobile Number', dataKey: 'mobileNumber' },
       { title: 'Email Id', dataKey: 'emailId' }]
       // console.log(this.dataToDisplay,"adad")
       var tableData = [];
       tableData.push({
       'id': this.dataToDisplay.id, 'fName':this.dataToDisplay.firstNameBusinessSpoc
       , 'lName':this.dataToDisplay.lastNameBusinessSpoc ,
       'mobileNumber':this.dataToDisplay.mobileNumberBusinessSpoc
       ,'emailId':this.dataToDisplay.emailIdBusinessSpoc
       
       })
       doc.autoTable(cols, tableData,{
       // margin : {top :260}
       startY: doc.autoTable.previous.finalY + 60,
       
       })
       doc.setFontType('bold')
       doc.setTextColor('#053c6d')
       // doc.setMargin(100)
       doc.text(40, 200, 'Business Contact Details');
 
           /////////////IT Contact Details////////////////////
           var cols = [{ title: 'First Name', dataKey: 'fName' },
           { title: 'Last Name', dataKey: 'lName' }, { title: 'Mobile Number', dataKey: 'mobileNumber' },
           { title: 'Email Id', dataKey: 'emailId' }]
           // console.log(this.dataToDisplay,"adad")
           var tableData = [];
           tableData.push({
           'id': this.dataToDisplay.id, 'fName':this.dataToDisplay.firstNameITSpoc
           , 'lName':this.dataToDisplay.lastNameITSpoc ,
           'mobileNumber':this.dataToDisplay.mobileNumberITSpoc
           ,'emailId':this.dataToDisplay.emailIdITSpoc
           
           })
           doc.autoTable(cols, tableData,{
           // margin : {top :60}
           startY: doc.autoTable.previous.finalY + 60,
           
           })
           
           doc.setFontType('bold')
           doc.setTextColor('#053c6d')
           // doc.setMargin(100)
           doc.text(40, 300, 'IT Contact Details');

             ///////serviceDetails//////////////////
              var cols = [{ title: 'Type of Web Service', dataKey: 'webService' },
              { title: 'Communication http method Type', dataKey: 'httpMethod' }, { title: 'Checksum', dataKey: 'checksum' },
              { title: 'Encryption Method', dataKey: 'encryptionMethod' }]
              // console.log(this.dataToDisplay,"adad")
              var tableData = [];
              tableData.push({
              'id': this.dataToDisplay.id, 'webService': this.dataOfProductToDisplay[0].products[0]
              .services[0].webServiceType
              , 'checksum': this.dataOfProductToDisplay[0].products[0]
              .services[0].checksumControl,
              'encryptionMethod': this.dataOfProductToDisplay[0].products[0]
              .services[0].encryptionMethod,
              'httpMethod': this.dataOfProductToDisplay[0].products[0]
              .services[0].communicationProtocol
                 })
                 doc.autoTable(cols, tableData,{
                  // margin : {top :60}
                  startY: doc.autoTable.previous.finalY + 60,
                 
                  })
                  doc.setFontType('bold')
                  doc.setTextColor('#053c6d')
                  // doc.setMargin(100)
                  doc.text(40, 400, 'Service Details');
                  ///////////////////UAT & PROD details////////////
                  var cols = [{ title: 'UAT IP', dataKey: 'uIP' },
                  { title: 'UAT Port', dataKey: 'uPort' }, { title: 'UAT File', dataKey: 'uFile' },{ title: 'Communication Protocol for UAT', dataKey: 'uProtocol' },
                  { title: 'Prod IP', dataKey: 'pIP' },{ title: 'Prod Port', dataKey: 'pPort' },{ title: 'Prod File', dataKey: 'pFile' },{ title: 'Communication Protocol for Prod', dataKey: 'prodProtocol' }]
                  // console.log(this.dataToDisplay,"adad")
                  var tableData = [];
                  tableData.push({
                  'id': this.dataToDisplay.id, 'uIP':this.dataOfProductToDisplay[0].products[0].services[0].uatIp
                  , 'uPort':this.dataOfProductToDisplay[0].products[0].services[0]
                  .uatPort ,
                  'uFile':this.dataOfProductToDisplay[0].products[0].services[0]
                  .uatFile1 ,
                  'uProtocol':this.dataOfProductToDisplay[0].products[0].services[0]
                  .communicationProtocolUAT
                  ,'pIP':this.dataOfProductToDisplay[0].products[0].services[0]
                  .prodIp,'pPort':this.dataOfProductToDisplay[0].products[0].services[0]
                  .prodPort,'pFile':this.dataOfProductToDisplay[0].products[0].services[0].
                  prodFile1,
                  'prodProtocol':this.dataOfProductToDisplay[0].products[0].services[0]
                  .communicationProtocolProd
                  })
                  doc.autoTable(cols, tableData,{
                  margin : {top :80},
                  startY: 750,columnStyles: {
                 
                  0: {columnWidth: 60},
                  2: {columnWidth: 180},
                  6: {columnWidth: 180},
                  3: {columnWidth: 85},
                  7: {columnWidth: 85}
                  }
                 
                  })
                  doc.setFontType('bold')
                  doc.setTextColor('#053c6d')
                  // doc.setMargin(100)
                  doc.text(40,50, 'UAT & Prod Details');
                 
                      /////////////UAT Swagger ////////////
                      doc.setFontType('bold')
                      doc.setTextColor('#053c6d')
                      // doc.setMargin(100)
                      doc.text(40,doc.autoTable.previous.finalY + 60, 'Uploaded Swagger for your API (UAT)');

                      var cols = [{ title: 'Service Timeout ', dataKey: 'serTimeout' },
                      { title: 'Service URL ', dataKey: 'serURL' }, { title: 'Service Name ', dataKey: 'serName' },
                      { title: 'Validation request/response ', dataKey: 'validationFile' }]
                      // console.log(this.dataToDisplay,"adad")
                      var tableData = [];
                      tableData.push({
                      'serURL': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLUAT,
                      'serName':this.dataOfProductToDisplay[0].products[0].services[0]
                      .serviceNameInputUAT ,
                      'validationFile':this.dataOfProductToDisplay[0].products[0].services[0]
                      .uatFile1
                      ,'serTimeout':this.dataOfProductToDisplay[0].products[0].services[0]
                      .serviceTimeOutUAT
                      })
                      doc.autoTable(cols, tableData,{
                      // margin : {top :60}
                      startY: doc.autoTable.previous.finalY + 70,
                     
                      })
                           

                            /////////////PROD Swagger ////////////
                            doc.setFontType('bold')
                              doc.setTextColor('#053c6d')
                              // doc.setMargin(100)
                              doc.text(40,doc.autoTable.previous.finalY + 60, 'Uploaded Swagger for your API (Prod)');

                            var cols = [{ title: 'Service Timeout ', dataKey: 'serTimeout' },
                            { title: 'Service URL ', dataKey: 'serURL' }, { title: 'Service Name ', dataKey: 'serName' },
                            { title: 'Validation request/response ', dataKey: 'validationFile' }]
                            // console.log(this.dataToDisplay,"adad")
                            var tableData = [];
                            tableData.push({
                            'serURL': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLProd,
                            'serName':this.dataOfProductToDisplay[0].products[0].services[0]
                            .serviceNameInputProd ,
                            'validationFile':this.dataOfProductToDisplay[0].products[0].services[0]
                            .prodFile1
                            ,'serTimeout':this.dataOfProductToDisplay[0].products[0].services[0]
                            .serviceTimeOutProd
                            })
                            doc.autoTable(cols, tableData,{
                            // margin : {top :60}
                            startY: doc.autoTable.previous.finalY + 70,
                           
                            })
                                 
                                   ////////////Profund////////
                    if(this.dataToDisplay.makerApproval == true){

                 doc.setFontType('bold')
                 doc.setTextColor('#053c6d')
                 // doc.setMargin(100)
                 doc.text(40,doc.autoTable.previous.finalY + 60, ' Profund/IPS Backend Configuration ');

                 var cols = [{ title: 'Profund Client Code ', dataKey: 'clientCodeProfund' },{ title: 'eCollection IFSC', dataKey: 'ifscCode' },
                 { title: 'IPS Client Code ', dataKey: 'clientCodeIPS' },{ title: 'IPS Format Code ', dataKey: 'formatCode' }]
                // console.log(this.dataToDisplay,"adad")
                var tableData = [];
                tableData.push({
                'id': this.dataToDisplay.id, 'ifscCode':this.dataToDisplay.IFSCCode , 'clientCodeIPS':this.dataToDisplay.clientCodeIPS
                ,'clientCodeProfund':this.dataToDisplay.clientCodeProfund,'formatCode':this.dataToDisplay.formatCode
               
                })
 
                doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 70,
     
                 })
                }
                else{
                  doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                  doc.setFontType('bold');

                   doc.text(40,doc.autoTable.previous.finalY + 60, ' Profund/IPS Backend Configuration ');
                   doc.setFontType('bold');
                   doc.setTextColor('#053c6d');
                   // doc.setMargin(100)
                   // doc.setFontSize(9);
                   doc.text(40,doc.autoTable.previous.finalY + 80, 'Note : Subscription has been rejected hence "Profund/IPS Backend Configuration" is not available. ');
                   // doc.setFontSize(30);
                }

                 

                 
               /////////Extra//////////////
                var cols = [{ title: 'Retry Attempts On Failure / No Response', dataKey: 'retry' },
                { title: 'Action to be taken on No Response', dataKey: 'Action' }]
                // console.log(this.dataToDisplay,"adad")
                var tableData = [];
                tableData.push({
                'id': this.dataToDisplay.id, 'retry':this.dataOfProductToDisplay[0].products[0].services[0].retryAttempts
                , 'Action':this.dataOfProductToDisplay[0].products[0].services[0].actionOnNoRes
               
                })
                doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 170,
               
                })
                ///////product Details
                doc.setFontType('bold')
                doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                doc.text(40,doc.autoTable.previous.finalY + 60, ' Product Details ');
                var cols = [{ title: 'Product name', dataKey: 'prodName' },
                { title: 'Flow Name', dataKey: 'flowName' }]
                // console.log(this.dataToDisplay,"adad")
                var tableData = [];
                tableData.push({
                'id': this.dataToDisplay.id, 'prodName':this.dataToDisplay.productName
                , 'flowName':this.dataToDisplay.serviceName
               
                })
                doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 70,
                // margin : {top :80},
                // startY: 750
               
               
                })
               
                ////////profund////////
                if(this.dataToDisplay.makerApproval == false){
                  console.log("test2")
                  doc.setFontType('bold')
                  doc.setTextColor('#053c6d')
                  // doc.setMargin(100)
                  doc.text(40,doc.autoTable.previous.finalY + 60, ' Subscription Status ');
                 
                  var cols = [{ title: 'Organization name', dataKey: 'orgName' },
                  { title: 'Status', dataKey: 'status' },{title: 'Created by', dataKey: 'createdBy'},{title: 'Reason', dataKey: 'reason'}]
                  // console.log(this.dataToDisplay,"adad")
                  var tableData = [];
                  tableData.push({
                  'id': this.dataToDisplay.id, 'orgName':this.dataToDisplay.orgName
                  , 'status':this.dataToDisplay.status,'createdBy':this.dataToDisplay.createdBy,'reason':this.dataToDisplay.rejectReason
                 
                  })
                  doc.autoTable(cols, tableData,{
                  // margin : {top :60}
                  startY: doc.autoTable.previous.finalY + 70,
                  // margin : {top :80},
                  // startY: 750
                 
                 
                  })
                 
                 
                  }
                  else{
                  console.log("test3")

                  doc.setFontType('bold')
                  doc.setTextColor('#053c6d')
                  // doc.setMargin(100)
                  doc.text(40,doc.autoTable.previous.finalY + 60, ' Subscription Status ');

                  var cols = [{ title: 'Organization name', dataKey: 'orgName' },
                  { title: 'Status', dataKey: 'status' },{title: 'Created by', dataKey: 'createdBy'}]
                  // console.log(this.dataToDisplay,"adad")
                  var tableData = [];
                  tableData.push({
                  'id': this.dataToDisplay.id, 'orgName':this.dataToDisplay.orgName
                  , 'status':this.dataToDisplay.status,'createdBy':this.dataToDisplay.createdBy
                 
                  })
                  doc.autoTable(cols, tableData,{
                  // margin : {top :60}
                  startY: doc.autoTable.previous.finalY + 70,
                  // margin : {top :80},
                  // startY: 750
                 
                 
                  })
                 
                  }


                  }
    ////////End of ECollection with Remitter Validation/////////////

    ///////ECollection with Remitter Validation in Intermediary Account //////
    if(this.dataToDisplay.serviceName==="ECollection with Remitter Validation in Intermediary Account"){
      ////ORG Details////
            console.log("double")
          var cols = [{ title: 'Organization Name', dataKey: 'organization' },
          { title: 'Current Account Number', dataKey: 'currentAccNumber' }, { title: 'Intermediary Account Number', dataKey: 'interAccnumber' },
          { title: 'AM/IM Name', dataKey: 'amName' }, { title: 'AM/IM Number', dataKey: 'amNumber' },
          { title: 'AM/IM Email Id', dataKey: 'amEmail' }]
   
          var tableData = [];
   
          tableData.push({
          'id': this.dataToDisplay.id, 'organization': this.dataToDisplay.organisation, 'currentAccNumber': this.dataToDisplay.bankAccountNumber, 'interAccnumber': this.dataToDisplay.poolAccountNumber,
          'amName': this.dataToDisplay.accountManagerName, 'amNumber': this.dataToDisplay.mobileNumberAM, 'amEmail': this.dataToDisplay.emailIdAM
          })
          doc.autoTable(cols, tableData,{
          margin : {top :120}
         
          })

          doc.setFontType('bold')
          doc.setTextColor('#053c6d')
          // doc.setMargin(100)
          doc.text(40, 100, 'Organization Details');
     
      ////Business Contact Details
      var cols = [{ title: 'First Name', dataKey: 'fName' },
      { title: 'Last Name', dataKey: 'lName' }, { title: 'Mobile Number', dataKey: 'mobileNumber' },
      { title: 'Email Id', dataKey: 'emailId' }]
      // console.log(this.dataToDisplay,"adad")
      var tableData = [];
      tableData.push({
      'id': this.dataToDisplay.id, 'fName':this.dataToDisplay.firstNameBusinessSpoc
      , 'lName':this.dataToDisplay.lastNameBusinessSpoc ,
      'mobileNumber':this.dataToDisplay.mobileNumberBusinessSpoc
      ,'emailId':this.dataToDisplay.emailIdBusinessSpoc
     
      })
      doc.autoTable(cols, tableData,{
      // margin : {top :260}
      startY: doc.autoTable.previous.finalY + 60,
     
      })
      doc.setFontType('bold')
      doc.setTextColor('#053c6d')
      // doc.setMargin(100)
      doc.text(40, 200, 'Business Contact Details');

          /////////////IT Contact Details////////////////////
          var cols = [{ title: 'First Name', dataKey: 'fName' },
          { title: 'Last Name', dataKey: 'lName' }, { title: 'Mobile Number', dataKey: 'mobileNumber' },
          { title: 'Email Id', dataKey: 'emailId' }]
          // console.log(this.dataToDisplay,"adad")
          var tableData = [];
          tableData.push({
          'id': this.dataToDisplay.id, 'fName':this.dataToDisplay.firstNameITSpoc
          , 'lName':this.dataToDisplay.lastNameITSpoc ,
          'mobileNumber':this.dataToDisplay.mobileNumberITSpoc
          ,'emailId':this.dataToDisplay.emailIdITSpoc
         
          })
          doc.autoTable(cols, tableData,{
          // margin : {top :60}
          startY: doc.autoTable.previous.finalY + 60,
         
          })
         
          doc.setFontType('bold')
          doc.setTextColor('#053c6d')
          // doc.setMargin(100)
          doc.text(40, 300, 'IT Contact Details');

              ///////serviceDetails//////////////////

              var cols = [{ title: 'Type of Web Service', dataKey: 'webService' },
              { title: 'Communication http method Type', dataKey: 'httpMethod' }, { title: 'Checksum', dataKey: 'checksum' },
              { title: 'Encryption Method', dataKey: 'encryptionMethod' }]
              // console.log(this.dataToDisplay,"adad")
              var tableData = [];
              tableData.push({
              'id': this.dataToDisplay.id, 'webService': this.dataOfProductToDisplay[0].products[0]
              .services[0].webServiceType
              , 'checksum': this.dataOfProductToDisplay[0].products[0]
              .services[0].checksumControl,
              'encryptionMethod': this.dataOfProductToDisplay[0].products[0]
              .services[0].encryptionMethod,
              'httpMethod': this.dataOfProductToDisplay[0].products[0]
              .services[0].communicationProtocol
              })

              doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 60,
               
                })
                doc.setFontType('bold')
                doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                doc.text(40, 400, 'Service Details');

                    ///////////////////UAT & PROD details////////////
                    var cols = [{ title: 'UAT IP', dataKey: 'uIP' },
                    { title: 'UAT Port', dataKey: 'uPort' }, { title: 'UAT File', dataKey: 'uFile' },{ title: 'Communication Protocol for UAT', dataKey: 'uProtocol' },
                    { title: 'Prod IP', dataKey: 'pIP' },{ title: 'Prod Port', dataKey: 'pPort' },{ title: 'Prod File', dataKey: 'pFile' },{ title: 'Communication Protocol for Prod', dataKey: 'prodProtocol' }]
                    // console.log(this.dataToDisplay,"adad")
                    var tableData = [];
                    tableData.push({
                    'id': this.dataToDisplay.id, 'uIP':this.dataOfProductToDisplay[0].products[0].services[0].uatIp
                    , 'uPort':this.dataOfProductToDisplay[0].products[0].services[0]
                    .uatPort ,
                    'uFile':this.dataOfProductToDisplay[0].products[0].services[0]
                    .uatFile1 ,
                    'uProtocol':this.dataOfProductToDisplay[0].products[0].services[0]
                    .communicationProtocolUAT
                    ,'pIP':this.dataOfProductToDisplay[0].products[0].services[0]
                    .prodIp,'pPort':this.dataOfProductToDisplay[0].products[0].services[0]
                    .prodPort,'pFile':this.dataOfProductToDisplay[0].products[0].services[0].
                    prodFile1,
                    'prodProtocol':this.dataOfProductToDisplay[0].products[0].services[0]
                    .communicationProtocolProd
                    })
                    doc.autoTable(cols, tableData,{
                    margin : {top :80},
                    startY: 750,columnStyles: {
                   
                      0: {columnWidth: 60},
                      2: {columnWidth: 180},
                      6: {columnWidth: 180},
                      3: {columnWidth: 85},
                      7: {columnWidth: 85}
                   
                   
                    }
                   
                    })
                    doc.setFontType('bold')
                    doc.setTextColor('#053c6d')
                    // doc.setMargin(100)
                    doc.text(40,50, 'UAT & Prod Details');
              ///////////UAT swagger////////
              doc.setFontType('bold')
              doc.setTextColor('#053c6d')
              // doc.setMargin(100)
              doc.text(40,doc.autoTable.previous.finalY + 60, 'Uploaded Swagger for your API (UAT)');

                  var cols = [{ title: 'Service Timeout ', dataKey: 'serTimeout' },
                  { title: 'Service URL ', dataKey: 'serURL' }, { title: 'Service Name ', dataKey: 'serName' },
                  { title: 'Validation request/response ', dataKey: 'validationFile' }]
                  // console.log(this.dataToDisplay,"adad")
                  var tableData = [];
                  tableData.push({
                  'serURL': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLUAT,
                  'serName':this.dataOfProductToDisplay[0].products[0].services[0]
                  .serviceNameInputUAT ,
                  'validationFile':this.dataOfProductToDisplay[0].products[0].services[0]
                  .uatFile1
                  ,'serTimeout':this.dataOfProductToDisplay[0].products[0].services[0]
                  .serviceTimeOutUAT
                  })
                  doc.autoTable(cols, tableData,{
                  // margin : {top :60}
                  startY: doc.autoTable.previous.finalY + 70,
                 
                  })
                 

                /////////////PROD Swagger ////////////
                doc.setFontType('bold')
                doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                doc.text(40,doc.autoTable.previous.finalY + 60, 'Uploaded Swagger for your API (Prod)');
               
                var cols = [{ title: 'Service Timeout ', dataKey: 'serTimeout' },
                { title: 'Service URL ', dataKey: 'serURL' }, { title: 'Service Name ', dataKey: 'serName1' },
                { title: 'Validation request/response ', dataKey: 'validationFile' }]
                // console.log(this.dataToDisplay,"adad")
                var tableData = [];
                tableData.push({
                'serURL': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLProd,
                'serName':this.dataOfProductToDisplay[0].products[0].services[0]
                .serviceNameInputProd ,
                'validationFile':this.dataOfProductToDisplay[0].products[0].services[0]
                .prodFile1
                ,'serTimeout':this.dataOfProductToDisplay[0].products[0].services[0]
                .serviceTimeOutProd
                })
                doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 70,
               
                })
               

                    ////////////Profund////////
                    if(this.dataToDisplay.makerApproval == true){

                      doc.setFontType('bold')
                doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                doc.text(40,doc.autoTable.previous.finalY + 60, ' Profund/IPS Backend Configuration ');

                var cols = [{ title: 'Profund Client Code ', dataKey: 'clientCodeProfund' },{ title: 'eCollection IFSC', dataKey: 'ifscCode' },
                { title: 'IPS Client Code ', dataKey: 'clientCodeIPS' },{ title: 'IPS Format Code ', dataKey: 'formatCode' }]
                // console.log(this.dataToDisplay,"adad")
                var tableData = [];
                tableData.push({
                'id': this.dataToDisplay.id, 'ifscCode':this.dataToDisplay.IFSCCode , 'clientCodeIPS':this.dataToDisplay.clientCodeIPS
                ,'clientCodeProfund':this.dataToDisplay.clientCodeProfund,'formatCode':this.dataToDisplay.formatCode
               
                })
 
                doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 70,
     
                 })
                 
                }
                else{
                  doc.setFontType('bold');
                  doc.setTextColor('#053c6d');
                  // doc.setMargin(100)
                  // doc.setFontSize(9);
                  doc.text(40,450, 'Note : Subscription has been rejected hence "Profund/IPS Backend Configuration" is not available. ');
                  doc.setFontType('bold');
                  // doc.setFontSize(30);

                  doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                   doc.text(40,420, ' Profund/IPS Backend Configuration ');
                }
              /////////Extra//////////////
              var cols = [{ title: 'Retry Attempts On Failure / No Response', dataKey: 'retry' },
              { title: 'Action to be taken on No Response', dataKey: 'Action' }]
              // console.log(this.dataToDisplay,"adad")
              var tableData = [];
              tableData.push({
              'id': this.dataToDisplay.id, 'retry':this.dataOfProductToDisplay[0].products[0].services[0].retryAttempts
              , 'Action':this.dataOfProductToDisplay[0].products[0].services[0].actionOnNoRes
             
              })
              doc.autoTable(cols, tableData,{
              // margin : {top :60}
              startY: doc.autoTable.previous.finalY + 180,
             
              })

              ///////product Details

              doc.setFontType('bold')
              doc.setTextColor('#053c6d')
              // doc.setMargin(100)
              doc.text(40,doc.autoTable.previous.finalY + 60, ' Product Details ');

              var cols = [{ title: 'Product name', dataKey: 'prodName' },
              { title: 'Flow Name', dataKey: 'flowName' }]
              // console.log(this.dataToDisplay,"adad")
              var tableData = [];
              tableData.push({
              'id': this.dataToDisplay.id, 'prodName':this.dataToDisplay.productName
              , 'flowName':this.dataToDisplay.serviceName
             
              })
              doc.autoTable(cols, tableData,{
              // margin : {top :60}
              startY: doc.autoTable.previous.finalY + 70,
              // margin : {top :80},
              // startY: 750
             
             
              })
             
   
                  ////////Subscription Status

              if(this.dataToDisplay.makerApproval == false){
                console.log("test2")
                doc.setFontType('bold')
                doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                doc.text(40,doc.autoTable.previous.finalY + 60, ' Subscription Status ');
               
                var cols = [{ title: 'Organization name', dataKey: 'orgName' },
                { title: 'Status', dataKey: 'status' },{title: 'Created by', dataKey: 'createdBy'},{title: 'Reason', dataKey: 'reason'}]
                // console.log(this.dataToDisplay,"adad")
                var tableData = [];
                tableData.push({
                'id': this.dataToDisplay.id, 'orgName':this.dataToDisplay.orgName
                , 'status':this.dataToDisplay.status,'createdBy':this.dataToDisplay.createdBy,'reason':this.dataToDisplay.rejectReason
               
                })
                doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 70,
                // margin : {top :80},
                // startY: 750
               
               
                })
               
               
                }
                else{
                console.log("test3")

                doc.setFontType('bold')
                doc.setTextColor('#053c6d')
                // doc.setMargin(100)
                doc.text(40,doc.autoTable.previous.finalY + 60, ' Subscription Status ');
               

                var cols = [{ title: 'Organization name', dataKey: 'orgName' },
                { title: 'Status', dataKey: 'status' },{title: 'Created by', dataKey: 'createdBy'}]
                // console.log(this.dataToDisplay,"adad")
                var tableData = [];
                tableData.push({
                'id': this.dataToDisplay.id, 'orgName':this.dataToDisplay.orgName
                , 'status':this.dataToDisplay.status,'createdBy':this.dataToDisplay.createdBy
               
                })
                doc.autoTable(cols, tableData,{
                // margin : {top :60}
                startY: doc.autoTable.previous.finalY + 70,
                // margin : {top :80},
                // startY: 750
               
               
                })
                 
              }
    }
    ///////End of ECollection with Remitter Validation in Intermediary Account //////

    /////////ECollection with Two Level Validation at Bank and Client’s End/////
    if(this.dataToDisplay.serviceName==="ECollection with Two Level Validation at Bank and Client’s End"){

      /////org details
      var cols = [{ title: 'Organization Name', dataKey: 'organization' },
      { title: 'Current Account Number', dataKey: 'currentAccNumber' }, { title: 'Intermediary Account Number', dataKey: 'interAccnumber' },
      { title: 'AM/IM Name', dataKey: 'amName' }, { title: 'AM/IM Number', dataKey: 'amNumber' },
      { title: 'AM/IM Email Id', dataKey: 'amEmail' }]
     
      var tableData = [];
     
      tableData.push({
      'id': this.dataToDisplay.id, 'organization': this.dataToDisplay.organisation, 'currentAccNumber': this.dataToDisplay.bankAccountNumber, 'interAccnumber': this.dataToDisplay.poolAccountNumber,
      'amName': this.dataToDisplay.accountManagerName, 'amNumber': this.dataToDisplay.mobileNumberAM, 'amEmail': this.dataToDisplay.emailIdAM
      })
      doc.autoTable(cols, tableData,{
      margin : {top :120}
     
      })
      doc.setFontType('bold')
      doc.setTextColor('#053c6d')
      // doc.setMargin(100)
     doc.text(40, 100, 'Organization Details');

     ///////////////////Business Contact Details///////////////
   
    var cols = [{ title: 'First Name', dataKey: 'fName' },
    { title: 'Last Name', dataKey: 'lName' }, { title: 'Mobile Number', dataKey: 'mobileNumber' },
    { title: 'Email Id', dataKey: 'emailId' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'fName':this.dataToDisplay.firstNameBusinessSpoc
    , 'lName':this.dataToDisplay.lastNameBusinessSpoc ,
    'mobileNumber':this.dataToDisplay.mobileNumberBusinessSpoc
    ,'emailId':this.dataToDisplay.emailIdBusinessSpoc
   
    })
    doc.autoTable(cols, tableData,{
    // margin : {top :260}
    startY: doc.autoTable.previous.finalY + 60,
   
    })
    doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40, 200, 'Business Contact Details');
   
   
    /////////////IT Contact Details////////////////////
    var cols = [{ title: 'First Name', dataKey: 'fName' },
    { title: 'Last Name', dataKey: 'lName' }, { title: 'Mobile Number', dataKey: 'mobileNumber' },
    { title: 'Email Id', dataKey: 'emailId' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'fName':this.dataToDisplay.firstNameITSpoc
    , 'lName':this.dataToDisplay.lastNameITSpoc ,
    'mobileNumber':this.dataToDisplay.mobileNumberITSpoc
    ,'emailId':this.dataToDisplay.emailIdITSpoc
   
    })
    doc.autoTable(cols, tableData,{
    // margin : {top :60}
    startY: doc.autoTable.previous.finalY + 60,
   
    })
   
    doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40, 300, 'IT Contact Details');
   
    ///////serviceDetails//////////////////
    var cols = [{ title: 'Type of Web Service', dataKey: 'webService' },
    { title: 'Communication http method Type', dataKey: 'httpMethod' }, { title: 'Checksum', dataKey: 'checksum' },
    { title: 'Encryption Method', dataKey: 'encryptionMethod' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'webService': this.dataOfProductToDisplay[0].products[0]
    .services[0].webServiceType
    , 'checksum': this.dataOfProductToDisplay[0].products[0]
    .services[0].checksumControl,
    'encryptionMethod': this.dataOfProductToDisplay[0].products[0]
    .services[0].encryptionMethod,
    'httpMethod': this.dataOfProductToDisplay[0].products[0]
    .services[0].isure_communication_protocol
    })
   
   
    // tableData.push({
    // 'id': this.dataToDisplay.id, 'organization': this.dataToDisplay.organization, 'currentAccNumber': this.dataToDisplay.bankAccountNumber, 'interAccnumber': this.dataToDisplay.poolAccountNumber,
    // 'amName': this.dataToDisplay.accountManagerName, 'amNumber': this.dataToDisplay.mobileNumberAM, 'amEmail': this.dataToDisplay.emailIdAM
    // })
   
    // console.log("tableData = ", tableData)
    // doc.setFontType('bold');
    // doc.setTextColor('red');
   
    // doc.text(20, 20, 'Organization Details');
    // var header = function(data) {
    // doc.setFontSize(18);
    // doc.setTextColor('#053c6d');
    // // doc.setFontType('bold');
    // doc.setFontType('Arial, Helvetica, sans-serif,bold');
   
    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    // doc.text("Organization Details", data.settings.margin.left, 80);
    // };
    // var options = {
    // didDrawPage: header,
    // margin: {
    // top: 80
    // },
    // startY: doc.autoTableEndPosY() + 90
    // };
    doc.autoTable(cols, tableData,{
    // margin : {top :60}
    startY: doc.autoTable.previous.finalY + 60,
   
    })
    doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40, 400, 'Service Details');

    ///////////////////UAT & PROD details////////////
    var cols = [{ title: 'UAT IP', dataKey: 'uIP' },
    { title: 'UAT Port', dataKey: 'uPort' }, { title: 'UAT File', dataKey: 'uFile' },{ title: 'Communication Protocol for UAT', dataKey: 'uProtocol' },
    { title: 'Prod IP', dataKey: 'pIP' },{ title: 'Prod Port', dataKey: 'pPort' },{ title: 'Prod File', dataKey: 'pFile' },{ title: 'Communication Protocol for Prod', dataKey: 'prodProtocol' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'uIP':this.dataOfProductToDisplay[0].products[0].services[0].uatIp
    , 'uPort':this.dataOfProductToDisplay[0].products[0].services[0]
    .uatPort ,
    'uFile':this.dataOfProductToDisplay[0].products[0].services[0]
    .uatFile1 ,
    'uProtocol':this.dataOfProductToDisplay[0].products[0].services[0]
    .communicationProtocolUAT
    ,'pIP':this.dataOfProductToDisplay[0].products[0].services[0]
    .prodIp,'pPort':this.dataOfProductToDisplay[0].products[0].services[0]
    .prodPort,'pFile':this.dataOfProductToDisplay[0].products[0].services[0].
    prodFile1,
    'prodProtocol':this.dataOfProductToDisplay[0].products[0].services[0]
    .communicationProtocolProd
    })
    doc.autoTable(cols, tableData,{
    margin : {top :80},
    startY: 750,columnStyles: {
   
    0: {columnWidth: 60},
    2: {columnWidth: 240}
   
   
    }
   
    })
    doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40,50, 'UAT & Prod Details');

        /////////////UAT Swagger ////////////

        doc.setFontType('bold')
        doc.setTextColor('#053c6d')
        // doc.setMargin(100)
        doc.text(40,doc.autoTable.previous.finalY +60, 'Uploaded Swagger for your API (UAT)');

    var cols = [{ title: 'Service Timeout 1', dataKey: 'serTimeout1' },
    { title: 'Service URL 1', dataKey: 'serURL1' }, { title: 'Service Name 1', dataKey: 'serName1' },
    { title: 'Validation request/response 1', dataKey: 'validationFile1' },{ title: 'Service Timeout 2', dataKey: 'serTimeout2' },
    { title: 'Service URL 2', dataKey: 'serURL2' }, { title: 'Service Name 2', dataKey: 'serName2' },
    { title: 'Validation request/response 2', dataKey: 'validationFile2' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'serURL1': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLUAT,
    'serName1':this.dataOfProductToDisplay[0].products[0].services[0]
    .serviceNameInputUAT ,
    'validationFile1':this.dataOfProductToDisplay[0].products[0].services[0]
    .uatFile1
    ,'serTimeout1':this.dataOfProductToDisplay[0].products[0].services[0]
    .serviceTimeOutUAT,'serURL2': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLUAT2
    , 'serName2':this.dataOfProductToDisplay[0].products[0].services[0]
    .serviceNameInputUAT2 ,
    'validationFile2':this.dataOfProductToDisplay[0].products[0].services[0]
    .uatFile2
    ,'serTimeout2':this.dataOfProductToDisplay[0].products[0].services[0]
    .serviceTimeOutUAT2
    })
    doc.autoTable(cols, tableData,{
    // margin : {top :60}
    startY: doc.autoTable.previous.finalY +70,
   
   
    })
   
        /////////////PROD Swagger ////////////
        doc.setFontType('bold')
        doc.setTextColor('#053c6d')
    // doc.setMargin(100)
        doc.text(40,doc.autoTable.previous.finalY + 60, 'Uploaded Swagger for your API (Prod)');

        var cols = [{ title: 'Service Timeout 1', dataKey: 'serTimeout1' },
        { title: 'Service URL 1', dataKey: 'serURL1' }, { title: 'Service Name 1', dataKey: 'serName1' },
        { title: 'Validation request/response 1', dataKey: 'validationFile1' },{ title: 'Service Timeout 2', dataKey: 'serTimeout2' },
        { title: 'Service URL 2', dataKey: 'serURL2' }, { title: 'Service Name 2', dataKey: 'serName2' },
        { title: 'Validation request/response 2', dataKey: 'validationFile2' }]
        // console.log(this.dataToDisplay,"adad")
        var tableData = [];
        tableData.push({
        'serURL1': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLProd,
        'serName1':this.dataOfProductToDisplay[0].products[0].services[0]
        .serviceNameInputProd ,
        'validationFile1':this.dataOfProductToDisplay[0].products[0].services[0]
        .prodFile1
        ,'serTimeout1':this.dataOfProductToDisplay[0].products[0].services[0]
        .serviceTimeOutProd,'serURL2': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLProd2
        , 'serName2':this.dataOfProductToDisplay[0].products[0].services[0]
        .serviceNameInputProd2 ,
        'validationFile2':this.dataOfProductToDisplay[0].products[0].services[0]
        .prodFile2
        ,'serTimeout2':this.dataOfProductToDisplay[0].products[0].services[0]
        .serviceTimeOutProd2
        })
        doc.autoTable(cols, tableData,{
        // margin : {top :60}
        startY: doc.autoTable.previous.finalY + 70,   
        })
       

         ////////////Profund////////
         if(this.dataToDisplay.makerApproval == true){

          doc.setFontType('bold')
          doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40,doc.autoTable.previous.finalY + 60, ' Profund/IPS Backend Configuration ');

    var cols = [{ title: 'Profund Client Code ', dataKey: 'clientCodeProfund' },{ title: 'eCollection IFSC', dataKey: 'ifscCode' },
    { title: 'IPS Client Code ', dataKey: 'clientCodeIPS' },{ title: 'IPS Format Code ', dataKey: 'formatCode' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'ifscCode':this.dataToDisplay.IFSCCode , 'clientCodeIPS':this.dataToDisplay.clientCodeIPS
    ,'clientCodeProfund':this.dataToDisplay.clientCodeProfund,'formatCode':this.dataToDisplay.formatCode
   
    })

    doc.autoTable(cols, tableData,{
    // margin : {top :60}
    startY: doc.autoTable.previous.finalY + 70,

     })
     
    }
    else{
      doc.setTextColor('#053c6d')
    // doc.setMargin(100)
       doc.text(40,doc.autoTable.previous.finalY + 60, ' Profund/IPS Backend Configuration ');
      doc.setFontType('bold');
      doc.setTextColor('#053c6d');
      // doc.setMargin(100)
      // doc.setFontSize(9);
      doc.text(40,doc.autoTable.previous.finalY + 80, 'Note : Subscription has been rejected hence "Profund/IPS Backend Configuration" is not available. ');
      doc.setFontType('bold');
      // doc.setFontSize(30);

     
    }
     /////////Extra//////////////
     var cols = [{ title: 'Retry Attempts On Failure / No Response', dataKey: 'retry' },
     { title: 'Action to be taken on No Response', dataKey: 'Action' }]
     // console.log(this.dataToDisplay,"adad")
     var tableData = [];
     tableData.push({
     'id': this.dataToDisplay.id, 'retry':this.dataOfProductToDisplay[0].products[0].services[0].retryAttempts
     , 'Action':this.dataOfProductToDisplay[0].products[0].services[0].actionOnNoRes
     
     })
     doc.autoTable(cols, tableData,{
     // margin : {top :60}
     startY: doc.autoTable.previous.finalY + 160,
     
     })

      ///////product Details

      doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40,doc.autoTable.previous.finalY + 60, ' Product Details ');

    var cols = [{ title: 'Product name', dataKey: 'prodName' },
    { title: 'Flow Name', dataKey: 'flowName' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'prodName':this.dataToDisplay.productName
    , 'flowName':this.dataToDisplay.serviceName
   
    })
    doc.autoTable(cols, tableData,{
    // margin : {top :60}
    startY: doc.autoTable.previous.finalY + 70,
    // margin : {top :80},
    // startY: 750
   
   
    })
   
   
        ////////Subscription Status
        if(this.dataToDisplay.makerApproval == false){


          doc.setFontType('bold')
          doc.setTextColor('#053c6d')
          // doc.setMargin(100)
          doc.text(40,doc.autoTable.previous.finalY + 60, ' Subscription Status ');

          console.log("test2")
         
          var cols = [{ title: 'Organization name', dataKey: 'orgName' },
          { title: 'Status', dataKey: 'status' },{title: 'Created by', dataKey: 'createdBy'},{title: 'Reason', dataKey: 'reason'}]
          // console.log(this.dataToDisplay,"adad")
          var tableData = [];
          tableData.push({
          'id': this.dataToDisplay.id, 'orgName':this.dataToDisplay.orgName
          , 'status':this.dataToDisplay.status,'createdBy':this.dataToDisplay.createdBy,'reason':this.dataToDisplay.rejectReason
         
          })
          doc.autoTable(cols, tableData,{
          // margin : {top :60}
          startY: doc.autoTable.previous.finalY + 70,
          // margin : {top :80},
          // startY: 750
         
         
          })
         
         
          }
          else{
          console.log("test3")

          doc.setFontType('bold')
          doc.setTextColor('#053c6d')
          // doc.setMargin(100)
          doc.text(40,doc.autoTable.previous.finalY + 60, ' Subscription Status ');


          var cols = [{ title: 'Organization name', dataKey: 'orgName' },
          { title: 'Status', dataKey: 'status' },{title: 'Created by', dataKey: 'createdBy'}]
          // console.log(this.dataToDisplay,"adad")
          var tableData = [];
          tableData.push({
          'id': this.dataToDisplay.id, 'orgName':this.dataToDisplay.orgName
          , 'status':this.dataToDisplay.status,'createdBy':this.dataToDisplay.createdBy
         
          })
          doc.autoTable(cols, tableData,{
          // margin : {top :60}
          startY: doc.autoTable.previous.finalY + 70,
          // margin : {top :80},
          // startY: 750
         
         
          })
         
          }


    }
    /////////End of ECollection with Two Level Validation at Bank and Client’s End/////
    //// iSurePay-Real Time Cheque and Cash Collection Validation /////
    if(this.dataToDisplay.serviceName==="iSurePay-Real Time Cheque and Cash Collection Validation" || this.dataToDisplay.serviceName==="iSurePay-Real Time Cheque and Cash Collection Two Level Validation at Client and Bank’s End" ){

      ////ORG Details////
      var cols = [{ title: 'Organization Name', dataKey: 'organization' },
      { title: 'Current Account Number', dataKey: 'currentAccNumber' },
      { title: 'AM/IM Name', dataKey: 'amName' }, { title: 'AM/IM Number', dataKey: 'amNumber' },
      { title: 'AM/IM Email Id', dataKey: 'amEmail' }]
     
      var tableData = [];
     
      tableData.push({
      'id': this.dataToDisplay.id, 'organization': this.dataToDisplay.organisation, 'currentAccNumber': this.dataToDisplay.bankAccountNumber, 'interAccnumber': this.dataToDisplay.poolAccountNumber,
      'amName': this.dataToDisplay.accountManagerName, 'amNumber': this.dataToDisplay.mobileNumberAM, 'amEmail': this.dataToDisplay.emailIdAM
      })
      doc.autoTable(cols, tableData,{
      margin : {top :120}
     
      })

      doc.setFontType('bold')
      doc.setTextColor('#053c6d')
      // doc.setMargin(100)
      doc.text(40, 100, 'Organization Details');

     ///////////////////Business Contact Details///////////////
   
    var cols = [{ title: 'First Name', dataKey: 'fName' },
    { title: 'Last Name', dataKey: 'lName' }, { title: 'Mobile Number', dataKey: 'mobileNumber' },
    { title: 'Email Id', dataKey: 'emailId' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'fName':this.dataToDisplay.firstNameBusinessSpoc
    , 'lName':this.dataToDisplay.lastNameBusinessSpoc ,
    'mobileNumber':this.dataToDisplay.mobileNumberBusinessSpoc
    ,'emailId':this.dataToDisplay.emailIdBusinessSpoc
   
    })
    doc.autoTable(cols, tableData,{
    // margin : {top :260}
    startY: doc.autoTable.previous.finalY + 60,
   
    })
    doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40, 200, 'Business Contact Details');
   
   
    /////////////IT Contact Details////////////////////
    var cols = [{ title: 'First Name', dataKey: 'fName' },
    { title: 'Last Name', dataKey: 'lName' }, { title: 'Mobile Number', dataKey: 'mobileNumber' },
    { title: 'Email Id', dataKey: 'emailId' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'fName':this.dataToDisplay.firstNameITSpoc
    , 'lName':this.dataToDisplay.lastNameITSpoc ,
    'mobileNumber':this.dataToDisplay.mobileNumberITSpoc
    ,'emailId':this.dataToDisplay.emailIdITSpoc
   
    })
    doc.autoTable(cols, tableData,{
    // margin : {top :60}
    startY: doc.autoTable.previous.finalY + 60,
   
    })
   
    doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40, 300, 'IT Contact Details');
   
    ///////serviceDetails//////////////////
    var cols = [{ title: 'Type of Web Service', dataKey: 'webService' },
    { title: 'Communication http method Type', dataKey: 'httpMethod' }, { title: 'Checksum', dataKey: 'checksum' },
    { title: 'Encryption Method', dataKey: 'encryptionMethod' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'webService': this.dataOfProductToDisplay[0].products[0]
    .services[0].webServiceType
    , 'checksum': this.dataOfProductToDisplay[0].products[0]
    .services[0].checksumControl,
    'encryptionMethod': this.dataOfProductToDisplay[0].products[0]
    .services[0].encryptionMethod,
    'httpMethod': this.dataOfProductToDisplay[0].products[0]
    .services[0].isure_communication_protocol
    })
   
   
    // tableData.push({
    // 'id': this.dataToDisplay.id, 'organization': this.dataToDisplay.organization, 'currentAccNumber': this.dataToDisplay.bankAccountNumber, 'interAccnumber': this.dataToDisplay.poolAccountNumber,
    // 'amName': this.dataToDisplay.accountManagerName, 'amNumber': this.dataToDisplay.mobileNumberAM, 'amEmail': this.dataToDisplay.emailIdAM
    // })
   
    // console.log("tableData = ", tableData)
    // doc.setFontType('bold');
    // doc.setTextColor('red');
   
    // doc.text(20, 20, 'Organization Details');
    // var header = function(data) {
    // doc.setFontSize(18);
    // doc.setTextColor('#053c6d');
    // // doc.setFontType('bold');
    // doc.setFontType('Arial, Helvetica, sans-serif,bold');
   
    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    // doc.text("Organization Details", data.settings.margin.left, 80);
    // };
    // var options = {
    // didDrawPage: header,
    // margin: {
    // top: 80
    // },
    // startY: doc.autoTableEndPosY() + 90
    // };
    doc.autoTable(cols, tableData,{
    // margin : {top :60}
    startY: doc.autoTable.previous.finalY + 60,
   
    })
    doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40, 400, 'Service Details');

    ///////////////////UAT & PROD details////////////
    var cols = [{ title: 'UAT IP', dataKey: 'uIP' },
    { title: 'UAT Port', dataKey: 'uPort' }, { title: 'UAT File', dataKey: 'uFile' },{ title: 'Communication Protocol for UAT', dataKey: 'uProtocol' },
    { title: 'Prod IP', dataKey: 'pIP' },{ title: 'Prod Port', dataKey: 'pPort' },{ title: 'Prod File', dataKey: 'pFile' },{ title: 'Communication Protocol for Prod', dataKey: 'prodProtocol' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'uIP':this.dataOfProductToDisplay[0].products[0].services[0].uatIp
    , 'uPort':this.dataOfProductToDisplay[0].products[0].services[0]
    .uatPort ,
    'uFile':this.dataOfProductToDisplay[0].products[0].services[0]
    .uatFile1 ,
    'uProtocol':this.dataOfProductToDisplay[0].products[0].services[0]
    .communicationProtocolUAT
    ,'pIP':this.dataOfProductToDisplay[0].products[0].services[0]
    .prodIp,'pPort':this.dataOfProductToDisplay[0].products[0].services[0]
    .prodPort,'pFile':this.dataOfProductToDisplay[0].products[0].services[0].
    prodFile1,
    'prodProtocol':this.dataOfProductToDisplay[0].products[0].services[0]
    .communicationProtocolProd
    })
    doc.autoTable(cols, tableData,{
    margin : {top :80},
    startY: 750,columnStyles: {
   
    0: {columnWidth: 40},
    2: {columnWidth: 240}

   
   
    }
   
    })
    doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40,50, 'UAT & Prod Details');

        /////////////UAT Swagger ////////////

        doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40,doc.autoTable.previous.finalY +60, 'Uploaded Swagger for your API (UAT)');

    var cols = [{ title: 'Service Timeout 1', dataKey: 'serTimeout1' },
    { title: 'Service URL 1', dataKey: 'serURL1' }, { title: 'Service Name 1', dataKey: 'serName1' },
    { title: 'Validation request/response 1', dataKey: 'validationFile1' },{ title: 'Service Timeout 2', dataKey: 'serTimeout2' },
    { title: 'Service URL 2', dataKey: 'serURL2' }, { title: 'Service Name 2', dataKey: 'serName2' },
    { title: 'Validation request/response 2', dataKey: 'validationFile2' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'serURL1': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLUAT,
    'serName1':this.dataOfProductToDisplay[0].products[0].services[0]
    .serviceNameInputUAT ,
    'validationFile1':this.dataOfProductToDisplay[0].products[0].services[0]
    .uatFile1
    ,'serTimeout1':this.dataOfProductToDisplay[0].products[0].services[0]
    .serviceTimeOutUAT,'serURL2': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLUAT2
    , 'serName2':this.dataOfProductToDisplay[0].products[0].services[0]
    .serviceNameInputUAT2 ,
    'validationFile2':this.dataOfProductToDisplay[0].products[0].services[0]
    .uatFile2
    ,'serTimeout2':this.dataOfProductToDisplay[0].products[0].services[0]
    .serviceTimeOutUAT2
    })
    doc.autoTable(cols, tableData,{
    // margin : {top :60}
    startY: doc.autoTable.previous.finalY +70,
   
   
    })
   
        /////////////PROD Swagger ////////////
        doc.setFontType('bold')
        doc.setTextColor('#053c6d')
    // doc.setMargin(100)
        doc.text(40,doc.autoTable.previous.finalY + 60, 'Uploaded Swagger for your API (Prod)');
        var cols = [{ title: 'Service Timeout 1', dataKey: 'serTimeout1' },
        { title: 'Service URL 1', dataKey: 'serURL1' }, { title: 'Service Name 1', dataKey: 'serName1' },
        { title: 'Validation request/response 1', dataKey: 'validationFile1' },{ title: 'Service Timeout 2', dataKey: 'serTimeout2' },
        { title: 'Service URL 2', dataKey: 'serURL2' }, { title: 'Service Name 2', dataKey: 'serName2' },
        { title: 'Validation request/response 2', dataKey: 'validationFile2' }]
        // console.log(this.dataToDisplay,"adad")
        var tableData = [];
        tableData.push({
        'serURL1': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLProd,
        'serName1':this.dataOfProductToDisplay[0].products[0].services[0]
        .serviceNameInputProd ,
        'validationFile1':this.dataOfProductToDisplay[0].products[0].services[0]
        .prodFile1
        ,'serTimeout1':this.dataOfProductToDisplay[0].products[0].services[0]
        .serviceTimeOutProd,'serURL2': this.dataOfProductToDisplay[0].products[0].services[0].serviceURLProd2
        , 'serName2':this.dataOfProductToDisplay[0].products[0].services[0]
        .serviceNameInputProd2 ,
        'validationFile2':this.dataOfProductToDisplay[0].products[0].services[0]
        .prodFile2
        ,'serTimeout2':this.dataOfProductToDisplay[0].products[0].services[0]
        .serviceTimeOutProd2
        })
        doc.autoTable(cols, tableData,{
        // margin : {top :60}
        startY: doc.autoTable.previous.finalY + 70,
       
        })
       

         ////////////Profund////////
         if(this.dataToDisplay.makerApproval == true){

          doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40,doc.autoTable.previous.finalY + 60, ' Profund/IPS Backend Configuration ');

          var cols = [{ title: 'iCore Client Code', dataKey: 'icoreCode' },
    { title: 'Collection Code ', dataKey: 'collectionCode' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'icoreCode':this.dataToDisplay.iCoreClientCode , 'collectionCode':this.dataToDisplay.collectionCode
    ,'clientCodeProfund':this.dataToDisplay.clientCodeProfund,'formatCode':this.dataToDisplay.formatCode
   
    })

    doc.autoTable(cols, tableData,{
    // margin : {top :60}
    startY: doc.autoTable.previous.finalY + 70,

     })
     
    }
    else{
      doc.setTextColor('#053c6d')
      // doc.setMargin(100)
         doc.text(40,doc.autoTable.previous.finalY + 70, ' Profund/IPS Backend Configuration ');
      doc.setFontType('bold');
      doc.setTextColor('#053c6d');
      // doc.setMargin(100)
      // doc.setFontSize(9);
      doc.text(40,doc.autoTable.previous.finalY + 90, 'Note : Subscription has been rejected hence "Profund/IPS Backend Configuration" is not available. ');
      doc.setFontType('bold');
      // doc.setFontSize(30);

     
    }
     /////////Extra//////////////
     var cols = [{ title: 'Retry Attempts On Failure / No Response', dataKey: 'retry' },
     { title: 'Action to be taken on No Response', dataKey: 'Action' },{ title: 'Expected transaction per day', dataKey: 'transaction' }]
     // console.log(this.dataToDisplay,"adad")
     var tableData = [];
     tableData.push({
     'id': this.dataToDisplay.id, 'retry':this.dataOfProductToDisplay[0].products[0].services[0].retryAttempts
     , 'Action':this.dataOfProductToDisplay[0].products[0].services[0].actionOnNoRes, 'transaction':this.dataOfProductToDisplay[0].products[0].services[0].txnPerday
     
     })
     doc.autoTable(cols, tableData,{
     // margin : {top :60}
     startY: doc.autoTable.previous.finalY + 160,
     
     })

      ///////product Details

      doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40,doc.autoTable.previous.finalY + 60, ' Product Details ');
    var cols = [{ title: 'Product name', dataKey: 'prodName' },
    { title: 'Flow Name', dataKey: 'flowName' }]
    // console.log(this.dataToDisplay,"adad")
    var tableData = [];
    tableData.push({
    'id': this.dataToDisplay.id, 'prodName':this.dataToDisplay.productName
    , 'flowName':this.dataToDisplay.serviceName
   
    })
    doc.autoTable(cols, tableData,{
    // margin : {top :60}
    startY: doc.autoTable.previous.finalY + 70,
    // margin : {top :80},
    // startY: 750
   
   
    })
   
   
        ////////Subscription Status
        if(this.dataToDisplay.makerApproval == false){

          doc.setFontType('bold')
          doc.setTextColor('#053c6d')
          // doc.setMargin(100)
          doc.text(40,doc.autoTable.previous.finalY + 60, ' Subscription Status ');
          console.log("test2")
         
          var cols = [{ title: 'Organization name', dataKey: 'orgName' },
          { title: 'Status', dataKey: 'status' },{title: 'Created by', dataKey: 'createdBy'},{title: 'Reason', dataKey: 'reason'}]
          // console.log(this.dataToDisplay,"adad")
          var tableData = [];
          tableData.push({
          'id': this.dataToDisplay.id, 'orgName':this.dataToDisplay.orgName
          , 'status':this.dataToDisplay.status,'createdBy':this.dataToDisplay.createdBy,'reason':this.dataToDisplay.rejectReason
         
          })
          doc.autoTable(cols, tableData,{
          // margin : {top :60}
          startY: doc.autoTable.previous.finalY + 70,
          // margin : {top :80},
          // startY: 750
         
         
          })
         
         
          }
          else{
            doc.setFontType('bold')
          doc.setTextColor('#053c6d')
          // doc.setMargin(100)
          doc.text(40,doc.autoTable.previous.finalY + 60, ' Subscription Status ');
          console.log("test3")
          var cols = [{ title: 'Organization name', dataKey: 'orgName' },
          { title: 'Status', dataKey: 'status' },{title: 'Created by', dataKey: 'createdBy'}]
          // console.log(this.dataToDisplay,"adad")
          var tableData = [];
          tableData.push({
          'id': this.dataToDisplay.id, 'orgName':this.dataToDisplay.orgName
          , 'status':this.dataToDisplay.status,'createdBy':this.dataToDisplay.createdBy
         
          })
          doc.autoTable(cols, tableData,{
          // margin : {top :60}
          startY: doc.autoTable.previous.finalY + 70,
          // margin : {top :80},
          // startY: 750
         
         
          })
         
          }


    }


    /////

    console.log("test")
    doc.save("table.pdf");
   
    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));

  }
    rejectReasonCheck(value){
      if(value ==""){
        this.displayReasonError=true;
      }
      else{
        this.displayReasonError=false;
      }
    }

}