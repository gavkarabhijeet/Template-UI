import { Component, OnInit,ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {FormGroup,FormBuilder,FormControl,Validators,ReactiveFormsModule} from "@angular/forms";
import { ApplicationDetailsService } from './application.service';
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
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  exp ="serviceDetails"
  addSubmitData: FormGroup;
 

  private tabSet: NgbTabset;
  subscribeData: {};
  dataForProject :{};
  dataForRegister :{};
  registerData;
  projectId: any;
  uatfilename1: any;
  prodfilename1: any;
  uatFile1: any;
  dataOfUser: string;
  dataToShow: any;
  dataToDisplay: any;
  typeofWebservice: any;
  abc: string;
  hostName: any;
  xyz: string;
  dropDown: boolean;
  webser:any;
  http: string;
  dropDown1: boolean;
  method: any;
  check: any;
  checksumreq: string;
  dropDown2: boolean;
  enc: any;
  encryused: string;
  dropDown3: boolean;
  ency: any;
  encyused: any;
  encryption: string;
  dataToShown: any;
  dataToBeDisplayed: any;
  dataOfUsers: string;
  submitData: {};
  dropDown4: boolean;
  dropDown5: boolean;
  dropDown6: boolean;
  @Output() messageEvent = new EventEmitter<string>();
  dataObj: { username: string; password: string; };
  userData: any;
  role: any;
  response: any;
  dataToSendForChangePs: string;
  dataOfUserToSend: string;
  subscribeFlag: boolean;

  @ViewChild(NgbTabset) set content(content: NgbTabset) {
    this.tabSet = content;
  }
  constructor(private router : Router , private fb: FormBuilder, private appservice : ApplicationDetailsService) {
    this.addSubmitData = this.fb.group({
      webService :[''],
      methodType :[''],
      checksumReq :[''],
      encryUsed :[''],
      hostNameUat :[''],
      uatIp :['',[Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
      uatPort :['',[Validators.pattern(
        /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
      )]],
      communicationProtocol :[''],
      serviceTimeoutUat :['',[]],
      serviceUrlUat :['',[]],
      serviceNameUat :[''],
      fileUploadUat :[''],
      hostNameProd :[''],
      prodIp :['',[Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
      prodPort :['',[Validators.pattern(
        /^(?!(?:80[5-9][0-9]|80[5-9][0-9]|81[0-4][0-9]|8150)$)[1-9][0-9]{1,5}$/
      )]],
      commProtocol :[''],
      serviceTimeoutProd :[''],
      serviceUrlProd :[''],
      serviceNameProd :[''],
      fileUploadProd :[''],
    })
   }

  ngOnInit() {
    $("#app2").show()	
    $("#application1").hide()	
      $("#app3").hide()	
      $("#app4").hide()	
    $("#orgg1").show()	
    $("#orgg2").hide()	
      $("#orgg3").hide()	
      $("#orgg4").hide()
    $(document).on('click', '.browse', function(){
      var file = $(this).parent().parent().parent().find('.file');
      file.trigger('click');
     });
     $(document).on('change', '.file', function(){
      // $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
     });
    console.log("file name1",this.uatfilename1);
    this.dataOfUser = localStorage.getItem("data2");
    console.log("data2",this.dataOfUser)
    this.dataToShow = JSON.parse(this.dataOfUser);
    this.dataToDisplay = this.dataToShow;
    console.log("dataaaa",this.dataToDisplay);
   
    $('#selectProd').css('color','#808080'); 
    $('#selectProd1').css('color','#808080'); 
    $('#orgg').css('color','#808080'); 
    $('#orgg1').css('color','#808080');
    $('#application').css('color','white'); 
    $('#application1').css('color','white');
    $('#circle1').html("✓")
    $('#circle2').html("✓")
    $('#circle1').css({"font-weight": "bold"})
    $('#circle2').css({"font-weight": "bold"})
    $('#circle3').css('background-color','#4E9AF7');
    $('#circle3').css('color','white');
    $('#circle1').css('background-color','#06142F'); 
    $('#circle2').css('background-color','#06142F'); 
    $('#circle1').css('color','white'); 
    $('#circle2').css('color','white');
    $('#rightDiv').css("background-image", "url('../../../assets/images/pins4.png')");

    localStorage.setItem("appAuth","true");

    if(this.exp == "serviceDetails"){
      localStorage.setItem("serFlag","true")
    }
    
    //  for setting data
    if(this.dataToDisplay == null){
      console.log("setting value for subs",this.dataToDisplay);
      this.addSubmitData.reset();
      // this.addSubmitData.controls["webService"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["methodType"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["checksumReq"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["encryUsed"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["hostNameUat"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["uatIp"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["uatPort"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["communicationProtocol"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["serviceTimeoutUat"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["serviceUrlUat"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["serviceNameUat"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["fileUploadUat"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["hostNameProd"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["prodIp"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["prodPort"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["commProtocol"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["serviceTimeoutProd"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["serviceUrlProd"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["serviceNameProd"].setValue(
      //   ''
        
      // );
      // this.addSubmitData.controls["fileUploadProd"].setValue(
      //   ''
        
      // );
    }
    else{
      console.log("into else ",this.dataToDisplay)
      this.addSubmitData.controls["webService"].setValue(
        this.dataToDisplay.webService
        
      );
      this.addSubmitData.controls["methodType"].setValue(
        this.dataToDisplay.methodType
        
      );
      this.addSubmitData.controls["checksumReq"].setValue(
        this.dataToDisplay.checksumReq
        
      );
      this.addSubmitData.controls["encryUsed"].setValue(
        this.dataToDisplay.encryUsed
        
      );
      this.addSubmitData.controls["hostNameUat"].setValue(
        this.dataToDisplay.hostNameUat
        
      );
      this.addSubmitData.controls["uatIp"].setValue(
        this.dataToDisplay.uatIp
        
      );
      this.addSubmitData.controls["uatPort"].setValue(
        this.dataToDisplay.uatPort
        
      );
      this.addSubmitData.controls["communicationProtocol"].setValue(
        this.dataToDisplay.communicationProtocol
        
      );
      this.addSubmitData.controls["serviceTimeoutUat"].setValue(
        this.dataToDisplay.serviceTimeoutUat
        
      );
      this.addSubmitData.controls["serviceUrlUat"].setValue(
        this.dataToDisplay.serviceUrlUat
        
      );
      this.addSubmitData.controls["serviceNameUat"].setValue(
        this.dataToDisplay.serviceNameUat
        
      );
      this.addSubmitData.controls["fileUploadUat"].setValue(
        localStorage.getItem("file1")
        
      );
      this.addSubmitData.controls["hostNameProd"].setValue(
        this.dataToDisplay.hostNameProd
        
      );
      this.addSubmitData.controls["prodIp"].setValue(
        this.dataToDisplay.prodIp
        
      );
      this.addSubmitData.controls["prodPort"].setValue(
        this.dataToDisplay.prodPort
        
      );
      this.addSubmitData.controls["commProtocol"].setValue(
        this.dataToDisplay.commProtocol
        
      );
      this.addSubmitData.controls["serviceTimeoutProd"].setValue(
        this.dataToDisplay.serviceTimeoutProd
        
      );
      this.addSubmitData.controls["serviceUrlProd"].setValue(
        this.dataToDisplay.serviceUrlProd
        
      );
      this.addSubmitData.controls["serviceNameProd"].setValue(
        this.dataToDisplay.serviceNameProd
        
      );
      // this.addSubmitData.controls["fileUploadProd"].setValue(
      //   localStorage.getItem("file2")
        
      // );
      // dropdown part
      if(this.dataToDisplay.webService != null){
        this.dropDown=true
  
      }
      if(this.dataToDisplay.methodType != null){
        this.dropDown1=true
  
      }if(this.dataToDisplay.checksumReq != null){
        this.dropDown2=true
  
      }if(this.dataToDisplay.encryUsed != null){
        this.dropDown3=true
  
      }if(this.dataToDisplay.communicationProtocol != null){
        this.dropDown4=true
  
      }if(this.dataToDisplay.commProtocol != null){
        this.dropDown5=true
  
      }
    }
    // console.log("herenow",this.dataToDisplay.webService)
    
  }

  tabChange(event){
    console.log("event",event.nextId)
    if(event.nextId == "serviceDetails"){
      this.exp = "serviceDetails"
    }
    if(event.nextId == "uatDetails"){
      console.log(this.exp);
      this.exp = "uatDetails"
    }
    if(event.nextId == "prodDetails"){
      console.log(this.exp);
      this.exp = "prodDetails"

    }
    if(this.exp == "serviceDetails"){
      localStorage.setItem("servFlag","true")
      $("#app2").show()	
	    $("#application1").hide()	
	      $("#app3").hide()	
	      $("#app4").hide()
    }
    if(this.exp == "uatDetails"){
      localStorage.setItem("uatFlag","true")
      $("#app3").show()	
	    $("#application1").hide()	
	      $("#app2").hide()	
	      $("#app4").hide()
    }
    if(this.exp == "prodDetails"){
      localStorage.setItem("prodFlag","true")
      $("#app4").show()	
	    $("#application1").hide()	
	      $("#app3").hide()	
	      $("#app2").hide()
    }
  }

  nextTab(){
    if(this.tabSet.activeId == "serviceDetails"){
      this.exp = "uatDetails"
    }
    $("#app3").show()	
    $("#application1").hide()	
      $("#app4").hide()	
      $("#app2").hide()
   


  }
  nextTab2(){
    if(this.tabSet.activeId == "uatDetails"){
      this.exp = "prodDetails"
    }
    $("#app4").show()	
    $("#application1").hide()	
      $("#app3").hide()	
      $("#app2").hide()
  }
  nextTab3(){
    this.subscribeFlag=true;
    localStorage.setItem("serviceName",serviceName)
    console.log("next");
    // localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZWQ0ZjQ3MjJjZTIxZTZhYTc4ZGIiLCJpYXQiOjE1ODA5ODU3MzZ9.KECi38Pln-X1zXYYkwgot7mQJFbeiyda2HiVuTh4xV8")
    // console.log("ABC",registerData);
    this.dataForProject = {
      products: [
        {
          productId: productId,
          services: [
            {
              serviceId: serviceId,
              serviceName: serviceName,
              webServiceType: this.addSubmitData.get('webService').value,
              communicationProtocol: this.addSubmitData.get('communicationProtocol').value,
              emails: "details.emails",
              httpCertificateUAT: "this.httpCertificateUATName",
              httpCertificateProd: "this.httpCertificateProdName",
              encryptionMethod: this.addSubmitData.get('encryUsed').value,
              checksumControl: this.addSubmitData.get('checksumReq').value,
              uatIp: this.addSubmitData.get('uatIp').value,
              uatPort: this.addSubmitData.get('uatPort').value,
              retryAttempts: "details.retryAttempts",
              actionOnNoRes: "details.actionOnNoRes",
              prodIp: this.addSubmitData.get('prodIp').value,
              communicationProtocolUAT: this.addSubmitData.get('communicationProtocol').value,
              communicationProtocolProd: this.addSubmitData.get('commProtocol').value,
              prodUsername: "details.prodUsername",
              prodPort: this.addSubmitData.get('prodPort').value,
              prodSecret: "details.prodSecret",
              prodPassword: "details.prodPassword",
              uatFile1: this.uatfilename1,
              uatFile2: "details.uatFile2",
              prodFile1: this.prodfilename1,
              prodFile2: "details.prodFile2",
              uatURL1: "details.uatURL1",
              uatURL2: "details.uatURL2",
              prodURL1: "details.prodURL1",
              prodURL2: "details.prodURL2",
              hostNameUat: this.addSubmitData.get('hostNameUat').value,
              hostNameProd: this.addSubmitData.get('hostNameProd').value,
              serviceNameInputUAT: this.addSubmitData.get('serviceNameUat').value,
              serviceNameInputProd: this.addSubmitData.get('serviceNameProd').value,
              serviceURLUAT: this.addSubmitData.get('serviceUrlUat').value,
              serviceTimeOutUAT: this.addSubmitData.get('serviceTimeoutUat').value,
              serviceNameInputUAT2: "details.serviceNameInputUAT2",
              serviceURLProd: this.addSubmitData.get('serviceUrlProd').value,
              serviceTimeOutProd: this.addSubmitData.get('serviceTimeoutProd').value,
              serviceTimeOutUAT2: "details.serviceTimeOutUAT2",
              serviceNameInputProd2: "details.serviceNameInputProd2",
              serviceURLUAT2: "details.serviceURLUAT2",
              serviceTimeOutProd2: "details.serviceTimeOutProd2",
              serviceURLProd2: "details.serviceURLProd2"
            }
          ]
        }
      ],
      productName: productName,
      // "version": details.appVersion,
      // "username": details.username,
      orgName: localStorage.getItem("orgname")
    }

    // this.subscribeData = {
    //   products:[{
    //     services : [{
    //       webServiceType : this.addSubmitData.get('webService').value,
    //       methodType : this.addSubmitData.get('methodType').value,
    //       checksumControl : this.addSubmitData.get('checksumReq').value,
    //       encryptionMethod : this.addSubmitData.get('encryUsed').value,
    //       hostNameUat : this.addSubmitData.get('hostNameUat').value,
    //       uatIp : this.addSubmitData.get('uatIp').value,
    //       uatPort : this.addSubmitData.get('uatPort').value,
    //       communicationProtocolUAT : this.addSubmitData.get('communicationProtocol').value,
    //       serviceTimeOutUat : this.addSubmitData.get('serviceTimeoutUat').value,
    //       serviceURLUAT : this.addSubmitData.get('serviceUrlUat').value,
    //       serviceNameInputUAT : this.addSubmitData.get('serviceNameUat').value,
    //       uatFile1 : this.addSubmitData.get('fileUploadUat').value,
    //       hostNameProd : this.addSubmitData.get('hostNameProd').value,
    //       prodIp : this.addSubmitData.get('prodIp').value,
    //       prodPort : this.addSubmitData.get('prodPort').value,
    //       communicationProtocolProd : this.addSubmitData.get('commProtocol').value,
    //       serviceTimeOutProd : this.addSubmitData.get('serviceTimeoutProd').value,
    //       serviceURLProd : this.addSubmitData.get('serviceUrlProd').value,
    //       serviceNameInputProd : this.addSubmitData.get('serviceNameProd').value,
    //       prodFile1 : this.addSubmitData.get('fileUploadProd').value
    //     }]
    //   }]
     
    // }
    
    this.appservice.projectData(this.dataForProject).then(data1 => {
      var dataregisterData = localStorage.getItem('data');
      console.log("local",dataregisterData);
      console.log("asd",data1)
      this.registerData=JSON.parse(dataregisterData);
      console.log("data of project", this.registerData);
      // console.log(this.registerData.firstNameBusinessSpoc);
      this.projectId = data1["projectId"];
      console.log("projectId---------->", this.projectId);
      localStorage.setItem("projectId",this.projectId)
      console.log("firstName",this.registerData.firstNameBusinessSpoc,this.registerData.lastNameBusinessSpoc,this.registerData.emailIdBusinessSpoc)

      this.dataForRegister = {
        firstName: this.registerData.firstNameBusinessSpoc,
        lastName: this.registerData.lastNameBusinessSpoc,
        organisation: this.registerData.organisation,
        email: this.registerData.emailIdBusinessSpoc,
        username: this.registerData.emailIdBusinessSpoc,
        have_an_ICICI_account: "this.radioVal",
        bankAccountNumber: "details.iciciAccNo",
        poolAccountNumber: "details.poolAccNo",
        projectId: this.projectId,
        productName:productName,
        serviceName: serviceName,
        firstNameBusinessSpoc: this.registerData.firstNameBusinessSpoc,
        lastNameBusinessSpoc: this.registerData.lastNameBusinessSpoc,
        mobileNumberBusinessSpoc: this.registerData.mobileNumberBusinessSpoc,
        emailIdBusinessSpoc: this.registerData.emailIdBusinessSpoc,
        firstNameITSpoc: this.registerData.firstNameITSpoc,
        lastNameITSpoc: this.registerData.lastNameITSpoc,
        mobileNumberITSpoc: this.registerData.mobileNumberITSpoc,
        emailIdITSpoc: this.registerData.emailIdITSpoc,
        businessSpocUsername: this.registerData.emailIdBusinessSpoc,
        itSpocUsername: "details.emailIdITSpoc",
        accountManagerName: this.registerData.accountManagerName,
        mobileNumberAM: this.registerData.mobileNumberAM,
        emailIdAM: this.registerData.emailIdAM,
        roles: "Customer",
        subDate: "formatted_date"
      };
      this.appservice.registerData(this.dataForRegister).then(data => {
        console.log("Inside register data api call---", data);
        // console.log("this.flowName", this.flowName);
        // console.log("this.productName",this.productName);
        const formData1: any = new FormData();
        formData1.append("files",this.uatFile1);
        var fileType1="uatFile1";
        this.appservice.uploadFile(this.projectId,formData1,fileType1).then(data2=>{
console.log("data for 1",data2);})

const formData3:any = new FormData();
formData3.append("files",this.prodFile1);
var fileType3="prodFile1";
this.appservice.uploadFile(this.projectId,formData3,fileType3).then(data3=>{ 
console.log("data of 3",data3);})
alert("Subscription Successful!")
this.router.navigateByUrl("/authentication/Home")


      });
    });


  }
  prodFile1(arg0: string, prodFile1: any) {
    throw new Error("Method not implemented.");
  }
  prevTab(){
    // this.router.navigate(['/org']);
    this.messageEvent.next('back2');

    $('#circle2').css('background-color','#4E9AF7');
    $('#circle2').css('color','white');  
    $('#circle3').css('color','#D3D2D7');  
    $('#circle3').css('background-color','white');
    $('#circle2').html("2");
    $('#selectProd').css('color','#808080'); 
    $('#selectProd1').css('color','#808080');
    $('#orgg').css('color','white'); 
    $('#orgg1').css('color','white');
    $('#application').css('color','#808080'); 
    $('#application1').css('color','#808080'); 
    
    this.submitData = {
      webService : this.addSubmitData.get('webService').value,
      methodType : this.addSubmitData.get('methodType').value,
      checksumReq : this.addSubmitData.get('checksumReq').value,
      encryUsed : this.addSubmitData.get('encryUsed').value,
      hostNameUat : this.addSubmitData.get('hostNameUat').value,
      uatIp : this.addSubmitData.get('uatIp').value,
      uatPort : this.addSubmitData.get('uatPort').value,
      communicationProtocol : this.addSubmitData.get('communicationProtocol').value,
      serviceTimeoutUat : this.addSubmitData.get('serviceTimeoutUat').value,
      serviceUrlUat : this.addSubmitData.get('serviceUrlUat').value,
      serviceNameUat : this.addSubmitData.get('serviceNameUat').value,
      fileUploadUat: this.addSubmitData.get('fileUploadUat').value,
      hostNameProd : this.addSubmitData.get('hostNameProd').value,
      prodIp : this.addSubmitData.get('prodIp').value,
      prodPort : this.addSubmitData.get('prodPort').value,
      commProtocol : this.addSubmitData.get('commProtocol').value,
      serviceTimeoutProd : this.addSubmitData.get('serviceTimeoutProd').value,
      serviceUrlProd : this.addSubmitData.get('serviceUrlProd').value,
      serviceNameProd : this.addSubmitData.get('serviceNameProd').value,
      fileUploadProd  : this.addSubmitData.get('fileUploadProd').value                  
    }
    localStorage.setItem("data2",JSON.stringify(this.submitData));
  }
  prevTab2(){
    if(this.tabSet.activeId == "uatDetails"){
      this.exp = "serviceDetails"
    }
    $("#app2").show()	
    $("#application1").hide()	
      $("#app3").hide()	
      $("#app4").hide()
  }
  prevTab3(){
    if(this.tabSet.activeId == "prodDetails"){
      this.exp = "uatDetails"
    }
    $("#app3").show()	
    $("#application1").hide()	
      $("#app4").hide()	
      $("#app2").hide()
  }
  uatUpload1Uploaded($event) {    
    this.uatfilename1=$event.target.files[0].name
    this.uatFile1=$event.target.files[0];
    console.log("this.uatFile1",this.uatFile1)
    localStorage.setItem("file1",this.uatfilename1);
  }
  prodUpload1Uploaded($event) {
    this.prodfilename1=$event.target.files[0].name
    this.prodFile1=$event.target.files[0];
    console.log("this.prodFile1",this.prodFile1);
    localStorage.setItem("file2",this.prodfilename1);



  }
}
