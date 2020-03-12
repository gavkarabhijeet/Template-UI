import {
  Component,
  ViewChild
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators
} from "@angular/forms";
import {
  HttpClient
} from "@angular/common/http";
import {
  ToastrService
} from "ngx-toastr";
import {
  Router, ActivatedRoute
} from "@angular/router";
import {
  CreateAppService
} from "./create-app.service";
import {
  NgxSpinnerService
} from "ngx-spinner";
import {
  NgbTabset
} from "@ng-bootstrap/ng-bootstrap";

import {
  config
} from "config";
@Component({
  selector: 'app-app-details',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.css']

})
export class CreateAppComponent {
    notSelectedService:any=true
  serviceForm: FormGroup;
  default: string = 'SOAP Web Service';
  productValue: any;
  selectedIndex1: any;
  private tabSet: NgbTabset;
  projectId: any;
  fileData: any;
  summaryProductDescription: any;
  directory: string;
  showICICIIntermediaryAccountNumber: boolean;
  activeId: string;
  valueD: any;

  @ViewChild(NgbTabset) set content(content: NgbTabset) {
      this.tabSet = content;
  };
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
  communicationProtocolArray = [{
          name: "HTTP",
          value: "HTTP"
      },
      {
          name: "HTTPS",
          value: "HTTPS"
      }
  ];
  communicationProtocolArrayUat = [{
      name: "HTTP",
      value: "POST"
  }];
  encryptionMethodArray = [{
          name: "Yes",
          value: "Yes"
      },
      {
          name: "No",
          value: "No"
      }
  ];
  eodMisValuesArray=[{
      name:"Host to Host",value:"hostToHost"},
      {
          name:"Email",value:"email"},
          {
              name:"Both",value:"both"
  }]
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
  radioVal = 'yes';
  dataForRegister;
  dataForProject;
  displayAddition: Boolean = true;
  checkedId = 'bankAccount';
  imageValue;
  dataFormatted: any[];
  exp = 'appDetails'
  userDetailsTab = true;
  serviceDetailsTab = true;
  appDetailsTab = false;
  uatFile1;
  uatFile2;
  prodFile1;
  prodFile2;
  flowName;
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
  webServiceTypeArray = [{
          name: "SOAP Web Service",
          value: "SOAP Web Service"
      },
      {
          name: "REST API - JSON",
          value: "REST API - JSON"
      },
      {
          name: "REST API - XML",
          value: "REST API - XML"
      }
  ]


  public slideConfig = {
      dots: false,
      infinite: false,
      speed: 300,
      nextArrow: '<div class="homenav-btn next-slide"></div>',
      prevArrow: '<div class="homenav-btn prev-slide"></div>',
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,

      responsive: [{
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
  filledServiceName;
  dataOfProductToDisplay
  newProjectId
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private http: HttpClient, private router: Router, private spinner: NgxSpinnerService,
      public toastr: ToastrService, private createAppService: CreateAppService) {

  }

    ngOnInit() {
    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
      console.log("projectId: ",this.projectId)
  });
    this.createAppService
      .getProjectDetails(this.projectId)
      .then(data => {
        this.dataOfProductToDisplay = data;
        console.log("dataOfProductToDisplay: ",this.dataOfProductToDisplay[0].products[0].productId);
        var serviceId = this.dataOfProductToDisplay[0].products[0].services[0].serviceId;
        var productId = this.dataOfProductToDisplay[0].products[0].productId
        this.createAppService.getProductById(productId).then((productData) => {
          console.log("productData: ",productData[0])
          this.productValue = productData[0];
        this.createAppService.getServiceById(serviceId).then((serviceData) => {
          console.log("serviceData: ",serviceData[0])
          this.serviceData = serviceData[0]
          this.productName = this.dataOfProductToDisplay[0].productName
      this.dataForService = this.serviceData;

      
      console.log("this.flowName: ", this.serviceData);
      this.flowName = this.serviceData.serviceName;
      this.selectedIndex = this.productValue.productId
      this.selectedIndex1 = this.serviceData.serviceId
      this.createAppService.getProducts().then((data) => {
          this.spinner.show();
          this.productData = data;

          this.spinner.hide();
      })

      this.createAppService.getService().then((data) => {
          for (var i = 0; i < data.length; i++) {
              this.imageValue = data[i].fileName;
          }
      })
      if (this.dataForService.serviceName === "ECollection with Two Level Validation at Bank and Client’s End" || this.dataForService.serviceName === "ECollection with Remitter Validation in Intermediary Account") {
          this.showICICIIntermediaryAccountNumber = true;
      } else {
          this.showICICIIntermediaryAccountNumber = false;
      }
      this.onPageLoadProductData(this.productValue);
      this.onPageLoadServiceData(this.serviceData);
    })
    })
  })
  }
  keyPressAlpha(event) {
    var key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8);
  };
  keyPress(event: any) {
      const pattern = /^[6-9][0-9]{8}$/;
      let result = pattern.test(event.target.value);
      if (result) {
          this.isError = ""
      } else if (event.target.value.length > 9) {
          this.isError = ""
      } else {
          this.isError = "Please enter valid mobile number"
      }
  }
  nextTab(tabName) {
    if(this.summaryServiceName != ''){
      if (tabName == 'userDetails') {
        this.appDetailsTab = true;
        this.userDetailsTab = false;

        console.log("userName ", localStorage.getItem("username"))
        var userName = localStorage.getItem("username")  
        this.createAppService.getUserByName(userName).then((data) => {
          console.log("User Data => ", data.organisation)
          this.addRegisterData.controls['organization'].setValue(data.organisation);
          // this.addRegisterData.controls['radioVal'].setValue(data.have_an_ICICI_account);
          this.addRegisterData.controls['iciciAccNo'].setValue(data.bankAccountNumber);
          // if(data.poolAccountNumber != 'undefined' && data.poolAccountNumber != null && data.poolAccountNumber != ''){
          // this.addRegisterData.controls['poolAccNo'].setValue(data.poolAccountNumber);
          // }
          this.addRegisterData.controls['accountManagerName'].setValue(data.accountManagerName);
          this.addRegisterData.controls['mobileNumberAM'].setValue(data.mobileNumberAM);
          this.addRegisterData.controls['emailIdAM'].setValue(data.emailIdAM);
          this.addRegisterData.controls['firstNameBusinessSpoc'].setValue(data.firstNameBusinessSpoc);
          this.addRegisterData.controls['lastNameBusinessSpoc'].setValue(data.lastNameBusinessSpoc);
          this.addRegisterData.controls['mobileNumberBusinessSpoc'].setValue(data.mobileNumberBusinessSpoc);
          this.addRegisterData.controls['emailIdBusinessSpoc'].setValue(data.emailIdBusinessSpoc);
          this.addRegisterData.controls['firstNameITSpoc'].setValue(data.firstNameITSpoc);
          this.addRegisterData.controls['lastNameITSpoc'].setValue(data.lastNameITSpoc);
          this.addRegisterData.controls['mobileNumberITSpoc'].setValue(data.mobileNumberITSpoc);
          this.addRegisterData.controls['emailIdITSpoc'].setValue(data.emailIdITSpoc);
    
    
        })
    } else if (tabName == 'serviceDetails') {
          this.appDetailsTab = true;
          this.userDetailsTab = true;
          this.serviceDetailsTab = false;
      }
      this.exp = tabName
    } else {
      var value = confirm("Please select a flow before going to next Tab");
      console.log("Not allowed")
    }
  }

  backTab(tabName) {
      if (tabName == 'appDetails') {
          this.appDetailsTab = true;
          this.userDetailsTab = false;
      } else if (tabName == 'serviceDetails') {
          this.appDetailsTab = true;
          this.userDetailsTab = true;
          this.serviceDetailsTab = false;
      }
      this.exp = tabName
  }

  uatUpload1() {
      $(document).ready(function() {
          $("#uatUpload1").trigger("click");
      })
  }

  uatUpload2() {
      $(document).ready(function() {
          $("#uatUpload2").trigger("click");
      })
  }

  prodUpload1() {
      $(document).ready(function() {
          $("#prodUpload1").trigger("click");
      })
  }

  prodUpload2() {
      $(document).ready(function() {
          $("#prodUpload2").trigger("click");
      })
  }

  httpsUpload1() {
      $(document).ready(function() {
          $("#httpsUpload1").trigger("click");
      })
  }
  httpsProdUpload1() {
      $(document).ready(function() {
          $("#httpsProdUpload1").trigger("click");
      })
  }
  uatPayUpdateURL() {
      $(document).ready(function() {
          $("#uatPayUpdateURL").trigger("click");
      })
  }
  uatCustValidationURL() {
      $(document).ready(function() {
          $("#uatCustValidationURL").trigger("click");
      })
  }
  uatPaymentStat() {
      $(document).ready(function() {
          $("#uatPaymentStat").trigger("click");
      })
  }
  livePayUpdateURL() {
      $(document).ready(function() {
          $("#livePayUpdateURL").trigger("click");
      })
  }
  liveCustValidationURL() {
      $(document).ready(function() {
          $("#liveCustValidationURL").trigger("click");
      })
  }
  livePaymentStat() {
      $(document).ready(function() {
          $("#livePaymentStat").trigger("click");
      })
  }

  ngAfterViewInit() {
    //   console.log(this.tabSet);
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in uatFile1 variable.
   */
  uatUpload1Uploaded($event) {
      this.uatFile1 = $event.target.files[0]
      this.addRegisterData.controls['uatFile1'].setValue($event.target.files[0].name);
    //   console.log("uatUpload1Uploaded :", $event.target.files[0].name)
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in uatFile1 variable.
   */
  uatUpload2Uploaded($event) {
      this.uatFile2 = $event.target.files[0]
      this.addRegisterData.controls['uatFile2'].setValue($event.target.files[0].name);
    //   console.log("uatUpload2Uploaded :", $event.target.files[0].name)
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in prodFile1 variable.
   */
  prodUpload1Uploaded($event) {
      this.prodFile1 = $event.target.files[0]
      this.addRegisterData.controls['prodFile1'].setValue($event.target.files[0].name);
    //   console.log("prodUpload1Uploaded :", $event.target.files[0].name)
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in prodFile1 variable.
   */
  prodUpload2Uploaded($event) {
      this.prodFile2 = $event.target.files[0]
      this.addRegisterData.controls['prodFile2'].setValue($event.target.files[0].name);
    //   console.log("prodUpload2Uploaded :", $event.target.files[0].name);


  }
  /**
   * @author Kuldeep
   * @param $event {file data}
   * @description This function will capture the file data of http certificate 
   */
  httpsUpload1Uploaded($event) {
      this.httpsCertificate = $event.target.files[0]
      this.addRegisterData.controls['httpCertificate'].setValue($event.target.files[0].name);
    //   console.log("httpsUpload1Uploaded :", $event.target.files[0].name)
  }
  uatPayUpdateURLUploaded($event) {
      this.uatPayUpdateURLFile = $event.target.files[0]
      this.addRegisterData.controls['uatPayUpdateURL'].setValue($event.target.files[0].name);
    //   console.log("uatPayUpdateURL :", $event.target.files[0].name)
  }
  uatCustValidationURLUploaded($event) {
      this.uatCustValidationURLFile = $event.target.files[0]
      this.addRegisterData.controls['uatCustValidationURL'].setValue($event.target.files[0].name);
    //   console.log("uatCustValidationURLUploaded :", this.uatCustValidationURLFile)
  }
  uatPaymentStatUploaded($event) {
      this.uatPaymentStatFile = $event.target.files[0]
      this.addRegisterData.controls['uatPaymentStat'].setValue($event.target.files[0].name);
    //   console.log("uatPaymentStatUploaded :", this.uatPaymentStatFile)
  }
  livePayUpdateURLUploaded($event) {
      this.livePayUpdateURLFile = $event.target.files[0]
      this.addRegisterData.controls['livePayUpdateURL'].setValue($event.target.files[0].name);
    //   console.log("livePayUpdateURLUploaded :", this.livePayUpdateURLFile)
  }
  liveCustValidationURLUploaded($event) {
      this.liveCustValidationURLFile = $event.target.files[0]
      this.addRegisterData.controls['liveCustValidationURL'].setValue($event.target.files[0].name);
    //   console.log("liveCustValidationURLUploaded :", this.liveCustValidationURLFile)
  }
  livePaymentStatUploaded($event) {
      this.livePaymentStatUploadedFile = $event.target.files[0]
      this.addRegisterData.controls['livePaymentStat'].setValue($event.target.files[0].name);
    //   console.log("livePaymentStatUploaded :", this.livePaymentStatUploadedFile)
  }
  addbusinessEmail(): FormGroup {
      return this.fb.group({
          'email': ['']
      });
  }

  addbusinessSpocEmail(): void {
      this.displayAddition = false;
      ( < FormArray > this.addRegisterData.get('emails')).push(this.addbusinessEmail());
  }

  removebusinessSpocEmail(ifConditionGroupIndex: number): void {
      ( < FormArray > this.addRegisterData.get('emails')).removeAt(ifConditionGroupIndex);
  }
  onPageLoadProductData(data) {
    console.log("onPageLoadProductData: ");
      this.selectedIndex = data.productId;
      let pdata = data
      let ddData = []
      this.summaryProductImage = config.url + "Images/Products/" + data.fileName;
    //   console.log("check product this.summaryProductImage------->", this.summaryProductImage);

      this.summaryProductName = data.productName;
      if(this.summaryProductName == 'eCollections'){
        if(this.flowName == 'ECollection with Remitter Validation in Intermediary Account'){
          this.addRegisterData = this.fb.group({
            // 'emails': this.fb.array([
            //     this.addbusinessEmail()
            // ]),
            'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
            'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
            'poolAccNo': [''],
            'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'webServiceType': [''],
            'communicationProtocol': [''],
            'checksumControl': [''],
            'encryptionMethod': [''],
            'hostNameUat': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
            'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
            'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
            'httpCertificate': [''],
            'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
            'serviceURLUAT': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
            'serviceNameInputUAT': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            'uatFile1': [''],
            'retryAttempts': [''],
            'actionOnNoRes': [''],
            'hostNameProd': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
            'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
            'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
            'httpProdCertificate': [''],  
            'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
            'serviceURLProd': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
            'serviceNameInputProd': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            'prodFile1': ['']
        })
        } 
        else if(this.flowName == 'ECollection with Two Level Validation at Bank and Client’s End'){
          this.addRegisterData = this.fb.group({
            // 'emails': this.fb.array([
            //     this.addbusinessEmail()
            // ]),
            'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
            'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
            'poolAccNo': [''],
            'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'webServiceType': [''],
            'communicationProtocol': [''],
            'checksumControl': [''],
            'encryptionMethod': [''],
            'hostNameUat': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
            'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
            'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
            'httpCertificate': [''],
            'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
            'serviceURLUAT': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
            'serviceNameInputUAT': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            'serviceNameInputUAT2': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            'uatFile1': [''],
            'retryAttempts': [''],
            'actionOnNoRes': [''],
            'hostNameProd': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
            'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
            'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
            'httpProdCertificate': [''],  
            'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
            'serviceURLProd': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
            'serviceNameInputProd': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            'serviceNameInputProd2': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            'prodFile1': [''],
            'uatFile2': [''],
            'prodFile2': ['']
        })
      }
        else {
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
          'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
          'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'webServiceType': [''],
          'communicationProtocol': [''],
          'checksumControl': [''],
          'encryptionMethod': [''],
          'hostNameUat': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpCertificate': [''],
          'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLUAT': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'serviceNameInputUAT': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'uatFile1': [''],
          'retryAttempts': [''],
          'actionOnNoRes': [''],
          'hostNameProd': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpProdCertificate': [''],  
          'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLProd': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'serviceNameInputProd': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'prodFile1': ['']
      })
    }
      } else {
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
          'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
          'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'webServiceType': [''],
          'isure_communication_protocol': [''],
          'checksumControl': [''],
          'encryptionMethod': [''],
          'txnPerday': [''],
          'reqParameter': [''],
          'hostNameUat': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpCertificate': [''],
          'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLUAT': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'serviceNameInputUAT1': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'uatFile1': [''],
          'serviceNameInputUAT2': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'uatFile2': [''],
          'hostNameProd': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpProdCertificate': [''],
          'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLProd': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'serviceNameInputProd1': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'prodFile1': [''],
          'serviceNameInputProd2': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'prodFile2': ['']
      })
      }
      this.addRegisterData.controls["uatPort"].setValue(
        '443'
    );
      this.summaryProductDescription = data.description;
      this.createAppService.getService().then(async (data) => {
          this.spinner.show();
          this.serviceData = data;
          for (var i = 0; i < this.serviceData.length; i++) {
              if (pdata.productId === this.serviceData[i].productId) {
                  ddData.push(this.serviceData[i]);
              }
          }
          this.dropdownData = ddData
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
          this.spinner.hide();
      });

  }
  open2Accordian() {
      this.activeId = "ngb-panel-1";
  }
  data(data) {
      this.productValue = data;
      var value = confirm("Would you like to change your product selection?");
      console.log("iSurePay Selected: ",data.productName)
      if (value === true) {
          this.selectedIndex = data.productId;
          let pdata = data
          let ddData = []
          this.summaryProductImage = config.url + "Images/Products/" + data.fileName;
          this.summaryProductName = data.productName;
          this.summaryProductDescription = data.description;
          this.selectedIndex1 = ''
          this.summaryServiceImage = ''
          this.summaryServiceName = ''
          this.createAppService.getService().then(async (data) => {
              this.spinner.show();
              this.serviceData = data;
              for (var i = 0; i < this.serviceData.length; i++) {
                  if (pdata.productId === this.serviceData[i].productId) {
                      ddData.push(this.serviceData[i]);
                  }
              }
              this.dropdownData = ddData
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
              this.spinner.hide();
          });
      } else if (value === false) {

      }

  }
  toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
  }
  onPageLoadServiceData(value) {
      this.selectedIndex1 = value.serviceId;
      this.summaryServiceImage = config.url + "Images/Services/" + value.fileName;
      this.summaryServiceName = value.serviceName;
      this.filledServiceName = value.serviceName;
  }

  data2(value) {
    console.log("data2: ",value.serviceName, "" ,this.filledServiceName)
    if(this.filledServiceName == value.serviceName){
      var flowMessage = confirm(
        "You have already selected this service for the project"
    );
    } else {
      if (this.summaryServiceImage == '') {
          var dataValue = confirm(
              "Do you want to select this Service for " +
              this.productValue.productName +
              "?"
          );
      } else {
          var dataValue = confirm(
              "Do you want to change selection of Service for " +
              this.productValue.productName +
              "?"
          );
      }
      if (dataValue === true) {
          this.selectedIndex1 = value.serviceId;
          this.summaryServiceImage =
              config.url + "Images/Services/" + value.fileName;
          this.summaryServiceName = value.serviceName;
      } else if (dataValue === false) {}
      if (this.summaryServiceName == "ECollection with Two Level Validation at Bank and Client’s End" || this.summaryServiceName === "ECollection with Remitter Validation in Intermediary Account") {
        this.showICICIIntermediaryAccountNumber = true;
    } else {
        this.showICICIIntermediaryAccountNumber = false;
    }

    if(this.summaryProductName == 'eCollections'){
      if(this.summaryServiceName == 'ECollection with Remitter Validation in Intermediary Account'){
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
          'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
          'poolAccNo': [''],
          'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'webServiceType': [''],
          'communicationProtocol': [''],
          'checksumControl': [''],
          'encryptionMethod': [''],
          'hostNameUat': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpCertificate': [''],
          'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLUAT': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'serviceNameInputUAT': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'uatFile1': [''],
          'retryAttempts': [''],
          'actionOnNoRes': [''],
          'hostNameProd': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpProdCertificate': [''],  
          'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLProd': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'serviceNameInputProd': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'prodFile1': ['']
      })
      } 
      else if(this.summaryServiceName == 'ECollection with Two Level Validation at Bank and Client’s End'){
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
          'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
          'poolAccNo': [''],
          'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'webServiceType': [''],
          'communicationProtocol': [''],
          'checksumControl': [''],
          'encryptionMethod': [''],
          'hostNameUat': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpCertificate': [''],
          'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLUAT': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'serviceNameInputUAT': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'serviceNameInputUAT2': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'uatFile1': [''],
          'retryAttempts': [''],
          'actionOnNoRes': [''],
          'hostNameProd': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpProdCertificate': [''],  
          'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLProd': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
          'serviceNameInputProd': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'serviceNameInputProd2': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'prodFile1': [''],
          'uatFile2': [''],
          'prodFile2': ['']
      })
    }
      else {
      this.addRegisterData = this.fb.group({
        // 'emails': this.fb.array([
        //     this.addbusinessEmail()
        // ]),
        'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
        'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
        'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'webServiceType': [''],
        'communicationProtocol': [''],
        'checksumControl': [''],
        'encryptionMethod': [''],
        'hostNameUat': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
        'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
        'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
        'httpCertificate': [''],
        'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
        'serviceURLUAT': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
        'serviceNameInputUAT': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        'uatFile1': [''],
        'retryAttempts': [''],
        'actionOnNoRes': [''],
        'hostNameProd': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
        'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
        'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
        'httpProdCertificate': [''],  
        'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
        'serviceURLProd': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
        'serviceNameInputProd': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        'prodFile1': ['']
    })
  }
    } else {
      this.addRegisterData = this.fb.group({
        // 'emails': this.fb.array([
        //     this.addbusinessEmail()
        // ]),
        'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
        'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
        'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'webServiceType': [''],
        'isure_communication_protocol': [''],
        'checksumControl': [''],
        'encryptionMethod': [''],
        'txnPerday': [''],
        'reqParameter': [''],
        'hostNameUat': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
        'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
        'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
        'httpCertificate': [''],
        'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
        'serviceURLUAT': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
        'serviceNameInputUAT1': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        'uatFile1': [''],
        'serviceNameInputUAT2': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        'uatFile2': [''],
        'hostNameProd': ['',[Validators.required,Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
        'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
        'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
        'httpProdCertificate': [''],
        'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
        'serviceURLProd': ['',[Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)]],
        'serviceNameInputProd1': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        'prodFile1': [''],
        'serviceNameInputProd2': ['',[Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        'prodFile2': ['']
    })
    }
    this.addRegisterData.controls["uatPort"].setValue(
      '443'
  );
    }
  }
  webServiceTypeFunction(value) {

      if (value == "SOAP Web Service") {
          this.communicationProtocolArrayUat = [{
              name: "HTTP",
              value: "POST"
          }]
      } else if (value == "REST API - JSON" || value == "REST API - XML") {
          this.communicationProtocolArrayUat = [{
                  name: "POST",
                  value: "POST"
              },

              {
                  name: "GET",
                  value: "GET"
              }
          ]
      }

  }

  noAccountSubmission(details) {
      alert("Thank You for Subscription.This information will help for Lead Generation !");
  }

  submitDetails(details) {

      alert("Subscription Submitted Successfully!");
      // this.dataForRegister = {
      //     'firstName': details.firstName,
      //     'lastName': details.lastName,
      //     'organisation': details.organization,
      //     'email': details.email,
      //     'phoneNumber': details.phoneno,
      //     'have_an_ICICI_account': this.radioVal,
      //     'bankAccountNumber': details.iciciAccNo,
      //     'poolAccountNumber': details.poolAccNo
      // }
      if (this.productValue.productName === "eCollections") {
          this.dataForProject = {
              "products": [{
                  "productId": this.productValue.productId,
                  "services": [{
                      "serviceId": this.selectedIndex1,
                      "webServiceType": details.webServiceType,
                      "communicationProtocol": details.communicationProtocol,
                      "emails": details.emails,
                      "httpCertificate": details.httpCertificate,
                      "encryptionMethod": details.encryptionMethod,
                      "checksumControl": details.checksumControl,
                      "uatIp": details.uatIp,
                      "uatPort": details.uatPort,
                      "uatSecret": details.uatSecret,
                      "uatUsername": details.uatUsername,
                      "uatPassword": details.uatPassword,
                      "retryAttempts": details.retryAttempts,
                      "actionOnNoRes": details.actionOnNoRes,
                      "prodIp": details.prodIp,
                      "prodUsername": details.prodUsername,
                      "prodPort": details.prodPort,
                      "prodSecret": details.prodSecret,
                      "prodPassword": details.prodPassword,
                      "uatFile1": details.uatFile1,
                      "uatFile2": details.uatFile2,
                      "prodFile1": details.prodFile1,
                      "prodFile2": details.prodFile2,
                      "uatURL1": details.uatURL1,
                      "uatURL2": details.uatURL2,
                      "prodURL1": details.prodURL1,
                      "prodURL2": details.prodURL2,
                      "hostNameUat": details.hostNameUat,
                      "hostNameProd": details.hostNameProd,
                      'serviceNameInputUAT': details.serviceNameInputUAT,
                      'serviceNameInputProd': details.serviceNameInputProd,
                      'serviceURLUAT': details.serviceURLUAT,
                      'serviceTimeOutUAT': details.serviceTimeOutUAT,
                      'serviceURLProd': details.serviceURLProd,
                      'serviceTimeOutProd': details.serviceTimeOutPod
                  }]
              }],
              "productName": this.productValue.productName,
              "orgName": details.organization
          }
      } else if (this.productValue.productName === "iSurePay") {

          this.dataForProject = {
              "products": [{
                  "productId": this.productValue.productId,
                  "ackReciept": details.ackReciept,
                  "modeOffered": details.modeOffered,
                 
                 
                  "amountField": details.amountField,
                  "services": [{
                    "txnPerday": details.txnPerday,
                    'hostNameUat':details.hostNameUat,
                    "reqParameter": details.reqParameter,
                      "serviceId": this.selectedIndex1,
                      "webServiceType": details.webServiceType,
                      "messageFormat": details.messageFormat,
                      "emails": details.emails,
                      "encryptionMethod": details.encryptionMethod,
                      "uatIp": details.uatIp,
                      "uatPort": details.uatPort,
                      "checksumControl": details.checksumControl,
                      "httpCertificate": details.httpCertificate,
                      "uatPayUpdateURL": details.uatPayUpdateURL,
                      "uatCustValidationURL": details.uatCustValidationURL,
                      "uatPaymentStat": details.uatPaymentStat,
                      'isure_communication_protocol':details.isure_communication_protocol,
                      "prodIp": details.prodIp,
                      'methodType':this.valueD,
                      "prodPort": details.prodPort,
                      "livePayUpdateURL": details.livePayUpdateURL,
                      "liveCustValidationURL": details.liveCustValidationURL,
                      "livePaymentStat": details.livePaymentStat,
                      "uatFile1": details.uatFile1,
                      "uatFile2": details.uatFile2,
                      "prodFile1": details.prodFile1,
                      "prodFile2": details.prodFile2,
                      "uatURL1": details.uatURL1,
                      "uatURL2": details.uatURL2,
                      "prodURL1": details.prodURL1,
                      "prodURL2": details.prodURL2,
                      "communicationProtocolProduction": this.communicationProtocolProduction,
                      'serviceNameInputUAT': details.serviceNameInputUAT,
                      'serviceURLUAT': details.serviceURLUAT,
                      'serviceTimeOutUAT': details.serviceTimeOutUAT,
                      'serviceNameInputProd': details.serviceNameInputProd,
                      'serviceURLProd': details.serviceURLProd,
                      'serviceTimeOutProd': details.serviceTimeOutPod
                  }]
              }],
              "productName": this.productValue.productName,
              "orgName": details.organization
          }
      }

      this.createAppService.updateprojectData(this.projectId,this.dataForProject).then((data) => {
        console.log("data[projectId] :",data)  
        this.newProjectId = data[0].projectId;
        console.log("newProjectId: ",this.newProjectId)

          this.dataForRegister = {
              'organisation': details.organization,
              'email': details.emailIdBusinessSpoc,
              'username': details.emailIdBusinessSpoc,
              'have_an_ICICI_account': this.radioVal,
              'bankAccountNumber': details.iciciAccNo,
              'poolAccountNumber': details.poolAccNo,
              'projectId': this.newProjectId,
              'productName': this.productValue.productName,
              'serviceName': this.summaryServiceName,
              'firstNameBusinessSpoc': details.firstNameBusinessSpoc,
              'lastNameBusinessSpoc': details.lastNameBusinessSpoc,
              'mobileNumberBusinessSpoc': details.mobileNumberBusinessSpoc,
              'emailIdBusinessSpoc': details.emailIdBusinessSpoc,
              'firstNameITSpoc': details.firstNameITSpoc,
              'lastNameITSpoc': details.lastNameITSpoc,
              'mobileNumberITSpoc': details.mobileNumberITSpoc,
              'emailIdITSpoc': details.emailIdITSpoc,
              'businessSpocUsername': details.emailIdBusinessSpoc,
              'itSpocUsername': details.emailIdITSpoc,
              'accountManagerName':details.accountManagerName,
              'mobileNumberAM':details.mobileNumberAM,
              'emailIdAM':details.emailIdAM
          }
          // this.createAppService.registerData(this.dataForRegister).then((data) => {
              if (this.flowName === "ECollection with Two Level Validation at Bank and Client’s End" || this.productName === "iSurePay") {
                  const formData1: any = new FormData();
                  const formData2: any = new FormData();
                  var fileInformation = {
                      docPath: '/Confirmation/' + this.newProjectId + '/',
                      projectId: this.newProjectId,
                      docName: this.uatFile1.name,
                      orgName: details.organization,
                      username: details.email
                  }
                  formData1.append("files", this.uatFile1);
                  this.createAppService.uploadFile(this.newProjectId, formData1).then((data) => {

                      // var fileInformation = {
                      //     docPath: '/Verification/',
                      //     projectId: this.projectId,
                      //     docName: this.uatFile1.name,
                      //     orgName: details.organization,
                      //     username: details.email

                      // }
                      // formData2.append("files", this.uatFile2);
                      // this.createAppService.uploadFile(this.projectId, formData2).then((data) => {
                      // })
                  })
                  // if (this.prodFile1 === "" && this.prodFile2 === "") {

                  // } else {
                  //     formData1.append("files", this.prodFile1);
                  //     this.createAppService.uploadFile(this.projectId, formData1).then((data) => {
                  //         var fileInformation = {
                  //             docPath: '/Verification/',
                  //             projectId: this.projectId,
                  //             docName: this.uatFile1.name,
                  //             orgName: details.organization,
                  //             username: details.email

                  //         }
                  //         formData2.append("files", this.prodFile2);
                  //         this.createAppService.uploadFile(this.projectId, formData2).then((data) => {
                  //         })
                  //     })
                  // }
              } else {
                  const formData: any = new FormData();
                  formData.append('files', this.uatFile1);
                  this.createAppService.uploadFile(this.newProjectId, formData).then((data) => {
                  })
                  // if (this.prodFile1 === "") {

                  // } else {
                  //     const formData: any = new FormData();
                  //     formData.append('files', this.prodFile1);
                  //     this.createAppService.uploadFileProd(this.projectId, formData).then((data) => {
                  //     })
                  // }
              }
          // })
          this.router.navigate(['/authentication/user-profile']);
      })
  }
  selected(methodType) {
  }
  methodProdType(value) {
      this.communicationProtocolProduction = value
      if (value == 'HTTP') {
          this.disableInput = true
      } else {
          this.disableInput = false

      }
  }
  methodType(value) {
      if (value == 'HTTP') {
        this.valueD=value;
                  this.disableInput = true
      } else {
        this.valueD=value;
          this.disableInput = false

      }

  }
  onSelect(checkedValue, id) {
    //   console.log("Testing arguments passed in onSelect method--", id);
    //   console.log("Value--------> ", checkedValue.type);
    //   console.log("ID1---------->", id, checkedValue.target.value)
      this.checkedId = id;
      this.radioVal = checkedValue.target.value;
    //   console.log("ID--------------------->", this.radioVal)
  }

}