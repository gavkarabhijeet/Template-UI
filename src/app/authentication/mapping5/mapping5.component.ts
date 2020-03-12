import {
    Component,
    OnInit,
    HostListener
} from '@angular/core';
import {
    NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {
    ToastrService
} from 'ngx-toastr';
import * as jspdf from 'jspdf';
import {
    FormGroup
} from '@angular/forms';
import {
    Router
} from '@angular/router';
import {
    mapping2Service
} from './../mapping2/mapping2.service'
import 'jspdf-autotable';
import {
    config
} from "config";
import {
    NgxSpinnerService
} from "ngx-spinner";
// <!-- ####### changes by sanchita 16-December-2019 For Display -->
import {
    Output,
    EventEmitter
} from '@angular/core';
import * as $ from 'jquery';
import { MakerService } from "../maker-page/maker-page.service";

@Component({
    selector: 'app-mapping5',
    templateUrl: './mapping5.component.html',
    styleUrls: ['./mapping5.component.css'],
    providers: [mapping2Service]
})
export class Mapping5Component implements OnInit {
    @Output() someEvent = new EventEmitter<string>();
    // @HostListener('window:beforeunload', ['$event'])
    //  public before() {
    // return false
    // }
    // @HostListener('window:unload', ['$event'])
    // public after() {
    // this.makerService.MyMethod()
    // }
    regVan = /^[a-zA-Z0-9]+$/;
    source = [];
    requestData = [];
    requestDataSource = [];
    requestDataTarget = [];
    //file
    targetFileName;
    sourceFileName;
    //pagination
    p: number = 1;
    //Add Data
    addModalData: FormGroup
    submitButtonDisable: Boolean;
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
    //Loader
    isLoading: boolean = false;
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
    jenkinsFlag: Boolean = true;
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

    //modal
    descriptionNameRequest;
    descriptionNameResponse;
    fsizeICICIRequest;
    dataTypeICICIRequest;
    descriptionICICIRequest;
    dataTypeClientRequest;
    dataTypeClientResponse;
    dataTypeICICIResponse;
    fsizeICICIResponse;
    urgencyNameICICIResponse;
    //ngOnInit
    projectId;
    url;
    requestDataBefore = [];
    responseDataBefore = [];
    //PART - 2/ FILE -2 
    requestData2Before = [];
    responseData2Before = [];
    // source = [];
    requestData2 = [];
    requestDataSource2 = [];
    sourceMethod2;
    fileDataByProjectId2 = [];
    splitData2 = [];
    sourcePath2;
    sourceFields2
    extractedDataSource2
    combinedDataAfterExtractionSource2 = [];
    dataForEsql2 = [];
    fieldDefinitionsResponse2 = [];
    dataForEsqlResponse2 = [];
    dataForEsqlResponse2FundTransfer = [];
    dataWithNoDirectRow2 = [];
    dataForEsqlRequest2 = [];
    fieldDefinitionsRequest2 = [];
    disabledMapping5Check: boolean = true;
    //Response
    resetButtonClickResponse2
    requestDataICICI2 = [];
    responseDataICICI2 = [];
    sourceFieldsResponse2
    extractedDataSourceResponse2
    combinedDataAfterExtractionSourceResponse2 = [];
    responseDataSource2 = [];
    responseDataTarget2 = []
    // outputData = [];
    responseData2 = [];
    dataWithDirectRowNo2 = [];
    finalDataForEsql2 = {};
    finalDataForEsql2FundTransfer = {};
    fieldDefinitionsResponse = [];
    dataForEsqlResponse = [];
    //yaml request
    requestDataFiltered2 = [];
    requestLayout2 = [];
    requestProperty2 = [];
    requestPropertyNonArray2 = [];
    requestExtraction2 = [];
    requestPropNonArray22 = []
    finalRequest12 = []
    finalRequestWithoutArray2 = [];
    finalRequest22 = [];
    fieldDefinitionsRequest = [];



    //yaml response
    responseDataFiltered2 = [];
    responseLayout2 = [];
    responseProperty2 = [];
    responsePropertyNonArray2 = [];
    responseExtraction2 = [];
    responsePropNonArray22 = []
    finalResponseWithoutArray2 = [];
    finalResponse22 = [];
    finalResponse12 = {};

    //modal
    descriptionNameResponse2
    fsizeICICIRequest2
    dataTypeICICIRequest2
    descriptionICICIRequest2
    dataTypeClientRequest2
    dataTypeClientResponse2
    dataTypeICICIResponse2
    fsizeICICIResponse2
    urgencyNameICICIResponse2
    productName;
    serviceName;
    username;
    organisation = [];
    clientCode;
    webServiceType;
    serviceUrl;
    poolAccountNumber;
    ifscCode;
    arrayFlagSubmitResponse: boolean = false;
    arrayFlagSubmitResponse2: boolean = false;
    service_prod_url: any;

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
    serviceId
    clientCodeIPS
    clientCodeProfunds
    txnReversal
    finalDataForEsqlreversal: {
        "sourceType": string;
        "targetType": string;
        "fieldDefinitions": any[];
        "fields": any[];
    };
    requestField2: {};
    requestField1: {};
    responseField1: {};
    userData: string;
    dataOfUser: any;
    dataofUser: string;
    vanNumber = '';
    ansName: boolean;
    retryRule: any;
    public mapping2RequestObject = [];
    public tempMapping2RequestObjectData = [];
    public mapping2ResponseObject = [];
    public tempMapping2ResponseObjectData = [];
    public mapping2RequestObject2 = [];
    public tempMapping2RequestObjectData2 = [];
    alreadyDataPresent: boolean = false;
    msg: any;
    errmsg: any;
    isReadOnly;
    reversalUrl: any;
    requestId: any[];
    responseId: any[];
    requestId2: any[];
    projectData=[];
    disabledMapping5CheckSubmit:boolean= true;

    constructor(private makerService: MakerService,private mapping4Service: mapping2Service, private modalService: NgbModal,
        private router: Router, public toastr: ToastrService) { }


    ngOnInit() {
        //for disabling back button
        $("#a").css("display", "none");
        $("#b").css("display", "none");
        $("#c").css("display", "none");
        $("#d").css("display", "none");
        $("#e").css("display", "none");
        $("#f").css("display", "none");
        $("#g").css("display", "none");
        $("#h").css("display", "none");
        $("#i").css("display", "none");
        $("#j").css("display", "none");
        $("#k").css("display", "none");
        $("#l").css("display", "none");
        $("#m").css("display", "none");
        $("#n").css("display", "none");
        $("#o").css("display", "none");
        $("#p").css("display", "none");
        $("#q").css("display", "none");
        $("#save").css("display", "none");
        window.history.pushState(null, "", window.location.href);
        console.log("START MAPPING 3A WITH TRANSACTION REVERSAL FLOW"); //FLOW START
        this.projectId = localStorage.getItem("projectId");
        this.dataofUser = localStorage.getItem("dataofUser");
        this.dataOfUser = JSON.parse(this.dataofUser);
        console.log("PRINT : USER OUTPUT DATA", this.dataOfUser);

        this.getICICIRequestResponseData();
        this.projectId = localStorage.getItem("projectId");
        this.mapping4Service.getMappingData(this.projectId).then((getMappingDataResult) => {
            console.log("getMappingDataResult =====>", getMappingDataResult);
            if (getMappingDataResult.message == "Data not found.") {
                console.log("inside no result found");
                this.disabledMapping5Check = true;
                this.disabledMapping5CheckSubmit=true;
                this.alreadyDataPresent = false;
            } else {
                console.log("changes made for disabling buttons if data is saved for 1st login and if next login happens")
                this.alreadyDataPresent = true;
                // changes made for disabling buttons if data is saved for 1st login and if next login happens 
                // this.disabledMappingCheck=false;
                this.mapping4Service.getProjectData(this.projectId).then((data) => {
                    this.projectData=data;

                  console.log("projectData",this.projectData);

                    console.log(" PROJECT DATA ", data[0]);

                    console.log(" PROJECT NAME ", data[0].projectName)
                    console.log("event name", data[0].event);

                    if (data[0].event == "recording_test_results_TXN_REV-UAT" || data[0].event == "recording_test_results-UAT" || data[0].event == "recording_test_results_TXN_REV-SIT" || data[0].event == "recording_test_results-SIT" || data[0].status === "Ready for Production Request Initiated" || data[0].status === "Ready for Production Verified" || data[0].status == "SUCCESS") {
                        console.log("inside the condition");
                        // this.getDataAlreadyPresent();
                        this.disabledMapping5Check = true;
                        this.disabledMapping5CheckSubmit=true;
                        this.isReadOnly = true;
                    }

                    else {
                        var data1=[];
                        var data2=[];
                        var data3=[];
                        data1 = getMappingDataResult[0].mappingObj.mapping2RequestObject;
                        data2 = getMappingDataResult[0].mappingObj.mapping2ResponseObject;
                        data3= getMappingDataResult[0].mappingObj.mapping2RequestObject2;
                      for(var i =0;i<data1.length;i++){
                        // for(var j = 0 ; j<data2.length;j++){
                          if(data1[i].directRowNo !="")
                          {
                            var value1="not empty"
                          }
                          else{
                            console.log("something is empty")
                          }
                        // }
                      }
                      for(var i =0;i<data2.length;i++){
                        // for(var j = 0 ; j<data2.length;j++){
                          if(data2[i].directRowNo !="")
                          {
                            var value2="not empty"
                          }
                          else{
                            console.log("something is empty")
                          }
                        // }
                      }
                      for(var i =0;i<data3.length;i++){
                        // for(var j = 0 ; j<data2.length;j++){
                          if(data3[i].directRowNo !="")
                          {
                            var value3="not empty"
                          }
                          else{
                            console.log("something is empty")
                          }
                        // }
                      }
                      console.log("value1",value1,"value2",value2,"value3",value3);
          
                      if(value1 == "not empty" && value2 == "not empty" && value3 =="not empty"){
                        this.disabledMapping5Check=false;
                        console.log("inside the if condition");
                      }
                      else{
                        console.log("inside the else condition");
                        this.disabledMapping5Check=true;
                      }
          
                        this.disabledMapping5CheckSubmit = false;
          

                    }


                });

            }

            if (getMappingDataResult.length) {
                if (getMappingDataResult[0].mappingObj) {
                    console.log("mappingObj data assigned")
                    this.tempMapping2RequestObjectData = getMappingDataResult[0].mappingObj.mapping2RequestObject;
                    this.tempMapping2ResponseObjectData = getMappingDataResult[0].mappingObj.mapping2ResponseObject;
                    this.tempMapping2RequestObjectData2 = getMappingDataResult[0].mappingObj.mapping2RequestObject2;
                    this.bindDataToRequestData();
                    this.bindDataToResponseData();
                    this.bindDataToRequestData2();


                } else {
                    this.bindDataToRequestData();
                    this.bindDataToResponseData();
                    this.bindDataToRequestData2();
                }
            } else {
                this.bindDataToRequestData();
                this.bindDataToResponseData();
                this.bindDataToRequestData2();
            }


            this.mapping4Service.getProjectData(this.projectId).then((data) => {
                console.log("PRINT : Fetch Project Data By Project ID ", data)
                this.productName = this.dataOfUser[0].productName
                this.serviceId = data[0].products[0].services[0].serviceId;
                this.webServiceType = data[0].products[0].services[0].webServiceType;
                this.serviceUrl = data[0].products[0].services[0].serviceURLUAT;
                this.service_prod_url = data[0].products[0].services[0].serviceURLProd;
                this.serviceName = data[0].products[0].services[0].serviceName;
                console.log("PRINT : Fetch Service Details By Service ID ", this.serviceName);
                // console.log("Reversal url",data[0].products[0].services[0].serviceUrlReversal1);

                this.username = this.dataOfUser[0].emailIdBusinessSpoc;
                console.log("PRINT :  User Name  ", this.username);
                this.retryRule = localStorage.getItem('retryRule');
                console.log("PRINT :  RETRY-RULE  ", this.retryRule);
                this.reversalUrl = data[0].products[0].services[0].serviceUrlReversal1
                this.organisation = this.dataOfUser[0].organisation;
                console.log("PRINT :  Organization name  ", this.organisation);
                this.clientCodeIPS = this.dataOfUser[0].clientCodeIPS;
                console.log("PRINT :  IPS Client Code ", this.clientCodeIPS);
                this.clientCodeProfunds = this.dataOfUser[0].clientCodeProfund;
                console.log("PRINT :  Profunds Client Code ", this.clientCodeProfunds);
                this.txnReversal = this.dataOfUser[0].enableTransactionReversalFileProcessing;
                console.log("PRINT :  Transaction Reversal Status ", this.txnReversal);
                this.poolAccountNumber = this.dataOfUser[0].poolAccountNumber;
                console.log("PRINT :  Account Number ", this.poolAccountNumber);
                this.ifscCode = this.dataOfUser[0].IFSCCode;
                console.log("PRINT :  IFSC Code ", this.ifscCode);

                if (this.clientCodeProfunds != undefined) {
                    this.clientCode = this.clientCodeProfunds;
                }
                console.log("PRINT : Calling Client File Service 1 ");
                this.getClientFileService(this.projectId);
                console.log("PRINT : Calling Client File Service 2 ");
                this.getClientFileService2(this.projectId);
            })
        })

    }
    bindDataToRequestData() {
        console.log("tempMappingRequestObjectData ====>", this.tempMapping2RequestObjectData.length);
        var getAllId = [];
        if (this.tempMapping2RequestObjectData.length === 0) {
            this.requestData = this.requestData;
            console.log("this.requestData", this.requestData);
            this.requestId = [];
        } else {
            this.requestData = this.tempMapping2RequestObjectData;
            console.log("this.requestData", this.requestData);
            for (var i = 0; i < this.requestData.length; i++) {
                if (this.requestData[i].directRowNo != "") {
                    getAllId.push({ id: this.requestData[i].directRowNo });
                }
            }
            this.requestId = getAllId.filter((x, i, a) => x && a.indexOf(x) === i);
            console.log("this.requestId array if already binded", this.requestId);

        }
    }
    bindDataToResponseData() {
        console.log("tempMappingRequestObjectData ====>", this.tempMapping2ResponseObjectData)
        var getAllId = [];
        if (this.tempMapping2ResponseObjectData.length === 0) {
            this.responseData = this.responseDataBefore;
            this.responseId = [];
            console.log("this.responseData ---->", this.responseData);
        } else {
            this.responseData = this.tempMapping2ResponseObjectData;
            console.log("this.responseData ---->", this.responseData);
            for (var i = 0; i < this.responseData.length; i++) {
                if (this.responseData[i].directRowNo != "") {
                    getAllId.push({ id: this.responseData[i].directRowNo });
                }
            }
            this.responseId = getAllId.filter((x, i, a) => x && a.indexOf(x) === i);
            console.log("this.responseId array if already binded", this.responseId);
        }
    }
    bindDataToRequestData2() {
        console.log("tempMappingRequestObjectData ====>", this.tempMapping2RequestObjectData2.length)
        var getAllId = [];
        if (this.tempMapping2RequestObjectData2.length === 0) {
            this.requestData2 = this.removeDup(this.requestData2Before);
            this.requestId2 = [];
        } else {
            this.requestData2 = this.tempMapping2RequestObjectData2;
            for (var i = 0; i < this.requestData2.length; i++) {
                if (this.requestData2[i].directRowNo != "") {
                    getAllId.push({ id: this.requestData2[i].directRowNo });
                }
            }
            this.requestId2 = getAllId.filter((x, i, a) => x && a.indexOf(x) === i);
            console.log("this.requestId2 array if already binded", this.requestId2);
        }
    }

    gotoNextTab() {
        console.log("gotoNextTab")
        this.someEvent.next('testing');
    }
    getICICIRequestResponseData() {
        console.log("PRINT : Fetch ICICI Request/Response Data 1 ")
        var service = "ECollection with Remitter Validation in Intermediary Account"
        this.mapping4Service.getMappingSourceData(service).then((data) => {
            console.log("PRINT : ICICI Request Response Data 1 ", data);
            this.requestDataICICI = data[0].request;
            console.log("PRINT : ICICI Request Data 1 ", this.requestDataICICI);
            this.responseDataICICI = data[0].response
            console.log("PRINT : ICICI  Response Data 1 ", this.responseDataICICI);
            this.requestDataICICI2 = data[0].request1;
            console.log("PRINT : Request ICICI Data 2  ", this.requestDataICICI2);
        }).catch(err => {
            console.log("PRINT : ERROR WHILE RETRIEVING MAPPING DATA FROM DB ", err);
            // this.toastr.error("ERROR WHILE RETRIEVING MAPPING DATA...PLEASE CHECK INTERNET ACCESS ");
            $("#a").css("display", "block").delay(2000).fadeOut(200);

            this.isLoading = false;

        })
    }




    /**
     * @author Sucheta
     * @param flowId 
     * @description This function is called for the source value
     */

    getClientFileService(projectId) {
        console.log("PRINT : Client File Service Called ");
        this.mapping4Service.getProjectData(this.projectId).then((data) => {
            this.projectData=data;
        });
        var type="uatFile1";
        this.mapping4Service.getFileDataByProjectId(projectId,type).then(async (data) => {
            console.log("PRINT : Get File Data By Project ID ", data.reverse());
            var str=this.projectData[0].products[0].services[0].uatFile1
            console.log("str",str)
            str = str.substr(str.indexOf('.') + 1);
            console.log("str in 1",str);
    
            if(str == "wsdl" ){
              console.log("data value in 1 ",data[0].operations[0]);
              this.fileDataByProjectId.push({operations:[data[0].operations[0]]});
            }
            else{
              this.fileDataByProjectId.push(data[0]);
            }
            console.log("PRINT : File Data ", this.fileDataByProjectId);
            await this.segregateSourceRequestData(this.fileDataByProjectId);
            await this.segregateSourceResponseData(this.fileDataByProjectId);
        }).catch(error => {
            // this.toastr.error("ERROR WHILE FETCHING FILE DATA FROM CLIENT UPLOADED FILE..");
            $("#b").css("display", "block").delay(2000).fadeOut(200);
            this.isLoading = false;

        });
    }


    /**
     * @author Sucheta
     * @param sourceArray
     * @description This function is called to segregate the sourceArray Data
     */

    segregateSourceRequestData(sourceRequestArray) {
        console.log("PRINT : Source Seggrgate Source Request Data Called ")
        console.log("PRINT : Seggregation Of Source Request Data 1 ", sourceRequestArray)
        var dataLength = sourceRequestArray.length;
        console.log("PRINT : Source Seggrgate Source Request Data 1 Length", dataLength);

        for (var h = 0; h < dataLength; h++) {
            var operationsLength = sourceRequestArray[h].operations.length;
            for (var j = 0; j < operationsLength; j++) {
                this.sourceMethod = sourceRequestArray[h].operations[j].method;
                this.sourcePath = sourceRequestArray[h].operations[j].path;
                console.log("PRINT : Source Path in Source Segrgated Data ", this.sourcePath);
                this.sourceFields = sourceRequestArray[h].operations[j].fields
                console.log("PRINT : Source Field in Source Segrgated Data ", this.sourceFields);
                for (var k = 0; k < this.sourceFields.length; k++) {
                    console.log("PRINT : Source Fields For Loop Started", this.sourceFields[k], k);

                    this.extractedDataSource = this.nestedSegregationSource(this.sourceFields[k]);
                    var keyData = Object.keys(this.extractedDataSource);
                    var valueData = Object.values(this.extractedDataSource)
                    console.log("PRINT : Keys Extraction from Source Data ", keyData);
                    console.log("PRINT : Values Extraction from Source Data ", valueData);
                    for (var w = 0; w < keyData.length; w++) {
                        this.combinedDataAfterExtractionSource.push({
                            key: keyData[w],
                            value: valueData[w]
                        })
                    }
                    console.log("PRINT : Combine Data After Extraction ", this.combinedDataAfterExtractionSource);
                }
                var inc = 1;
                for (var q = 0; q < this.combinedDataAfterExtractionSource.length; q++) {

                    var x = this.combinedDataAfterExtractionSource[q].key;
                    var splitted = x.split(".");
                    console.log("PRINT : Splitting Data By '.' ", splitted);
                    var splitLength = splitted.length
                    if (splitted[splitLength - 1] == "type") {
                        this.splitData.push(splitted[splitLength - 2]);
                        this.requestDataSource.push({
                            id: inc,
                            sourceName: this.sourcePath,
                            sfieldName: splitted[splitLength - 2],
                            sdataType: this.combinedDataAfterExtractionSource[q].value
                        })
                        inc++;
                    }

                }
                console.log("PRINT : Request Data Source 1 ", this.requestDataSource);
                this.requestDataBefore = this.sortSourceTargetData(this.requestDataSource, this.requestDataICICI)
                console.log("this.requesrDataBefore---->", this.requestDataBefore)
            }

        }
        // this.requestData = this.removeDup(this.requestDataBefore);
        this.requestData = this.requestDataBefore;
        console.log("PRINT : Final Request Source Data ", this.requestData);
        this.bindDataToRequestData();
    }


    /**
     * @author : Suucheta A Shrivastava
     * @description : Remove duplicates
     * @param Array
     */

    removeDup(something) {
        // console.log("PRINT : Remove Duplicate Records From Request Object 1 ", JSON.stringify(something));
        // return something;
        return something.reduce(function (prev, ele) {

            var found = prev.find(function (fele) {
                return ele.sfieldName === fele.sfieldName && ele.sdataType === fele.sdataType;
            });
            if (!found) {
                prev.push(ele);
            }
            return prev;
        }, []);
    }

    /**
     * @author : Sucheta
     * @param data
     * @description: This function consist code of flatten the json
     */
    segregateSourceResponseData(sourceResponseArray) {

        console.log("PRINT : Source Seggrgate Source Response Data Called ",sourceResponseArray)
        var dataLength = sourceResponseArray.length;
        console.log("PRINT : Source Seggrgate Source Response Data Length ", dataLength)

        for (var h = 0; h < dataLength; h++) {
            var responsesLength = sourceResponseArray[h].operations.length
            console.log("PRINT : Source Seggrgate Source Response Data Loop ", sourceResponseArray);

            for (var j = 0; j < responsesLength; j++) {

                this.sourceFieldsResponse = sourceResponseArray[h].operations[j].responses
                console.log("PRINT : Source Seggrgate Source Response Data", this.sourceFieldsResponse[h]);
                for (var k = 0; k < this.sourceFieldsResponse.length; k++) {
                    console.log("PRINT : Extraction Of Keys and Values ", this.sourceFieldsResponse[k]);
                    var key = Object.keys(this.sourceFieldsResponse[k]);
                    console.log("PRINT : Extraction Of Keys From Source Response ", key);

                    this.extractedDataSourceResponse = this.nestedSegregationSource(this.sourceFieldsResponse[k]);
                    console.log("PRINT : Extracted Source Response Data From Nested Segregation Source ", this.extractedDataSourceResponse);
                    var keyData = Object.keys(this.extractedDataSourceResponse);
                    var valueData = Object.values(this.extractedDataSourceResponse)
                    console.log("PRINT : Extraction Of Keys From Extracted Source Response Data ", keyData);
                    console.log("PRINT : Extraction Of Values From Extracted Source Response Data  ", valueData);
                    for (var w = 0; w < keyData.length; w++) {
                        this.combinedDataAfterExtractionSourceResponse.push({
                            key: keyData[w],
                            value: valueData[w]
                        })
                    }
                    console.log("PRINT : Combined After Extracted Source Response Data  ", this.combinedDataAfterExtractionSourceResponse);
                }
                var inc = 1;
                for (var q = 0; q < this.combinedDataAfterExtractionSourceResponse.length; q++) {
                    var x = this.combinedDataAfterExtractionSourceResponse[q].key;
                    var splitted = x.split(".");
                    console.log("PRINT : Splitting Operation in segregateSourceResponseData method", splitted)
                    var splitLength = splitted.length
                    if (splitted[splitLength - 1] == "type") {
                        this.splitData.push(splitted[splitLength - 2]);
                        this.responseDataSource.push({
                            id: inc,
                            sourceName: this.sourcePath,
                            sfieldName: splitted[splitLength - 2],
                            sdataType: this.combinedDataAfterExtractionSourceResponse[q].value
                        })
                        inc++;
                    }
                }
                console.log("PRINT : Response Data in segregateSourceResponseData method ", this.responseDataSource);
                this.responseDataBefore = this.sortSourceTargetData(this.responseDataSource, this.responseDataICICI)
            }
        }
        // this.responseData = this.removeDup(this.responseDataBefore)
        this.responseData = this.responseDataBefore;
        console.log("PRINT : Final Response Data ", this.responseData)
        this.bindDataToResponseData();
    }

    /**
     * @author Sucheta
     * @description This function is called for the client values
     */
    getClientFileService2(projectId) {
        var type="uatReversalFile1";
        this.mapping4Service.getProjectData(this.projectId).then((data) => {
            this.projectData=data;
            console.log("projectData",this.projectData);
        });
        
        this.mapping4Service.getFileDataByProjectId(projectId,type).then(async (data) => {
            console.log("PRINT : Fetch File Data By Project Id In getClientFileService2 method ", data.reverse());
            console.log("-----??",this.projectData[0].products[0].services[0].reversalFile1)
                if (data.length == 0) {
                console.log("Production file is not yet uploaded", data.length);
                $("#b").css("display", "block").delay(1000).fadeOut(200);
                // this.fileDataByProjectId2.push(data[1]);
                // console.log("this.fileData",this.fileDataByProjectId2);
                // await this.segregateSourceRequestData2(this.fileDataByProjectId2);
                //await this.segregateSourceResponseData2(this.fileDataByProjectId2)
            } else {
                console.log("Production file is uploaded", data.length);
                var str=this.projectData[0].products[0].services[0].reversalFile1;
                console.log("-----??",this.projectData[0].products[0].services[0].reversalFile1)
                str = str.substr(str.indexOf('.') + 1);
                console.log("str",str);
        
                if(str == "wsdl" ){
                  console.log("data value",data[0].operations[0]);
                  this.fileDataByProjectId2.push({operations:[data[0].operations[0]]});
                }
                else{
                  this.fileDataByProjectId2.push(data[0]);
                }
                console.log("this.fileDataByProjectId2", this.fileDataByProjectId2);
                await this.segregateSourceRequestData2(this.fileDataByProjectId2);
            }
            // if (data.length < 3) {
            //     console.log("Production file is not yet uploaded", data.length);
            //     $("#b").css("display", "block").delay(1000).fadeOut(200);
            //     // this.fileDataByProjectId2.push(data[1]);
            //     // console.log("this.fileData",this.fileDataByProjectId2);
            //     // await this.segregateSourceRequestData2(this.fileDataByProjectId2);
            //     //await this.segregateSourceResponseData2(this.fileDataByProjectId2)
            // } else {
            //     console.log("Production file is uploaded", data.length);
            //     this.fileDataByProjectId2.push(data[2]);
            //     console.log("this.fileDataByProjectId2", this.fileDataByProjectId2);
            //     await this.segregateSourceRequestData2(this.fileDataByProjectId2);
            // }

        }).catch(error => {
            console.log("PRINT : ERROR IN FILE DATA RETRIEVAL", error);
            // this.toastr.error("ERROR WHILE FETCHING FILE DATA FROM CLIENT UPLOADED FILE..");
            $("#c").css("display", "block").delay(2000).fadeOut(200);
            this.isLoading = false;
        });

    }


    /**
     * @author Sucheta
     * @param sourceArray
     * @description This function is called to segregate the sourceArray Data
     */

    segregateSourceRequestData2(sourceRequestArray) {
        console.log("PRINT : Source Seggrgate Source Request Data 2 Called ");
        console.log("PRINT : Arguments Passed in Segrgate method 2 ", sourceRequestArray);
        var dataLength = sourceRequestArray.length;
        console.log("PRINT : Source Seggrgate Source Request Data 2 Length ", dataLength);

        for (var h = 0; h < dataLength; h++) {
            var operationsLength = sourceRequestArray[h].operations.length;
            for (var j = 0; j < operationsLength; j++) {
                this.sourceMethod2 = sourceRequestArray[h].operations[j].method;
                this.sourcePath2 = sourceRequestArray[h].operations[j].path;
                console.log("PRINT : Source Path In Seggregate method 2 ", this.sourcePath2);
                this.sourceFields2 = sourceRequestArray[h].operations[j].fields;
                console.log("PRINT : Source Fields In Seggregate method 2 ", this.sourceFields2.length, j);
                for (var k = 0; k < this.sourceFields2.length; k++) {
                    console.log("PRINT : For Loop Started In Seggregate method 2 ", this.sourceFields2[k], k);
                    this.extractedDataSource2 = this.nestedSegregationSource(this.sourceFields2[k]);
                    var keyData = Object.keys(this.extractedDataSource2);
                    var valueData = Object.values(this.extractedDataSource2)
                    console.log("PRINT : Keys Data Extraction In Seggregate method 2 ", keyData);
                    console.log("PRINT : Values Data Extraction In Seggregate method 2 ", valueData);
                    for (var w = 0; w < keyData.length; w++) {
                        this.combinedDataAfterExtractionSource2.push({
                            key: keyData[w],
                            value: valueData[w]
                        });
                    }
                    console.log("PRINT : Combined Data After Extraction In Seggregate method 2", this.combinedDataAfterExtractionSource2);
                }
                var inc = 1;
                for (var q = 0; q < this.combinedDataAfterExtractionSource2.length; q++) {
                    var x = this.combinedDataAfterExtractionSource2[q].key;
                    var splitted = x.split(".");
                    console.log("PRINT : Splitting Operation In Seggregate method 2 ", splitted)
                    var splitLength = splitted.length
                    if (splitted[splitLength - 1] == "type") {
                        this.splitData2.push(splitted[splitLength - 2]);
                        this.requestDataSource2.push({
                            id: inc,
                            sourceName: this.sourcePath2,
                            sfieldName: splitted[splitLength - 2],
                            sdataType: this.combinedDataAfterExtractionSource2[q].value
                        })
                        inc++;
                    }

                }
                console.log("PRINT : Request Source Data In Seggregate method 2", this.requestDataSource2, this.requestDataICICI2);
                this.requestData2Before = this.sortSourceTargetData(this.requestDataSource2, this.requestDataICICI2);
                console.log("PRINT : Request Sort Source Data In Seggregate method 2", this.requestDataSource2);
            }

        }
        // this.requestData2 = this.removeDup(this.requestData2Before);
        this.requestData2 = this.requestData2Before;
        console.log("PRINT : Request Data 2 ", this.requestData2);
        this.bindDataToRequestData2();
    }


    /**
     * @author : Sucheta
     * @param data
     * @description: This function consist code of flatten the json
     */
    nestedSegregationSource(data) {
        console.log("PRINT : Data Passed in Nested Segregation Data ", data);
        var result = {};

        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                console.log("PRINT : condition 1", cur, prop);
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                console.log("PRINT : condition 2", cur, prop);
                for (var i = 0, l = cur.length; i < l; i++)
                    recurse(cur[i], prop + "[" + i + "]");
                if (l == 0)
                    result[prop] = [];
            } else {
                console.log("PRINT : condition 3", cur, prop);
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
        console.log("PRINT : NESTED SEGREGATION SOURCE DATA ", data, result)
        return result;
    }


    /**
     * @author Sucheta
     * @description This function will be called to merge responseDataSource and responseDataTarget
     */
    sortSourceTargetData(clientData, iciciData) {
        console.log("PRINT : Control Passed in SortSourceTargetData Method ");
        this.outputData = [];
        console.log("PRINT : Source Client Data ", clientData.length);
        console.log("PRINT : Target ICICI Data ", iciciData.length);
        //sucheta combine array
        var largerLength;

        if (clientData.length >= iciciData.length) {
            largerLength = clientData.length;
            console.log("larger length");
        } else {
            largerLength = iciciData.length
        }
        console.log("largerLength", largerLength);
        for (var q = 0; q < largerLength; q++) {
            // console.log("Inside for loop of q");

            if (clientData[q] == undefined && clientData[q] == undefined && iciciData[q] != undefined) {
                console.log("PRINT : MAPPING OBJECT PREPARATION IN FIRST IF CONDITION");

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
            } else if (iciciData[q] == undefined && clientData[q] != undefined) {
                console.log("PRINT : MAPPING OBJECT PREPARATION IN SECOND IF CONDITION");

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
            } else {
                console.log("PRINT : MAPPING OBJECT PREPARATION IN ELSE CONDITION");
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

        console.log("PRINT : MAPPING OBJECT FINAL OUTPUT ", this.outputData);
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


        console.log("PRINT : NESTED SEGREGATION RESULT ", result)
        return result;
    }




    // /**
    //  * @author : Suchheta
    //  * @description: Create and download PDF.
    //  */

    capture() {

        var exactCaptureRequest = [];
        var exactCaptureResponse = [];
        var exactCaptureRequest2 = [];

        for (var i = 0; i < this.requestData.length; i++) {
            if (this.requestData[i].directRowNo != "") {
                exactCaptureRequest.push(this.requestData[i]);
            }
        }

        for (var i = 0; i < this.responseData.length; i++) {
            if (this.responseData[i].directRowNo != "") {
                exactCaptureResponse.push(this.responseData[i]);
            }
        }
        for (var i = 0; i < this.requestData2.length; i++) {
            if (this.requestData2[i].directRowNo != "") {
                exactCaptureRequest2.push(this.requestData2[i]);
            }
        }



        var doc = new jspdf('l', 'pt', 'a4');
        var imgData = 'data:image/png;base64,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'
        doc.addImage(imgData, 'PNG', 40, 7, 150, 40);
        doc.setFontType('bold')
        doc.setTextColor('#053c6d')
        // doc.setMargin(100)
        doc.text(40, 80, 'Request');


        var cols = [
            { title: 'Field Row No.', dataKey: 'directRowNo' }, { title: 'ICICI Field Name', dataKey: 'tfieldNameMapping' }, { title: 'Client Field Name', dataKey: 'sourceFieldName' }, { title: 'Data Type Verified', dataKey: 'datatypeVerified' }, { title: 'Description', dataKey: 'descriptionName' }]

        var tableData1 = [];
        for (var i = 0; i < exactCaptureRequest.length; i++) {
            tableData1.push({
                'id': exactCaptureRequest[i].id,
                'sourceName': exactCaptureRequest[i].sourceName,
                'sfieldName': exactCaptureRequest[i].sfieldName,
                'sdataType': exactCaptureRequest[i].sdataType,
                'targetName': exactCaptureRequest[i].targetName,
                'tfieldName': exactCaptureRequest[i].tfieldName,
                'tdataType': exactCaptureRequest[i].tdataType,
                'urgencyName': exactCaptureRequest[i].urgencyName,
                'descriptionName': exactCaptureRequest[i].descriptionName,
                'directRowNo': exactCaptureRequest[i].directRowNo,
                'sourceFieldPath': exactCaptureRequest[i].sourceFieldPath,
                'sourceFieldName': exactCaptureRequest[i].sourceFieldName,
                'tfieldNameMapping': exactCaptureRequest[i].tfieldNameMapping,
                'datatypeVerified': exactCaptureRequest[i].datatypeVerified,
                'backgroundColor': exactCaptureRequest[i].backgroundColor
            })
        }
        doc.autoTable(cols, tableData1, {
            margin: {
                top: 90
            },
            columnStyles: {
                columnStyles: {
                    1: {
                        columnWidth: 80
                    },
                    0: {
                        columnWidth: 80
                    },
                    2: {
                        columnWidth: 80
                    },
                    3: {
                        columnWidth: 80
                    },
                    // 4: {
                    //     columnWidth: 80
                    // }

                }
            }

        })

        ///////res for req 1/////
        doc.setFontType('bold')
        doc.setTextColor('#053c6d')
        // doc.setMargin(100)
        doc.text(40, doc.autoTable.previous.finalY + 50, 'Response');
        var cols = [
            { title: 'Field Row No.', dataKey: 'directRowNo' }, { title: 'ICICI Field Name', dataKey: 'tfieldNameMapping' }, { title: 'Client Field Name', dataKey: 'sourceFieldName' }, { title: 'Data Type Verified', dataKey: 'datatypeVerified' }, { title: 'Description', dataKey: 'descriptionName' }]

        var tableData2 = [];

        for (var i = 0; i < exactCaptureResponse.length; i++) {
            tableData2.push({
                'id': exactCaptureResponse[i].id,
                'sourceName': exactCaptureResponse[i].sourceName,
                'sfieldName': exactCaptureResponse[i].sfieldName,
                'sdataType': exactCaptureResponse[i].sdataType,
                'targetName': exactCaptureResponse[i].targetName,
                'tfieldName': exactCaptureResponse[i].tfieldName,
                'tdataType': exactCaptureResponse[i].tdataType,
                'urgencyName': exactCaptureResponse[i].urgencyName,
                'descriptionName': exactCaptureResponse[i].descriptionName,
                'directRowNo': exactCaptureResponse[i].directRowNo,
                'sourceFieldPath': exactCaptureResponse[i].sourceFieldPath,
                'sourceFieldName': exactCaptureResponse[i].sourceFieldName,
                'tfieldNameMapping': exactCaptureResponse[i].tfieldNameMapping,
                'datatypeVerified': exactCaptureResponse[i].datatypeVerified,
                'backgroundColor': exactCaptureResponse[i].backgroundColor
            })
        }
        doc.autoTable(cols, tableData2, {
            startY: doc.autoTable.previous.finalY + 60,

            columnStyles: {
                1: {
                    columnWidth: 80
                },
                0: {
                    columnWidth: 80
                },
                2: {
                    columnWidth: 80
                },
                3: {
                    columnWidth: 80
                },
                // 4: {
                //     columnWidth: 80
                // }

            }

        })
        // doc.setFontType('bold')
        // doc.setTextColor('#053c6d')
        // // doc.setMargin(100)
        // doc.text(40, 230, 'Response for 1st Request');

        ////////////////data for request 2
        doc.setFontType('bold')
        doc.setTextColor('#053c6d')
        // doc.setMargin(100)
        doc.text(40, doc.autoTable.previous.finalY + 50, 'Request');


        var cols = [
            { title: 'Field Row No.', dataKey: 'directRowNo' }, { title: 'ICICI Field Name', dataKey: 'tfieldNameMapping' }, { title: 'Client Field Name', dataKey: 'sourceFieldName' }, { title: 'Data Type Verified', dataKey: 'datatypeVerified' }, { title: 'Description', dataKey: 'descriptionName' }]

        var tableData4 = [];
        for (var i = 0; i < exactCaptureRequest2.length; i++) {
            tableData4.push({
                'id': exactCaptureRequest2[i].id,
                'sourceName': exactCaptureRequest2[i].sourceName,
                'sfieldName': exactCaptureRequest2[i].sfieldName,
                'sdataType': exactCaptureRequest2[i].sdataType,
                'targetName': exactCaptureRequest2[i].targetName,
                'tfieldName': exactCaptureRequest2[i].tfieldName,
                'tdataType': exactCaptureRequest2[i].tdataType,
                'urgencyName': exactCaptureRequest2[i].urgencyName,
                'descriptionName': exactCaptureRequest2[i].descriptionName,
                'directRowNo': exactCaptureRequest2[i].directRowNo,
                'sourceFieldPath': exactCaptureRequest2[i].sourceFieldPath,
                'sourceFieldName': exactCaptureRequest2[i].sourceFieldName,
                'tfieldNameMapping': exactCaptureRequest2[i].tfieldNameMapping,
                'datatypeVerified': exactCaptureRequest2[i].datatypeVerified,
                'backgroundColor': exactCaptureRequest2[i].backgroundColor
            })
        }
        doc.autoTable(cols, tableData4, {
            startY: doc.autoTable.previous.finalY + 60,

            // margin: {
            //     top: 60
            // },
            columnStyles: {
                1: {
                    columnWidth: 80
                },
                0: {
                    columnWidth: 80
                },
                2: {
                    columnWidth: 80
                },
                3: {
                    columnWidth: 80
                },
                // 4: {
                //     columnWidth: 80
                // }

            }

        })
        // doc.setFontType('bold')
        // doc.setTextColor('#053c6d')
        // // doc.setMargin(100)
        // doc.text(40, 40, '2nd Request');

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

    /**
     * @author : Sucheta
     * @description : Mapping for Request
     */
    enterDirectRowNumberRequest(data, event) {
        console.log("PRINT : ENTER DIRECT ROW NUMBER REQUEST PASSED FROM TEMPLATE ", event);
        console.log("PRINT : DATA PASSED FROM TEMPLATE ", data);
        var regInteger = /^-?\d+$/;
         var result=regInteger.test(event);
          console.log(result)
        if (data.sfieldName != undefined && event != undefined && event != null && event != "") {
            for (var q = 0; q < this.requestData.length; q++) {
                if (this.requestData[q].id == data.id && event != undefined && event != null) {

                    if (event >= this.requestData.length + 1 || event <= 0 || result == false) {
                        this.requestData[q].directRowNo = '';
                        alert("This field does not exist !");
                    }
                    else {
                        if (this.requestData[event - 1].sdataType != "") {
                            this.requestData[q].directRowNo = event;
                            if (this.requestData[event - 1].sdataType != "array") {
                                if (this.requestData[event - 1].sdataType != "object") {
                                    // changes to check the duplicate mapping values
                                    if (this.requestId.some((dataValue) => dataValue.id === event)) {
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
                                            this.requestId.push({ id: event });
                                            console.log("Print :  ", this.requestData[q])
                                        }
                                        else {
                                            alert("Cannot Map to Empty Field");
                                            this.requestData[q].directRowNo = "";
                                            this.requestData[q].sourceFieldPath = "-";
                                            this.requestData[q].sourceFieldName = "-";
                                            this.requestData[q].datatypeVerified = "-";
                                            this.requestData[q].tfieldNameMapping = "-";
                                            console.log("final responsedata = ", this.requestData[q])
                                        }
                                        var targetDatatype = (this.requestData[q].tdataType);
                                        var sourceDatatype = (this.requestData[event - 1].sdataType);
                                        console.log("PRINT : MAPPED REQUEST DATA ", this.requestData[q]);
                                    }
                                }
                                else {
                                    this.requestData[q].directRowNo = "";
                                    alert(" Cannot map to an object")
                                }
                            } else {
                                this.requestData[q].directRowNo = "";
                                alert("Cannot map to an array")
                            }
                        } else {
                            this.requestData[q].directRowNo = "";
                            alert("cannot map to empty field");
                        }
                    }

                }
            }
        } else {

            alert("To clear , please click on delete button !")

        }
        this.checkData();
        // this.requiredFieldCheck();
    }
    /**
     * @author :  Sucheta
     * @description : Clear value of Request
     * @param data 
     *
     */

    deleteValueRequest(data) {
        for (var i = 0; i < this.requestId.length; i++) {
            if (this.requestId[i].id == data.directRowNo) {

                console.log("PRESENT");
                this.requestId.splice(i, 1)
            }
            else {
                console.log("row numbers", this.requestId[i].id, data.directRowNo);
                console.log("Not preset");
            }
        }
        for (var q = 0; q < this.requestData.length; q++) {
            if (this.requestData[q].id == data.id) {
                this.requestData[q].directRowNo = "";
                this.requestData[q].sourceFieldPath = "-";
                this.requestData[q].sourceFieldName = "-";
                this.requestData[q].datatypeVerified = "-";
                this.requestData[q].tfieldNameMapping = "-"
                this.requestData[q].backgroundColor = "true"
                console.log("PRINT : DELETE DATA OPERATION ", this.requestData[q]);
            }
        }
        this.checkData();
        // for (var q = 0; q < this.requestData.length; q++) {
        //     if (this.requestData[q].directRowNo != "") {
        //       this.disabledMapping5Check = false;
        //       break;
        //     }
        //     else {
        //       this.disabledMapping5Check = true;
        //     }
        //   }
    }

    /**
     * @author :  Sucheta
     * @description : Mapping for Response
     * @param :  data, event
     */
    enterDirectRowNumberResponse(data, event) {

        console.log("this.responseId", this.responseId);
        var regInteger = /^-?\d+$/;
    var result=regInteger.test(event);
    console.log(result)

        if (data.sfieldName != undefined && event != undefined && event != null && event != "") {


            for (var q = 0; q < this.responseData.length; q++) {
                if (this.responseData[q].id == data.id && event != undefined && event != null) {
                    this.responseData[q].directRowNo = event;

                    if (event >= this.responseData.length + 1 || event <= 0 || result == false) {
                        this.responseData[q].directRowNo = '';
                        alert("This field does not exist !");
                    }
                    else {
                        if (this.responseData[event - 1].sdataType != "") {
                            if (this.responseData[event - 1].sdataType != "array") {
                                if (this.responseData[event - 1].sdataType != "object") {
                                    // check for again entry starts here
                                    if (this.responseId.some((dataValue) => dataValue.id === event)) {
                                        this.responseData[q].directRowNo = "";
                                        alert('Already mapped to other field !');

                                    }
                                    // if closes here & else starts here 
                                    else {
                                       
                                        this.responseData[q].directRowNo = event;
                                        this.responseData[q].sourceFieldPath = this.responseData[event - 1].sourceName;
                                        this.responseData[q].sourceFieldName = this.responseData[event - 1].sfieldName;
                                        this.responseData[q].datatypeVerified = this.responseData[event - 1].sdataType;
                                        this.responseData[q].tfieldNameMapping = this.responseData[q].tfieldName;
                                        if (this.responseData[q].tdataType != null) {
                                            this.responseId.push({ id: event });
                                            console.log("Print :  ", this.responseData[q])
                                        }
                                        else {
                                            alert("Cannot Map to Empty Field");
                                            this.responseData[q].directRowNo = "";
                                            this.responseData[q].sourceFieldPath = "-";
                                            this.responseData[q].sourceFieldName = "-";
                                            this.responseData[q].datatypeVerified = "-";
                                            this.responseData[q].tfieldNameMapping = "-";
                                            console.log("final responsedata = ", this.responseData[q])
                                        }
                                    }
                                    // else ends here

                                } else {
                                    this.responseData[q].directRowNo = "";
                                    alert("Cannot map to an object")
                                }

                            } else {
                                this.responseData[q].directRowNo = ""
                                alert("Cannot map to an array")
                            }
                        } else {
                            this.responseData[q].directRowNo = "";
                            alert("cannot map to empty field");
                        }
                    }

                }

            }
        } else {
            alert("To clear , please click on delete button !")
        }
        this.checkData();
    }

    /**
     * @author : Sucheta
     * @description : Clear the Response data
     * 
     */
    deleteValueResponse1(data) {
        for (var i = 0; i < this.responseId.length; i++) {
            if (this.responseId[i].id == data.directRowNo) {

                console.log("PRESENT");
                this.responseId.splice(i, 1)
            }
            else {
                console.log("row numbers", this.responseId[i].id, data.directRowNo);
                console.log("Not preset");
            }
        }
        for (var q = 0; q < this.responseData.length; q++) {
            if (this.responseData[q].id == data.id) {
                this.responseData[q].directRowNo = "";
                this.responseData[q].tfieldNameMapping = "-";
                this.responseData[q].sourceFieldPath = "-";
                this.responseData[q].sourceFieldName = "-";
                this.responseData[q].datatypeVerified = "-";
                this.responseData[q].backgroundColor = "true"
                console.log("PRINT : DELETE OPERATION FOR RESPONSE DATA", this.responseData[q])
            }
        }
        this.checkData();
        // for (var q = 0; q < this.responseData.length; q++) {
        //     if (this.responseData[q].directRowNo != "") {
        //       this.disabledMapping5Check = false;
        //       break;
        //     }
        //     else {
        //       this.disabledMapping5Check = true;
        //     }
        //   }
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
            } else {
                this.allowMappingRequest = false;
            }

        }
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
                    } else {
                        this.requestData[i].backgroundColor = "true";
                    }
                }
            }
        } else {
            alert("Mapping not allowed. Incorrect Number");
        }
        this.resetId = null;
        this.modalService.dismissAll();
    }

    /**
     * @author : Suchheta
     * @description: Reset Function for Response.
     */


    resetButtonResponse(resetIdValue) {
        console.log("PRINT : RESET BUTTON CLICKED FOR RESPONSE", this.resetButtonClickResponse);
        for (var i = 0; i < this.responseData.length; i++) {
            if (this.responseData[i].sfieldName === this.resetButtonClickResponse && this.resetButtonClickResponse != undefined) {
                this.responseData[i].directRowNo = resetIdValue;
                this.responseData[i].sourceFieldPath = this.responseData[resetIdValue - 1].sourceName;
                this.responseData[i].sourceFieldName = this.responseData[resetIdValue - 1].sfieldName
                this.responseData[i].datatypeVerified = this.responseData[resetIdValue - 1].sdataType
                this.responseData[i].tfieldNameMapping = this.responseData[i].tfieldName;
                if (this.responseData[i].sdataType != this.responseData[resetIdValue - 1].tdataType) {
                    this.responseData[i].backgroundColor = "false"
                } else {
                    this.responseData[i].backgroundColor = "true";
                }
            }
        }
    }

    /**
     * @author : Sucheta
     * @description : description in ICICI request modal
     * @params : index,data,modal
     */



    descriptionRequest(a, data, iRequest) {
        this.modalService.open(iRequest, {
            size: 'sm'
        });
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
        console.log("Check Client data", clientReq);
        this.modalService.open(clientReq, {
            size: 'sm'
        });
        this.dataTypeClientRequest = data.sdataType;
    }


    /**
     * @author : Sucheta
     * @description : description in response modal
     * @params : index, data, modal
     */

    descriptionResponse(a, data, iResponse) {

        this.modalService.open(iResponse, {
            size: 'sm'
        });
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

        this.modalService.open(clientResponse, {
            size: 'sm'
        });
        this.dataTypeClientResponse = data.sdataType

    }



    /**
     * @author : Sucheta
     * @description : Mapping for Request
     */
    enterDirectRowNumberRequest2(data, event) {
        console.log("PRINT : ENTER DIRECT ROW NUMBER REQUEST PASSED FROM TEMPLATE ", event);
        console.log("PRINT : DATA PASSED FROM TEMPLATE ", data);
        var regInteger = /^-?\d+$/;
    var result=regInteger.test(event);
    console.log(result)
        if (data.sfieldName != undefined && event != undefined && event != null && event != "") {
            for (var q = 0; q < this.requestData2.length; q++) {
                if (this.requestData2[q].id == data.id && event != undefined && event != null) {
                    if (event >= this.requestData2.length + 1 || event <= 0 || result == false) {
                        this.requestData2[q].directRowNo = '';
                        alert("This field does not exist !");
                    }
                    else {
                        if (this.requestData2[event - 1].sdataType != "") {
                            this.requestData2[q].directRowNo = event;
                            if (this.requestData2[event - 1].sdataType != "array") {
                                if (this.requestData2[event - 1].sdataType != "object") {
                                    if (this.requestId2.some((dataValue) => dataValue.id === event)) {
                                        this.requestData2[q].directRowNo = "";
                                        alert('Already mapped to other field !');

                                    }
                                    // if closes here & else starts here 
                                    else {
                                        
                                        this.requestData2[q].directRowNo = event;
                                        this.requestData2[q].sourceFieldPath = this.requestData2[event - 1].sourceName;
                                        this.requestData2[q].sourceFieldName = this.requestData2[event - 1].sfieldName;
                                        this.requestData2[q].datatypeVerified = this.requestData2[event - 1].sdataType;
                                        this.requestData2[q].tfieldNameMapping = this.requestData2[q].tfieldName;
                                        if (this.requestData2[q].tdataType != null) {
                                            this.requestId2.push({ id: event });
                                            console.log("Print :  ", this.requestData2[q])
                                        }
                                        else {
                                            console.log("checkData");
                                            alert("Cannot Map to Empty Field");

                                            this.requestData2[q].directRowNo = "";
                                            this.requestData2[q].sourceFieldPath = "-";
                                            this.requestData2[q].sourceFieldName = "-";
                                            this.requestData2[q].datatypeVerified = "-";
                                            this.requestData2[q].tfieldNameMapping = "-";
                                            console.log("final responsedata = ", this.requestData2[q])
                                        }
                                        // var targetDatatype = (this.requestData2[q].tdataType);
                                        // var sourceDatatype = (this.requestData2[event - 1].sdataType);
                                        console.log("PRINT : MAPPED REQUEST DATA ", this.requestData2[q]);
                                    }
                                }
                                //  else ends here
                                else {
                                    this.requestData2[q].directRowNo = "";
                                    alert(" Cannot map to an object")
                                }
                            } else {
                                this.requestData2[q].directRowNo = "";
                                alert("Cannot map to an array")
                            }
                        } else {
                            this.requestData2[q].directRowNo = "";
                            alert("cannot map to empty field");
                        }
                    }


                }
            }
        } else {

            alert("To clear , please click on delete button !")

        }
        this.checkData();
        // this.requiredFieldCheck();
    }

    /**
   * @author :  Sucheta
   * @description : Clear value of Request
   * @param data 
   *
   */

    deleteValueRequest2(data) {
        for (var i = 0; i < this.requestId2.length; i++) {
            if (this.requestId2[i].id == data.directRowNo) {

                console.log("PRESENT");
                this.requestId2.splice(i, 1)
            }
            else {
                console.log("row numbers", this.requestId2[i].id, data.directRowNo);
                console.log("Not preset");
            }
        }
        for (var q = 0; q < this.requestData2.length; q++) {
            if (this.requestData2[q].id == data.id) {
                this.requestData2[q].directRowNo = "";
                this.requestData2[q].sourceFieldPath = "-";
                this.requestData2[q].sourceFieldName = "-";
                this.requestData2[q].datatypeVerified = "-";
                this.requestData2[q].tfieldNameMapping = "-"
                this.requestData2[q].backgroundColor = "true"
                console.log("PRINT : DELETE OPERATION FOR REQUEST DATA 2", this.requestData2[q])
            }

        }
        this.checkData();
        // for (var q = 0; q < this.requestData2.length; q++) {
        //     if (this.requestData2[q].directRowNo != "") {
        //         this.disabledMapping5Check = false;
        //         break;
        //     } else {
        //         this.disabledMapping5Check = true;
        //     }
        // }
    }
    /**
  * @author : Sucheta
  * @description : description in ICICI request modal
  * @params : index,data,modal
  */
    descriptionRequest2(a, data, iRequest) {
        this.modalService.open(iRequest, {
            size: 'sm'
        });
        this.descriptionICICIRequest2 = data.descriptionName
        this.fsizeICICIRequest2 = data.tfieldSize;
        this.dataTypeICICIRequest2 = data.tdataType
    }


    /**
     * @author : Sucheta
     * @description : 
     * @param a 
     * @param data 
     * @param iResponse 
     */

    detailsClientRequest2(a, data, clientReq) {
        console.log("client request ", a, data, clientReq);
        this.modalService.open(clientReq, {
            size: 'sm'
        });
        this.dataTypeClientRequest2 = data.sdataType;
    }


    /**
     * @author : Sucheta
     * @description : description in response modal
     * @params : index, data, modal
     */

    descriptionResponse2(a, data, iResponse) {
        this.modalService.open(iResponse, {
            size: 'sm'
        });
        this.descriptionNameResponse2 = data.descriptionName
        this.dataTypeICICIResponse2 = data.tdataType;
        this.fsizeICICIResponse2 = data.tfieldSize
        this.urgencyNameICICIResponse2 = data.urgencyName
    }

    /**
     * @author : Sucheta
     * @description : description in response modal
     * @params : index, data, modal
     */


    detailsClientResponse2(a, data, clientResponse) {
        this.modalService.open(clientResponse, {
            size: 'sm'
        });
        this.dataTypeClientResponse2 = data.sdataType
    }




    //  PART -2 / FILE -2 ends


    /**
     * @author : Sucheta
     * @description : Open Modal for target Url
     * 
     */


    getClientUrl(clientUrlOpen) {
        this.modalService.open(clientUrlOpen, {
            size: 'lg'
        });

    }
    checkData() {
        var reqData = this.requiredFieldCheckreq();
        var resData = this.requiredFieldCheckres();
        var reqData2 = this.requiredFieldCheckreq2();
        console.log("Data for check", reqData, resData, reqData2);
        if (reqData == true || resData == true || reqData2 == true) {
            // this.disabledMapping2Check = false;
            this.disabledMapping5CheckSubmit=false;
          }
          else {
            // this.disabledMapping2Check = true;
            this.disabledMapping5CheckSubmit=true;
          }
          if(reqData == true && resData == true && reqData2 == true){
            this.disabledMapping5Check= false;
          }
          else{
            this.disabledMapping5Check=true;
          }
    }

    requiredFieldCheckreq2() {

        var nonempty = [];
        for (var i = 0; i < this.requestData2.length; i++) {
            if (this.requestData2[i].directRowNo != "") {
                nonempty.push(this.requestData2[i]);
                console.log
                    (nonempty
                    );
            }
            else {
                console.log("no value");
            }
        }
        console.log("length--->", nonempty.length);

        if (nonempty.length > 0) {
            return true;
        }
        else {
            return false;
        }

    }

    requiredFieldCheckreq() {
        console.log("function called");
        console.log("this.requestData--->", this.requestData);
        var nonempty = [];
        for (var i = 0; i < this.requestData.length; i++) {
            if (this.requestData[i].directRowNo != "") {
                nonempty.push(this.requestData[i]);
                console.log
                    (nonempty
                    );
            }
            else {
                console.log("no value");
            }
        }
        console.log("length--->", nonempty.length);

        if (nonempty.length > 0) {
            return true;
        }
        else {
            return false;
        }



    }
    requiredFieldCheckres() {

        var nonempty = [];

        for (var i = 0; i < this.responseData.length; i++) {
            if (this.responseData[i].directRowNo != "") {
                nonempty.push(this.responseData[i]);
                // console.log
                // ( nonempty
                // );
            }
            else {
                // console.log("no value");
            }
        }
        // console.log("length--->",nonempty.length);

        if (nonempty.length > 0) {
            return true;
        }
        else {
            return false;
        }
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
            this.isLoading = true;
            this.disabledMapping5Check = true;
            console.log("CALLING SUBMIT FUNCTION", this.isLoading);
            var clientUrl = this.serviceUrl;
            // expectedValues  for Part -1 
            this.mapping2RequestObject = this.requestData;
            this.mapping2ResponseObject = this.responseData;
            this.mapping2RequestObject2 = this.requestData2;

            this.url = null
            console.log("clientUrl  ", clientUrl)
            this.modalService.dismissAll();
            var mandatoryFlag: boolean = true;
            console.log("PRINT : Submit Mapping ");
            console.log("PRINT : Response Data In SubmitMapping Method ", this.responseData);

            // used to check mandatory fields(currently not required)
            // for (var i = 0; i < this.responseData.length; i++) {
            //     if (this.responseData[i].urgencyName != "") {

            //         if (this.responseData[i].urgencyName.includes("Mandatory") && (this.responseData[i].sourceFieldName == "-")) {

            //             mandatoryFlag = false;

            //             i = this.responseData.length;
            //             console.log("Inside mandatory false")
            //         } else {
            //             console.log("Inside mandatory true")
            //             mandatoryFlag = true
            //         }
            //     }
            // }
            if (mandatoryFlag == true) {
                console.log("PRINT :Mandatory Flag Status ", mandatoryFlag);
                this.getFlattenStructure1(this.requestData);
            }
        }
    }

    /**
     * @author : Suucheta A Shrivastava
     * @description : Remove duplicates
     * @param Array
     */

    removeDupFieldDefinitions(something) {
        console.log("PRINT: Remove Duplicate Field Definition From Object ", something);
        // return something;
        return something.reduce(function (prev, ele) {
            var found = prev.find(function (fele) {
                return ele.fieldName === fele.fieldName && ele.fieldType === fele.fieldType;
            });
            if (!found) {
                prev.push(ele);
            }
            return prev;
        }, []);
    }

    /**
     * @author Sanchita
     * @param data 
     * @description This function is used to get the json structure for esql generation
     */

    getFlattenStructure1(data) {
        console.log("PRINT : Request Data Object passed in Flatten Structure Method ", data);

        this.dataForEsql = [];
        this.dataWithDirectRowNo = [];
        this.dataWithNoDirectRow = [];

        console.log("PRINT : Combined Data After Extract Source Data ", this.combinedDataAfterExtractionSource)
        for (var i = 0; i < this.requestData.length; i++) {
            if (this.requestData[i].directRowNo !== "") {
                console.log("PRINT : Direct Row Num Codition Check wether Empty Or Non Empty ");
                this.dataWithDirectRowNo.push(this.requestData[i]);
            } else {
                console.log("PRINT : Direct Row Num Codition Else Condition");
                this.dataWithNoDirectRow.push(this.requestData[i]);
            }
        }
        console.log("PRINT : Object With Direct Row Num ", this.dataWithDirectRowNo);
        let array1 = []
        this.requestDataICICI.forEach((itm, i) => {
            array1.push(Object.assign({}, itm, this.combinedDataAfterExtractionSource[i]));
        });
        console.log("PRINT : Request Data of ICICI assigned to Blank Object ", array1);

        //field Definitions 
        for (var y = 0; y < this.dataWithDirectRowNo.length; y++) {
            for (var u = 0; u < this.combinedDataAfterExtractionSource.length; u++) {
                if (this.combinedDataAfterExtractionSource[u].key.includes(this.dataWithDirectRowNo[y].sourceFieldName)) {
                    for (var a = 0; a < this.combinedDataAfterExtractionSource.length; a++) {
                        if (this.combinedDataAfterExtractionSource[a].value == "array") {
                            var aSplit = this.combinedDataAfterExtractionSource[u].key.split(".");
                            console.log("PRINT : Splitted Object ", aSplit);
                            var splitted1 = aSplit[0];
                            console.log("PRINT : Splitted Object 1 ", splitted1);
                            var value11 = splitted1
                            if (this.combinedDataAfterExtractionSource[a].key.includes(value11)) {
                                var newArray = this.combinedDataAfterExtractionSource[a].key.split(".");
                                var newValue = newArray[newArray.length - 2];
                                var splitted = newValue.split(".");
                                console.log("PRINT : Splitted Object Response ", splitted);
                                var responseValue = newArray[0];
                                console.log("PRINT : New value Array From Index 0 ", responseValue);
                                var newValue2 = newArray[1];
                                console.log("PRINT : New value Array From Index 1 ", newValue2);
                                this.fieldDefinitionsRequest.push({
                                    "fieldName": newValue,
                                    "fieldType": "array",
                                    "format": "JSON",
                                    "preset": "source"
                                })

                                a = this.combinedDataAfterExtractionSource.length;
                                u = this.combinedDataAfterExtractionSource.length;
                                console.log("PRINT: ESQL Request field definitions ends ")
                            }
                        }
                    }
                }
            }
        }

        //remove duplicate field definitions

        this.fieldDefinitionsRequest = this.removeDupFieldDefinitions(this.fieldDefinitionsRequest)

        //remove duplicate field definitions ends  

        for (var i = 0; i < this.dataWithDirectRowNo.length; i++) {
            console.log("PRINT : For loop Started for new Object preparation in Flatten Structure Method ");
            for (var j = 0; j < this.combinedDataAfterExtractionSource.length; j++) {
                var x = this.combinedDataAfterExtractionSource[j].key;
                if (x !== undefined) {
                    var splitted = x.split(".");
                    for (var t = 0; t < splitted.length; t++) {
                        var data = splitted[t];
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

        this.finalDataForEsql = {
            "sourceType": "JSON",
            "targetType": "DFDL",
            "fieldDefinitions": this.fieldDefinitionsRequest,
            "fields": this.dataForEsql
        }
        var finalEsqlObject = {
            "mappedObj": this.finalDataForEsql,
            "retryDestinationDir": "",
            "reqRetryRule": this.retryRule,
            "dataSourceName": "",
            "templateName": config.templateNameEsql,
            "fileName": config.fileNameEsql_Scene_3_Request_1,
            "clientName": "abc",
            "username": this.username,
            "orgName": this.organisation,
            "productName": this.productName,
            "serviceName": "ecollection with remitter validation in intermediary account",
            "projectId": this.projectId,
            "clientCode": this.clientCode,
            "IPSClientCode": this.clientCodeIPS,
            "fileCount": 1,
            "basePath": "/ecollection/" + this.clientCode,
            "typeOfService": this.webServiceType,
            "accountNo": this.poolAccountNumber,
            "IFSCCode": this.ifscCode,
            "txnReversal": "No"
        }
        console.log("PRINT : ESQL Data 1 ", JSON.stringify(finalEsqlObject));
        this.mapping4Service.postESQL(finalEsqlObject).then((dataEsql) => {
            console.log("PRINT : Response For ESQL Object 1 From APP Server ", dataEsql);
            // this.toastr.success(" ESQL Response 1 :" + dataEsql.message);
            this.msg = dataEsql.message
            $("#d").css("display", "block").delay(2000).fadeOut(200);
            this.getFlattenStructureResponse1(); // Flatten Data Process
        }).catch((err) => {
            if (err) {
                // this.toastr.error("ESQL 1 Response.Please Try Again.." + err.message);
                this.errmsg = err.message

                $("#e").css("display", "block").delay(2000).fadeOut(200);
                console.log("PRINT EXCEPTION", err);
                this.isLoading = false;

            }
        })
    }


    /**
     * @author Sucheta
     * @param data 
     * @description This function is used to get the json structure for esql generation
     */


    getFlattenStructureResponse1() {
        console.log("PRINT : Flatten Structure For response Data 1 Called ");
        this.dataForEsqlResponse = [];
        this.dataWithDirectRowNo = [];
        this.dataWithNoDirectRow = [];
        console.log("PRINT : Check response Object In getFlattenStructureResponse1 ", this.responseData);
        for (var i = 0; i < this.responseData.length; i++) {
            if (this.responseData[i].directRowNo !== "") {
                this.dataWithDirectRowNo.push(this.responseData[i]);
            } else {
                this.dataWithNoDirectRow.push(this.responseData[i]);
            }
        }
        console.log("PRINT : Data With Direct Row Num Object In getFlattenStructureResponse1() ", this.dataWithDirectRowNo)

        //fieldDefinitions
        for (var y = 0; y < this.dataWithDirectRowNo.length; y++) {
            for (var u = 0; u < this.combinedDataAfterExtractionSourceResponse.length; u++) {
                if (this.combinedDataAfterExtractionSourceResponse[u].key.includes(this.dataWithDirectRowNo[y].sourceFieldName)) {
                    for (var a = 0; a < this.combinedDataAfterExtractionSourceResponse.length; a++) {
                        if (this.combinedDataAfterExtractionSourceResponse[a].value == "array") {
                            var aSplit = this.combinedDataAfterExtractionSourceResponse[u].key.split(".");
                            console.log("PRINT : Splitting Process ", aSplit);
                            var splitted1 = aSplit[1];
                            console.log("PRINT : Splitted Data ", splitted1)
                            var value11 = splitted1;
                            if (this.combinedDataAfterExtractionSourceResponse[a].key.includes(value11)) {
                                var newArray = this.combinedDataAfterExtractionSourceResponse[a].key.split(".");
                                var newValue = newArray[newArray.length - 2];
                                var splitted = newValue.split(".");
                                console.log("PRINT : Data Splitted By '.' ", splitted)
                                var responseValue = newArray[0];
                                console.log("PRINT : Response value ", responseValue)
                                var newValue2 = newArray[1];
                                console.log("PRINT : Values From index 1 ", newValue2)
                                this.fieldDefinitionsResponse.push({
                                    "fieldName": newValue2,
                                    "fieldType": "array",
                                    "format": "JSON",
                                    "preset": "source"
                                });
                                a = this.combinedDataAfterExtractionSourceResponse.length;
                                u = this.combinedDataAfterExtractionSourceResponse.length;
                                console.log("PRINT : ESQL Response field definitions ends ")
                            }
                        }

                    }

                }
            }
            console.log("PRINT : Field Definition Response 1 ", this.fieldDefinitionsResponse)
        }

        this.fieldDefinitionsResponse = this.removeDupFieldDefinitions(this.fieldDefinitionsResponse);
        for (var i = 0; i < this.dataWithDirectRowNo.length; i++) {
            console.log("PRINT : Data with Direct Row num For Normal Row Number ", this.dataWithDirectRowNo[i]);
            for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse.length; j++) {
                console.log("PRINT : Data with Direct Row num For Normal Row Number ", this.combinedDataAfterExtractionSourceResponse[j]);
                var x = this.combinedDataAfterExtractionSourceResponse[j].key;
                console.log("PRINT : Target fields Key", x);
                if (x !== undefined) {
                    var splitted = x.split(".");
                    for (var t = 0; t < splitted.length; t++) {
                        var data = splitted[t];
                        if (this.dataWithDirectRowNo[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo[i].datatypeVerified === this.combinedDataAfterExtractionSourceResponse[j].value && this.dataWithDirectRowNo[i].tfieldName == "RejectionReason") {
                            console.log("PRINT : Condition this.dataWithDirectRowNo[i].tfieldName == 'RejectionReason'", this.dataWithDirectRowNo[i].tfieldName);
                            var sourceJson = this.combinedDataAfterExtractionSourceResponse[j].key;
                            console.log("PRINT : sourceJson Object ", sourceJson);
                            var val = sourceJson.replace(".type", "");
                            console.log("PRINT : value Object ", val);
                            this.dataForEsqlResponse.push({
                                'source': this.dataWithDirectRowNo[i].tfieldName,
                                'target': val,
                                'operation': "coalesce"
                            })
                        } else if (this.dataWithDirectRowNo[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo[i].datatypeVerified === this.combinedDataAfterExtractionSourceResponse[j].value && this.dataWithDirectRowNo[i].tfieldName !== "RejectionReason") {
                            console.log("PRINT : Condition this.dataWithDirectRowNo[i].tfieldName !== 'RejectionReason'", this.dataWithDirectRowNo[i].tfieldName);
                            var sourceJson = this.combinedDataAfterExtractionSourceResponse[j].key;
                            var val = sourceJson.replace(".type", "");
                            this.dataForEsqlResponse.push({
                                'source': this.dataWithDirectRowNo[i].tfieldName,
                                'target': val,
                                'operation': ""
                            })
                        }
                    }
                }

            }
        }


        console.log("PRINT : Data For ESQL Response 2 ", this.dataForEsqlResponse)

        this.finalDataForEsql = {
            "sourceType": "JSON",
            "targetType": "DFDL",
            "fieldDefinitions": this.fieldDefinitionsResponse,
            "fields": this.dataForEsqlResponse
        }



        var finalEsqlObject = {
            "mappedObj": this.finalDataForEsql,
            "templateName": config.templateNameEsql,
            "fileName": config.fileNameEsql_Scene_3_Response_1,
            "reqRetryRule": this.retryRule,
            "clientName": "abc",
            "username": this.username,
            "orgName": this.organisation,
            "productName": this.productName,
            "serviceName": "ecollection with remitter validation in intermediary account",
            "projectId": this.projectId,
            "clientCode": this.clientCode,
            "IPSClientCode": this.clientCodeIPS,
            "fileCount": 2,
            "basePath": "/ecollection/" + this.clientCode,
            "typeOfService": this.webServiceType,
            "accountNo": this.poolAccountNumber,
            "IFSCCode": this.ifscCode,
            "txnReversal": "No"
        }
        console.log("PRINT : Final Stringify ESQL Object 2 ", JSON.stringify(finalEsqlObject))

        this.mapping4Service.postESQL(finalEsqlObject).then((dataEsql) => {
            console.log("PRINT : Response For ESQL Object 2  ", dataEsql);
            // this.toastr.success(" ESQL Response 2 :" + dataEsql.message);
            this.msg = dataEsql.message
            $("#f").css("display", "block").delay(2000).fadeOut(200);
            this.getFlattenStructure12()
        }).catch((err) => {
            if (err) {
                // this.toastr.error("ESQL 2 Response.Please Try Again.." + err.message);
                this.msg = err.message

                $("#g").css("display", "block").delay(2000).fadeOut(200);
                console.log("PRINT EXCEPTION", err);
                this.isLoading = false;

            }
        })
    }


    /**
     * 
     * @author : Sucheta
     * @param requestD 
     * @param responseD 
     * @param clientUrl 
     */
    async yamlCreation(requestD, responseD, clientUrl) {
        console.log("PRINT : YAML Creation 1 Called ");
        // console.log("PRINT : YAML 1 Request/Response ", requestD, responseD);
        var flattenData = {
            "description": "YAML For API TEST",
            "title": "ecollection" + this.clientCode,
            "ibmName": "test",
            "targetUrl": "http://example.com/operation-name",
            "targetUrlDescription": "The URL of the target service",
            "basePath": "/ecollection",
            "path": "/transaction",
            "operations": [{
                "operationId": null,
                "path": "/transaction",
                "method": "post",
                "fields": [{
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
                }],
                "responses": [{
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
                }]
            }]

        }
        // console.log("PRINT : Combined Data After Extraction Source ", this.combinedDataAfterExtractionSource);
        var combArray = [];
        this.combinedDataAfterExtractionSource.forEach((item, index) => {
            combArray.push({
                ['"' + item.key + '"']: item.value
            })
        })
        // console.log("PRINT : Combined Array ", combArray);
        var unflattenValue = this.unflatten(combArray[2])
        // console.log("PRINT : Unflattened Value ", unflattenValue);
        this.requestField1 = this.yamlGenRequest();
        console.log("PRINT : Request Field For YAML 1 ", this.requestField1);
        this.responseField1 = this.yamlGenResponse();
        console.log("PRINT : Response Field For YAML 1 ", this.responseField1);
        // console.log("PRINT :arrayFlagSubmitResponse For YAML Creation 1 ", this.arrayFlagSubmitResponse);

        if (this.arrayFlagSubmitResponse == true) {
            console.log("PRINT : Request Field Extraction ", this.requestField1['fields']);
            console.log("PRINT : Normal Request1  ", this.requestField1);
            console.log("PRINT : Response Field 'responses' extraction", this.responseField1['responses']);
            console.log("PRINT : Normal Response1 ", this.responseField1);
            var finalResponse = {};
            var response1 = {};
            let response_field1 = this.responseField1['responses'];
            let request_field1 = this.requestField1['fields'];
            response1["200"] = this.responseField1['responses'];
            finalResponse['responses'] = response1;
            console.log("PRINT : Create response1['200'] ", response1["200"]);
            console.log("PRINT : finalResponse['responses'] ", finalResponse['responses']);

            var finalYaml = [{
                "description": "Yaml For ecollection",
                "title": "ecollection" + this.clientCode,
                "ibmName": "test",
                "sitUrl": clientUrl,
                "uatUrl": clientUrl,
                "prodUrl": clientUrl,
                "targetUrlDescription": "The URL of the target service",
                "basePath": "/ecollection",
                "path": "/transaction",
                "operations": [{
                    "operationId": null,
                    "path": this.sourcePath,
                    "method": this.sourceMethod,
                    fields: [request_field1],
                    responses: [finalResponse['responses']]
                }]
            }]
            console.log("PRINT : Hardcoded Flattened Object ", flattenData);
            var yamlObject = {
                'params': finalYaml[0],
                'templateName': config.templateNameYaml,
                'fileName': config.fileName_yaml_validation,
                "username": this.username,
                "orgName": this.organisation,
                "productName": this.productName,
                "serviceName": "eCollection_RemitterValidation_IntermediateAccount_IPS_Profunds",
                'projectId': this.projectId,
                "clientCode": this.clientCode,
                "IPSClientCode": this.clientCodeIPS,
                "fileCount": 1,
                "txnReversal": "No"
            }
            console.log("PRINT : YAML Object 1 ", JSON.stringify(yamlObject));
            console.log("request Array",request_field1);
            localStorage.setItem("yamlFields",JSON.stringify(request_field1));
            // this.mapping4Service.postYamlData(yamlObject).then((yamlResponse) => {
            //     console.log("PRINT : Final YAML 1 In YAML Creation 1 arrayFlagSubmitResponse is TRUE ", yamlResponse)
            //     this.toastr.success(" Yaml Response 1 :" + yamlResponse.message);
            // }).catch(error=>{
            //     console.log("PRINT : YAML ERROR ",error.error.message);
            //     this.toastr.error("ERROR ENCOUNTERED IN YAML 1.");
            //     this.isLoading = false;

            // })
            return yamlObject;
        } else if (this.arrayFlagSubmitResponse == false) {

            // console.log("PRINT : Check arrayFlagSubmitResponse Status 'FALSE' -> ", this.arrayFlagSubmitResponse);
            // console.log("PRINT : Request Field Extraction ", this.requestField1['fields']);
            // console.log("PRINT : Normal Request1  ", this.requestField1);
            // console.log("PRINT : Response Field 'responses' extraction", this.responseField1['responses']);
            // console.log("PRINT : Normal Response1 ", this.responseField1);
            var finalResponse = {};
            var response1 = {};
            let response_field1 = this.responseField1['responses'];
            let request_field1 = this.requestField1['fields'];
            response1["200"] = this.responseField1['responses'];
            finalResponse['responses'] = response1;
            // console.log("PRINT : Create response1['200'] ", response1["200"]);
            // console.log("PRINT : finalResponse['responses'] ", finalResponse['responses']);
            let array1 = [];
            let array2 = [];
            array1[0] = (this.requestField1['fields']);
            // console.log("PRINT Fields Request array ", array1[0]);
            array2[0] = (finalResponse['responses']);
            // console.log("PRINT Fields Response array", array1[0]);

            let finalYaml = [{
                "description": "Yaml For ecollection",
                "title": "ecollection" + this.clientCode,
                "ibmName": "test",
                "sitUrl": clientUrl,
                "uatUrl": clientUrl,
                "prodUrl": clientUrl,
                "targetUrlDescription": "The URL of the target service",
                "basePath": "/ecollection/" + this.clientCode,
                "path": "/validation",
                "operations": [{
                    "operationId": null,
                    "path": this.sourcePath,
                    "method": this.sourceMethod,
                    fields: [request_field1],
                    responses: [finalResponse['responses']]
                }]
            }]

            // console.log("PRINT : Hardcoded Value", flattenData);

            let yamlObject = {
                'params': finalYaml[0],
                'templateName': config.templateNameYaml,
                'fileName': config.fileName_yaml_validation,
                "username": this.username,
                "orgName": this.organisation,
                "productName": this.productName,
                "serviceName": "eCollection_RemitterValidation_IntermediateAccount_IPS_Profunds",
                'projectId': this.projectId,
                "clientCode": this.clientCode,
                "IPSClientCode": this.clientCodeIPS,
                "fileCount": 1,
                "txnReversal": "No"
            }
            console.log("PRINT:YAML Request object 1 In YAML CREATION 1 ", JSON.stringify(yamlObject));
            console.log("request Array",request_field1);
            localStorage.setItem("yamlFields",JSON.stringify(request_field1));

            // this.mapping4Service.postYamlData(yamlObject).then((yamlResponse) => {
            //     console.log("PRINT:YAML PROCESS 1");
            //     console.log("PRINT:YAML Response 1 In YAML CREATION 1 ", yamlResponse);
            //     this.toastr.success("Yaml 1 Without Transaction Reversal : " + yamlResponse.message);


            // }).catch((err) => {
            //     if (err) {
            //         console.log("PRINT EXCEPTION IN YAML 1 WITHOUT REVERSAL", err);
            //         this.toastr.error("Yaml 1 Response.Please Try Again.." + err);
            //         this.isLoading = false;

            //     }
            // })
            return yamlObject;

        }

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
        console.log("PRINT : Request Data Filtered ", this.requestDataFiltered);

        //step 2 - check if any array from request data is present in flattened array
        for (var y = 0; y < this.requestDataFiltered.length; y++) {

            for (var u = 0; u < this.combinedDataAfterExtractionSource.length; u++) {
                if (this.combinedDataAfterExtractionSource[u].key.includes(this.requestDataFiltered[y].sourceFieldName)) {
                    for (var a = 0; a < this.combinedDataAfterExtractionSource.length; a++) {
                        if (this.combinedDataAfterExtractionSource[a].key.includes(this.combinedDataAfterExtractionSource[u].key) && (this.combinedDataAfterExtractionSource[u].value == "array")) {
                            var newValue = this.combinedDataAfterExtractionSource[u].key.replace(".type", "")
                            this.requestLayout.push({
                                key: newValue,
                                value:

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
            console.log("PRINT : REQUEST LAYOUT ", this.requestLayout)
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
                                key: this.combinedDataAfterExtractionSource[s].key,
                                value: {
                                    [this.requestDataFiltered[d].sourceFieldName]: {
                                        "type": this.requestDataFiltered[d].datatypeVerified
                                    }
                                }
                            })
                        }
                    }
                }
            }
            console.log("PRINT : Request Property ", this.requestProperty);
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
                                    key: this.requestDataFiltered[g].sourceFieldName,
                                    value: {
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

                } else if (arrayFlag == false) {
                    if ((this.combinedDataAfterExtractionSource[h].key).includes(this.requestDataFiltered[g].sourceFieldName) && ((this.requestDataFiltered[g].datatypeVerified) !== "array")) {
                        // console.log("Inside if od step 4")
                        // console.log("this.combinedDataAfterExtractionSource[h].key = ", this.combinedDataAfterExtractionSource[h].key)

                        for (var j = 0; j < this.combinedDataAfterExtractionSource.length; j++) {
                            if (this.combinedDataAfterExtractionSource[j].key.includes(this.combinedDataAfterExtractionSource[h].key) && ((this.combinedDataAfterExtractionSource[j].value) !== "array")) {
                                console.log("Inside 2nd if of step 4")
                                // console.log("this.combinedDataAfterExtractionSource[j].key = ", this.combinedDataAfterExtractionSource[j].key)
                                // console.log("this.combinedDataAfterExtractionSource[h].key= ", this.combinedDataAfterExtractionSource[h].key)
                                this.requestPropertyNonArray.push({
                                    key: this.requestDataFiltered[g].sourceFieldName,
                                    value: {
                                        [this.requestDataFiltered[g].sourceFieldName]: {
                                            "type": this.requestDataFiltered[g].datatypeVerified
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
        } else {
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

        console.log("PRINT :Final requestLayout = ", this.requestLayout);
        console.log("PRINT : this.finalRequestWithoutArray = ", this.finalRequestWithoutArray);


        var fields = {};

        console.log("PRINT : Final Request ", this.finalRequest)
        console.log("PRINT : this.finalRequestWithoutArray ", this.finalRequestWithoutArray)

        if (this.requestLayout.length !== 0) {
            this.finalRequest2.push(this.finalRequest);
        }

        this.finalRequestWithoutArray.forEach((item) => {
            console.log("PRINT : For Each loop Iteration of finalRequestWithoutArray ", item)
            var key1 = Object.keys(item)
            this.finalRequest2.push(item)
        })
        console.log("PRINT : Final Request 2 ", this.finalRequest2);
        if (arrayFlag == true) {
            fields['fields'] = this.finalRequest2
        } else if (arrayFlag == false) {
            var result = Object.assign({}, ...this.finalRequest2);

            console.log("PRINT : Result of Object.assign  ", result)

            fields["fields"] = result;
        }
        console.log("PRINT : Request Fields ", fields);
        return fields;
    }
    yamlGenResponse() {
        try {
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

                    this.arrayFlagSubmitResponse = true;

                    ut = this.combinedDataAfterExtractionSourceResponse.length
                }
            }



            //step 1 - filter the mapped data from request array
            console.log("PRINT : Inside YAML Gen Response ");
            console.log("PRINT : Response Data ", this.responseData);
            for (var t = 0; t < this.responseData.length; t++) {
                if (this.responseData[t].directRowNo !== "") {
                    this.responseDataFiltered.push(this.responseData[t]);
                }

            }
            console.log("PRINT : Response Filtered Data ", this.responseDataFiltered);
            console.log("PRINT : this.combinedDataAfterExtractionSourceResponse ", this.combinedDataAfterExtractionSourceResponse);

            //step 2 - check if any array from request data is present in flattened array
            for (var y = 0; y < this.responseDataFiltered.length; y++) {

                for (var u = 0; u < this.combinedDataAfterExtractionSourceResponse.length; u++) {
                    if (this.combinedDataAfterExtractionSourceResponse[u].key.includes(this.responseDataFiltered[y].sourceFieldName)) {
                        for (var a = 0; a < this.combinedDataAfterExtractionSourceResponse.length; a++) {

                            if (this.combinedDataAfterExtractionSourceResponse[a].value == "array") {
                                var aSplit = this.combinedDataAfterExtractionSourceResponse[u].key.split(".");
                                console.log("PRINT : Splitting combinedDataAfterExtractionSourceResponse by '.'  ", aSplit)
                                var splitted1 = aSplit[1];
                                console.log("PRINT : Splitting Object 1 ", splitted1);
                                var value11 = splitted1;
                                if (this.combinedDataAfterExtractionSourceResponse[a].key.includes(value11)) {
                                    var newArray = this.combinedDataAfterExtractionSourceResponse[a].key.split(".");
                                    var newValue = newArray[newArray.length - 2];
                                    var splitted = newValue.split(".");
                                    console.log("PRINT : Splitted Value By '.' ", splitted);
                                    var responseValue = newArray[0];
                                    var newValue2 = newArray[1];
                                    console.log("PRINT : New value ", newValue2);
                                    this.responseLayout.push({
                                        key: newValue,
                                        value: {
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
                                    console.log("PRINT : YAML Gen response ends");
                                }
                            }
                        }
                    }
                }
                console.log("PRINT L Response Layout ", this.responseLayout);
            }
            //step 3  - segregate the array values having a corresponding flattened array type in a new json

            for (var d = 0; d < this.responseDataFiltered.length; d++) {

                for (var s = 0; s < this.combinedDataAfterExtractionSourceResponse.length; s++) {
                    if (this.combinedDataAfterExtractionSourceResponse[s].key.includes("." + this.responseDataFiltered[d].sourceFieldName + ".") && ((this.responseDataFiltered[d].datatypeVerified) !== "array")) {
                        // console.log("this.combinedDataAfterExtractionSourceResponse[u].key = ", this.combinedDataAfterExtractionSourceResponse[s].key)
                        // console.log("this.responseDataFiltered[y].sourceFieldName = ", this.responseDataFiltered[d].sourceFieldName)
                        for (var f = 0; f < this.combinedDataAfterExtractionSourceResponse.length; f++) {

                            if (this.combinedDataAfterExtractionSourceResponse[f].key.includes(this.combinedDataAfterExtractionSourceResponse[s].key) && (this.combinedDataAfterExtractionSourceResponse[f].value !== "array")) {

                                this.responseProperty.push({
                                    key: this.combinedDataAfterExtractionSourceResponse[s].key,
                                    value: {

                                        [this.responseDataFiltered[d].sourceFieldName]: {
                                            "type": this.responseDataFiltered[d].datatypeVerified,

                                        }
                                    }
                                })


                            }
                        }


                    }

                }

                console.log("PRINT : Response Proerty ", this.responseProperty);
            }
            //step 4 - Request non-array values from request data into a new json

            for (var g = 0; g < this.responseDataFiltered.length; g++) {

                for (var h = 0; h < this.combinedDataAfterExtractionSourceResponse.length; h++) {
                    if (arrayFlag == true) {

                        if (!((this.combinedDataAfterExtractionSourceResponse[h].key).includes(this.responseDataFiltered[g].sourceFieldName)) && ((this.responseDataFiltered[g].datatypeVerified) !== "array")) {

                            for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse.length; j++) {

                                if (this.combinedDataAfterExtractionSourceResponse[j].key.includes(this.combinedDataAfterExtractionSourceResponse[h].key) && ((this.combinedDataAfterExtractionSourceResponse[j].value) !== "array")) {


                                    this.responsePropertyNonArray.push({
                                        key: this.responseDataFiltered[g].sourceFieldName,
                                        value: {
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
                    } else if (arrayFlag == false) {

                        if (((this.combinedDataAfterExtractionSourceResponse[h].key).includes(this.responseDataFiltered[g].sourceFieldName)) && ((this.responseDataFiltered[g].datatypeVerified) !== "array")) {
                            console.log("PRINT: this.combinedDataAfterExtractionSourceResponse[h].key = ", this.combinedDataAfterExtractionSourceResponse[h].key)

                            for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse.length; j++) {

                                if (this.combinedDataAfterExtractionSourceResponse[j].key.includes(this.combinedDataAfterExtractionSourceResponse[h].key) && ((this.combinedDataAfterExtractionSourceResponse[j].value) !== "array")) {

                                    this.responsePropertyNonArray.push({
                                        key: this.responseDataFiltered[g].sourceFieldName,
                                        value: {
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

            console.log("PRINT : Reponse Property  ", this.responseProperty);
            console.log("PRINT : Response Property With No Array ", this.responsePropertyNonArray);


            if (arrayFlag === true) {

                console.log("PRINT : Response Property With No Array ", this.responsePropertyNonArray);
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
            } else {
                console.log("Inside else of arrayFlag = false");
                console.log("PRINT : ELSE CONDITION WHERE ARRAY FLAG=FALSE");
                this.responsePropNonArray2 = (this.responsePropertyNonArray)
            }
            console.log("PRINT : RESPONSE PROPERTY WITH NON-ARRY OBJECT ", this.responsePropNonArray2)
            //step 5 - Arrange the values in the fields json
            console.log("PRINT : RESPONSE PROPRTY ", this.responseProperty)
            console.log("PRINT : RESPONSE LAYOUT ", this.responseLayout)

            for (var x = 0; x < this.responseProperty.length; x++) {

                if (this.responseLayout.length !== 0) {

                    for (var c = 0; c < this.responseLayout.length; c++) {

                        if (this.responseProperty[x].key.includes(this.responseLayout[c].key)) {
                            console.log("PRINT : RETURNS ARRAY OF STRING FROM RESPONSE PROPRTY", Object.keys(this.responseProperty[x].value)[0]);
                            console.log("PRINT : RETURNS VALUES FROM RESPONSE PROPRTY ", Object.values(this.responseProperty[x].value)[0]);
                            console.log("PRINT : RETURNS KEYS RESPONSE LAYOUT", this.responseLayout[c].key)

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
                            this.finalResponse[xyz][pqr].items.properties[Object.keys(this.responseProperty[x].value)[0]] = Object.values(this.responseProperty[x].value)[0];

                        }

                    }

                }

            }

            for (var v = 0; v < this.responsePropNonArray2.length; v++) {
                this.finalResponseWithoutArray.push(this.responsePropNonArray2[v].value)

            }

            console.log("PRINT : FINAL RESPONSE LAYOUT ", this.responseLayout)
            console.log("PRINT : FINAL RESPONSE WITHOUT ARRAY ", this.finalResponseWithoutArray);
            var fields = {};

            console.log("PRINT : FINAL RESPONSE OBJECT", this.finalResponse)
            console.log("PRINT : FINAL RESPONSE WITHOUT ARRAY", this.finalResponseWithoutArray)

            if (JSON.stringify(this.finalResponse) !== '{}') {
                this.finalResponse2.push(this.finalResponse)
            }

            this.finalResponseWithoutArray.forEach((item) => {
                console.log("PRINT : EACH ITEMS FROM FINAL RESPONSE WITHOUT ARRAY OBJECT", item)
                var key1 = Object.keys(item)
                this.finalResponse2.push(item)
            })
            console.log("PRINT : FINAL RESPONSE 2", this.finalResponse2);

            if (arrayFlag == true) {
                fields['responses'] = this.finalResponse2
            } else if (arrayFlag == false) {
                var result = Object.assign({}, ...this.finalResponse2);

                console.log("PRINT : FINAL RESULT OF OBJECT ASSIGNMENT ", result)

                fields["responses"] = result;
            }

            console.log("PRINT : FINAL FIELDS ", fields);
            return fields;
        } catch (e) {
            console.log("PRINT : EXCEPTION HERE", e);
        }
    }

    // PART - 2 / FILE -2 

    /**
     * @author Sucheta
     * @param data 
     * @description This function is used to get the json structure for esql generation
     */

    getFlattenStructure12() {
        console.log("PRINT : Flatten Structure Method 12 Called ");
        this.dataForEsql2 = [];
        this.dataWithDirectRowNo2 = [];
        this.dataWithNoDirectRow2 = [];
        console.log("PRINT : Combined Data After Extraction Of Source 2 ", this.combinedDataAfterExtractionSource2);
        console.log("PRINT : Request data 2 :", this.requestData2);

        for (var i = 0; i < this.requestData2.length; i++) {
            if (this.requestData2[i].directRowNo !== "") {
                console.log("PRINT : Condition for Direct Row Num Empty inside getFlattenStructure12 ", this.requestData2[i].directRowNo)

                this.dataWithDirectRowNo2.push(this.requestData2[i]);
            } else {
                this.dataWithNoDirectRow2.push(this.requestData2[i]);
            }
        }
        console.log("PRINT : Final Data with Direct Row Num 2 ", this.dataWithDirectRowNo2);

        //fieldDefinitions ----------
        for (var y = 0; y < this.dataWithDirectRowNo2.length; y++) {
            for (var u = 0; u < this.combinedDataAfterExtractionSource2.length; u++) {
                if (this.combinedDataAfterExtractionSource2[u].key.includes(this.dataWithDirectRowNo2[y].sourceFieldName)) {

                    for (var a = 0; a < this.combinedDataAfterExtractionSource2.length; a++) {
                        if (this.combinedDataAfterExtractionSource2[a].value == "array") {
                            var aSplit = this.combinedDataAfterExtractionSource2[u].key.split(".");
                            console.log("PRINT : Splitted Data ", aSplit)
                            var splitted1 = aSplit[0];
                            console.log("PRINT : Splitted Data from index 1 ", splitted1)
                            var value11 = splitted1;
                            if (this.combinedDataAfterExtractionSource2[a].key.includes(value11)) {
                                var newArray = this.combinedDataAfterExtractionSource2[a].key.split(".");
                                var newValue = newArray[newArray.length - 2];
                                var splitted = newValue.split(".");
                                var responseValue = newArray[0];
                                var newValue2 = newArray[1];
                                this.fieldDefinitionsRequest2.push({
                                    "fieldName": newValue,
                                    "fieldType": "array",
                                    "format": "JSON",
                                    "preset": "source"
                                })

                                a = this.combinedDataAfterExtractionSource2.length;
                                u = this.combinedDataAfterExtractionSource2.length;
                                console.log("PRINT : ESQL Request field definitions ends", a, u);
                            }
                        }
                    }
                }
            }

            //remove duplicate field definitions
            this.fieldDefinitionsRequest2 = this.removeDupFieldDefinitions(this.fieldDefinitionsRequest2)

            //remove duplicate field definitions ends 

            for (var i = 0; i < this.dataWithDirectRowNo2.length; i++) {
                for (var j = 0; j < this.combinedDataAfterExtractionSource2.length; j++) {
                    var x = this.combinedDataAfterExtractionSource2[j].key;
                    if (x !== undefined) {
                        var splitted = x.split(".");
                        for (var t = 0; t < splitted.length; t++) {
                            var data = splitted[t];
                            if (this.dataWithDirectRowNo2[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo2[i].datatypeVerified === this.combinedDataAfterExtractionSource2[j].value) {

                                var sourceJson = this.combinedDataAfterExtractionSource2[j].key;
                                var val = sourceJson.replace(".type", "");
                                this.dataForEsql2.push({
                                    'source': val,
                                    'target': this.dataWithDirectRowNo2[i].tfieldName,
                                    'operation': ""
                                })
                                console.log("PRINT : DATA FOR ESQL 2 ", this.dataForEsql2)
                            }

                        }
                    }

                }
            }
        }

        var obj = {};

        for (var t = 0; t < this.dataForEsql2.length; t++) {
            obj[this.dataForEsql2[t]['target']] = this.dataForEsql2[t];
        }
        this.dataForEsqlRequest2 = new Array();
        for (var key in obj)
            this.dataForEsqlRequest2.push(obj[key]);
        console.log("PRINT : Final Esql 2 Request Object ", this.dataForEsql2)

        this.getFlattenStructureResponse12();

    }

    /**
     * @author Sucheta
     * @param data 
     * @description This function is used to get the json structure for esql generation
     */

    getFlattenStructureResponse12() {
        console.log("PRINT : Get Flatten Structure Response 12 Called ");

        this.dataForEsqlResponse2 = [];
        this.dataWithDirectRowNo2 = [];
        this.dataWithNoDirectRow2 = [];

        console.log("PRINT : Combined Data After Extraction Of Source Object 2 ", this.combinedDataAfterExtractionSource2)
        for (var i = 0; i < this.responseData2.length; i++) {
            if (this.responseData2[i].directRowNo !== "") {
                console.log("PRINT : Response Data 2 ", this.responseData2);
                this.dataWithDirectRowNo2.push(this.responseData2[i]);
                console.log("PRINT : If Direct Row Num is Not Empty then push into dataWithDirectRowNo2 array ", this.dataWithDirectRowNo2);
            } else {
                this.dataWithNoDirectRow2.push(this.responseData2[i]);
                console.log("PRINT : If Direct Row Num is Empty then push into dataWithNoDirectRow2 array ", this.dataWithNoDirectRow2);

            }
        }
        console.log("PRINT : Data With Direct Row Num 2  ", this.dataWithDirectRowNo2);
        console.log("PRINT : Data With 'No' Direct Row Num 2  ", this.dataWithNoDirectRow2);

        for (var y = 0; y < this.dataWithDirectRowNo2.length; y++) {

            for (var u = 0; u < this.combinedDataAfterExtractionSourceResponse2.length; u++) {
                if (this.combinedDataAfterExtractionSourceResponse2[u].key.includes(this.dataWithDirectRowNo2[y].sourceFieldName)) {
                    console.log("PRINT : Check If Source Field Name Exist Or Not ");
                    for (var a = 0; a < this.combinedDataAfterExtractionSourceResponse2.length; a++) {
                        if (this.combinedDataAfterExtractionSourceResponse2[a].value == "array") {
                            var aSplit = this.combinedDataAfterExtractionSourceResponse2[u].key.split(".");
                            console.log("PRINT : Splitting Process Of combinedDataAfterExtractionSourceResponse2 ", aSplit);
                            var splitted1 = aSplit[1];
                            console.log("PRINT : Check Splitted Data ", splitted1);
                            var value11 = splitted1;
                            if (this.combinedDataAfterExtractionSourceResponse2[a].key.includes(value11)) {
                                var newArray = this.combinedDataAfterExtractionSourceResponse2[a].key.split(".");
                                var newValue = newArray[newArray.length - 2]
                                var splitted = newValue.split(".");
                                console.log("PRINT : New Array Of Combined Data After Extraction Source Response 2 ", splitted);
                                var responseValue = newArray[0]
                                var newValue2 = newArray[1]
                                console.log("PRINT : Response Value @index 0 ", responseValue);
                                console.log("PRINT : Response Value @index 1 ", newValue2);

                                this.fieldDefinitionsResponse2.push({
                                    "fieldName": newValue2,
                                    "fieldType": "array",
                                    "format": "JSON",
                                    "preset": "source"
                                })

                                a = this.combinedDataAfterExtractionSourceResponse2.length;
                                u = this.combinedDataAfterExtractionSourceResponse2.length;
                                console.log("PRINT : ESQL Response field definitions ends ");
                            }
                        }
                    }

                }
            }
            console.log("PRINT : Field Definition Response 2 ", this.fieldDefinitionsResponse2);
        }
        // fieldDefinitions ends
        this.fieldDefinitionsResponse2 = this.removeDupFieldDefinitions(this.fieldDefinitionsResponse2);
        console.log("PRINT : Check Data With Direct Row Number 2  ", this.dataWithDirectRowNo2);

        for (var i = 0; i < this.dataWithDirectRowNo2.length; i++) {
            for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse2.length; j++) {

                var x = this.combinedDataAfterExtractionSourceResponse2[j].key;
                if (x !== undefined) {
                    var splitted = x.split(".");
                    for (var t = 0; t < splitted.length; t++) {
                        var data = splitted[t];
                        if (this.dataWithDirectRowNo2[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo2[i].datatypeVerified === this.combinedDataAfterExtractionSourceResponse2[j].value && this.dataWithDirectRowNo2[i].tfieldName == "RejectionReason") {
                            console.log("PRINT : Check Target Field Name ", this.dataWithDirectRowNo2[i].tfieldName)
                            var sourceJson = this.combinedDataAfterExtractionSourceResponse2[j].key;
                            var val = sourceJson.replace(".type", "");
                            this.dataForEsqlResponse2.push({
                                'source': this.dataWithDirectRowNo2[i].tfieldName,
                                'target': val,
                                'operation': "coalesce"
                            })
                        } else if (this.dataWithDirectRowNo2[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo2[i].datatypeVerified === this.combinedDataAfterExtractionSourceResponse2[j].value && this.dataWithDirectRowNo2[i].tfieldName !== "RejectionReason") {
                            var sourceJson = this.combinedDataAfterExtractionSourceResponse2[j].key;
                            console.log("PRINT : Check Target Field Name ", this.dataWithDirectRowNo2[i].tfieldName)
                            var val = sourceJson.replace(".type", "");
                            this.dataForEsqlResponse2.push({
                                'source': this.dataWithDirectRowNo2[i].tfieldName,
                                'target': val,
                                'operation': ""
                            })
                        }

                    }
                }

            }
        }
        this.dataForEsqlResponse2FundTransfer = this.dataForEsqlResponse2;
        console.log("PRINT : Data For ESQL Response Fund Transfer ", this.dataForEsqlResponse2FundTransfer);
        this.dataForEsqlResponse2FundTransfer.push({
            "source": "Reserved7",
            "target": "Reserved7",
            "operation": ""
        })
        this.dataForEsqlResponse2FundTransfer.push({
            "source": "Reserved8",
            "target": "Reserved8",
            "operation": ""

        });
        this.dataForEsqlResponse2FundTransfer.push({
            "source": "Reserved9",
            "target": "Reserved9",
            "operation": ""
        });
        this.dataForEsqlResponse2FundTransfer.push({
            "source": "Reserved10",
            "target": "Reserved10",
            "operation": ""
        });
        console.log(" this.dataForEsqlResponse2 , Response= ", this.dataForEsqlResponse2);
        this.finalDataForEsql2 = {
            "sourceType": "JSON",
            "targetType": "DFDL",
            "fieldDefinitions": this.fieldDefinitionsResponse2,
            "fields": this.dataForEsqlResponse2
        }
        var finalEsqlObject_3 = {
            "mappedObj": this.finalDataForEsql2,
            "templateName": config.templateNameEsql,
            "fileName": config.fileNameEsql_Scene_3_Response_2,
            "reqRetryRule": this.retryRule,
            "clientName": "abc",
            "username": this.username,
            "orgName": this.organisation,
            "productName": this.productName,
            "serviceName": "ecollection with remitter validation in intermediary account",
            "projectId": this.projectId,
            "clientCode": this.clientCode,
            "IPSClientCode": this.clientCodeIPS,
            "fileCount": 3,
            "typeOfService": this.webServiceType,
            "accountNo": this.poolAccountNumber,
            "IFSCCode": this.ifscCode,
            "basePath": "/ecollection/" + this.clientCode,
            "validationPath": "/validation",
            "txnReversal": "No"
        }
        this.finalDataForEsql2FundTransfer = {
            "sourceType": "JSON",
            "targetType": "DFDL",
            "fieldDefinitions": this.fieldDefinitionsResponse2,
            "fields": this.dataForEsqlResponse2FundTransfer
        }

        var finalEsqlObject_4 = {
            "mappedObj": this.finalDataForEsql2FundTransfer,
            "templateName": config.templateNameEsql,
            "fileName": config.fileNameEsql_Scene_3_Response_3,
            "clientName": "abc",
            "reqRetryRule": this.retryRule,
            "username": this.username,
            "orgName": this.organisation,
            "productName": this.productName,
            "serviceName": "ecollection with remitter validation in intermediary account",
            "projectId": this.projectId,
            "clientCode": this.clientCode,
            "IPSClientCode": this.clientCodeIPS,
            "fileCount": 4,
            "typeOfService": this.webServiceType,
            "accountNo": this.poolAccountNumber,
            "IFSCCode": this.ifscCode,
            "basePath": "/ecollection/" + this.clientCode,
            "validationPath": "/validation",
            "txnReversal": "No"
        }
        this.finalDataForEsqlreversal = {
            "sourceType": "JSON",
            "targetType": "REVERSAL",
            "fieldDefinitions": this.fieldDefinitionsRequest,
            "fields": this.dataForEsqlResponse
        }
        //Transaction Reversal Object
        var finalEsqlObject_5 = {
            "mappedObj": this.finalDataForEsqlreversal,
            "templateName": config.templateNameEsql,
            "fileName": config.fileNameEsql_Scene_3_Request_1,
            "clientName": "abc",
            "reqRetryRule": this.retryRule,
            "username": this.username,
            "orgName": this.organisation,
            "productName": this.productName,
            "serviceName": "ecollection transaction reversal ips",
            "projectId": this.projectId,
            "clientCode": this.clientCodeProfunds,
            "IPSClientCode": this.clientCodeIPS,
            "txnReversal": "Yes",
            "fileCount": 5,
            "basePath": "/ecollection/" + this.clientCode,
            "typeOfService": this.webServiceType,
            "accountNo": this.poolAccountNumber,
            "IFSCCode": this.ifscCode,
            "reversalPath": "/reversal"
        }
        console.log("PRINT :Final EsqlObject 3 :", JSON.stringify(finalEsqlObject_3))
        console.log("PRINT :Final EsqlObject 4 :", JSON.stringify(finalEsqlObject_4))
        console.log("PRINT :Final EsqlObject 5 :", JSON.stringify(finalEsqlObject_5))


        this.mapping4Service.postESQL(finalEsqlObject_3).then((dataEsql) => {
            console.log("PRINT : API Response For ESQL 3  : ", dataEsql);
            // this.toastr.success(" ESQL Response 3 :" + dataEsql.message);
            this.msg = dataEsql.message
            $("#h").css("display", "block").delay(2000).fadeOut(200);
            this.mapping4Service.postESQL(finalEsqlObject_4).then((dataEsql) => {
                console.log("PRINT : API Response For ESQL 4  : ", dataEsql);
                // this.toastr.success(" ESQL Response 4 :" + dataEsql.message);
                this.msg = dataEsql.message
                $("#i").css("display", "block").delay(2000).fadeOut(200);
                this.mapping4Service.postESQL(finalEsqlObject_5).then((dataEsql) => {
                    console.log("PRINT : API Response For ESQL 5 Transaction reversal  : ", dataEsql);
                    // this.toastr.success(" ESQL Response 5 :" + dataEsql.message);
                    this.msg = dataEsql.message
                    $("#j").css("display", "block").delay(2000).fadeOut(200);
                    this.yamlCreation(this.requestData, this.responseData, this.serviceUrl)
                        .then(object1 => {
                            console.log("YAML 1 OBJECT", object1);
                            this.mapping4Service.postYamlData(object1).then((yamlResponse) => {
                                console.log("PRINT :YAML Response 1 :", yamlResponse);
                                // this.toastr.success(" Yaml Response 1 :" + yamlResponse.message);
                                this.msg = yamlResponse.message
                                $("#k").css("display", "block").delay(2000).fadeOut(200);
                                // this.isLoading = false;
                                // this.initiatesSIT(this.dataOfUser); //Initiate SIT Operation Start
                                this.yamlCreation2(this.requestData2, this.responseData2, this.serviceUrl)
                                    .then(object2 => {
                                        console.log("YAML 2 OBJECT", object2);
                                        this.mapping4Service.postYamlData(object2).then((yamlResponse) => {
                                            console.log("PRINT : Transaction Reversal response for YAML File 2 ", yamlResponse)
                                            if (yamlResponse.message == "success." || yamlResponse.message == "Finally pushed yaml files") {
                                                // this.isLoading = false;
                                                // this.disabledMapping5Check = false;
                                                console.log("PRINT : Redirect To Next Page ");
                                                if (this.alreadyDataPresent == false) {
                                                    var mappingDataObject = {};
                                                    var mapping2RequestDataObject = {
                                                        "mapping2RequestObject": this.mapping2RequestObject,
                                                        "mapping2ResponseObject": this.mapping2ResponseObject,
                                                        "mapping2RequestObject2": this.mapping2RequestObject2
                                                    };

                                                    mappingDataObject["mappingObj"] = mapping2RequestDataObject;
                                                    mappingDataObject["projectId"] = localStorage.getItem('projectId')
                                                    this.mapping4Service.postSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
                                                        console.log("postSaveMappingDataResponse  =====>", postSaveMappingDataResponse);
                                                        //   this.toastr.success("Data Saved Successfully!")
                                                        $("#save").css("display", "block").delay(2000).fadeOut(400);
                                                    })
                                                }
                                                else if (this.alreadyDataPresent == true) {


                                                    var mappingDataObject = {};
                                                    console.log("requestData", this.requestData);
                                                    var mapping2RequestDataObject = {
                                                        "mapping2RequestObject": this.mapping2RequestObject,
                                                        "mapping2ResponseObject": this.mapping2ResponseObject,
                                                        "mapping2RequestObject2": this.mapping2RequestObject2
                                                    };
                                                    mappingDataObject["mappingObj"] = mapping2RequestDataObject;
                                                    mappingDataObject["projectId"] = localStorage.getItem('projectId')
                                                    console.log("mappingDataObject", mappingDataObject);
                                                    this.mapping4Service.putSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
                                                        console.log("new postSaveMappingDataResponse  =====>", postSaveMappingDataResponse);
                                                        // this.toastr.success("Data Saved Successfully!")
                                                        $("#save").css("display", "block").delay(2000).fadeOut(400);
                                                    })
                                                }
                                                // var mappingDataObject = {};
                                                // var mapping3RequestDataObject = {
                                                //     "mapping3RequestObject1": this.mapping3RequestObject1,
                                                //     "mapping3ResponseObject1": this.mapping3ResponseObject1,
                                                //     "mapping3RequestObject2": this.mapping3RequestObject2
                                                // };

                                                // mappingDataObject["mappingObj"] = mapping3RequestDataObject;
                                                // mappingDataObject["projectId"] = localStorage.getItem('projectId')
                                                // this.mapping4Service.postSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
                                                //     console.log("postSaveMappingDataResponse  =====>", postSaveMappingDataResponse);

                                                // })
                                                // this.toastr.success(" YAML Response 2 with Transaction Reversal : " + yamlResponse.message);
                                                this.msg = yamlResponse.message
                                                $("#l").css("display", "block").delay(2000).fadeOut(200);
                                                setTimeout(() => {
                                                    this.initiatesSIT(this.dataOfUser); //Initiate SIT Operation Start    
                                                }, 5000);
                                            } else {
                                                this.disabledMapping5Check = false;
                                                console.log(yamlResponse.message);
                                                this.msg = yamlResponse.message
                                                $("#m").css("display", "block").delay(2000).fadeOut(200);
                                                // this.toastr.error(" Yaml Response 2 with Transaction Reversal Failed" + yamlResponse.message);
                                                this.isLoading = false;
                                            }

                                        }).catch((err) => {
                                            if (err) {
                                                console.log("PRINT EXCEPTION", err);
                                                // this.toastr.error("ERROR IN YAML 2 ENCOUNTERED. Please Try Again.." + err.error.message);
                                                this.msg = err.error.message
                                                $("#n").css("display", "block").delay(2000).fadeOut(200);
                                                this.isLoading = false;
                                            }
                                        })

                                    }).catch(err => {
                                        console.log("YAML 2 OBJECT ERROR", err);
                                    })
                            }).catch(err => {
                                console.log("PRINT : PROBLEl WITH YAM 1", err);
                                // this.toastr.error("ERROR IN YAML 1 ENCOUNTERED");
                                // this.toastr.error("Please try again..Something went wrong");
                                this.isLoading = false;
                                $("#o").css("display", "block").delay(1500).fadeOut(200);
                                setTimeout(() => {
                                    $("#p").css("display", "block").delay(1500).fadeOut(200)
                                }, 1501);

                            })

                        }).catch(err => {
                            console.log("YAML 1 OBJECT ERROR", err);

                        })



                }).catch((err) => {
                    if (err) {
                        this.msg = err.message
                        $("#q").css("display", "block").delay(2000).fadeOut(200);
                        // this.toastr.error("ESQL 4 & 5 Response.Please Try Again.." + err.message);
                        console.log("PRINT EXCEPTION in 4 & 5 ", err);
                        this.isLoading = false;
                    }
                })
            }).catch((err) => {
                if (err) {
                    this.msg = err.message
                    $("#q").css("display", "block").delay(2000).fadeOut(200);
                    // this.toastr.error("ESQL 4 & 5 Response.Please Try Again.." + err.message);
                    console.log("PRINT EXCEPTION in 4 & 5 ", err);
                    this.isLoading = false;
                }
            })
        })
    }

    /**
     * @author : Sucheta
     * @description : Generate YAML.
     */


    async yamlCreation2(requestD, responseD, clientUrl) {
        console.log("PRINT : YAML Creation 2 Called ");
        console.log("PRINT : YAML Creation 2 Data ", requestD, responseD, clientUrl);
        var flattenData = {
            "description": "YAML For API TEST",
            "title": "test",
            "ibmName": "test",
            "targetUrl": "http://example.com/operation-name",
            "targetUrlDescription": "The URL of the target service",
            "basePath": "/ecollection",
            "path": "/transaction",
            "operations": [{
                "operationId": null,
                "path": "/transaction",
                "method": "post",
                "fields": [{
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
                }],
                "responses": [{
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
                }]
            }]

        }
        // console.log("PRINT : Combined Data After Extraction Source 2 ", this.combinedDataAfterExtractionSource2);
        var combArray = [];
        this.combinedDataAfterExtractionSource2.forEach((item, index) => {
            combArray.push({
                ['"' + item.key + '"']: item.value
            })
        })
        console.log("PRINT : Combined Array ", combArray);
        var unflattenValue = this.unflatten(combArray[2]);
        //   console.log("PRINT : UnFlattened Object ", Object.assign(unflattenValue));

        this.requestField2 = this.yamlGenRequest2();
        // var responseField = this.yamlGenResponse2();
        console.log("PRINT : Request 2 Data ", this.requestField2);
        console.log("PRINT : arrayFlagSubmitResponse2 Property Status ", this.arrayFlagSubmitResponse2);

        if (this.arrayFlagSubmitResponse2 == true) {

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
                "operations": [{

                    "operationId": null,
                    "path": this.sourcePath2,
                    "method": this.sourceMethod2,
                    fields: [this.requestField2['fields']]
                    // responses: [responseField['responses']]
                }]
            }]

            var yamlObject = {
                'params': finalYaml[0],
                'templateName': 'template.yaml',
                'fileName': config.fileName_yaml_confirmation,
                "username": this.username,
                "orgName": this.organisation,
                "productName": this.productName,
                "serviceName": "eCollection_RemitterValidation_IntermediateAccount_IPS_Profunds",
                'projectId': this.projectId,
                "clientCode": this.clientCode,
                "IPSClientCode": this.clientCodeIPS,
                "fileCount": 1,
                "txnReversal": "No"
            }
            console.log("PRINT : Final YAML Object 1 Reversal ", JSON.stringify(yamlObject));

            return yamlObject;
        }
        else if (this.arrayFlagSubmitResponse2 == false) {
            console.log("PRINT : Status Of  arrayFlagSubmitResponse2 ", this.arrayFlagSubmitResponse2);
            var finalResponse = {};
            var response1 = {};
            finalResponse['responses'] = response1;
            console.log("PRINT : Request Field 2  ", this.requestField2['fields']);
            console.log("PRINT : response1['200'] ", response1["200"]);
            console.log("PRINT : finalResponse['responses'] = ", finalResponse['responses']);

            let finalYaml2 = [{
                "description": "Yaml For ecollection",
                "title": "ecollection" + this.clientCodeIPS,
                "ibmName": "test",
                "sitUrl": this.reversalUrl,
                "uatUrl": this.reversalUrl,
                "prodUrl": this.reversalUrl,
                "targetUrlDescription": "The URL of the target service",
                "basePath": "/ecollection/" + this.clientCodeIPS,
                "path": "/reversal",
                "operations": [{
                    "operationId": null,
                    "path": this.sourcePath,
                    "method": this.sourceMethod,
                    fields: [this.requestField2['fields']]
                    // responses: []
                }]
            }]

            let yamlObject2 = {
                'params': finalYaml2[0],
                'templateName': 'template.yaml',
                'fileName': config.fileName_yaml_confirmation,
                "username": this.username,
                "orgName": this.organisation,
                "productName": this.productName,
                "serviceName": "eCollection_RemitterValidation_IntermediateAccount_IPS_Profunds",
                'projectId': this.projectId,
                "IPSClientCode": this.clientCodeIPS,
                "clientCode": this.clientCode,
                "fileCount": 2,
                "txnReversal": "YES",
                "isJenkinPush": this.jenkinsFlag
            }
            this.userData = localStorage.getItem("dataofUser");
            this.dataOfUser = JSON.parse(this.userData);
            console.log("PRINT : YAML File 2 For Transaction Reversal : ", JSON.stringify(yamlObject2));

            return yamlObject2;

        }
    }
    initiatesSIT(userData) {
        console.log("PRINT : User Data Has been Passed to SIT ", userData);
        if (this.txnReversal == false) {
            var valueOFReversal = "No";
        } else {
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

        this.mapping4Service.initiateSIT(data).then(async (data) => {
            console.log("PRINT: INITIATE SIT RESPONSE", data);
            if (data.message != null) {
                console.log("SIT Initiate result", data);
                await alert("Code Generated Successfully. Please Continue with Testing.");
                await this.gotoNextTab();
            }

        }).catch(err => {
            console.log("PRINT : PROBLEM IN INITIATE SIT");
            // this.toastr.error("ERROR IN INITIATE SIT ENCOUNTERED");
            this.msg = err.error.message
            $("#o").css("display", "block").delay(2000).fadeOut(200);
            this.isLoading = false;

        })
    }
    yamlGenRequest2() {
        this.requestProperty2 = [];
        this.requestDataFiltered2 = [];
        this.requestLayout2 = [];
        this.requestPropertyNonArray2 = [];
        this.requestExtraction2 = [];
        this.requestPropNonArray22 = [];
        this.finalRequestWithoutArray2 = [];
        this.finalRequest12 = [];
        this.finalRequest22 = []

        //To check if the file has an array.

        var arrayFlag: boolean = false;

        for (var ut = 0; ut < this.combinedDataAfterExtractionSource2.length; ut++) {

            if (this.combinedDataAfterExtractionSource2[ut].value == "array") {
                console.log("PRINT : File has an Array ");

                arrayFlag = true;
                ut = this.combinedDataAfterExtractionSource2.length
            }
        }

        //step 1 - filter the mapped data from request array

        for (var t = 0; t < this.requestData2.length; t++) {
            if (this.requestData2[t].directRowNo !== "") {
                this.requestDataFiltered2.push(this.requestData2[t]);
                console.log("PRINT : Filter the mapped data from request array ", this.requestDataFiltered2);
            }
        }
        //step 2 - check if any array from request data is present in flattened array
        for (var y = 0; y < this.requestDataFiltered2.length; y++) {
            for (var u = 0; u < this.combinedDataAfterExtractionSource2.length; u++) {
                if (this.combinedDataAfterExtractionSource2[u].key.includes(this.requestDataFiltered2[y].sourceFieldName)) {
                    for (var a = 0; a < this.combinedDataAfterExtractionSource2.length; a++) {
                        if (this.combinedDataAfterExtractionSource2[a].key.includes(this.combinedDataAfterExtractionSource2[u].key) && (this.combinedDataAfterExtractionSource2[u].value == "array")) {
                            var newValue = this.combinedDataAfterExtractionSource2[u].key.replace(".type", "")
                            this.requestLayout2.push({
                                key: newValue,
                                value:

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

                            a = this.combinedDataAfterExtractionSource2.length;
                        }
                    }

                }
            }
            console.log("PRINT : Request Layout 2 in YAMLResponse2 Method ", this.requestLayout2)
        }

        //step 3  - segregate the array values having a corresponding flattened array type in a new json
        for (var d = 0; d < this.requestDataFiltered2.length; d++) {
            for (var s = 0; s < this.combinedDataAfterExtractionSource2.length; s++) {
                if (this.combinedDataAfterExtractionSource2[s].key.includes("." + this.requestDataFiltered2[d].sourceFieldName + ".") && ((this.requestDataFiltered2[d].datatypeVerified) !== "array")) {
                    // console.log("PRINT : Combined Data After Extraction Source 2 ", this.combinedDataAfterExtractionSource2[s].key);
                    // console.log("this.requestDataFiltered2[y].sourceFieldName = ", this.requestDataFiltered2[d].sourceFieldName)
                    for (var f = 0; f < this.combinedDataAfterExtractionSource2.length; f++) {
                        if (this.combinedDataAfterExtractionSource2[f].key.includes(this.combinedDataAfterExtractionSource2[s].key) && (this.combinedDataAfterExtractionSource2[f].value !== "array")) {
                            this.requestProperty2.push({
                                key: this.combinedDataAfterExtractionSource2[s].key,
                                value: {
                                    [this.requestDataFiltered2[d].sourceFieldName]: {
                                        "type": this.requestDataFiltered2[d].datatypeVerified
                                    }
                                }
                            })
                        }
                    }
                }
            }
            // console.log("PRINT : Request Property 2 in YAMLResponse2 Method ", this.requestProperty2)
        }
        //step 4 - Request non-array values from request data into a new json
        for (var g = 0; g < this.requestDataFiltered2.length; g++) {
            for (var h = 0; h < this.combinedDataAfterExtractionSource2.length; h++) {
                if (arrayFlag == true) {
                    if (!((this.combinedDataAfterExtractionSource2[h].key).includes(this.requestDataFiltered2[g].sourceFieldName)) && ((this.requestDataFiltered2[g].datatypeVerified) !== "array")) {
                        // console.log("PRINT : File does not have Array");
                        for (var j = 0; j < this.combinedDataAfterExtractionSource2.length; j++) {
                            if (this.combinedDataAfterExtractionSource2[j].key.includes(this.combinedDataAfterExtractionSource2[h].key) && ((this.combinedDataAfterExtractionSource2[j].value) !== "array")) {
                                // console.log("PRINT :Inside 2nd if of step 4 ");
                                this.requestPropertyNonArray2.push({
                                    key: this.requestDataFiltered2[g].sourceFieldName,
                                    value: {
                                        [this.requestDataFiltered2[g].sourceFieldName]: {
                                            "type": this.requestDataFiltered2[g].datatypeVerified,

                                        }
                                    }
                                })
                                j = this.combinedDataAfterExtractionSource2.length
                                h = this.combinedDataAfterExtractionSource2.length
                            }
                        }
                    }
                } else if (arrayFlag == false) {
                    if (((this.combinedDataAfterExtractionSource2[h].key).includes(this.requestDataFiltered2[g].sourceFieldName)) && ((this.requestDataFiltered2[g].datatypeVerified) !== "array")) {
                        for (var j = 0; j < this.combinedDataAfterExtractionSource2.length; j++) {
                            if (this.combinedDataAfterExtractionSource2[j].key.includes(this.combinedDataAfterExtractionSource2[h].key) && ((this.combinedDataAfterExtractionSource2[j].value) !== "array")) {
                                // console.log("PRINT : Inside 2nd if of step 4 ");
                                this.requestPropertyNonArray2.push({
                                    key: this.requestDataFiltered2[g].sourceFieldName,
                                    value: {
                                        [this.requestDataFiltered2[g].sourceFieldName]: {
                                            "type": this.requestDataFiltered2[g].datatypeVerified,

                                        }
                                    }
                                })
                                j = this.combinedDataAfterExtractionSource2.length
                                h = this.combinedDataAfterExtractionSource2.length
                            }
                        }
                    }
                }
            }
        }
        if (arrayFlag === true) {
            for (var l = 0; l < this.requestPropertyNonArray2.length; l++) {
                var flag = false;
                for (var z = 0; z < this.requestProperty2.length; z++) {
                    var value1 = Object.keys(this.requestPropertyNonArray2[l].value);
                    // console.log("PRINT : value 1 in arrayFlag True ", value1);
                    var value2 = Object.keys(this.requestProperty2[z].value);
                    // console.log("PRINT : value 2 in arrayFlag True ", value1);
                    if (value1[0] == value2[0]) {
                        // console.log("PRINT : Inside For Loop Comparision of value1 and value2 ");
                        flag = true;
                    }
                }

                if (flag === false) {
                    this.requestPropNonArray22.push(this.requestPropertyNonArray2[l]);
                }
            }
        } else {
            this.requestPropNonArray22 = (this.requestPropertyNonArray2);
        }

        // console.log("PRINT : Request Property does not have Array ", this.requestPropNonArray22);

        //step 5 - Arrange the values in the fields json
        for (var x = 0; x < this.requestProperty2.length; x++) {
            if (this.requestLayout2.length !== 0) {
                for (var c = 0; c < this.requestLayout2.length; c++) {
                    if (this.requestProperty2[x].key.includes(this.requestLayout2[c].key)) {
                        // console.log("PRINT : Values arrangement in JSON ");
                        // console.log("PRINT : Extract Keys From request Property 2 ", Object.keys(this.requestProperty2[x].value)[0]);
                        // console.log("PRINT : Extract Values From request Property 2 ", Object.values(this.requestProperty2[x].value)[0]);
                        this.finalRequest12 = this.requestLayout2[c].value
                        // console.log("PRINT : Final request 2 of 2  ", this.finalRequest12);
                        this.finalRequest12[this.requestLayout2[c].key].items.properties[Object.keys(this.requestProperty2[x].value)[0]] = Object.values(this.requestProperty2[x].value)[0];
                    }
                }
            }
        }

        for (var v = 0; v < this.requestPropNonArray22.length; v++) {
            this.finalRequestWithoutArray2.push(this.requestPropNonArray22[v].value)

        }

        // console.log("PRINT : Request Layout 2 ", this.requestLayout2);
        // console.log("PRINT : Final Request Without Array 2  ", this.finalRequestWithoutArray2);
        var fields = {};

        // console.log("PRINT : Final Request 1 of 2 ", this.finalRequest12)
        if (this.requestLayout2.length !== 0) {
            this.finalRequest22.push(this.finalRequest12);
        }

        this.finalRequestWithoutArray2.forEach((item) => {
            // console.log("PRINT : For Each Iteration Of Final Request Without Array Object ", item);
            var key1 = Object.keys(item);
            this.finalRequest22.push(item);
        })
        // console.log("PRINT : Final Request 2 of 2 ", this.finalRequest22);

        if (arrayFlag == true) {
            fields['fields'] = this.finalRequest22
        } else if (arrayFlag == false) {
            var result = Object.assign({}, ...this.finalRequest22);

            // console.log("PRINT : Final Request 2 of 2 Object assign ", result);

            fields["fields"] = result;
        }
        // console.log("PRINT : Fields By assigning result to fields ", fields);
        return fields;
    }



    yamlGenResponse2() {
        this.responseProperty2 = [];
        this.responseDataFiltered2 = [];
        this.responseLayout2 = [];
        this.responsePropertyNonArray2 = [];
        this.responseExtraction2 = [];
        this.responsePropNonArray2 = [];
        this.finalResponseWithoutArray2 = [];
        this.finalResponse12 = {};
        // this.responseRequest = [];
        this.finalResponse22 = []


        //To check if the file has an array

        var arrayFlag: boolean = false;

        for (var ut = 0; ut < this.combinedDataAfterExtractionSourceResponse2.length; ut++) {

            if (this.combinedDataAfterExtractionSourceResponse2[ut].value == "array") {

                arrayFlag = true;
                this.arrayFlagSubmitResponse2 = true;
                ut = this.combinedDataAfterExtractionSourceResponse2.length
            }
        }


        for (var y = 0; y < this.responseDataFiltered2.length; y++) {
            for (var u = 0; u < this.combinedDataAfterExtractionSourceResponse2.length; u++) {
                if (this.combinedDataAfterExtractionSourceResponse2[u].key.includes(this.responseDataFiltered2[y].sourceFieldName)) {
                    for (var a = 0; a < this.combinedDataAfterExtractionSourceResponse2.length; a++) {
                        if (this.combinedDataAfterExtractionSourceResponse2[a].value == "array") {
                            var aSplit = this.combinedDataAfterExtractionSourceResponse2[u].key.split(".");
                            console.log("PRINT : Splitting Process in Array Comparison ", aSplit);
                            // var splitted1 = this.combinedDataAfterExtractionSourceResponse[a].key.replace(".type", "")
                            var splitted1 = aSplit[1];
                            console.log("PRINT : Splitted Object 1 ", splitted1);
                            // var aSplit2 = splitted1.split(".");
                            //  var splitted2 = splitted1.replace(aSplit2[1],"")
                            var value11 = splitted1;
                            if (this.combinedDataAfterExtractionSourceResponse2[a].key.includes(value11)) {
                                var newArray = this.combinedDataAfterExtractionSourceResponse2[a].key.split(".");
                                var newValue = newArray[newArray.length - 2];
                                var splitted = newValue.split(".");
                                console.log("PRINT : Splitted Object ", splitted);
                                var responseValue = newArray[0];
                                var newValue2 = newArray[1];
                                console.log("PRINT : New Value Object 2 ", newValue2);
                                this.responseLayout2.push({
                                    key: newValue,
                                    value: {
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

                                a = this.combinedDataAfterExtractionSourceResponse2.length;
                                u = this.combinedDataAfterExtractionSourceResponse2.length;
                                console.log("YAML Gen response2 ends")
                            }
                        }
                    }
                }
            }
            console.log("PRINT : Response Layout 2 ", this.responseLayout2);
        }

        //step 3  - segregate the array values having a corresponding flattened array type in a new json

        for (var d = 0; d < this.responseDataFiltered2.length; d++) {
            for (var s = 0; s < this.combinedDataAfterExtractionSourceResponse2.length; s++) {
                if (this.combinedDataAfterExtractionSourceResponse2[s].key.includes("." + this.responseDataFiltered2[d].sourceFieldName + ".") && ((this.responseDataFiltered2[d].datatypeVerified) !== "array")) {
                    for (var f = 0; f < this.combinedDataAfterExtractionSourceResponse2.length; f++) {
                        if (this.combinedDataAfterExtractionSourceResponse2[f].key.includes(this.combinedDataAfterExtractionSourceResponse2[s].key) && (this.combinedDataAfterExtractionSourceResponse2[f].value !== "array")) {
                            this.responseProperty2.push({
                                key: this.combinedDataAfterExtractionSourceResponse2[s].key,
                                value: {
                                    [this.responseDataFiltered2[d].sourceFieldName]: {
                                        "type": this.responseDataFiltered2[d].datatypeVerified
                                    }
                                }
                            })
                        }
                    }
                }
            }

            console.log("PRINT : Response Property 2 ", this.responseProperty2)
        }
        //step 4 - Request non-array values from request data into a new json

        for (var g = 0; g < this.responseDataFiltered2.length; g++) {
            for (var h = 0; h < this.combinedDataAfterExtractionSourceResponse2.length; h++) {
                if (arrayFlag == true) {
                    if (!((this.combinedDataAfterExtractionSourceResponse2[h].key).includes(this.responseDataFiltered2[g].sourceFieldName)) && ((this.responseDataFiltered2[g].datatypeVerified) !== "array")) {
                        console.log("PRINT :  Request non-array values from request data into a new json ");

                        for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse2.length; j++) {
                            if (this.combinedDataAfterExtractionSourceResponse2[j].key.includes(this.combinedDataAfterExtractionSourceResponse2[h].key) && ((this.combinedDataAfterExtractionSourceResponse2[j].value) !== "array")) {
                                // console.log("Inside 2nd if of step 4")
                                this.responsePropertyNonArray2.push({
                                    key: this.responseDataFiltered2[g].sourceFieldName,
                                    value: {
                                        [this.responseDataFiltered2[g].sourceFieldName]: {
                                            "type": this.responseDataFiltered2[g].datatypeVerified,

                                        }
                                    }
                                })
                                j = this.combinedDataAfterExtractionSourceResponse2.length
                                h = this.combinedDataAfterExtractionSourceResponse2.length
                            }
                        }


                    }
                } else if (arrayFlag == false) {

                    if (!((this.combinedDataAfterExtractionSourceResponse2[h].key).includes(this.responseDataFiltered2[g].sourceFieldName)) && ((this.responseDataFiltered2[g].datatypeVerified) !== "array")) {
                        console.log("PRINT : Inside If (Not Equal to Array) ");
                        for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse2.length; j++) {
                            if (this.combinedDataAfterExtractionSourceResponse2[j].key.includes(this.combinedDataAfterExtractionSourceResponse2[h].key) && ((this.combinedDataAfterExtractionSourceResponse2[j].value) !== "array")) {
                                this.responsePropertyNonArray2.push({
                                    key: this.responseDataFiltered2[g].sourceFieldName,
                                    value: {
                                        [this.responseDataFiltered2[g].sourceFieldName]: {
                                            "type": this.responseDataFiltered2[g].datatypeVerified
                                        }
                                    }
                                })
                                j = this.combinedDataAfterExtractionSourceResponse2.length
                                h = this.combinedDataAfterExtractionSourceResponse2.length
                            }
                        }
                    }
                }
            }
        }


        if (arrayFlag === true) {
            console.log("PRINT : Response Property Non-Array 2 ", this.responsePropertyNonArray2)
            for (var l = 0; l < this.responsePropertyNonArray2.length; l++) {
                var flag = false;
                for (var z = 0; z < this.responseProperty2.length; z++) {
                    var value1 = Object.keys(this.responsePropertyNonArray2[l].value);
                    var value2 = Object.keys(this.responseProperty2[z].value);

                    if (value1[0] == value2[0]) {
                        console.log("PRINT : Inside z if / flag = true");
                        flag = true;
                    }
                }

                if (flag === false) {
                    this.responsePropNonArray2.push(this.responsePropertyNonArray2[l]);
                }
            }
        } else {
            this.responsePropNonArray2 = (this.responsePropertyNonArray2);
        }
        console.log("PRINT : Response Property Non-Array 2 ", this.responsePropNonArray2);

        //step 5 - Arrange the values in the fields json
        for (var x = 0; x < this.responseProperty2.length; x++) {
            if (this.responseLayout2.length !== 0) {

                for (var c = 0; c < this.responseLayout2.length; c++) {

                    if (this.responseProperty2[x].key.includes(this.responseLayout2[c].key)) {
                        console.log("PRINT : Key Exist Or Not in Response Property 2 ");
                        console.log("PRINT : Object.keys(this.responseProperty2[x].value)[0] ", Object.keys(this.responseProperty2[x].value)[0]);
                        console.log("PRINT : Object.values(this.responseProperty2[x].value)[0] = ", Object.values(this.responseProperty2[x].value)[0]);
                        console.log("PRINT : Response Layout 2 ", this.responseLayout2[c].key)

                        var xyz = Object.keys(this.responseLayout2[c].value)[0]
                        var abc = Object.values(this.responseLayout2[c].value)[0]
                        // this.finalResponse12 = this.responseLayout2[c].value

                        this.finalResponse12 = this.responseLayout2[c].value

                        var pqr = this.responseLayout2[c].key.replace(xyz + ".", "")
                        console.log("PRINT : Keys Extraction From Response Layout 2 ", xyz);
                        console.log("PRINT : Value Replacement in Response Layout 2 ", pqr);
                        console.log("PRINT : final Response 1 of 2 ", this.finalResponse12[xyz][pqr]);
                        this.finalResponse12[xyz][pqr].items.properties[Object.keys(this.responseProperty2[x].value)[0]] = Object.values(this.responseProperty2[x].value)[0];
                    }

                }

            }
        }

        for (var v = 0; v < this.responsePropNonArray2.length; v++) {
            this.finalResponseWithoutArray2.push(this.responsePropNonArray2[v].value);
        }

        console.log("PRINT : Final responseLayout2 ", this.responseLayout2);
        console.log("PRINT : final Response Without Array 2 ", this.finalResponseWithoutArray2);
        var fields = {};
        console.log("PRINT : Final Response 2 of 2 ", this.finalResponse12);
        console.log("PRINT : Final Response Without Array 2 of 2 ", this.finalResponseWithoutArray2);

        if (JSON.stringify(this.finalResponse12) !== '{}') {
            this.finalResponse22.push(this.finalResponse12);
        }

        this.finalResponseWithoutArray2.forEach((item) => {
            console.log("PRINT : For Each on finalResponseWithoutArray2 ", item);
            var key1 = Object.keys(item);
            this.finalResponse22.push(item);
        })
        console.log("PRINT : Final Response 2 of 2 ", this.finalResponse22);

        if (arrayFlag == true) {
            fields['responses'] = this.finalResponse22;
        } else if (arrayFlag == false) {
            var result = Object.assign({}, ...this.finalResponse22);

            console.log("PRINT : Final Result Assignment ", result);
            fields["responses"] = result;
        }
        console.log("PRINT : Field Responses ", fields);
        return fields;
    }

    /**
     * @author Abhijeet 
     * @description This function will be used to generate pdf for mapping
     */




    // PART -2 / FILE -2 ends
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
    saveDataOfMapping() {
        if (this.alreadyDataPresent == false) {
            var mappingDataObject = {};
            var mapping2RequestDataObject = {
                "mapping2RequestObject": this.requestData,
                "mapping2ResponseObject": this.responseData,
                "mapping2RequestObject2": this.requestData2
            };

            mappingDataObject["mappingObj"] = mapping2RequestDataObject;
            mappingDataObject["projectId"] = localStorage.getItem('projectId')
            this.mapping4Service.postSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
                console.log("postSaveMappingDataResponse  =====>", postSaveMappingDataResponse);
                // this.toastr.success("Data Saved Successfully!")
                $("#save").css("display", "block").delay(2000).fadeOut(400);
                this.alreadyDataPresent = true;
            })
        }
        else if (this.alreadyDataPresent == true) {


            var mappingDataObject = {};
            console.log("requestData", this.requestData);
            var mapping2RequestDataObject = {
                "mapping2RequestObject": this.requestData,
                "mapping2ResponseObject": this.responseData,
                "mapping2RequestObject2": this.requestData2
            };
            mappingDataObject["mappingObj"] = mapping2RequestDataObject;
            mappingDataObject["projectId"] = localStorage.getItem('projectId')
            console.log("mappingDataObject", mappingDataObject);
            this.mapping4Service.putSaveMappingData(mappingDataObject).then((postSaveMappingDataResponse) => {
                console.log("new postSaveMappingDataResponse  =====>", postSaveMappingDataResponse);
                //   this.toastr.success("Data Saved Successfully!")
                $("#save").css("display", "block").delay(2000).fadeOut(400);
            })
        }
    }
}