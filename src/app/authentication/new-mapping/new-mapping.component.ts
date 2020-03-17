
		

import { Component, OnInit } from '@angular/core';
import { newMappingService } from './new-mapping.service'
import { Router } from '@angular/router';
import { config } from "config";
import { Output, EventEmitter } from '@angular/core';
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
 selector: 'app-new-mapping',
 templateUrl: './new-mapping.component.html',
 styleUrls: ['./new-mapping.component.css']
})
export class NewMappingComponent implements OnInit {
 @Output() someEvent = new EventEmitter<string>();
 regVan = /^[a-zA-Z0-9]+$/;
 source = [];
 requestData = [];
 requestDataSource = [];
 requestDataTarget = [];
 //file
 targetFileName;
 sourceFileName;
 isLoading: boolean = false;
  proBarFlag:boolean=false;
 //pagination
 p: number = 1;
 //Add Data
 // addModalData: FormGroup
 isReadOnly
 itemsForUrgency = ['Optional', 'Mandatory'];
 dataTypeValue = [];
 //Edit Data
 // editModalData: FormGroup
 editParameter;
 sourceNameEdit;
 sfieldNameEdit;
 sdataTypeEdit;
 targetNameEdit;
 tfieldNameEdit;
 tdataTypeEdit;
 urgencyNameEdit;
 descriptionNameEdit;
 targetMethod;
 sourceMethod;
 //Reset
 resetButtonClick;
 resetButtonId;
 resetId

 //Target Data
 targetProjectId
 fileDataByProjectId = [];
 targetPath
 fields = [];
 levelFieldKey = [];
 levelFieldKeyNested = [];
 extractedData = {};
 combinedDataAfterExtraction = [];
 splitData = [];
 sourceFlowId;
 fileDataByFlowId;
 sourcePath;
 sourceFields
 extractedDataSource
 combinedDataAfterExtractionSource = [];
 splitDataSource
 demoArray = [];
 onClickData;
 targetName;
 fieldsSource;
 filedsTarget;
 dataForEsql = [];
 valueForEsqlSource;
 valueForEsqlTarget;
 jsonStructure = [];
 dataWithNoDirectRow = [];

 //Response

 resetButtonClickResponse
 resetButtonIdResponse
 targetNameResponse
 onClickDataResponse
 resetIdResp
 responseDataForResponse = [];
 editParameterResp
 sourceNameEditResp
 sfieldNameEditResp
 sdataTypeEditResp
 targetNameEditResp
 tfieldNameEditResp
 tdataTypeEditResp
 urgencyNameEditResp
 descriptionNameEditResp


 //phase 1

 projectIdData = [];
 requestDataICICI = [];
 responseDataICICI = [];
 sourceFieldsResponse
 extractedDataSourceResponse
 combinedDataAfterExtractionSourceResponse = [];

 responseDataSource = [];
 responseDataTarget = []
 outputData = [];
 responseData = [];
 dataWithDirectRowNo = [];
 finalDataForEsql = {};


 //yaml request
 requestDataFiltered = [];
 requestLayout = [];
 requestProperty = [];
 requestPropertyNonArray = [];
 requestExtraction = [];
 requestPropNonArray2 = []
 finalRequest = []
 finalRequestWithoutArray = [];
 finalRequestLayout = {}
 finalRequest2 = [];



 //modal
 descriptionNameRequest
 descriptionNameResponse
 fsizeICICIRequest
 dataTypeICICIRequest
 descriptionICICIRequest
 dataTypeClientRequest
 dataTypeClientResponse
 dataTypeICICIResponse
 fsizeICICIResponse
 urgencyNameICICIResponse

 //yaml request

 requestData2 = [];
 responseData2 = [];
 requestData3 = []
 responseData3 = [];
 fieldDefinitionsRequest = [];




 //yaml response
 responseDataFiltered = [];
 responseLayout = [];
 responseProperty = [];
 responsePropertyNonArray = [];
 responseExtraction = [];
 responsePropNonArray2 = []
 responseRequest = []
 finalResponseWithoutArray = [];
 finalResponseLayout = {}
 finalResponse2 = [];
 finalResponse = {};

 //ngOnInit

 projectId
 dataofUser
 projectDataNew
 serviceName
 url;
 oldRequestData = [];


 productName;
 txnReversal: boolean = false;

 //mapping object
 public mapping1RequestObject = [];
 public tempMapping1RequestObjectData = [];

 options = {
 theme: 'light', // two possible values: light, dark
 dir: 'ltr', // two possible values: ltr, rtl
 layout: 'vertical', // fixed value. shouldn't be changed.
 sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
 sidebarpos: 'fixed', // two possible values: fixed, absolute
 headerpos: 'fixed', // two possible values: fixed, absolute
 boxed: 'full', // two possible values: full, boxed
 navbarbg: 'skin1', // six possible values: skin(1/2/3/4/5/6)
 sidebarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
 logobg: 'skin6' // six possible values: skin(1/2/3/4/5/6)
 };

 navbarOpen = false;
 dataOfUser ;
 serviceNameOfUser: any;
 serviceId: any;
 username: any
 organisation = '';
 clientCode: any
 clientCodeIPS: any;
 clientCodeProfunds: any
 webServiceType: any
 serviceUrl: any
 poolAccountNumber: any
 ifscCode: any
 disabledMappingCheck: boolean = true;
 service_prod_url: any
 vanNumber = '';
 ansName: boolean;
 retryRule: string;
 alreadyDataPresent: boolean = false;
 yamlmsg: any;
 errmsg: any;
 msg: any;
 number:boolean = true;

 checkPresent: boolean = false;
 eventData = [];
 lines: any = [];
 projectData=[];
 messageLabel1
 messageLabel2
 dragvalue;
 dropvalue;
 userData;
 tabledata = []
 esqlArray = []
 YourApi = ["Client Code","Virtual Accpount Number","Transaction Code","Utr Number","Sender Name","Date","Sender IFSC Code","Remitter Account Number","Mode","Status","Sender To Receiver Information"];
 IciciApi = ["CustomerCode","VirtualAccountNumber","TransactionAction","UTR","SenderIFSC","SenderInformation","SenderAccountNumber","Sender Name","PaymentMode","CustomerAccountNumber","TransactionDate","Status"];
  version: any;
  data: string;
  dataforproces: any;
  submitFlag: boolean;
  vanValue1: any;
 constructor(private newmappingService:newMappingService, private router: Router) { }

 ngOnInit() {
  //  localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZWQ0ZjQ3MjJjZTIxZTZhYTc4ZGIiLCJpYXQiOjE1ODA5ODU3MzZ9.KECi38Pln-X1zXYYkwgot7mQJFbeiyda2HiVuTh4xV8")
 $("#a").css("display", "none");
 $("#b").css("display", "none");
 $("#c").css("display", "none");
 $("#d").css("display", "none");
 $("#e").css("display", "none");
 $("#f").css("display", "none");
 $("#g").css("display", "none");
 $("#save").css("display", "none");
 this.data=localStorage.getItem("data")
 this.dataforproces=JSON.parse(this.data)

//  this.dataofUser = localStorage.getItem("data");
//  this.dataOfUser = JSON.parse(this.dataofUser);
 this.projectId = this.dataforproces[0].projectId
console.log("here",this.dataforproces[0])
 this.organisation = this.dataforproces[0].organisation
 console.log("orgname",this.organisation)
 console.log("PRINT : USER DATA ", this.dataforproces[0]);
 this.username=this.dataforproces[0].emailIdBusinessSpoc;
 this.clientCodeIPS = clientCodeIPS;

 this.clientCodeProfunds = clientCodeProfunds;

//  this.txnReversal =this.dataOfUser.enableTransactionReversalFileProcessing;


//  this.poolAccountNumber = this.dataOfUser.poolAccountNumber;

 this.ifscCode = ifscCode
   ;

//  console.log("this.clientCodeIPS =  ", this.clientCodeIPS);
//  console.log("this.clientCodeProfunds = ", this.clientCodeProfunds);
 if (this.clientCodeProfunds != "") {
   this.clientCode = this.clientCodeProfunds;
 }
 else if (this.clientCodeIPS != "") {
   this.clientCode = this.clientCodeIPS;
 }

 localStorage.setItem("projectIdFromMapping", this.projectId);
 this.retryRule = localStorage.getItem('retryRule');
 console.log("PRINT : RETRY-RULE ", this.retryRule);
 this.newmappingService.getProjectData(this.projectId).then((datavalue) => {
 console.log("Mapping getProjectData = ", datavalue)
 this.projectData=datavalue;
 this.productName =datavalue[0].productName
 this.serviceName =datavalue[0].products[0].services[0].serviceName;
 this.webServiceType =datavalue[0].products[0].services[0].webServiceType;
 this.serviceUrl =datavalue[0].products[0].services[0].serviceURLUAT;
 this.service_prod_url = datavalue[0].products[0].services[0].serviceURLProd;
 this.messageLabel1 = "Your API Fields"
 this.messageLabel2 = "ICICI API Fields"
 this.version=datavalue[0].version
 localStorage.setItem("version",this.version)
 this.getICICIRequestResponseData();
 var type="uatFile1";

 this.newmappingService.getFileDataByProjectId(this.projectId,type).then(async (data) => {
 console.log("this.getFileDataByProjectId", data);
 this.fileDataByProjectId=data;
 await this.segregateSourceRequestData(this.fileDataByProjectId)
 await this.segregateSourceResponseData(this.fileDataByProjectId)
 });
 
 for(var i =0;i<this.IciciApi.length;i++){
 // var data = {"id":i+1,"source":"","target":"","operation":""}
 var data = {"id":i+1,"source":"","target":"","operation":""}
 
 this.tabledata.push(data)
 }
 }) 

 this.newmappingService.getServiceDetails(serviceId).then((data) => {
//  console.log("Mapping getServiceDetails = ", data);
 // this.serviceName = data[0].serviceName;
//  console.log("this.serviceName", this.serviceName);
 // console.log("tableData====>>>> ",this.tabledata);
 })
 }
 dragStart(event) {
 this.dragvalue = event.target.innerHTML
 }
 
 allowDrop(event) {
 event.preventDefault();
 }
 
 drop(data,event) {
 // event.preventDefault();

//  console.log("data in >>>>>>",this.requestData[event-1]);
 this.requestData[event-1].sourceFieldName = this.dragvalue ;
 this.requestData[event-1].tfieldNameMapping = data.tfieldName;
 
 var esqlData = {
  'id':event,
  'source': this.requestData[event-1].sourceFieldName,
  'target': this.requestData[event-1].tfieldNameMapping,
  'operation': ""
  }
  this.esqlArray.push(esqlData);
  console.log(this.esqlArray);
 
 // event.target.innerHTML = this.dragvalue;
 console.log("event.target====>>>> ",data,"====>",event);
 if (data.sfieldName != undefined && event != undefined && event != null && event != "") {
 
 // this.isNumber(event)

 for (var q = 0; q < this.requestData.length; q++) {
 if (this.requestData[q].id == data.id && event != undefined && event != null) {
 console.log("this.requestData value", this.requestData[q]);
 console.log("data value", data);
 this.requestData[q].directRowNo = event;


 if (event >= this.requestData.length + 1 || event <= 0 ) {
 console.log("if",this.number)

 this.requestData[q].directRowNo = '';
 alert("This field does not exist !");
 }
 else {
 if (this.requestData[event - 1].sdataType != "") {
 if (this.requestData[event - 1].sdataType != "array") {
 if (this.requestData[event - 1].sdataType != "object") {
 // changes to check the duplicate mapping values
 if (this.lines.some((dataValue) => dataValue.id === event)) {
 this.requestData[q].directRowNo = "";
 alert('Already mapped to other field !');

 }
 // if closes here & else starts here 
 else {
 console.log("=====>>>>",this.requestData[q],"======>>>>",this.requestData[event - 1])
 this.requestData[q].directRowNo = event;
 this.requestData[q].sourceFieldPath = this.requestData[event - 1].sourceName;
 this.requestData[q].sourceFieldName = this.requestData[event - 1].sourceFieldName;
 this.requestData[q].datatypeVerified = this.requestData[event - 1].sdataType;
 this.requestData[q].tfieldNameMapping = this.requestData[q].tfieldName;

 if (this.requestData[q].tdataType != null) {
 this.lines.push({ id: event });
 // console.log("Print : ", this.requestData[q])
 }
 else {
 alert("Cannot Map to Empty Field");
 this.requestData[q].directRowNo = "";
 this.requestData[q].sourceFieldPath = "-";
 this.requestData[q].sourceFieldName = "-";
 this.requestData[q].datatypeVerified = "-";
 this.requestData[q].tfieldNameMapping = "-";
 // console.log("final responsedata = ", this.requestData[q])
 }
 var targetDatatype = (this.requestData[q].tdataType)
 var sourceDatatype = (this.requestData[event - 1].sdataType)
 // console.log("final requestData = ", this.requestData[q])
 }
 }
 // else ends here
 else {
 this.requestData[q].directRowNo = '';
 // this.requiredFieldCheck();
 alert(" Cannot map to an object")

 }
 }
 else {
 this.requestData[q].directRowNo = '';
 // this.requiredFieldCheck();
 alert("Cannot map to an array")
 }
 } else {
 this.requestData[q].directRowNo = '';
 // this.requiredFieldCheck();
 alert("Cannot map to an empty field")

 }
 }
 }
 }
 }
 console.log("this.requestData",this.requestData);


 }

 dragEnter(event) {
 // event.target.style.border = "2px dotted skyblue";
 }

 dragLeave(event) {
 // event.target.style.border = "solid 0.5px #d7ecfe"; 
 }

 deleteRow(data){
  console.log("=====>>>>>",data);
  //  this.tabledata[Id-1].YourApi = this.messageLabel1;
  //  this.tabledata[Id-1].IciciApi = this.messageLabel2;
for(var i= 0 ; i<this.esqlArray.length;i++){
  if(this.esqlArray[i].id == data.id){
    this.esqlArray.splice(i, 1);
  }
}
   
   console.log("in delete====>",this.esqlArray);
   this.requestData[data.id-1].sourceFieldName = "-";
   this.requestData[data.id-1].tfieldNameMapping = "-";
   this.requestData[data.id-1].operation = "";
   for (var i = 0; i < this.lines.length; i++) {
    if (this.lines[i].id == data.directRowNo) {
      
      console.log("PRESENT");
      this.lines.splice(i, 1)
    }
    else {
      console.log("row numbers", this.lines[i].id, data.directRowNo);
      console.log("Not preset");
    }
  }
   console.log("data ",this.requestData);
   for (var q = 0; q < this.requestData.length; q++) {
    if (this.requestData[q].id == data.id && this.requestData[q].tfieldName == data.tfieldName) {
      this.requestData[q].directRowNo = "";
      this.requestData[q].sourceFieldPath = "-";
      this.requestData[q].sourceFieldName = "-";
      this.requestData[q].datatypeVerified = "-";
      this.requestData[q].tfieldNameMapping = "-"
      this.requestData[q].backgroundColor = "true"
      console.log("final requestData = ", this.requestData[q])
    }
  
  }
  console.log("this.requestData",this.requestData);
   // for(var i = 0; i < this.tabledata.length;i++){
   // if(this.tabledata[i].id == Id){
   // if(this.tabledata[i].YourApi != "" && this.tabledata[i].IciciApi != ""){ 
   // // this.tabledata.splice(i, 1); 
   // // var data = {"id":this.tabledata.length,"YourApi":"","IciciApi":"","remark":""}
   // // this.tabledata.push(data)
   // this.tabledata[Id-1].YourApi = this.messageLabel1;
   // this.tabledata[Id-1].IciciApi = this.messageLabel2;
  
   // }
   // }
   // }

//  console.log("=====>>>>>",Id);
//  this.tabledata[Id-1].YourApi = this.messageLabel1;
//  this.tabledata[Id-1].IciciApi = this.messageLabel2;
//  console.log("====>",this.tabledata);
 // for(var i = 0; i < this.tabledata.length;i++){
 // if(this.tabledata[i].id == Id){
 // if(this.tabledata[i].YourApi != "" && this.tabledata[i].IciciApi != ""){ 
 // // this.tabledata.splice(i, 1); 
 // // var data = {"id":this.tabledata.length,"YourApi":"","IciciApi":"","remark":""}
 // // this.tabledata.push(data)
 // this.tabledata[Id-1].YourApi = this.messageLabel1;
 // this.tabledata[Id-1].IciciApi = this.messageLabel2;

 // }
 // }
 // }
 }

 /**
 * @author Kuldeep 
 * @description This function is used to logout the user 
 */
 logout(){
 this.newmappingService.logout(this.userData).then(logout=>{
 console.log("logout",logout);
 localStorage.clear();
 this.router.navigateByUrl('/authentication/Home');
 })
 }
 vanValue(value){
  this.vanValue1=value;
  console.log("van Check",this.vanValue1)
 }
 submitForMapping() {
  // $(window).scrollTop(0);
  $('html, body').animate({ scrollTop: 0 }, 1200)
// this.vanValue(value)
 if(this.vanValue1 == undefined) {
 console.log("empty");
 alert("Please enter VAN number")
 }
 else {
 console.log(" not empty");
 this.submitFlag=true;

 localStorage.setItem("vanNo", this.vanNumber);
 this.disabledMappingCheck = true;
 $("#captureButton").addClass("disabled");
 $("#generateButton").addClass("disabled");
 $("#generateButton1").addClass("disabled");
 
 this.proBarFlag=true;
 this.isLoading = true;
 console.log(" Submit mapping data ", this.requestData);
 this.mapping1RequestObject = this.requestData;
 // this.spinner.show();
 // expectedValues
 var expectObjRequest = [];
 var expectObjResponse = [];
 
 for (var u = 0; u < this.requestData.length; u++) {
 
 if (this.requestData[u].expectedValue !== null) {
 var result = {};
 var key = this.requestData[u].sourceFieldName
 var value = this.requestData[u].expectedValue
 result[key] = value
 
 expectObjRequest.push(result);
 
 }
 
 }
 
 console.log("expectObjRequest = ", expectObjRequest)
 
 for (var t = 0; t < this.responseData.length; t++) {
 
 if (this.responseData[t].expectedValue !== null) {
 var result = {};
 var key1 = this.responseData[t].sourceFieldName
 var value1 = this.responseData[t].expectedValue
 
 result[key1] = value1;
 
 expectObjResponse.push(result);
 
 }
 
 }
 console.log("expectObjResponse = ", expectObjResponse)
 
 
 console.log("expectObjResponse = ", expectObjResponse)
 
 //esql and yaml
 var clientUrl = this.serviceUrl
 this.url = null
 console.log("clientUrl = ", clientUrl)
 // this.modalService.dismissAll();
 var mandatoryFlag: boolean = false;
 console.log("------------- Inside Submit ----------")
 console.log("responseData = ", this.responseData)
 this.getFlattenStructure1(this.requestData, clientUrl);
 
 //esql and yaml
 var clientUrl = this.serviceUrl
 this.url = null
 console.log("clientUrl = ", clientUrl)
 // this.modalService.dismissAll();
 var mandatoryFlag: boolean = false;
 console.log("------------- Inside Submit ----------")
 console.log("responseData = ", this.responseData)
 this.getFlattenStructure1(this.requestData, clientUrl);
 
 
 
 // <!-- ####### changes by sanchita 16-December-2019 For Display -->
 // this.gotoNextTab();
 
//  this.router.navigate(['/authentication/appStatus']);
}}

 /**
 * @author Sanchita
 * @param data 
 * @description This function is used to get the json structure for esql generation
 */

 getFlattenStructure1(data, clientUrl) {
 console.log("this.requestData", data);

 this.dataForEsql = [];
 this.dataWithDirectRowNo = [];
 this.dataWithNoDirectRow = [];

 console.log(" this.combinedDataAfterExtractionSource = ", this.combinedDataAfterExtractionSource)
 for (var i = 0; i < this.requestData.length; i++) {
 if (this.requestData[i].directRowNo !== "") {
 this.dataWithDirectRowNo.push(this.requestData[i]);
 }
 else {
 this.dataWithNoDirectRow.push(this.requestData[i]);
 }
 }
 console.log("this.dataWithDirectRowNo = ", this.dataWithDirectRowNo)
 let array1 = []
 this.requestDataICICI.forEach((itm, i) => {
 array1.push(Object.assign({}, itm, this.combinedDataAfterExtractionSource[i]));
 });
 console.log("array1 = ", array1)



 //fieldDefinitions ----------
 for (var y = 0; y < this.dataWithDirectRowNo.length; y++) {
 for (var u = 0; u < this.combinedDataAfterExtractionSource.length; u++) {
 if (this.combinedDataAfterExtractionSource[u].key.includes(this.dataWithDirectRowNo[y].sourceFieldName)) {

 for (var a = 0; a < this.combinedDataAfterExtractionSource.length; a++) {
 //new ----------------
 if (this.combinedDataAfterExtractionSource[a].value == "array") {
 var aSplit = this.combinedDataAfterExtractionSource[u].key.split(".");
 console.log("aSplit = ", aSplit)
 var splitted1 = aSplit[0];

 console.log("splitted1 = ", splitted1)

 var value11 = splitted1

 if (this.combinedDataAfterExtractionSource[a].key.includes(value11)) {

 var newArray = this.combinedDataAfterExtractionSource[a].key.split(".");
 var newValue = newArray[newArray.length - 2]

 var splitted = newValue.split(".");
 console.log(" ------- splitted Response--------- = ", splitted)
 var responseValue = newArray[0]
 var newValue2 = newArray[1]

 console.log("New newValue2 = ", newValue2)
 this.fieldDefinitionsRequest.push({
 "fieldName": newValue,
 "fieldType": "Array",
 "format": "JSON",
 "preset": "source"
 })

 a = this.combinedDataAfterExtractionSource.length;
 u = this.combinedDataAfterExtractionSource.length;
 console.log("ESQL Request field definitions ends")
 }
 }


 }

 }
 }
 }
 // fieldDefinitions ends

 //remove duplicate field definitions

 this.fieldDefinitionsRequest = this.removeDupFieldDefinitions(this.fieldDefinitionsRequest)


 console.log("this.fieldDefinitionsRequest",this.fieldDefinitionsRequest)
 //remove duplicate field definitions ends 



 for (var i = 0; i < this.dataWithDirectRowNo.length; i++) {
 console.log("Inside 1")
 for (var j = 0; j < this.combinedDataAfterExtractionSource.length; j++) {

 console.log("Inside 2")
 var x = this.combinedDataAfterExtractionSource[j].key;
 if (x !== undefined) {


 var splitted = x.split(".");

 console.log("Slippeted = ", splitted)
 for (var t = 0; t < splitted.length; t++) {
 var data = splitted[t];

 // console.log("Inside if , this.dataWithDirectRowNo[i].sourceFieldName = ", this.dataWithDirectRowNo[i].sourceFieldName)
 if (this.dataWithDirectRowNo[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo[i].datatypeVerified === this.combinedDataAfterExtractionSource[j].value) {

 var sourceJson = this.combinedDataAfterExtractionSource[j].key;
 var val = sourceJson.replace(".type", "");
 this.dataForEsql.push({
 'source': val,
 'target': this.dataWithDirectRowNo[i].tfieldName,
 'operation': ""
 })
 }

 }
 }

 }
 }


 console.log(" this.dataForEsql = ", this.dataForEsql)

 this.finalDataForEsql = {
 "sourceType": "JSON",
 "targetType": "DFDL",
 "fieldDefinitions": this.fieldDefinitionsRequest,
 "fields": this.esqlArray
 }


 var finalEsqlObject = {
 "mappedObj": this.finalDataForEsql,
 "templateName": config.templateNameEsql,
 "fileName": config.fileNameEsql_Scene_1_Request_1,
 "reqRetryRule": this.retryRule,
 "clientName": clientName,
 "clientCode": this.clientCode,
 "username": this.username,
 "orgName": this.organisation,
 "productName": this.productName,
 "serviceName": this.serviceName,
 "projectId": this.projectId,
 "fileCount": 1,
 "typeOfService": this.webServiceType,
 "accountNo": this.poolAccountNumber,
 "IFSCCode": this.ifscCode,
 "basePath": "/ecollection/" + this.clientCode,
 "validationPath": "/validation",
 "txnReversal": "No"

 }
 console.log("finalEsqlObject", JSON.stringify(finalEsqlObject))

 this.newmappingService.postESQL(finalEsqlObject).then((dataEsql) => {
 console.log("response dataEsql = ", dataEsql);
 // this.toastr.success("Response for ESQL 1:" + dataEsql.message);
 this.msg = dataEsql.message
 $("#b").css("display", "block").delay(2000).fadeOut(200);
 
 this.yamlCreation(this.requestData, this.responseData, clientUrl)
 console.log(" YAML PROCESS END ");

 

 })
 .catch((err) => {
 if (err) {
 // this.toastr.error("ESQL1 Response.Please Try Again.." + err.message);
 console.log("PRINT EXCEPTION ", err);
 this.errmsg = err.message;
 $("#c").css("display", "block").delay(2000).fadeOut(400);
 this.isLoading = false;
 }
 })
}

yamlCreation(requestD, responseD, clientUrl) {
 var flattenData =
 {

 "description": "",
 "title": "ecollection" + this.clientCodeIPS,
 "ibmName": "test",
 "targetUrl": "http://example.com/operation-name",
 "targetUrlDescription": "The URL of the target service",
 "basePath": "/ecollection",
 "path": "/transaction",
 "operations": [
 {
 "operationId": null,
 "path": "/transaction",
 "method": "post",
 "fields": [
 {
 "Virtual Account Number Verification IN": {
 "type": "array",
 "items": {
 "properties": {
 "Client Code": {
 "type": "string"
 },
 "Virtual Account Number": {
 "type": "string"
 },
 "Transaction Amount": {
 "type": "number"
 },
 "UTR number": {
 "type": "string"
 },
 "Sender Name": {
 "type": "string"
 },
 "Date": {
 "type": "string"
 },
 "Sender IFSC_Code": {
 "type": "string"
 },
 "Remitter Account Number": {
 "type": "string"
 },
 "Mode": {
 "type": "string"
 },
 "Status": {
 "type": "string"
 },
 "sender to receiver information": {
 "type": "string"
 }
 },
 "type": "object"
 }
 }
 }
 ],
 "responses": [
 {
 "200": {
 "Virtual Account Number Verification OUT": {
 "type": "array",
 "items": {
 "properties": {
 "Client Code": {
 "type": "string"
 },
 "Virtual Account Number": {
 "type": "string"
 },
 "Transaction Amount": {
 "type": "number"
 },
 "UTR number": {
 "type": "string"
 },
 "Sender Name": {
 "type": "string"
 },
 "Date": {
 "type": "string"
 },
 "Sender IFSC_Code": {
 "type": "string"
 },
 "Remitter Account Number": {
 "type": "string"
 },
 "Mode": {
 "type": "string"
 },
 "Status": {
 "type": "string"
 },
 "Reject Reason": {
 "type": "string"
 }
 },
 "type": "object"
 }
 }
 }
 }
 ]
 }
 ]

 }



 console.log("combinedDataAfterExtractionSource = ", this.combinedDataAfterExtractionSource);

 var combArray = [];
 this.combinedDataAfterExtractionSource.forEach((item, index) => {

 combArray.push({ ['"' + item.key + '"']: item.value })
 })
 console.log("combArray = ", combArray)
 var unflattenValue = this.unflatten(combArray[2])

 // console.log("unflattenValue = ", Object.assign(unflattenValue))

 var requestField = this.yamlGenRequest();
 var responseField = this.yamlGenResponse();
 var requestArray = [];
 console.log("Request fields =", requestField);
 console.log("Response fileds =", responseField)
 console.log("Service url = ", this.serviceUrl);
 if (!Array.isArray(requestField['fields'])) {
 requestArray.push(requestField['fields'])
 } else {
 requestArray = requestField['fields']
 }
 var finalYaml = [{
 "description": "Yaml For ecollection",
 "title": "ecollection" + this.clientCode,
 "ibmName": "test",
 "sitUrl": clientUrl,
 "uatUrl": clientUrl,
 "prodUrl": clientUrl,
 "targetUrlDescription": "The URL of the target service",
 "basePath": "/ecollection/" + this.clientCode,
 "path": "/validation",
 "operations": [
 {

 "operationId": null,
 "path": this.sourcePath,
 "method": this.sourceMethod,
 fields: requestArray,
 responses: []
 }
 ]

 }]


 console.log("hardcoded , flattenData = ", flattenData)

 console.log("Final Yaml File =", JSON.stringify(finalYaml[0]));
console.log("request Array",requestArray[0]);
localStorage.setItem("yamlFields",JSON.stringify(requestArray[0]));
 var yamlObject = {
 'params': finalYaml[0],
 'templateName': config.templateNameYaml,
 'fileName': config.fileNameYaml_Scene_1,
 "username": this.username,
 "clientCode": this.clientCode, //need to make dynamic
 "orgName": this.organisation,
 "productName": this.productName,
 "serviceName": "eCollection_ClientIntimation_CurrentAccount_IPS_Profunds",
 "fileCount": 1,
 'projectId': this.projectId,
 "txnReversal": "No"
 }

 console.log("yamlRequest ", yamlObject);
 this.newmappingService.postYamlData(yamlObject).then( (yamlResponse) => {

 console.log("yamlResponse = ", yamlResponse)
 if(yamlResponse.message =="Finally pushed yaml files"){

 
 // this.toastr.success("Response for Yaml:" + yamlResponse.message);
 this.yamlmsg = yamlResponse.message
 $("#d").css("display", "block").delay(2000).fadeOut(400);
 // this.router.navigate(['/authentication/appStatus']);
 // return yamlResponse;
 var mappingDataObject = {};
 var mapping1RequestDataObject = {
 "mapping1RequestObject": this.mapping1RequestObject
 };
 mappingDataObject["mappingObj"] = mapping1RequestDataObject;
 mappingDataObject["projectId"] = localStorage.getItem('projectId')
 if (this.alreadyDataPresent == false) {
 var mapping1RequestDataObject = {
 "mapping1RequestObject": this.mapping1RequestObject
 };
 mappingDataObject["mappingObj"] = mapping1RequestDataObject;
 mappingDataObject["projectId"] = localStorage.getItem('projectId')
 console.log("mapping",mappingDataObject)
//  this.newmappingService.postSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
//  console.log("new postSaveMappingDataResponse =====>", postSaveMappingDataResponse);
//  $("#save").css("display", "block").delay(1000).fadeOut(400);
//  })
 }
 else if (this.alreadyDataPresent == true) {


 var mappingDataObject = {};
 console.log("requestData", this.requestData);
 var mapping1RequestDataObject = {
 "mapping1RequestObject": this.requestData,

 };
 mappingDataObject["mappingObj"] = mapping1RequestDataObject;
 mappingDataObject["projectId"] = localStorage.getItem('projectId')
 console.log("mappingDataObject", mappingDataObject);
 this.newmappingService.putSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
 console.log("new postSaveMappingDataResponse =====>", postSaveMappingDataResponse);
 // this.toastr.success("Data Saved Successfully!")
 $("#save").css("display", "block").delay(2000).fadeOut(400);

 })
 }
 this.initiatesSIT(this.dataforproces);//Initiate SIT Operation Start
 console.log(" Print : INITIATE SIT COMPLETED ");
 }
 }).catch(err => {
 console.log("PRINT : PROBLElM WITH YAML 1 1A ", err);
 // this.toastr.error("ERROR IN YAML 1 ENCOUNTERED");
 // this.toastr.error("Please try again..Something went wrong");
 $("#e").css("display", "block").delay(1200).fadeOut(200);
 setTimeout(() => {
 $("#f").css("display", "block").delay(1200).fadeOut(200)
 }, 1201);
 this.isLoading = false;

 })
}

 removeDupFieldDefinitions(something) {
 return something
 // return something.reduce(function (prev, ele) {
 // var found = prev.find(function (fele) {
 // return ele.fieldName === fele.fieldName && ele.fieldType === fele.fieldType;
 // });
 // if (!found) {
 // prev.push(ele);
 // }
 // return prev;
 // }, []);
 }
 initiatesSIT(userData) {
 console.log(" Print : User Data Has been Passed", userData);
 if (this.txnReversal == false) {
 var valueOFReversal = "No";
 }
 else {
 var valueOFReversal = "Yes";
 }

 var data = {
 projectId: this.projectId,
 clientCode: this.clientCode,
 productName: productName,
 serviceName: serviceName,
 username: this.username,
 orgName: this.organisation,
 txnReversal: valueOFReversal,
 IPSClientCode: clientCodeIPS ,
 vanNo: this.vanNumber
 };
 console.log("PRINT : DATA IN INITIATE SIT ", JSON.stringify(data));

 this.newmappingService.initiateSIT(data).then(async (data) => {
 console.log("PRINT: INITIATE SIT RESPONSE", data);
 if (data.message != null) {
 console.log("SIT Initiate result", data);
 await alert("Certified Successfully Completed!!..Please Move to Testing Tab.");
 await this.gotoNextTab();
 // this.tabSet.toggle('uat');
 }
 }).catch(err => {

 console.log("PRINT : PROBLEM IN INITIATE SIT");
 // this.toastr.error("ERROR IN INITIATE SIT ENCOUNTERED");
 $("#g").css("display", "block").delay(2000).fadeOut(200);
 this.isLoading = false;

 });;
 }
 gotoNextTab() {
 console.log("gotoNextTab")
 this.someEvent.next('testing');
 }
 /**
 * @author : Sucheta
 * @description : Unflatten the data
 * @param data 
 */
 unflatten(data) {
 "use strict";
 if (Object(data) !== data || Array.isArray(data))
 return data;
 var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
 resultholder = {};
 for (var p in data) {
 var cur = resultholder,
 prop = "",
 m;
 while (m = regex.exec(p)) {
 cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
 prop = m[2] || m[1];
 }
 cur[prop] = data[p];
 }
 return resultholder[""] || resultholder;
 };
 yamlGenRequest() {
 this.requestProperty = [];
 this.requestDataFiltered = [];
 this.requestLayout = [];
 this.requestPropertyNonArray = [];
 this.requestExtraction = [];
 this.requestPropNonArray2 = [];
 this.finalRequestWithoutArray = [];
 this.finalRequest = [];
 this.finalRequest2 = []

 //To check if the file has an array


 var arrayFlag: boolean = false;

 for (var ut = 0; ut < this.combinedDataAfterExtractionSource.length; ut++) {

 if (this.combinedDataAfterExtractionSource[ut].value == "array") {

 arrayFlag = true;
 ut = this.combinedDataAfterExtractionSource.length
 }
 }


 //step 1 - filter the mapped data from request array

 for (var t = 0; t < this.requestData.length; t++) {
 if (this.requestData[t].directRowNo !== "") {

 this.requestDataFiltered.push(this.requestData[t])
 }

 }
 console.log("this.requestDataFiltered = ", this.requestDataFiltered)
 //step 2 - check if any array from request data is present in flattened array

 // this.combinedDataAfterExtractionSource

 for (var y = 0; y < this.requestDataFiltered.length; y++) {

 for (var u = 0; u < this.combinedDataAfterExtractionSource.length; u++) {
 if (this.combinedDataAfterExtractionSource[u].key.includes(this.requestDataFiltered[y].sourceFieldName)) {

 for (var a = 0; a < this.combinedDataAfterExtractionSource.length; a++) {

 if (this.combinedDataAfterExtractionSource[a].key.includes(this.combinedDataAfterExtractionSource[u].key) && (this.combinedDataAfterExtractionSource[u].value == "array")) {


 var newValue = this.combinedDataAfterExtractionSource[u].key.replace(".type", "")
 this.requestLayout.push({
 key: newValue, value:

 {
 [newValue]: {
 "type": "array",
 "items": {
 "properties": {

 },
 "type": "object"
 }
 }
 }
 })

 a = this.combinedDataAfterExtractionSource.length;
 }
 }

 }
 }
 console.log(" this.requestLayout = ", this.requestLayout)
 }

 //step 3 - segregate the array values having a corresponding flattened array type in a new json

 for (var d = 0; d < this.requestDataFiltered.length; d++) {

 for (var s = 0; s < this.combinedDataAfterExtractionSource.length; s++) {
 if (this.combinedDataAfterExtractionSource[s].key.includes("." + this.requestDataFiltered[d].sourceFieldName + ".") && ((this.requestDataFiltered[d].datatypeVerified) !== "array")) {
 // console.log("this.combinedDataAfterExtractionSource[u].key = ", this.combinedDataAfterExtractionSource[s].key)

 // console.log("this.requestDataFiltered[y].sourceFieldName = ", this.requestDataFiltered[d].sourceFieldName)
 for (var f = 0; f < this.combinedDataAfterExtractionSource.length; f++) {

 if (this.combinedDataAfterExtractionSource[f].key.includes(this.combinedDataAfterExtractionSource[s].key) && (this.combinedDataAfterExtractionSource[f].value !== "array")) {
 // console.log ("this.combinedDataAfterExtractionSource[f].key = ", this.combinedDataAfterExtractionSource[f].key)

 // console.log ("this.combinedDataAfterExtractionSource[s].key= ", this.combinedDataAfterExtractionSource[s].key)

 this.requestProperty.push({
 key: this.combinedDataAfterExtractionSource[s].key, value: {



 [this.requestDataFiltered[d].sourceFieldName]: {
 "type": this.requestDataFiltered[d].datatypeVerified,

 }
 }
 })


 }
 }


 }

 }

 console.log(" this.requestProperty = ", this.requestProperty)
 }
 //step 4 - Request non-array values from request data into a new json

 for (var g = 0; g < this.requestDataFiltered.length; g++) {

 for (var h = 0; h < this.combinedDataAfterExtractionSource.length; h++) {

 if (arrayFlag == true) {

 if (!(this.combinedDataAfterExtractionSource[h].key).includes(this.requestDataFiltered[g].sourceFieldName) && ((this.requestDataFiltered[g].datatypeVerified) !== "array")) {
 // console.log("Inside if od step 4")
 // console.log("this.combinedDataAfterExtractionSource[h].key = ", this.combinedDataAfterExtractionSource[h].key)

 for (var j = 0; j < this.combinedDataAfterExtractionSource.length; j++) {

 if (this.combinedDataAfterExtractionSource[j].key.includes(this.combinedDataAfterExtractionSource[h].key) && ((this.combinedDataAfterExtractionSource[j].value) !== "array")) {
 console.log("Inside 2nd if of step 4")

 // console.log("this.combinedDataAfterExtractionSource[j].key = ", this.combinedDataAfterExtractionSource[j].key)

 // console.log("this.combinedDataAfterExtractionSource[h].key= ", this.combinedDataAfterExtractionSource[h].key)


 this.requestPropertyNonArray.push({
 key: this.requestDataFiltered[g].sourceFieldName, value:
 {
 [this.requestDataFiltered[g].sourceFieldName]: {
 "type": this.requestDataFiltered[g].datatypeVerified,

 }
 }
 })
 j = this.combinedDataAfterExtractionSource.length
 h = this.combinedDataAfterExtractionSource.length
 }
 }


 }

 }

 else if (arrayFlag == false) {


 if ((this.combinedDataAfterExtractionSource[h].key).includes(this.requestDataFiltered[g].sourceFieldName) && ((this.requestDataFiltered[g].datatypeVerified) !== "array")) {
 // console.log("Inside if od step 4")
 // console.log("this.combinedDataAfterExtractionSource[h].key = ", this.combinedDataAfterExtractionSource[h].key)

 for (var j = 0; j < this.combinedDataAfterExtractionSource.length; j++) {

 if (this.combinedDataAfterExtractionSource[j].key.includes(this.combinedDataAfterExtractionSource[h].key) && ((this.combinedDataAfterExtractionSource[j].value) !== "array")) {
 console.log("Inside 2nd if of step 4")

 // console.log("this.combinedDataAfterExtractionSource[j].key = ", this.combinedDataAfterExtractionSource[j].key)

 // console.log("this.combinedDataAfterExtractionSource[h].key= ", this.combinedDataAfterExtractionSource[h].key)


 this.requestPropertyNonArray.push({
 key: this.requestDataFiltered[g].sourceFieldName, value:
 {
 [this.requestDataFiltered[g].sourceFieldName]: {
 "type": this.requestDataFiltered[g].datatypeVerified,

 }
 }
 })
 j = this.combinedDataAfterExtractionSource.length
 h = this.combinedDataAfterExtractionSource.length
 }
 }


 }
 }

 }
 }
 console.log("this.requestPropertyNonArray = ", this.requestPropertyNonArray)


 if (arrayFlag === true) {

 for (var l = 0; l < this.requestPropertyNonArray.length; l++) {
 var flag = false;
 for (var z = 0; z < this.requestProperty.length; z++) {

 var value1 = Object.keys(this.requestPropertyNonArray[l].value)
 var value2 = Object.keys(this.requestProperty[z].value)

 if (value1[0] == value2[0]) {
 console.log("inside z if / flag = true")
 flag = true
 }
 }

 if (flag === false) {
 this.requestPropNonArray2.push(this.requestPropertyNonArray[l])
 }
 }
 }
 else {
 this.requestPropNonArray2 = (this.requestPropertyNonArray)
 }
 console.log("this.requestPropNonArray2 = ", this.requestPropNonArray2)



 //step 5 - Arrange the values in the fields json


 for (var x = 0; x < this.requestProperty.length; x++) {

 if (this.requestLayout.length !== 0) {

 for (var c = 0; c < this.requestLayout.length; c++) {

 if (this.requestProperty[x].key.includes(this.requestLayout[c].key)) {
 console.log("Inside last if = ")
 console.log("Object.keys(this.requestProperty[x].value)[0] = ", Object.keys(this.requestProperty[x].value)[0]);
 console.log("Object.values(this.requestProperty[x].value)[0] = ", Object.values(this.requestProperty[x].value)[0]);
 console.log("this.requestLayout[c].key = ", this.requestLayout[c].key)
 this.finalRequest = this.requestLayout[c].value
 console.log("abc = ", this.finalRequest)
 this.finalRequest[this.requestLayout[c].key].items.properties[Object.keys(this.requestProperty[x].value)[0]] = Object.values(this.requestProperty[x].value)[0]
 }

 }

 }

 }

 for (var v = 0; v < this.requestPropNonArray2.length; v++) {
 this.finalRequestWithoutArray.push(this.requestPropNonArray2[v].value)

 }

 console.log("Final requestLayout = ", this.requestLayout)
 console.log("this.finalRequestWithoutArray = ", this.finalRequestWithoutArray);


 var fields = {};

 console.log("this.finalRequest = ", this.finalRequest)
 console.log("this.finalRequestWithoutArray = ", this.finalRequestWithoutArray)

 if (this.requestLayout.length !== 0) {

 this.finalRequest2.push(this.finalRequest)
 }


 this.finalRequestWithoutArray.forEach((item) => {
 console.log("finalRequestWithoutArray , Item = ", item)
 var key1 = Object.keys(item)
 this.finalRequest2.push(item)
 })
 console.log("this.finalRequest2 = ", this.finalRequest2);

 if (arrayFlag == true) {
 fields['fields'] = this.finalRequest2
 }
 else if (arrayFlag == false) {
 var result = Object.assign({}, ...this.finalRequest2);

 console.log("result of Object.assign = ", result)

 fields["fields"] = result;
 }


 console.log("Fields, Request = ", fields)

 return fields;
 }
 yamlGenResponse() {
 this.responseProperty = [];
 this.responseDataFiltered = [];
 this.responseLayout = [];
 this.responsePropertyNonArray = [];
 this.responseExtraction = [];
 this.responsePropNonArray2 = [];
 this.finalResponseWithoutArray = [];
 this.finalResponse = {};
 this.responseRequest = [];
 this.finalResponse2 = []

 //To check if the file has array

 var arrayFlag: boolean = false;

 for (var ut = 0; ut < this.combinedDataAfterExtractionSourceResponse.length; ut++) {

 if (this.combinedDataAfterExtractionSourceResponse[ut].value == "array") {

 arrayFlag = true;
 ut = this.combinedDataAfterExtractionSourceResponse.length
 }
 }



 //step 1 - filter the mapped data from request array

 console.log("Inside YAML Gen Response")
 console.log("this.responseData = ", this.responseData)
 for (var t = 0; t < this.responseData.length; t++) {
 if (this.responseData[t].directRowNo !== "") {

 this.responseDataFiltered.push(this.responseData[t])
 }

 }
 console.log("this.responseDataFiltered = ", this.responseDataFiltered)
 console.log("this.combinedDataAfterExtractionSourceResponse = ", this.combinedDataAfterExtractionSourceResponse)
 //step 2 - check if any array from request data is present in flattened array

 // this.combinedDataAfterExtractionSource



 for (var y = 0; y < this.responseDataFiltered.length; y++) {

 for (var u = 0; u < this.combinedDataAfterExtractionSourceResponse.length; u++) {
 if (this.combinedDataAfterExtractionSourceResponse[u].key.includes(this.responseDataFiltered[y].sourceFieldName)) {
 for (var a = 0; a < this.combinedDataAfterExtractionSourceResponse.length; a++) {

 if (this.combinedDataAfterExtractionSourceResponse[a].value == "array") {
 var aSplit = this.combinedDataAfterExtractionSourceResponse[u].key.split(".");
 console.log("aSplit = ", aSplit)
 var splitted1 = aSplit[1];

 console.log("splitted1 = ", splitted1)

 var value11 = splitted1


 if (this.combinedDataAfterExtractionSourceResponse[a].key.includes(value11)) {


 var newArray = this.combinedDataAfterExtractionSourceResponse[a].key.split(".");
 var newValue = newArray[newArray.length - 2]


 var splitted = newValue.split(".");
 console.log(" ------- splitted Response--------- = ", splitted)
 var responseValue = newArray[0]
 var newValue2 = newArray[1]

 console.log("New newValue2 = ", newValue2)
 this.responseLayout.push({
 key: newValue, value:
 {
 [responseValue]:

 {
 [newValue2]: {
 "type": "array",
 "items": {
 "properties": {

 },
 "type": "object"
 }
 }
 }
 }
 })

 a = this.combinedDataAfterExtractionSourceResponse.length;
 u = this.combinedDataAfterExtractionSourceResponse.length;
 console.log("YAML Gen response ends")
 }
 }
 }
 }
 }
 console.log(" this.responseLayout = ", this.responseLayout)
 }
 //step 3 - segregate the array values having a corresponding flattened array type in a new json

 for (var d = 0; d < this.responseDataFiltered.length; d++) {

 for (var s = 0; s < this.combinedDataAfterExtractionSourceResponse.length; s++) {
 if (this.combinedDataAfterExtractionSourceResponse[s].key.includes("." + this.responseDataFiltered[d].sourceFieldName + ".") && ((this.responseDataFiltered[d].datatypeVerified) !== "array")) {
 // console.log("this.combinedDataAfterExtractionSourceResponse[u].key = ", this.combinedDataAfterExtractionSourceResponse[s].key)

 // console.log("this.responseDataFiltered[y].sourceFieldName = ", this.responseDataFiltered[d].sourceFieldName)
 for (var f = 0; f < this.combinedDataAfterExtractionSourceResponse.length; f++) {

 if (this.combinedDataAfterExtractionSourceResponse[f].key.includes(this.combinedDataAfterExtractionSourceResponse[s].key) && (this.combinedDataAfterExtractionSourceResponse[f].value !== "array")) {
 // console.log("this.combinedDataAfterExtractionSourceResponse[f].key = ", this.combinedDataAfterExtractionSourceResponse[f].key)

 // console.log("this.combinedDataAfterExtractionSourceResponse[s].key= ", this.combinedDataAfterExtractionSourceResponse[s].key)

 this.responseProperty.push({
 key: this.combinedDataAfterExtractionSourceResponse[s].key, value: {

 [this.responseDataFiltered[d].sourceFieldName]: {
 "type": this.responseDataFiltered[d].datatypeVerified,

 }
 }
 })


 }
 }


 }

 }

 console.log(" this.responseProperty = ", this.responseProperty)
 }
 //step 4 - Request non-array values from request data into a new json

 for (var g = 0; g < this.responseDataFiltered.length; g++) {

 for (var h = 0; h < this.combinedDataAfterExtractionSourceResponse.length; h++) {
 if (arrayFlag == true) {

 if (!((this.combinedDataAfterExtractionSourceResponse[h].key).includes(this.responseDataFiltered[g].sourceFieldName)) && ((this.responseDataFiltered[g].datatypeVerified) !== "array")) {

 for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse.length; j++) {

 if (this.combinedDataAfterExtractionSourceResponse[j].key.includes(this.combinedDataAfterExtractionSourceResponse[h].key) && ((this.combinedDataAfterExtractionSourceResponse[j].value) !== "array")) {


 this.responsePropertyNonArray.push({
 key: this.responseDataFiltered[g].sourceFieldName, value:
 {
 [this.responseDataFiltered[g].sourceFieldName]: {
 "type": this.responseDataFiltered[g].datatypeVerified,

 }
 }
 })
 j = this.combinedDataAfterExtractionSourceResponse.length
 h = this.combinedDataAfterExtractionSourceResponse.length
 }
 }


 }
 }
 else if (arrayFlag == false) {



 if (((this.combinedDataAfterExtractionSourceResponse[h].key).includes(this.responseDataFiltered[g].sourceFieldName)) && ((this.responseDataFiltered[g].datatypeVerified) !== "array")) {

 for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse.length; j++) {

 if (this.combinedDataAfterExtractionSourceResponse[j].key.includes(this.combinedDataAfterExtractionSourceResponse[h].key) && ((this.combinedDataAfterExtractionSourceResponse[j].value) !== "array")) {


 this.responsePropertyNonArray.push({
 key: this.responseDataFiltered[g].sourceFieldName, value:
 {
 [this.responseDataFiltered[g].sourceFieldName]: {
 "type": this.responseDataFiltered[g].datatypeVerified,

 }
 }
 })
 j = this.combinedDataAfterExtractionSourceResponse.length
 h = this.combinedDataAfterExtractionSourceResponse.length
 }
 }


 }
 }

 }



 }

 console.log("this.responseProperty = ", this.responseProperty)
 console.log("this.responsePropertyNonArray = ", this.responsePropertyNonArray)


 if (arrayFlag === true) {

 console.log("this.responsePropertyNonArray = ", this.responsePropertyNonArray)
 for (var l = 0; l < this.responsePropertyNonArray.length; l++) {
 var flag = false;
 for (var z = 0; z < this.responseProperty.length; z++) {

 var value1 = Object.keys(this.responsePropertyNonArray[l].value)
 var value2 = Object.keys(this.responseProperty[z].value)
 var value3 = this.responseProperty[z]

 if (value1[0] == value2[0]) {
 console.log("inside z if / flag = true")
 flag = true
 }
 }

 if (flag === false) {
 console.log("Inside Flag is false")
 this.responsePropNonArray2.push(this.responsePropertyNonArray[l])
 }
 }
 }
 else {
 console.log("Inside else of arrayFlag = false")

 this.responsePropNonArray2 = (this.responsePropertyNonArray)
 }
 console.log("this.responsePropNonArray2 = ", this.responsePropNonArray2)



 //step 5 - Arrange the values in the fields json
 console.log("this.responseProperty = ", this.responseProperty)
 console.log("this.responseLayout = ", this.responseLayout)

 for (var x = 0; x < this.responseProperty.length; x++) {

 if (this.responseLayout.length !== 0) {

 for (var c = 0; c < this.responseLayout.length; c++) {

 if (this.responseProperty[x].key.includes(this.responseLayout[c].key)) {
 console.log("Inside last if = ")
 console.log("Object.keys(this.responseProperty[x].value)[0] = ", Object.keys(this.responseProperty[x].value)[0]);
 console.log("Object.values(this.responseProperty[x].value)[0] = ", Object.values(this.responseProperty[x].value)[0]);
 console.log("this.responseLayout[c].key = ", this.responseLayout[c].key)

 var xyz = Object.keys(this.responseLayout[c].value)[0]
 var abc = Object.values(this.responseLayout[c].value)[0]
 // this.finalResponse = this.responseLayout[c].value

 this.finalResponse = this.responseLayout[c].value
 // this.finalResponse = abc

 var pqr = this.responseLayout[c].key.replace(xyz + ".", "")
 console.log("xyz = ", xyz)
 console.log("pqr = ", pqr)
 console.log("this.finalResponse[xyz].pqr = ", this.finalResponse[xyz][pqr])
 // this.finalResponse[pqr].items.properties[Object.keys(this.responseProperty[x].value)[0]] = Object.values(this.responseProperty[x].value)[0]
 this.finalResponse[xyz][pqr].items.properties[Object.keys(this.responseProperty[x].value)[0]] = Object.values(this.responseProperty[x].value)[0]


 }

 }

 }

 }

 for (var v = 0; v < this.responsePropNonArray2.length; v++) {
 this.finalResponseWithoutArray.push(this.responsePropNonArray2[v].value)

 }

 console.log("Final responseLayout = ", this.responseLayout)
 console.log("this.finalResponseWithoutArray = ", this.finalResponseWithoutArray);


 var fields = {};

 console.log("this.finalResponse = ", this.finalResponse)
 console.log("this.finalResponseWithoutArray = ", this.finalResponseWithoutArray)

 if (JSON.stringify(this.finalResponse) !== '{}') {
 this.finalResponse2.push(this.finalResponse)
 }

 this.finalResponseWithoutArray.forEach((item) => {
 console.log("finalResponseWithoutArray , Item = ", item)
 var key1 = Object.keys(item)
 this.finalResponse2.push(item)
 })
 console.log("this.finalResponse2 = ", this.finalResponse2);

 if (arrayFlag == true) {
 fields['responses'] = this.finalResponse2
 }
 else if (arrayFlag == false) {
 var result = Object.assign({}, ...this.finalResponse2);

 console.log("result of Object.assign = ", result)

 fields["responses"] = result;
 }

 console.log("Fields ,Response= ", fields)

 return fields;
 }
 segregateSourceRequestData(sourceRequestArray) {
 console.log("============== Inside Source segregate Client RequestData =============")
 var dataLength = sourceRequestArray;
 console.log("dataLength = ", dataLength)
 console.log("data of operations",sourceRequestArray[0].operations);


 for (var h = 0; h < dataLength.length; h++) {
 var operationsLength = sourceRequestArray[h].operations.length
 console.log("operationsLength",operationsLength);

 for (var j = 0; j < operationsLength; j++) {
 this.sourceMethod = sourceRequestArray[h].operations[j].method
 this.sourcePath = sourceRequestArray[h].operations[j].path

 console.log(" this.sourcePath = ", this.sourcePath)
 this.sourceFields = sourceRequestArray[h].operations[j].fields
 console.log("fields = ", this.sourceFields)
 for (var k = 0; k < this.sourceFields.length; k++) {


 console.log("========== abc ===========")

 this.extractedDataSource = this.nestedSegregationSource(this.sourceFields[k]);

 // var commaData = this.splitComma(this.extractedData);

 var keyData = Object.keys(this.extractedDataSource);
 var valueData = Object.values(this.extractedDataSource)
 console.log("keyData = ", keyData)
 console.log("valueData = ", valueData)


 for (var w = 0; w < keyData.length; w++) {
 this.combinedDataAfterExtractionSource.push({ key: keyData[w], value: valueData[w] })
 }
 console.log(" this.combinedDataAfterExtraction = ", this.combinedDataAfterExtractionSource)

 }
 var inc = 1;
 for (var q = 0; q < this.combinedDataAfterExtractionSource.length; q++) {

 var x = this.combinedDataAfterExtractionSource[q].key;
 var splitted = x.split(".");
 console.log(" ------- splitted --------- = ", splitted)
 var splitLength = splitted.length
 if (splitted[splitLength - 1] == "type") {

 this.splitData.push(splitted[splitLength - 2])

 this.requestDataSource.push({
 id: inc, sourceName: this.sourcePath, sfieldName: splitted[splitLength - 2],
 sdataType: this.combinedDataAfterExtractionSource[q].value
 })
 inc++;
 }

 }
 console.log("((((((( this.requestDataSource", this.requestDataSource);

 this.bindDataToRequestData();

 }

 }
 }
 /**
 * @author : Sucheta
 * @param data
 * @description: This function consist code of flatten the json
 */
 segregateSourceResponseData(sourceResponseArray) {

 console.log("============== segregateSourceResponseData=============")
 var dataLength = sourceResponseArray.length;
 console.log("dataLength = ", dataLength)
 
 for (var h = 0; h < dataLength; h++) {
 var responsesLength = sourceResponseArray[h].operations.length
 console.log("responsesLength",responsesLength);
 for (var j = 0; j < responsesLength; j++) {
 
 this.sourceFieldsResponse = sourceResponseArray[h].operations[j].responses
 // console.log("responses = ", this.sourceFieldsResponse)
 for (var k = 0; k < this.sourceFieldsResponse.length; k++) {
 
 
 console.log("========== koue ===========")
 var key = Object.keys(this.sourceFieldsResponse[k]);
 // console.log ()
 this.extractedDataSourceResponse = this.nestedSegregationSource(this.sourceFieldsResponse[k]);
 
 var keyData = Object.keys(this.extractedDataSourceResponse);
 var valueData = Object.values(this.extractedDataSourceResponse)
 console.log("keyData = ", keyData)
 console.log("valueData = ", valueData)
 
 
 for (var w = 0; w < keyData.length; w++) {
 this.combinedDataAfterExtractionSourceResponse.push({ key: keyData[w], value: valueData[w] })
 }
 console.log(" this.combinedDataAfterExtractionSource Response = ", this.combinedDataAfterExtractionSourceResponse)
 
 }
 var inc = 1;
 for (var q = 0; q < this.combinedDataAfterExtractionSourceResponse.length; q++) {
 
 var x = this.combinedDataAfterExtractionSourceResponse[q].key;
 var splitted = x.split(".");
 // console.log(" ------- splitted --------- = ", splitted)
 var splitLength = splitted.length
 if (splitted[splitLength - 1] == "type") {
 
 this.splitData.push(splitted[splitLength - 2])
 
 this.responseDataSource.push({
 id: inc, sourceName: this.sourcePath, sfieldName: splitted[splitLength - 2],
 sdataType: this.combinedDataAfterExtractionSourceResponse[q].value
 })
 inc++;
 }
 
 }
 console.log("responseDataSource = ", this.responseDataSource);
 this.responseData = this.sortSourceTargetData(this.responseDataSource, this.responseDataICICI)
 console.log("this.responseDataICICI",this.responseDataICICI)
 }
 
 }
 }
 /**
 * @author : Sanchita
 * @param data
 * @description: This function consist code of flatten the json
 */
 nestedSegregationSource(data) {


 var result = {};
 function recurse(cur, prop) {
 if (Object(cur) !== cur) {
 result[prop] = cur;
 } else if (Array.isArray(cur)) {
 for (var i = 0, l = cur.length; i < l; i++)
 recurse(cur[i], prop + "[" + i + "]");
 if (l == 0)
 result[prop] = [];
 } else {
 var isEmpty = true;
 for (var p in cur) {
 isEmpty = false;
 recurse(cur[p], prop ? prop + "." + p : p);
 }
 if (isEmpty && prop)
 result[prop] = {};
 }
 }
 recurse(data, "");


 console.log("********** Result ************* = ", result)
 return result;


 }
 bindDataToRequestData() {
 console.log("tempMappingRequestObjectData ====>", this.tempMapping1RequestObjectData.length)
 var getAllId = [];
 if (this.tempMapping1RequestObjectData.length === 0) {
 this.lines=[];
 console.log("this.requestDataICICI",this.requestDataICICI);
 this.requestData = this.sortSourceTargetData(this.requestDataSource, this.requestDataICICI);
 console.log("requestData",this.requestData);
 } else {
 console.log("inside else loop");
 this.requestData = this.tempMapping1RequestObjectData;
 for (var i = 0; i < this.requestData.length; i++) {
 if (this.requestData[i].directRowNo != "") {
 getAllId.push({ id: this.requestData[i].directRowNo });
 }
 }
 this.lines = getAllId.filter((x, i, a) => x && a.indexOf(x) === i);
 console.log("this.lines array if already binded", this.lines);
 }
 }
 /**
 * @author Sucheta
 * @description This function will be called to merge responseDataSource and responseDataTarget
 */
 sortSourceTargetData(clientData, iciciData) {
 this.outputData = [];
 console.log("source", clientData);
 console.log("target", iciciData);
 let arr3 = [];
 
 //sucheta combine array
 
 let combinedArray = [];
 var largerLength;
 if (clientData.length >= iciciData.length) {
 largerLength = clientData.length;
 }
 else {
 largerLength = iciciData.length
 }
 console.log("clientData.length = ", clientData.length);
 console.log("iciciData.length = ", iciciData.length);
 console.log("largerLength = ", largerLength)
 console.log("q = ", q)
 
 
 for (var q = 0; q < largerLength; q++) {
 console.log("Inside for loop of q");
 
 console.log("clientData[q] = ", clientData[q])
 console.log("iciciData[q] = ", iciciData[q])
 if (clientData[q] == undefined && clientData[q] == undefined && iciciData[q] != undefined) {
 console.log("Inside first outputData")
 
 this.outputData.push({
 id: q + 1,
 sourceName: "",
 sfieldName: "",
 sdataType: "",
 targetName: iciciData[q].targetName,
 tfieldName: iciciData[q].tfieldName,
 tdataType: iciciData[q].tdataType,
 tfieldSize: iciciData[q].tfieldSize,
 urgencyName: iciciData[q].urgencyName,
 descriptionName: iciciData[q].descriptionName,
 directRowNo: "",
 expectedValue: null,
 sourceFieldPath: "-",
 sourceFieldName: "-",
 tfieldNameMapping: "-",
 datatypeVerified: "-",
 backgroundColor: "true"
 
 })
 }
 else if (iciciData[q] == undefined && clientData[q] != undefined) {
 console.log("Inside 2nd OutputData")
 
 this.outputData.push({
 id: q + 1,
 sourceName: clientData[q].sourceName,
 sfieldName: clientData[q].sfieldName,
 sdataType: clientData[q].sdataType,
 targetName: "",
 tfieldName: "",
 tdataType: null,
 tfieldSize: "",
 urgencyName: "",
 descriptionName: null,
 directRowNo: "",
 expectedValue: null,
 sourceFieldPath: "-",
 sourceFieldName: "-",
 tfieldNameMapping: "-",
 datatypeVerified: "-",
 backgroundColor: "true"
 
 })
 }
 else {
 console.log("Inside else of outputData")
 this.outputData.push({
 
 id: q + 1,
 sourceName: clientData[q].sourceName,
 sfieldName: clientData[q].sfieldName,
 sdataType: clientData[q].sdataType,
 targetName: iciciData[q].targetName,
 tfieldName: iciciData[q].tfieldName,
 tdataType: iciciData[q].tdataType,
 tfieldSize: iciciData[q].tfieldSize,
 urgencyName: iciciData[q].urgencyName,
 descriptionName: iciciData[q].descriptionName,
 directRowNo: "",
 expectedValue: null,
 sourceFieldPath: "-",
 sourceFieldName: "-",
 tfieldNameMapping: "-",
 datatypeVerified: "-",
 backgroundColor: "true"
 
 })
 }
 }
 
 console.log("======== END of OutputData = ", this.outputData)
 //sucheta ends
 
 
 
 return this.outputData;
 }
 getICICIRequestResponseData() {
 console.log("Inside getICICIRequestResponseData")
 var service = "ECollection intimation"
 this.newmappingService.getMappingSourceData(service).then((data) => {
 console.log("Data = ", data);
 this.requestDataICICI = data[0].request;
 this.responseDataICICI = data[0].response;
 console.log("---->",this.requestDataICICI);
 
 
 }).catch(err => {
 console.log("PRINT : ERROR WHILE RETRIEVING MAPPING DATA FROM DB ", err);
 // this.toastr.error("ERROR WHILE RETRIEVING MAPPING DATA...PLEASE CHECK INTERNET ACCESS ");
 $("#a").css("display", "block").delay(2000).fadeOut(200);
 this.isLoading = false;
 
 })
 }
}

