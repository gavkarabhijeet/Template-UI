import { Subject } from 'rxjs';	
import { NgTerminal } from 'ng-terminal';	

import { FunctionsUsingCSI } from 'ng-terminal';	
import { DisplayOption } from 'ng-terminal';	
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';	
import { NgbActiveModal , NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component,OnInit,ViewChild,OnDestroy,ɵConsole,ElementRef,HostListener} from "@angular/core";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { AppStatusService} from "./app-status.service";
import { HttpClient } from "@angular/common/http";
import { Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormBuilder} from "@angular/forms";
import { MakerService } from "../maker-page/maker-page.service";
import { version } from "punycode";
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

    selector: "app-app-status",

    templateUrl: "./app-status1.html",

    styleUrls: ["./app-status.component.css"]

})

export class AppStatusComponent implements OnInit, OnDestroy {
    // @HostListener('window:beforeunload', ['$event'])
    // public before() {
    //     return false
    // }
    // @HostListener('window:unload', ['$event'])
    // public after() {
    //     this.makerService.MyMethod()
    // }
    finalStatus: boolean;

    UatInitiated: boolean = true;

    message: any;

    private tabSet: NgbTabset;

    show = 2;

    projectId: string;

    projectData;

    projectInformation: any;

    auditTrailData: any;

    LiveAuditTrailData: any = [];

    clientCode: any;

    public navbarOpen: boolean;

    status = [];

    initiateUATFlag: any = "false";

    stopRequest: boolean = false;

    UatProgress: boolean = true;

    interval;

    SITinterval;

    UATinterval;

    Liveinterval;

    PRODinterval;

    SITDATA: any;

    UATDATA: any;

    PRODDATA: any;

    userData: string;

    statusSIT: string;

    dataOfUser: any;

    serviceNameOfUser: any;

    hideShow: boolean = false;

    dataForSIT: {};

    timestamp: any;

    valueOfRequest: any;

    displayInitiateSITButton: boolean = false;

    lastData: any;

    LiveAuditTrailUATData = [];

    addTestData: FormGroup;

    labelValue: string;

    valueOfUAT: Boolean = true;

    serviceDetails: any;

    responseMessage: any;

    exp: any;

    readyForProductionFlag: string;

    showButton: boolean;

    projectValue: any;

    clientCodeIPS: any;

    IPSClientCode: any;

    devOpsStatusArray = [];
    UATStatusArray = [];

    devOpsStatusArrayForUAT = [];

    devOpsStatusArrayProd = [];

    output: any[];

    txnReversal: string;

    isLoad: boolean = true;

    isLoad2: boolean = true;
    allSuccess: boolean = true;

    traveler: {

        "projectId": string;

        "status": string;

        "event": string;

        "createdBy": string;

        "orgName": string;

        "timeStamp": string;

    }[];

    jenkinsEventId = [];

    alreadyExistSITevents: boolean;

    alreadyExistUATevents: boolean;

    vanNo: string;
    pipeData = [];
    uatTab: boolean;
    sitTab: boolean;
    version: any;
    productName: any;
    clientname: any;
    username: any;
    orgName: any;
    data: string;
    dataforproces: any;
    writeSubject = new Subject<string>();	
	okFlag: boolean;
    terminalFlag: boolean = false;
    copyarray= [];
    tFlag: string;
    @ViewChild(NgbTabset) set content(content: NgbTabset) { this.tabSet = content;}
    @ViewChild('term') child: NgTerminal;	
	@ViewChild('termModal') child1: NgTerminal;

    @Output() someEvent = new EventEmitter<string>();



    options = {

        theme: "light", // two possible values: light, dark

        dir: "ltr", // two possible values: ltr, rtl

        layout: "vertical", // fixed value. shouldn't be changed.

        sidebartype: "full", // four possible values: full, iconbar, overlay, mini-sidebar

        sidebarpos: "fixed", // two possible values: fixed, absolute

        headerpos: "fixed", // two possible values: fixed, absolute

        boxed: "full", // two possible values: full, boxed

        navbarbg: "skin1", // six possible values: skin(/2/3/4/5/6)
        sidebarbg: "skin6", // six possible values: skin(1/2/3/4/5/6)

        logobg: "skin6" // six possible values: skin(1/2/3/4/5/6)

    };







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


    constructor(private makerService: MakerService, private appService: AppStatusService, private spinner: NgxSpinnerService, private fb: FormBuilder, private http: HttpClient, private ele: ElementRef,private modalService: NgbModal) { }


	ngAfterViewInit(){	
     
        var a=["a","b","c","d","e","f","g","h","i","a","b","c","d","e","f","g","h","i","a","b","c","d","e","f","g","h","i","a","b","c","d","e","f","g","h","i","d","e","f","g","h","i","a","b","c","d","e","f","g","h","i","d","e","f","g","h","i","a","b","c","d","e","f","g","h","i"]	
        for( var i=0;i<a.length;i++){	
        // console.log("i===>",a[i])	
        // var val = a[i]	
        // this.child1.write(`\r\n$ welcome to terminal ${a[i]}`)	
        // setTimeout(() => this.child.write(`\r\n$ welcome to terminal ${i}`), 1000)	
        // setTimeout(() => this.child1.write(`\r\n$ welcome to terminal ${i}`), 2000)	
        var last = a[a.length-1];	
        if(a[i]==a[a.length-1]){	
        this.okFlag = true;	
        console.log("into last",this.okFlag)	
            
            
        }	
        console.log("last i=======>>>>",i);	
        // this.child1.write(`\r\n$ welcome to terminal ${a+i}`);	
        }	
        // this.child1.write(`\r\n$ welcome to terminal Model\b\n\r`);	
        // this.child.write(`\r\n$ welcome to terminal ${this.devOpsStatusArray}`);	
        this.child.keyEventInput.subscribe(e => {	
        // console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);	
        const ev = e.domEvent;	
        // const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;	
        // console.log("ev===>",ev)	
        // console.log("printable===>>>",printable);	
        if (ev.keyCode === 13) {	
        console.log("i m here in if")	
        this.child.write('\r\n$ ');	
        }	
        // else if (ev.keyCode === 8) {	
        // console.log("i m here in else if")	
        // // Do not delete the prompt	
        // if (this.child.underlying.buffer.cursorX > 2) {	
        // this.child.write('\b \b');	
        // }	
        // } else if (printable) {	
        // console.log("i m here in else if printable",e.key)	
        // this.child.write(e.key);	
        // }	
        })	
        }






    ngOnInit() {
        this.tFlag = localStorage.getItem("terminalFlag");
        console.log("into tFlag",this.tFlag);
        
        $('#loaderId').show()
        $('#buttonId').hide()

           

            // $( "#loaderId" ).trigger( "click" );	
            // $('.xterm-viewport').css("overflow-y","inherit");
        // if(this.devOpsStatusArray == undefined){
        //     $( "#initiateModal" ).trigger( "click" );	

        // }
        // else{
        //     console.log("into second condition")
        // }
//         var vTimeline = document.getElementById("horizontal-timeline");
//         var hTimeline = document.getElementById("vertical-timeline");
//         activation(vTimeline);
//         activation(hTimeline);

// function activation(timeline) {
//   var divs = timeline.getElementsByTagName("div");
//   for (var i = 0; i < divs.length; i++) {
//     if (
//       divs[i].classList.contains("circle") ||
//       divs[i].classList.contains("link")
//     ) {
//       divs[i].style.background = "#05A5D1";
//       if (divs[i].classList.contains("activated")) {
//         break;
//       }
//     }
//   }
// }




        // localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZWQ0ZjQ3MjJjZTIxZTZhYTc4ZGIiLCJpYXQiOjE1ODA5ODU3MzZ9.KECi38Pln-X1zXYYkwgot7mQJFbeiyda2HiVuTh4xV8")
        // this.callSITMethods();  
        // this.uatTab = true;
        // $(window).scroll(function () {
        //     if ($(this).scrollTop() > 50) {
        //         $('#back-to-top').fadeIn();
        //         $('#back-to-top1').fadeOut();

        //     } else {
        //         $('#back-to-top').fadeOut();
        //         $('#back-to-top1').fadeIn();

        //     }
        // });
        this.data=localStorage.getItem("data")
        this.dataforproces=JSON.parse(this.data)
        this.projectId

        try {

            //for disabling back button

            window.history.pushState(null, "", window.location.href);

            this.addTestData = this.fb.group({

                'urlName': ['']

            })

            // changes by sanchita
            this.readyForProductionFlag ="true";
            // this.readyForProductionFlag = localStorage.getItem("status");

            console.log(" Status Check ", this.readyForProductionFlag);

            if (this.readyForProductionFlag == 'true') {

                this.showButton = true;

            } else {

                this.showButton = false;
                if(this.tFlag == null){
                    $( "#initiateModal" ).trigger( "click" );	
    
                }

            }



            // this.userData = localStorage.getItem("dataofUser");

            // console.log("this.userData", this.userData);

            // this.dataOfUser = JSON.parse(this.userData);

            // if (this.dataOfUser[0].productName == "iSurePay") {

            //     this.clientCode = this.dataOfUser[0].iCoreClientCode;

            // }

            // else {

            //     this.clientCode = this.dataOfUser[0].clientCodeProfund;

            // }

            this.clientCode=clientCode

            // console.log(" PROFUND CLIENT CODE ", this.clientCode);

            this.IPSClientCode = clientCodeIPS

            // console.log(" IPS CLIENT CODE ", this.IPSClientCode);

            this.serviceNameOfUser = serviceName;

            // console.log(" SERVICE NAME ", this.clientCode);
            // this.userData=localStorage.getItem("data");
            // this.dataOfUser = JSON.parse(this.userData);
            this.orgName=this.dataforproces[0].organisation
            this.username=this.dataforproces[0].emailIdBusinessSpoc
            this.projectId = this.dataforproces[0].projectId
            console.log("here we declare projectId====>>>",this.projectId);

            // this.vanNo = localStorage.getItem("vanNo");

            // console.log("vanNo:::", this.vanNo);

            console.log(" PROJECT ID  ", this.projectId);

            // if (this.dataOfUser[0].enableTransactionReversalFileProcessing == true) {

            //     this.txnReversal = "yes"

            // } else {

            //     console.log(" TRANSACTION REVERSAL STATUS ", this.dataOfUser[0].enableTransactionReversalFileProcessing);

            //     this.txnReversal = "no"

            // }

            try {

                this.appService.getProjectById(this.projectId).then(async (data) => {

                    this.projectData = data;

                    this.projectValue = data[0];

                    console.log(" PROJECT DATA ", this.projectData[0]);
                    this.version=this.projectData[0].version
                    console.log("version====>>>>",this.version);
                    this.productName =this.projectData[0].productName
                    console.log("productName====>>>>",this.productName);
                    // this.clientCode=this.projectData[0].clientCode

                    console.log(" PROJECT NAME ", this.projectValue.projectName)
                    console.log("event name", this.projectData[0].event);
                    if (this.projectData[0].event == "recording_test_results_TXN_REV-SIT" || this.projectData[0].event == "recording_test_results-SIT" || this.projectData[0].status === "Ready for Production Request Initiated" || this.projectData[0].status === "Ready for Production Verified") {
                        this.allSuccess = true;
                    }
                    else {
                        this.allSuccess = false;
                    }
                    if (this.projectData[0].event == "recording_test_results_TXN_REV-UAT" || this.projectData[0].event == "recording_test_results-UAT" || this.projectData[0].event == "recording_test_results_TXN_REV-SIT" || this.projectData[0].event == "recording_test_results-SIT" || this.projectData[0].status === "Ready for Production Request Initiated" || this.projectData[0].status === "Ready for Production Verified") {
                        console.log("inside the condition");
                        this.getDataAlreadyPresent();
                    }

                    else {
                        this.allSuccess = true;

                        this.submitTestData();
                        console.log("reached here in else after submit test Data.")
                        this.callSITMethods();
                    }


                });

            } catch (err) {

                console.log("PRINT: CATCH ERROR FOR GET PROJECT BY ID API CALLING", err);



            }

        } catch (error) {

            console.log("PRINT: CATCH ERROR FOR SIT?UAT PAGE", error);

        } finally {

            console.log("PRINT: SUCCESS FOR SIT?UAT PAGE");
        }

    }

    submitTestData() {

        var urlName = this.projectData[0].products[0].services[0].serviceURLUAT;

        // let urlName = "http://13.127.90.153:3200/api/users/validateUser"

        console.log(" URL NAME ", urlName);

        var id = this.projectData[0].products[0].services[0].serviceId;

        console.log(" USER DATA ID ", id);

        this.appService.getServiceById(id).then( (data) => {

            this.serviceDetails = data;

            console.log(" SERVICE DETAILS ", this.serviceDetails);

            var name = this.serviceDetails[0].serviceName;

            console.log("Print name & ClientCode ", name, this.clientCode);
            console.log("get request data",localStorage.getItem("yamlFields"))

            try {

                 this.appService.getApiDetails(name, this.clientCode,localStorage.getItem("yamlFields")).then(async (data) => {

                    console.log("Get ping API Resonse ", data.fileData);

                    // this.labelValue = data.fileData;

                    // let x = this.labelValue.split("|");

                    // console.log(x);
                    // this.pipeData = x;
                    // this.vanNo = x[1]; 

                    this.valueOfRequest=data.fileData;
                    // console.log("this.vanNo", this.vanNo);
                    // if (this.serviceDetails[0].serviceName == "ECollection Intimation") {
                    //     this.valueOfRequest = {

                    //         "client_code": x[0],
                    //         "virtual_account_number": x[1],
                    //         "transaction_amount": x[2],
                    //         "transaction_mode": "O",
                    //         "utr_number": x[3],
                    //         "source_bank_holder_name": "DShahi",
                    //         "source_bank_account_number": x[4],
                    //         "source_bank_ifsc_code": "HDFC0001351",
                    //         "transaction_date": "07-08-2019",
                    //         "sender_to_receiver_info": "AAA"

                    //     }
                    // }
                    // else {
                    //     this.valueOfRequest = {

                    //         'vid': x[1]



                    //     }
                    // }

                    // this.valueOfRequest = {

                    //     'vid': x[1]

                    //     // 'customerCode': x[0],

                    //     // 'virtualAccountNumber': x[1],

                    //     // 'transactionAmount': x[2],

                    //     // 'utr': x[3],

                    //     // 'senderIFSC': x[4],

                    //     // 'senderInformation': x[5],

                    //     // 'senderAccountNumber': x[6],

                    //     // 'senderName': x[7],

                    //     // 'paymentMode': x[8],

                    //     // 'customerAccountNumber': x[9],

                    //     // 'transactionDate': x[10],

                    //     // 'sourceSatus': x[11],

                    //     // 'senderBankName': x[12],

                    //     // 'currency': x[13]

                    // }

                    var dataForSIT = {

                        'URL': urlName,

                        'serviceName': this.serviceDetails[0].serviceName,

                        'clientCode': this.clientCode,

                        'method': 'POST',

                        'reqBody': this.valueOfRequest

                    }

                    console.log("Data For SIT ", dataForSIT);

                    // await this.appService.postSitData(dataForSIT).then(data => {

                    //     console.log(" SIT DATA RESPONSE ====> ", data);

                    //     this.responseMessage = data.message;

                    // });

                });

            } catch (e) {

                console.log("PRINT : EXCEPTION IN PING API", e);

            }

        });

    }



    callSITMethods() {






        

        console.log("PRINT: CONTINUOUS CALL UAT callSITMethods", this.devOpsStatusArray);

        this.SITinterval = setInterval(() => {

            this.getAuditTrailByIdForSIT();

        }, 50000);

        console.log("PRINT: CONTINUOUS CALL SIT METHOD");

    }

    callUATMethods() {
        this.isLoad2 = true
        console.log("PRINT: CONTINUOUS CALL UAT callUATMethods", this.devOpsStatusArrayForUAT.length);

        this.UATinterval = setInterval(() => {

            this.getAuditTrailByIdForUAT()

        }, 50000);

        console.log("PRINT: CONTINUOUS CALL UAT METHOD");

    }



    nextTab(tabName) {

        console.log("PRINT : INSIDE NEXT TAB FUNCTION", tabName);
        this.uatTab = false;
        this.exp = tabName

    }





    goToUat() {

        if (this.lastData == "SUCCESS") {

            var confirmData = confirm("SIT Successful ! Do you want to proceed with UAT?")

        }

    }

    gotoNextTab() {
        this.UatProgress = true;
        console.log("gotoNextTab")
        localStorage.setItem("uatCertified", "true");
        console.log("gotoNextTab")
        this.someEvent.next('Go_Live');


    }

    getAuditTrailByIdForSIT() {

        this.appService.getAuditTrailById(this.projectId).then((data) => {

            console.log("AUDIT TRAIL DATA BY ID SIT-1 ", data);
            this.devOpsStatusArray = []
            // this.devOpsStatusArray = data;
            for(var i = 0; i < data.length;i++){
                if(data[i].status == "Draft" || data[i].status == "Ready for Transformation" || data[i].status == "Ready for Deployment-SIT"){
                        // this.devOpsStatusArray.push(data[i]);
                    } else{
                        this.devOpsStatusArray.push(data[i]);
                    }
                // if(data[i].status != "Draft" || data[i].status != "Ready for Transformation" || data[i].status != "Ready for Deployment-SIT"){
                //     this.devOpsStatusArray.push(data[i]);
                // }
            }

            

            console.log("AUDIT TRAIL DATA BY ID SIT-2 ", this.devOpsStatusArray);

            if (this.txnReversal == "yes") {

                for (let i = 0; i < this.devOpsStatusArray.length; i++) {



                    if (this.devOpsStatusArray[i].status === "FAILED" || this.devOpsStatusArray[i].event === "recording_test_results_TXN_REV-SIT") {

                        console.log("CHECK TIME INTERVAL-3 ", this.SITinterval);

                        clearInterval(this.SITinterval);
                        if (this.devOpsStatusArray[i].status === "FAILED") {
                            this.allSuccess = true;
                        }
                        else {
                            this.allSuccess = false;
                        }
                        this.isLoad = false;


                        console.log("INTERVAL CLEARED STATUS CHECK FAILED-4");

                        return true;

                    }

                }

            }

            else {





                for (let i = 0; i < this.devOpsStatusArray.length; i++) {



                    if (this.devOpsStatusArray[i].status === "FAILED" || this.devOpsStatusArray[i].event === "recording_test_results-SIT") {

                        console.log("CHECK TIME INTERVAL-3 ", this.SITinterval);

                        clearInterval(this.SITinterval);

                        if (this.devOpsStatusArray[i].status === "FAILED") {
                            this.allSuccess = true;
                        }
                        else {
                            this.allSuccess = false;
                        }
                        this.isLoad = false;

                        console.log("INTERVAL CLEARED STATUS CHECK FAILED-4");

                        return true;

                    }

                }

            }

        }).catch(err => {

            console.log("FAILED TO GET JENKINS EVENTS-SIT- 5 ", err);

        })

    }





    async getAuditTrailByIdForUAT() {

        console.log(" PRINT : UAT AUDIT TRAIL FUNCTION CALLED-1");

        this.appService.getAuditTrailById(this.projectId).then(async (data) => {

            console.log(" PRINT : UAT AUDIT TRAIL DATA LENGTH-2 ", data.length);

            console.log("AUDIT TRAIL DATA BY ID UAT-3 ", data);

            this.devOpsStatusArrayForUAT = data;

            if (this.txnReversal == "yes") {

                for (let i = 0; i < this.devOpsStatusArrayForUAT.length; i++) {

                    if (this.devOpsStatusArrayForUAT[i].status === "FAILED" || this.devOpsStatusArrayForUAT[i].event === "recording_test_results_TXN_REV-UAT") {

                        clearInterval(this.SITinterval);

                        this.isLoad2 = false;
                        if (this.devOpsStatusArrayForUAT[i].status === "FAILED") {
                            this.UatProgress = true;
                        }
                        else {
                            this.UatProgress = false;
                        }
                        // this.UatProgress = false;


                        console.log("INTERVAL CLEARED STATUS CHECK FAILED-UAT-5 ");

                        return true;

                    }

                }

            }

            else {





                for (let i = 0; i < this.devOpsStatusArrayForUAT.length; i++) {

                    if (this.devOpsStatusArrayForUAT[i].status === "FAILED" || this.devOpsStatusArrayForUAT[i].event === "recording_test_results-UAT") {
                        console.log("inside clear interval")

                        clearInterval(this.SITinterval);
                        if (this.devOpsStatusArrayForUAT[i].status === "FAILED") {
                            this.UatProgress = true;
                        }
                        else {
                            this.UatProgress = false;
                        }
                        this.isLoad2 = false;

                        console.log("INTERVAL CLEARED STATUS CHECK FAILED-UAT-5 ");

                        return true;

                    }



                }

            }

            console.log("AUDIT TRAIL DATA BY ID UAT-4 ", this.devOpsStatusArrayForUAT);





        }).catch(err => {

            console.log("FAILED TO GET JENKINS EVENTS-UAT", err);

        })

    }





    ngOnDestroy() {

        console.log("Ng Destroy Called ");

        this.stopRequest = true;

    }



    initiatesSIT() {
        console.log("PRINT : DATA IN INITIATE SIT ", this.dataOfUser[0]);


        var data = {

            // projectId: this.dataOfUser[0].projectId,
            projectId: this.projectId,


            clientCode: this.clientCode,

            // productName: this.dataOfUser[0].productName,
            productName: productName ,


            // serviceName: this.dataOfUser[0].serviceName,
            serviceName: serviceName ,


            // username: this.dataOfUser[0].username,
            username: this.username,


            // orgName: this.dataOfUser[0].orgName,
            orgName: this.orgName,


            // IPSClientCode: this.dataOfUser[0].clientCodeIPS
            IPSClientCode: clientCodeIPS


        };
        console.log("PRINT : DATA IN INITIATE SIT ", data);

        console.log("PRINT : DATA IN INITIATE SIT ", JSON.stringify(data));



        this.appService.initiateSIT(data).then(data => {

            console.log("PRINT: INITIATE SIT RESPONSE", data);

            if (data) {

                console.log("SIT Initiate result", data);

                alert("Certified Successfully Completed!!");

            }

        });

    }



    async initiatesUAT(nextTab) {

        console.log(" USER DATA IN INITIATE UAT ", JSON.stringify(this.dataOfUser), nextTab);
        this.vanNo=localStorage.getItem("vanNo")
        console.log("this.vanNo", this.vanNo);

        var data = {

            // projectId: this.dataOfUser[0].projectId,
            projectId: this.projectId,


            clientCode: this.clientCode,

            // productName: this.dataOfUser[0].productName,
            productName: productName,


            // serviceName: this.dataOfUser[0].serviceName,
            serviceName: serviceName,


            // username: this.dataOfUser[0].emailIdBusinessSpoc,
            username: this.username,


            // orgName: this.dataOfUser[0].orgName,
            orgName: this.orgName,


            // IPSClientCode: this.dataOfUser[0].clientCodeIPS,
            IPSClientCode: clientCodeIPS,


            txnReversal: "no",

            vanNo: this.vanNo

        };

        console.log("PRINT : DATA FOR UAT REQUEST", data);
        this.appService.postUAT(data).then(async (data) => {

            console.log(" PRINT : POST UAT DATA RESPONSE", data);

            if (data.message == "failed to pushed file on github.") {

                alert("Already Initiated UAT Request");

                this.UatProgress = true;

                this.UatInitiated = true;

                await this.nextTab(nextTab);
                this.getDataAlreadyPresent();
            } else {

                alert("UAT Request Initiated");
                this.isLoad2 = true;
                this.UatProgress = true;

                this.UatInitiated = true;

                await this.nextTab(nextTab);

                this.callUATMethods();
            }



        })



    }
    scroll() {


        // scroll body to 0px on click
        // this.ele.nativeElement.querySelector('#xyz').scrollIntoView();
        // $('html,body').animate({
        //     scrollTop: $("#xyz").offset().top
        // }, 1000);
        // 
        $('html, body').animate({ scrollTop: 0 }, 1200);
        return false;



    }
    scroll1() {
        console.log("scroll")

        // // scroll body to 0px on click
        // this.ele.nativeElement.querySelector('#lasthr').scrollIntoView();
        $('html, body').animate({ scrollTop: $(document).height() }, 1200);
        return false;

    }
    doSetTimeout(val,i){
        var printer = this.child1
        setTimeout( function() {printer.write(`\r\n$ ${val}`)},1000*i);		
          // this.child1.write(`\r\n$ ${this.devOpsStatusArray[i].status }`);
      }
      doSetTimeout2(val,i){
        var printer2 = this.child
        setTimeout( function() {printer2.write(`\r\n$ ${val}`)},2000*i);		
          // this.child1.write(`\r\n$ ${this.devOpsStatusArray[i].status }`);
      }
    getDataAlreadyPresent() {
        console.log("DATA PRESENT ALREADY");
        var urlName = this.projectData[0].products[0].services[0].serviceURLUAT;

        // let urlName = "http://13.127.90.153:3200/api/users/validateUser"

        console.log(" URL NAME ", urlName);

        var id = this.projectData[0].products[0].services[0].serviceId;

        console.log(" USER DATA ID ", id);

        this.appService.getServiceById(id).then(async (data) => {

            this.serviceDetails = data;

            console.log(" SERVICE DETAILS ", this.serviceDetails);

            var name = this.serviceDetails[0].serviceName;

            console.log("Print name & ClientCode ", name, this.clientCode);
            console.log("get request data",localStorage.getItem("yamlFields"))
     

            try {

                await this.appService.getApiDetails(name, this.clientCode,localStorage.getItem("yamlFields")).then(async (data) => {

                    console.log("Get ping API Resonse ", data.fileData);

                    // this.labelValue = data.fileData;

                    // let x = this.labelValue.split("|");

                    // console.log(x);
                    // this.vanNo = x[1];
                    console.log("this.vanNo", this.vanNo);
                    this.valueOfRequest=data.fileData;
                    // if (this.serviceDetails[0].serviceName == "ECollection Intimation") {
                    //     this.valueOfRequest = {

                    //         "client_code": x[0],
                    //         "virtual_account_number": x[1],
                    //         "transaction_amount": x[2],
                    //         "transaction_mode": "O",
                    //         "utr_number": x[3],
                    //         "source_bank_holder_name": "DShahi",
                    //         "source_bank_account_number": x[4],
                    //         "source_bank_ifsc_code": "HDFC0001351",
                    //         "transaction_date": "07-08-2019",
                    //         "sender_to_receiver_info": "AAA"

                    //     }
                    // }
                    // else {
                    //     this.valueOfRequest = {

                    //         'vid': x[1]

                    //     }

                    // }

                    var dataForSIT = {

                        'URL': urlName,

                        'serviceName': this.serviceDetails[0].serviceName,

                        'clientCode': this.clientCode,

                        'method': 'POST',

                        'reqBody': this.valueOfRequest

                    }

                    console.log("Data For SIT ", dataForSIT);

                    await this.appService.postSitData(dataForSIT).then(data => {

                        console.log(" SIT DATA RESPONSE ====> ", data);

                        this.responseMessage = data.message;

                    });

                });

            } catch (e) {

                console.log("PRINT : EXCEPTION IN PING API", e);

            }

        });
        this.isLoad = false;
        this.isLoad2 = false;
        this.sitTab = false;

        console.log("this.projectData", this.projectData[0].status);
        console.log("this.event", this.projectData[0].event)
        if (this.projectData[0].event == "recording_test_results-SIT" || this.projectData[0].event == "recording_test_results_TXN_REV-SIT") {
            this.allSuccess = false;
            this.uatTab = true;
        }
        else if (this.projectData[0].event == "recording_test_results-UAT" || this.projectData[0].event == "recording_test_results_TXN_REV-UAT") {
            if (this.projectData[0].status === "Ready for Production Request Initiated" || this.projectData[0].status === "Ready for Production Verified") {
                this.UatProgress = true;
                this.allSuccess = true;
                this.uatTab = false;
            }
            else {
                this.UatProgress = false;
                this.allSuccess = true;
                this.uatTab = false;
            }

        }
        else {
            //   console.log("hsergzsd");
            this.UatProgress = true;
            this.allSuccess = true;
            this.uatTab = false;

        }
        this.appService.getAuditTrailById(this.projectData[0].projectId).then((data) => {
            this.devOpsStatusArrayForUAT = data;
            // this.devOpsStatusArray = data;
           
            for (var i = 0; i < data.length; i++) {

                    if(data[i].status == "Draft" || data[i].status == "Ready for Transformation" || data[i].status == "Ready for Deployment-SIT"){
                        // this.devOpsStatusArray.push(data[i]);
                    } else{

                            this.devOpsStatusArray.push(data[i]);

                        console.log("data from api",this.devOpsStatusArray)
                    
                    }
               

                    // if(data[i].event == "recording_test_results-SIT" || data[i].event == "recording_test_results_TXN_REV-SIT"){
                    //     // this.terminalFlag = true;
                    // console.log("last")

                    // }
                    // else{
                    // // this.terminalFlag = false;
                    // console.log("into else")

                    // }
            }

            var tableData = {};
            for(var i=0;i<this.devOpsStatusArray.length;i++){
                

                
                console.log("this.devOpsStatusArray[i].status: ",this.devOpsStatusArray[i].status)
                tableData={
                    event: this.devOpsStatusArray[i].event.replace("SIT", "UAT"),
                    status: this.devOpsStatusArray[i].status
                }
                this.UATStatusArray.push(tableData);
             
            this.doSetTimeout(this.devOpsStatusArray[i].event,(i));
            this.doSetTimeout(this.devOpsStatusArray[i].status,(i));

                if(this.readyForProductionFlag == "true" || this.tFlag){
                    console.log("into first loop")
                this.child.write(`\r\n$ ${this.devOpsStatusArray[i].event  }`);	
                this.child.write(`\r\n$ ${this.devOpsStatusArray[i].status }`);
        }
        else{
            console.log("into second loop")
            this.doSetTimeout2(this.devOpsStatusArray[i].event,(i));
            this.doSetTimeout2(this.devOpsStatusArray[i].status,(i));
        }
            // for(var j=0;j< this.devOpsStatusArray.length;j++){
            //  setTimeout(()=>{ 
            //     this.copyarray.push(this.devOpsStatusArray[i]);
            //     console.log("here data",this.copyarray)
            //     },2000)
            // }
                // this.child.write(`\r\n$ ${this.devOpsStatusArray[i].event  }`);	
                // this.child.write(`\r\n$ ${this.devOpsStatusArray[i].status }`);
                // this.child1.write(`\r\n$ ${this.devOpsStatusArray[i].event  }`);	
                // this.child1.write(`\r\n$ ${this.devOpsStatusArray[i].status }`);
                // if(this.devOpsStatusArray[i].event =="recording_test_results-SIT"){
                //     console.log("last")
                //     this.terminalFlag = true;
                // }
                // else{
                //     console.log("into else")
                //     this.terminalFlag = false;
    
                // }
                setTimeout(()=> {$('#loaderId').hide()},12000)
                setTimeout(()=> {$('#buttonId').show()},12000)

            }
            setTimeout(()=> {
            this.child1.write(`\r\n$ All events completed please press OK to proceed...`);
        },12100)
            // this.doSetTimeout(this.devOpsStatusArray[i].status,(i));


            console.log("devOpsStatusArray: ",this.devOpsStatusArray)
            console.log("this.UATStatusArray: ",this.UATStatusArray)
            //
            
// this.child.write(`\r\n$ ${this.devOpsStatusArray[0].status}`);	
// this.child1.write(`\r\n$ ${this.devOpsStatusArray[0].status }`);	

//
            // for (var i = 0; i < data.length; i++) {
            //     if(data[i].status != "Draft" || data[i].status != "Ready for Transformation" || data[i].status != "Ready for Deployment-SIT"){
            //         this.devOpsStatusArray.push(data[i]);
            //     }
            //     if (data[i].status === "FAILED") {
            //         this.allSuccess = true;
            //     }
            // }
        })


    }

    onClick(){
        localStorage.setItem("terminalFlag","true");
    }

    initiateTest(){
        var urlName = this.projectData[0].products[0].services[0].serviceURLUAT;

        // let urlName = "http://13.127.90.153:3200/api/users/validateUser"

        console.log(" URL NAME ", urlName);
        var dataForSIT = {

            'URL': urlName,

            'serviceName': this.serviceDetails[0].serviceName,

            'clientCode': this.clientCode,

            'method': 'POST',

            'reqBody': this.valueOfRequest

        }
             this.appService.postSitData(dataForSIT).then(data => {

                        console.log(" SIT DATA RESPONSE ====> ", data);

                        this.responseMessage = data.message;

                    });
    }

}
