import { Component, OnInit, HostListener } from '@angular/core';
import * as tableData from './mapping-table';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Pipe, PipeTransform } from '@angular/core';
import * as jspdf from 'jspdf';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { mappingService } from './mapping.service'
import 'jspdf-autotable';
import { config } from "config";
import {
  NgxSpinnerService
} from "ngx-spinner";
import { MakerService } from "../maker-page/maker-page.service"
// <!-- ####### changes by sanchita 16-December-2019 For Display -->
import { Output, EventEmitter } from '@angular/core';
import { elementStyleProp } from '@angular/core/src/render3';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css'],
  providers: [mappingService]

})

/**
 * @author : Suchheta
 * @description: Mapping Component for mapping source and target.
 */
export class MappingComponent implements OnInit {
  // <!-- ####### changes by sanchita 16-December-2019 For Display -->
  @Output() someEvent = new EventEmitter<string>();
  // @HostListener('window:beforeunload', ['$event'])
  // public before() {
  //   return false
  // }
  // @HostListener('window:unload', ['$event'])
  // public after() {
  //   this.makerService.MyMethod()
  // }
  regVan = /^[a-zA-Z0-9]+$/;
  source = [];
  requestData = [];
  requestDataSource = [];
  requestDataTarget = [];
  //file
  targetFileName;
  sourceFileName;
  isLoading: boolean = false;

  //pagination
  p: number = 1;
  //Add Data
  addModalData: FormGroup
  isReadOnly
  itemsForUrgency = ['Optional', 'Mandatory'];
  dataTypeValue = [];
  //Edit Data
  editModalData: FormGroup
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
  dataOfUser = [];
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

  requiredFieldCheck() {
    console.log("requestData", this.requestData);
    for (var i = 0; i < this.requestData.length; i++) {
      if (this.requestData[i].directRowNo != "") {
        if (this.requestData[i].urgencyName.includes("Mandatory") && (this.requestData[i].sourceFieldName == "-")) {
          this.disabledMappingCheck = true;
          $("#captureButton").addClass("disabled");
          $("#generateButton").addClass("disabled");
          $("#generateButton1").addClass("disabled");
        

          console.log("disabled")
          break;
        }
        else {
          this.disabledMappingCheck = false;
          $("#captureButton").removeClass("disabled");
          $("#generateButton").removeClass("disabled");
          $("#generateButton1").removeClass("disabled");


        }
      }
    }
  }
  // requiredFieldCheck() {

  //   for (var i = 0; i < this.requestData.length; i++) {
  //     if (this.requestData[i].urgencyName != "") {
  //       if (this.requestData[i].urgencyName.includes("Mandatory") && (this.requestData[i].sourceFieldName == "-")) {
  //        console.log("----------checked-------");
  //         this.disabledMappingCheck = true;
  //         break;
  //       }
  //       else {
  //         console.log("----------checked1-------");
  //         this.disabledMappingCheck = false;
  //       }
  //     }
  //   }
  // }






  ngOnInit() {
    $("#a").css("display", "none");
    $("#b").css("display", "none");
    $("#c").css("display", "none");
    $("#d").css("display", "none");
    $("#e").css("display", "none");
    $("#f").css("display", "none");
    $("#g").css("display", "none");
    $("#save").css("display", "none");

    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    this.getICICIRequestResponseData();
    this.dataofUser = localStorage.getItem("dataofUser");
    this.dataOfUser = JSON.parse(this.dataofUser);
    this.projectId = this.dataOfUser[0].projectId;

    console.log("PRINT : USER DATA ", this.dataOfUser);

    localStorage.setItem("projectIdFromMapping", this.projectId);
    this.retryRule = localStorage.getItem('retryRule');
    console.log("PRINT :  RETRY-RULE  ", this.retryRule);
    this.mappingService.getProjectData(this.projectId).then((data) => {
      console.log("Mapping getProjectData = ", data)
      this.projectData=data;
      this.productName = data[0].productName
      this.serviceName = data[0].products[0].services[0].serviceName;
      this.webServiceType = data[0].products[0].services[0].webServiceType;
      this.serviceUrl = data[0].products[0].services[0].serviceURLUAT;
      this.service_prod_url = data[0].products[0].services[0].serviceURLProd;

      this.mappingService.getMappingData(this.projectId).then((getMappingDataResult) => {
        console.log("getMappingDataResult =====>", getMappingDataResult);
        if (getMappingDataResult.message == "Data not found.") {
          console.log("inside no result found");
          this.disabledMappingCheck = true;
          this.alreadyDataPresent = false;
          $("#captureButton").addClass("disabled");
          $("#generateButton").addClass("disabled");
          $("#generateButton1").addClass("disabled");

          console.log("disabled")

        } else {
          console.log("changes made for disabling buttons if data is saved for 1st login and if next login happens")
          this.alreadyDataPresent = true;
          // changes made for disabling buttons if data is saved for 1st login and if next login happens 
          // this.disabledMappingCheck=false;
          this.mappingService.getProjectData(this.projectId).then((data) => {

            // console.log(" PROJECT DATA ", data[0]);

            // console.log(" PROJECT NAME ", data[0].projectName)
            // console.log("event name", data[0].event);

            if (data[0].event == "recording_test_results_TXN_REV-UAT" || data[0].event == "recording_test_results-UAT" || data[0].event == "recording_test_results_TXN_REV-SIT" || data[0].event == "recording_test_results-SIT" || data[0].status === "Ready for Production Request Initiated" || data[0].status === "Ready for Production Verified" || data[0].status == "SUCCESS") {
              console.log("inside the condition");

              this.disabledMappingCheck = true;
              $("#generateButton").addClass("disabled");
              $("#generateButton1").addClass("disabled");

              $("#captureButton").addClass("disabled");

              this.isReadOnly = true;
            }

            else {
              console.log("for this condition")
              this.disabledMappingCheck = false;
              $("#captureButton").removeClass("disabled");
              $("#generateButton").removeClass("disabled");
              $("#generateButton1").removeClass("disabled");



            }

        //     }

          });
        }
        if (getMappingDataResult.length) {
          if (getMappingDataResult[0].mappingObj) {

            this.tempMapping1RequestObjectData = getMappingDataResult[0].mappingObj.mapping1RequestObject;
            this.bindDataToRequestData();
            console.log("1st call");
          } else {
            this.bindDataToRequestData();
            console.log("2nd calll");
          }
        } else {
          this.bindDataToRequestData();
          console.log("3rd call")
        }

        console.log("this.webServiceType = ", this.webServiceType)
        this.mappingService.getServiceDetails(this.serviceId).then((data) => {
          // this.serviceName = data[0].serviceName;
          console.log("Mapping getServiceDetails = ", data);
          console.log("this.serviceName", this.serviceName);

          // this.mappingService.getUserDetails().then((data) => {


          //   console.log("getUserDetails() = ", data)
          //   for (var i = 0; i < data.length; i++) {
          //     if (this.projectId == data[i].projectId) {

          //       console.log("data[i] = ", data[i])
          this.mappingService.getUserDataByName(this.dataOfUser[0].emailIdBusinessSpoc).then((data) => {
            console.log("getUserDataByName = ", data);

            this.username = data[0].emailIdBusinessSpoc;
            this.organisation = data[0].organisation;


            this.clientCodeIPS = data[0].clientCodeIPS;

            this.clientCodeProfunds = data[0].clientCodeProfund;

            this.txnReversal = data[0].enableTransactionReversalFileProcessing;


            this.poolAccountNumber = data[0].poolAccountNumber;

            this.ifscCode = data[0].IFSCCode
              ;

            console.log("this.clientCodeIPS =  ", this.clientCodeIPS);
            console.log("this.clientCodeProfunds = ", this.clientCodeProfunds);
            if (this.clientCodeProfunds != "") {
              this.clientCode = this.clientCodeProfunds;
            }
            else if (this.clientCodeIPS != "") {
              this.clientCode = this.clientCodeIPS;
            }

            localStorage.setItem("clientCode", this.clientCode);
            console.log("this.clientCode = ", this.clientCode);

            if (this.serviceName == "ECollection Intimation") {
              console.log("Inside first if")

              this.getClientFileService(this.projectId);
            }
            else if (this.serviceName == "ECollection with Remitter Validation" && this.txnReversal != true) {
              console.log("Inside second if")
              this.router.navigate(['/authentication/Mapping-2', { projectId: this.projectId, productName: this.productName, serviceName: this.serviceName, username: this.username, org: this.organisation, clientCode: this.clientCode, webServiceType: this.webServiceType, serviceUrl: this.serviceUrl, accountNumber: this.poolAccountNumber, ifscCode: this.ifscCode }]);
            }
            else if (this.serviceName == "ECollection with Remitter Validation in Intermediary Account" && this.txnReversal != true) {
              console.log("Inside third if")
              this.router.navigate(['/authentication/Mapping-3', { projectId: this.projectId, productName: this.productName, serviceName: this.serviceName, username: this.username, org: this.organisation, clientCode: this.clientCode, webServiceType: this.webServiceType, serviceUrl: this.serviceUrl, accountNumber: this.poolAccountNumber, ifscCode: this.ifscCode }]);
            }
            else if (this.serviceName == "ECollection with Two Level Validation at Bank and Client’s End" && this.txnReversal != true) {
              console.log("Inside fourth if")
              this.router.navigate(['/authentication/Mapping-4', { projectId: this.projectId, productName: this.productName, serviceName: this.serviceName, username: this.username, org: this.organisation, clientCode: this.clientCode, webServiceType: this.webServiceType, serviceUrl: this.serviceUrl, accountNumber: this.poolAccountNumber, ifscCode: this.ifscCode }]);
            }
            else if (this.serviceName == "iSurePay-Real Time Cheque and Cash Collection Validation" && this.txnReversal != true) {
              console.log("Inside iSurePay-Real 1")
              this.router.navigate(['/authentication/iSurePay-1', { projectId: this.projectId, productName: this.productName, serviceName: this.serviceName, username: this.username, org: this.organisation, clientCode: this.clientCode, webServiceType: this.webServiceType, serviceUrl: this.serviceUrl, accountNumber: this.poolAccountNumber, ifscCode: this.ifscCode }])
            }
            else if (this.serviceName == "iSurePay-Real time cheque and cash collection two level validation at Client and Bank’s end" && this.txnReversal != true) {
              console.log("Inside iSurePay-Real 2")
              this.router.navigate(['/authentication/iSurePay-2', { projectId: this.projectId, productName: this.productName, serviceName: this.serviceName, username: this.username, org: this.organisation, clientCode: this.clientCode, webServiceType: this.webServiceType, serviceUrl: this.serviceUrl, accountNumber: this.poolAccountNumber, ifscCode: this.ifscCode }])
            }
            else if (this.serviceName == "ECollection with Remitter Validation in Intermediary Account" && this.txnReversal == true) {

              console.log("Inside Ecollection with txn reversal")
              this.router.navigate(['/authentication/Mapping-5', { projectId: this.projectId, productName: this.productName, serviceName: this.serviceName, username: this.username, org: this.organisation, clientCode: this.clientCode, webServiceType: this.webServiceType, serviceUrl: this.serviceUrl, accountNumber: this.poolAccountNumber, ifscCode: this.ifscCode }])
            }
          }).catch(err => {
            this.toastr.error("ERROR", err);

          })
          // }
          // }
          // })
        })
      })
    })



  }

  constructor(private makerService: MakerService,private modalService: NgbModal, private fb: FormBuilder, private router: Router,
    private http: HttpClient, private mappingService: mappingService,
    private _route: ActivatedRoute, private spinner: NgxSpinnerService, public toastr: ToastrService) {



    this.addModalData = this.fb.group({
      'sourceName': ['', [Validators.required]],
      'sfieldName': ['', [Validators.required]],
      'sdataType': ['', [Validators.required]],
      'targetName': ['', [Validators.required]],
      'tfieldName': ['', [Validators.required]],
      'tdataType': ['', [Validators.required]],
      'urgencyName': ['', [Validators.required]],
      'descriptionName': ['', [Validators.required]]
    })


    this.editModalData = this.fb.group({
      'sourceNameEdit': ['', [Validators.required]],
      'sfieldNameEdit': ['', [Validators.required]],
      'sdataTypeEdit': ['', [Validators.required]],
      'targetNameEdit': ['', [Validators.required]],
      'tfieldNameEdit': ['', [Validators.required]],
      'tdataTypeEdit': ['', [Validators.required]],
      'urgencyNameEdit': ['', [Validators.required]],
      'descriptionNameEdit': ['', [Validators.required]]
    })



    this.projectIdData = [
      {

        "operations": [
          {
            "operationId": "addPet",
            "method": "post",
            "path": "/pet",
            "fields": [
              {
                "Virtual Account Number Verification OUT": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "Client Code": {
                        "type": "string"
                      },
                      "Virtual Account Number": {
                        "type": "string"
                      }
                    }
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
                        }
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ]

  }
  settings = tableData.settings;
  /**
  * @author Sanchita
  * @param flowId 
  * @description This function is called for the source value
  */

  getClientFileService(projectId) {
    var type="uatFile1";
    this.mappingService.getFileDataByProjectId(projectId,type).then(async (data) => {
      console.log("this.getFileDataByProjectId", data.reverse());
      if (data.length >= 1) {
        console.log("Production file is uploaded", data.length);
        console.log("this.projectData",this.projectData);
      // changes for wsdl done here 6-Feb-2020
        var str=this.projectData[0].products[0].services[0].uatFile1
        str = str.substr(str.indexOf('.') + 1);
        console.log("str",str);

        if(str == "wsdl" ){
          console.log("data value",data[0].operations[0]);
          this.fileDataByProjectId.push({operations:[data[0].operations[0]]});
        }
        else{
          this.fileDataByProjectId.push(data[0]);
        }
     
        console.log("File DATA", this.fileDataByProjectId);
        await this.segregateSourceRequestData(this.fileDataByProjectId)
        await this.segregateSourceResponseData(this.fileDataByProjectId)
      }
    })

    //Dummy
    // this.segregateSourceRequestData(this.projectIdData)
    // this.segregateSourceResponseData(this.projectIdData)


  }
  getICICIRequestResponseData() {
    console.log("Inside getICICIRequestResponseData")
    var service = "ECollection intimation"
    this.mappingService.getMappingSourceData(service).then((data) => {
      console.log("Data = ", data);
      this.requestDataICICI = data[0].request;
      this.responseDataICICI = data[0].response


    }).catch(err => {
      console.log("PRINT : ERROR WHILE RETRIEVING MAPPING DATA FROM DB ", err);
      // this.toastr.error("ERROR WHILE RETRIEVING MAPPING DATA...PLEASE CHECK INTERNET ACCESS ");
      $("#a").css("display", "block").delay(2000).fadeOut(200);
      this.isLoading = false;

    })
  }
  // <!-- ####### changes by sanchita 16-December-2019 For Display -->
  gotoNextTab() {
    console.log("gotoNextTab")
    this.someEvent.next('testing');
  }

  /**
  * @author Sanchita
  * @param sourceArray
  * @description This function is called to segregate the sourceArray Data
  */

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
        console.log("(((((((  this.requestDataSource", this.requestDataSource);

        this.bindDataToRequestData();

      }

    }
  }

  bindDataToRequestData() {
    console.log("tempMappingRequestObjectData ====>", this.tempMapping1RequestObjectData.length)
    var getAllId = [];
    if (this.tempMapping1RequestObjectData.length === 0) {
      this.lines=[];
      this.requestData = this.sortSourceTargetData(this.requestDataSource, this.requestDataICICI);
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
      }

    }
  }



  /**
  * @author Sanchita
  * @description This function will be called to merge responseDataSource and responseDataTarget
  */


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

    console.log("========  END of OutputData = ", this.outputData)
    //sucheta ends



    return this.outputData;
  }

  /**
  * @author : Suchheta
  * @description: flatten the json.
  */
  nestedSegregation(data) {


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




  /**
  * @author : Suchheta
  * @description: Create and download PDF.
  */
  capture() {
    console.log("pdf generation --->", this.requestData);
    var exactCaptureData = [];
    for (var i = 0; i < this.requestData.length; i++) {
      if (this.requestData[i].directRowNo != "") {
        exactCaptureData.push(this.requestData[i]);
      }
      else {

      }
    }
    console.log("exactCaptureData---->", exactCaptureData);
    var doc = new jspdf('l', 'pt', 'a4');
    var imgData = 'data:image/png;base64,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'
    doc.addImage(imgData, 'PNG', 40, 7, 150, 40);
    doc.setFontType('bold')
    doc.setTextColor('#053c6d')
    // doc.setMargin(100)
    doc.text(40, 80, 'Request');


    var cols = [
      { title: 'Field Row No.', dataKey: 'directRowNo' }, { title: 'ICICI Field Name', dataKey: 'tfieldNameMapping' }, { title: 'Client Field Name', dataKey: 'sourceFieldName' }, { title: 'Data Type Verified', dataKey: 'datatypeVerified' }, { title: 'Description', dataKey: 'descriptionName' }]

    var tableData = [];
    for (var i = 0; i < exactCaptureData.length; i++) {
      // tableData.push({
      //   'id': this.requestData[i].id, 'sourceName': this.requestData[i].sourceName, 'sfieldName': this.requestData[i].sfieldName, 'sdataType': this.requestData[i].sdataType,
      //   'targetName': this.requestData[i].targetName, 'tfieldName': this.requestData[i].tfieldName, 'tdataType': this.requestData[i].tdataType, 'urgencyName': this.requestData[i].urgencyName,
      //   'descriptionName': this.requestData[i].descriptionName, 'directRowNo': this.requestData[i].directRowNo, 'sourceFieldPath': this.requestData[i].sourceFieldPath,
      //   'sourceFieldName': this.requestData[i].sourceFieldName, 'tfieldNameMapping': this.requestData[i].tfieldNameMapping, 'datatypeVerified': this.requestData[i].datatypeVerified, 'backgroundColor': this.requestData[i].backgroundColor
      // })
      tableData.push({
        'id': exactCaptureData[i].id, 'sourceName': exactCaptureData[i].sourceName, 'sfieldName': exactCaptureData[i].sfieldName, 'sdataType': exactCaptureData[i].sdataType,
        'targetName': exactCaptureData[i].targetName, 'tfieldName': exactCaptureData[i].tfieldName, 'tdataType': exactCaptureData[i].tdataType, 'urgencyName': exactCaptureData[i].urgencyName,
        'descriptionName': exactCaptureData[i].descriptionName, 'directRowNo': exactCaptureData[i].directRowNo, 'sourceFieldPath': exactCaptureData[i].sourceFieldPath,
        'sourceFieldName': exactCaptureData[i].sourceFieldName, 'tfieldNameMapping': exactCaptureData[i].tfieldNameMapping, 'datatypeVerified': exactCaptureData[i].datatypeVerified, 'backgroundColor': this.requestData[i].backgroundColor
      })
    }
    console.log("tableData = ", tableData)
    doc.autoTable(cols, tableData, {
      margin: { top: 90 },
      columnStyles: {
        1: { columnWidth: 80 },
        0: { columnWidth: 80 },
        2: { columnWidth: 80 },
        3: { columnWidth: 80 },
        // 4: {columnWidth: 80}

      }

    })


    // var cols = [{ title: 'Id', dataKey: 'id' },
    // { title: 'ICICI Resolved Path', dataKey: 'sourceName' }, { title: 'ICICI Field Name', dataKey: 'sfieldName' },
    // { title: 'Source Data Type', dataKey: 'sdataType' }, { title: 'Client Field  Path', dataKey: 'targetName' },
    // { title: 'Client Field Technical Name', dataKey: 'tfieldName' }, { title: 'Target Data Type', dataKey: 'tdataType' }, { title: 'Condition', dataKey: 'urgencyName' },
    // { title: 'Description', dataKey: 'descriptionName' }, { title: 'Field Row No.', dataKey: 'directRowNo' },
    // { title: 'Client Field Path', dataKey: 'sourceFieldPath' }, { title: 'ICICI Field Name', dataKey: 'tfieldNameMapping' }, { title: 'Source Field Name', dataKey: 'sourceFieldName' },
    // { title: 'Data Type Verified', dataKey: 'datatypeVerified' }]






    doc.save("table.pdf");

    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));

  }


  /**
   * @author : Sucheta
   * @description : Navbar for ui
   */

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
//   isNumber(evt) {
//     evt = (evt) ? evt : window.event;
//     var charCode = (evt.which) ? evt.which : evt.keyCode;
//     if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//         // return false;
//         this.number=false
//     }
//     // return true;
//     else{
//     this.number=true
//     }

// }

  /**
   * @author : Sucheta
   * @description : Mapping for Request
   */
  enterDirectRowNumberRequest(data, event) {
    console.log("this.lines", this.lines);
    console.log("event value",event);
    // event = (event) ? event : window.event;
    // var charCode = (event.which) ? event.which : event.keyCode;
    console.log(data)
    var regInteger = /^-?\d+$/;
    var result=regInteger.test(event);
    console.log(result)
    // if (charCode != 46 && charCode > 31 
    //   && (charCode < 48 || charCode > 57)) {
    //   // return false;
    //   this.number=false
    //   console.log("if",this.number)
    //   }
    //   else{
    //  this.number=true
    //  console.log("else",this.number)

    //   }

    if (data.sfieldName != undefined && event != undefined && event != null && event != "") {
      
      // this.isNumber(event)

      for (var q = 0; q < this.requestData.length; q++) {
        if (this.requestData[q].id == data.id && event != undefined && event != null) {
          console.log("this.requestData value", this.requestData[q]);
          console.log("data value", data);
          this.requestData[q].directRowNo = event;


          if (event >= this.requestData.length + 1 || event <= 0 || result == false) {
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
                    
                    this.requestData[q].directRowNo = event;
                    this.requestData[q].sourceFieldPath = this.requestData[event - 1].sourceName;
                    this.requestData[q].sourceFieldName = this.requestData[event - 1].sfieldName;
                    this.requestData[q].datatypeVerified = this.requestData[event - 1].sdataType;
                    this.requestData[q].tfieldNameMapping = this.requestData[q].tfieldName;

                    if (this.requestData[q].tdataType != null) {
                      this.lines.push({ id: event });
                      // console.log("Print :  ", this.requestData[q])
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
                  this.requiredFieldCheck();
                  alert(" Cannot map to an object")

                }
              }
              else {
                this.requestData[q].directRowNo = '';
                this.requiredFieldCheck();
                alert("Cannot map to an array")
              }
            } else {
              this.requestData[q].directRowNo = '';
              this.requiredFieldCheck();
              alert("Cannot map to an empty field")

            }
          }
        }
      }
    }
    else {

      alert("To clear , please click on delete button !")

    }


    this.requiredFieldCheck();
  }

  /**
   * @author :  Sucheta
   * @description : Clear value of Request
   * @param data 
   *
   */

  deleteValueRequest(data) {
    console.log("data", data.directRowNo);
    // changes for deletion of the id for further mapping
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
    // ends here
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


    for (var q = 0; q < this.requestData.length; q++) {
      if (this.requestData[q].directRowNo != "") {
        // console.log("empty",q,this.responseData[q].directRowNo);
        this.disabledMappingCheck = false;
        $("#captureButton").removeClass("disabled");
        $("#generateButton").removeClass("disabled");
        $("#generateButton1").removeClass("disabled");


        break;
      }
      else {
        // console.log("not empty",q,this.responseData[q].directRowNo);
        this.disabledMappingCheck = true;
        $("#captureButton").addClass("disabled");
        $("#generateButton").addClass("disabled");
        $("#generateButton1").addClass("disabled");


      }
    }
    console.log("lines====>", this.lines);
  }

  /**
   * @author :  Sucheta
   * @description : Mapping for Response
   * @param :  data, event
   */
  enterDirectRowNumberResponse(data, event) {
    console.log("Inside enterDirectRowNumberResponse", event)
    console.log("data = ", data);


    if (data.sfieldName != undefined && event != undefined && event != null && event != "") {


      for (var q = 0; q < this.responseData.length; q++) {
        if (this.responseData[q].sfieldName == data.sfieldName && event != undefined && event != null) {
          if (this.responseData[event - 1].sdataType != "array") {
            if (this.responseData[event - 1].sdataType != "object") {


              this.responseData[q].directRowNo = event;
              this.responseData[q].sourceFieldPath = this.responseData[event - 1].sourceName;
              this.responseData[q].sourceFieldName = this.responseData[event - 1].sfieldName;
              this.responseData[q].datatypeVerified = this.responseData[event - 1].sdataType;
              this.responseData[q].tfieldNameMapping = this.responseData[q].tfieldName;
              if (this.responseData[q].tdataType != null) {


                // if ((this.responseData[q].tdataType.includes("varchar") && (this.responseData[event - 1].sdataType == "string" || this.responseData[event - 1].sdataType == "number")) || (this.responseData[event - 1].sdataType.includes("varchar") && (this.responseData[q].tdataType == "string" || this.responseData[q].tdataType == "number"))) {

                //   this.responseData[q].backgroundColor = "true"
                // }
                // else {
                //   this.responseData[q].backgroundColor = "false"
                // }
              }
              console.log("final responsedata = ", this.responseData[q])
            }
            else {
              alert("Cannot map to an object")
            }

          }
          else {
            alert("Cannot map to an array")
          }
        }

      }
    }
    else {
      alert("To clear , please click on delete button !")
    }
  }

  /**
   * @author : Sucheta
   * @description : Clear the Response data
   * 
   */
  deleteValueResponse1(data) {

    for (var q = 0; q < this.responseData.length; q++) {
      if (this.responseData[q].sfieldName == data.sfieldName && this.responseData[q].tfieldName == data.tfieldName) {

        this.responseData[q].directRowNo = "";
        this.responseData[q].tfieldNameMapping = "-";
        this.responseData[q].sourceFieldPath = "-";
        this.responseData[q].sourceFieldName = "-";
        this.responseData[q].datatypeVerified = "-";

        this.responseData[q].backgroundColor = "true"
        console.log("final responsedata = ", this.responseData[q])
      }

    }
  }

  /**
  * @author : Suchheta
  * @description: Reset Function for Request.
  */
  allowMappingRequest: boolean = false;
  resetButton(resetIdValue) {
    this.allowMappingRequest = false;

    for (var k = 0; k < this.requestData.length; k++) {
      if (resetIdValue == this.requestData[k].id) {
        this.allowMappingRequest = true;
        break;
      }
      else {
        this.allowMappingRequest = false;
      }

    }


    console.log("this.resetButtonClick", this.resetButtonClick);

    if (this.allowMappingRequest == true) {

      for (var i = 0; i < this.requestData.length; i++) {

        if (this.requestData[i].sfieldName === this.resetButtonClick && this.resetButtonClick != undefined) {
          this.requestData[i].directRowNo = resetIdValue;
          this.requestData[i].sourceFieldPath = this.requestData[resetIdValue - 1].sourceName;
          this.requestData[i].sourceFieldName = this.requestData[resetIdValue - 1].sfieldName
          this.requestData[i].datatypeVerified = this.requestData[resetIdValue - 1].sdataType;
          this.requestData[i].tfieldNameMapping = this.requestData[i].tfieldName;
          if (this.requestData[i].sdataType != this.requestData[resetIdValue - 1].tdataType) {
            this.requestData[i].backgroundColor = "false"
          }
          else {
            this.requestData[i].backgroundColor = "true";
          }
        }
      }
    }
    else {
      alert("Mapping not allowed. Incorrect Number");
    }
    this.resetId = null;
    console.log("this.requestData", this.requestData);

    this.modalService.dismissAll();

  }

  /**
     * @author : Suchheta
     * @description: Reset Function for Response.
     */


  resetButtonResponse(resetIdValue) {


    console.log("this.resetButtonClick Response", this.resetButtonClickResponse);
    for (var i = 0; i < this.responseData.length; i++) {
      if (this.responseData[i].sfieldName === this.resetButtonClickResponse && this.resetButtonClickResponse != undefined) {
        this.responseData[i].directRowNo = resetIdValue;
        this.responseData[i].sourceFieldPath = this.responseData[resetIdValue - 1].sourceName;
        this.responseData[i].sourceFieldName = this.responseData[resetIdValue - 1].sfieldName
        this.responseData[i].datatypeVerified = this.responseData[resetIdValue - 1].sdataType
        this.responseData[i].tfieldNameMapping = this.responseData[i].tfieldName;
        if (this.responseData[i].sdataType != this.responseData[resetIdValue - 1].tdataType) {
          this.responseData[i].backgroundColor = "false"
        }
        else {
          this.responseData[i].backgroundColor = "true";
        }
      }
    }
  }




  /**
   * @author Suucheta A Shrivastava
   * @param event
   * @param data 
   */

  enterExpectedValueRequest(data, event) {

    console.log("Inside enterExpectedValueRequest = ,event", event)
    for (var i = 0; i < this.requestData.length; i++) {
      if (this.requestData[i].sfieldName === data.sfieldName) {
        this.requestData[i].expectedValue = event;
      }
    }
  }


  /**
   * @author Suucheta A Shrivastava
   * @param data 
   * @param event
   */

  enterExpectedValueResponse(data, event) {

    console.log("Inside enterExpectedValueResponse = ,event", event)
    for (var i = 0; i < this.responseData.length; i++) {
      if (this.responseData[i].sfieldName === data.sfieldName) {
        this.responseData[i].expectedValue = event;
      }
    }
  }


  /**
   * @author : Sucheta
   * @description : description in ICICI request modal
   * @params : index,data,modal
   */



  descriptionRequest(a, data, iRequest) {

    this.modalService.open(iRequest, { size: 'sm' });
    this.descriptionICICIRequest = data.descriptionName
    this.fsizeICICIRequest = data.tfieldSize;
    this.dataTypeICICIRequest = data.tdataType
  }


  /**
   * @author : Sucheta
   * @description : 
   * @param a 
   * @param data 
   * @param iResponse 
   */

  detailsClientRequest(a, data, clientReq) {

    console.log("Inside detailsClientRequest = ", data.sdataType);
    this.modalService.open(clientReq, { size: 'sm' });
    this.dataTypeClientRequest = data.sdataType

  }


  /**
   * @author : Sucheta
   * @description : description in response modal
   * @params : index, data, modal
   */

  descriptionResponse(a, data, iResponse) {


    this.modalService.open(iResponse, { size: 'sm' });
    this.descriptionNameResponse = data.descriptionName
    this.dataTypeICICIResponse = data.tdataType;
    this.fsizeICICIResponse = data.tfieldSize
    this.urgencyNameICICIResponse = data.urgencyName
  }

  /**
   * @author : Sucheta
   * @description : description in response modal
   * @params : index, data, modal
   */


  detailsClientResponse(a, data, clientResponse) {

    console.log("Inside detailsClientResponse ")
    console.log("data.sdataType = ", data.sdataType)
    this.modalService.open(clientResponse, { size: 'sm' });
    this.dataTypeClientResponse = data.sdataType

  }

  /**
   * @author : Sucheta
   * @description : Open Modal for target Url
   * 
   */


  getClientUrl(clientUrlOpen) {
    this.modalService.open(clientUrlOpen, { size: 'lg' });

  }
  /**
  * @author : Sucheta
  * @description : Submit the data for Mapping.
  */
  checkVan() {
    console.log("van number--", this.vanNumber)
    this.ansName = this.regVan.test(this.vanNumber);
    console.log("ansName", this.ansName);
    if (this.ansName == true) {
      // console.log("true");
    }
    else {
      // console.log("false");
    }
  }

  submitForMapping() {
    this.checkVan()

    if (this.ansName == false) {
      console.log("empty");
      alert("Please enter VAN number")
    }
    else {
      console.log(" not empty");
      localStorage.setItem("vanNo", this.vanNumber);
      this.disabledMappingCheck = true;
      $("#captureButton").addClass("disabled");
      $("#generateButton").addClass("disabled");
      $("#generateButton1").addClass("disabled");


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

      }
      console.log("expectObjResponse = ", expectObjResponse)

      //esql and yaml
      var clientUrl = this.serviceUrl
      this.url = null
      console.log("clientUrl = ", clientUrl)
      this.modalService.dismissAll();
      var mandatoryFlag: boolean = false;
      console.log("-------------  Inside Submit  ----------")
      console.log("responseData = ", this.responseData)
      this.getFlattenStructure1(this.requestData, clientUrl);

      //esql and yaml
      var clientUrl = this.serviceUrl
      this.url = null
      console.log("clientUrl = ", clientUrl)
      this.modalService.dismissAll();
      var mandatoryFlag: boolean = false;
      console.log("-------------  Inside Submit  ----------")
      console.log("responseData = ", this.responseData)
      this.getFlattenStructure1(this.requestData, clientUrl);



      // <!-- ####### changes by sanchita 16-December-2019 For Display -->
      // this.gotoNextTab();

      // this.router.navigate(['/authentication/appStatus']);
    }
  



  /**
   * @author : Suucheta A Shrivastava
   * @description : Remove duplicates
   * @param Array
   */

  removeDupFieldDefinitions(something) {
    return something
    // return something.reduce(function (prev, ele) {
    //   var found = prev.find(function (fele) {
    //     return ele.fieldName === fele.fieldName && ele.fieldType === fele.fieldType;
    //   });
    //   if (!found) {
    //     prev.push(ele);
    //   }
    //   return prev;
    // }, []);
  }




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

                console.log("New newValue2  = ", newValue2)
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
      "fields": this.dataForEsql
    }


    var finalEsqlObject = {
      "mappedObj": this.finalDataForEsql,
      "templateName": config.templateNameEsql,
      "fileName": config.fileNameEsql_Scene_1_Request_1,
      "reqRetryRule": this.retryRule,
      "clientName": "abc",
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

    this.mappingService.postESQL(finalEsqlObject).then((dataEsql) => {
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
      "clientCode": this.clientCode,
      "orgName": this.organisation,
      "productName": this.productName,
      "serviceName": "eCollection_ClientIntimation_CurrentAccount_IPS_Profunds",
      "fileCount": 1,
      'projectId': this.projectId,
      "txnReversal": "No"
    }

    console.log("yamlRequest ", JSON.stringify(yamlObject));
    this.mappingService.postYamlData(yamlObject).then( (yamlResponse) => {

      console.log("yamlResponse = ", yamlResponse)
      if(yamlResponse.message =="Finally pushed yaml files"){

      
      // this.toastr.success("Response for  Yaml:" + yamlResponse.message);
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
        this.mappingService.postSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
          console.log("new postSaveMappingDataResponse  =====>", postSaveMappingDataResponse);
          $("#save").css("display", "block").delay(1000).fadeOut(400);
        })
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
        this.mappingService.putSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
          console.log("new postSaveMappingDataResponse  =====>", postSaveMappingDataResponse);
          // this.toastr.success("Data Saved Successfully!")
          $("#save").css("display", "block").delay(2000).fadeOut(400);

        })
      }
      this.initiatesSIT(this.dataOfUser);//Initiate SIT Operation Start
      console.log(" Print : INITIATE SIT COMPLETED ");
    }
    }).catch(err => {
      console.log("PRINT : PROBLElM WITH YAML 1  1A ", err);
      // this.toastr.error("ERROR IN YAML 1 ENCOUNTERED");
      // this.toastr.error("Please try again..Something went wrong");
      $("#e").css("display", "block").delay(1200).fadeOut(200);
      setTimeout(() => {
        $("#f").css("display", "block").delay(1200).fadeOut(200)
      }, 1201);
      this.isLoading = false;

    })
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
      projectId: userData[0].projectId,
      clientCode: this.clientCode,
      productName: userData[0].productName,
      serviceName: userData[0].serviceName,
      username: userData[0].emailIdBusinessSpoc,
      orgName: userData[0].orgName,
      txnReversal: valueOFReversal,
      IPSClientCode: userData[0].clientCodeIPS,
      vanNo: this.vanNumber
    };
    console.log("PRINT : DATA IN INITIATE SIT ", JSON.stringify(data));

    this.mappingService.initiateSIT(data).then(async (data) => {
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

    //step 3  - segregate the array values having a corresponding flattened array type in a new json

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
            console.log("Inside last if  = ")
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

                console.log("New newValue2  = ", newValue2)
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
    //step 3  - segregate the array values having a corresponding flattened array type in a new json

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
            console.log("Inside last if  = ")
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



  /****************** Unflatten *******************/
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
  /*****************************/

  saveDataOfMapping() {
    if (this.alreadyDataPresent == false) {
      var mappingDataObject = {};
      var mappingRequestDataObject = {
        "mapping1RequestObject": this.requestData,

      };

      mappingDataObject["mappingObj"] = mappingRequestDataObject;
      mappingDataObject["projectId"] = localStorage.getItem('projectId')
      this.mappingService.postSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
        console.log("postSaveMappingDataResponse  =====>", postSaveMappingDataResponse);
        // this.toastr.success("Data Saved Successfully!");
        $("#save").css("display", "block").delay(2000).fadeOut(400);
        this.alreadyDataPresent = true;

      })
    }
    else if (this.alreadyDataPresent == true) {


      var mappingDataObject = {};
      console.log("requestData", this.requestData);
      var mappingRequestDataObject = {
        "mapping1RequestObject": this.requestData,

      };
      mappingDataObject["mappingObj"] = mappingRequestDataObject;
      mappingDataObject["projectId"] = localStorage.getItem('projectId')
      console.log("mappingDataObject", mappingDataObject);
      this.mappingService.putSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
        console.log("new postSaveMappingDataResponse  =====>", postSaveMappingDataResponse);
        // this.toastr.success("Data Saved Successfully!");
        $("#save").css("display", "block").delay(2000).fadeOut(400);
      })
    }
  }
}




