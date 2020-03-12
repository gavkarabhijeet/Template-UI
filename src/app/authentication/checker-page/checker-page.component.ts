import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormBuilder,

  Validators,

} from "@angular/forms";
import {
  ActivatedRoute, Router
} from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { CheckerDetailsService } from "./checker-details.service"
import { MakerService } from "../maker-page/maker-page.service";
import { config } from "config";

@Component({
  selector: "app-checker-page",
  templateUrl: "./checker-page.component.html",
  styleUrls: ["./checker-page.component.css"]
})
export class CheckerPageComponent implements OnInit {
  dataOfProductToDisplay: any;
  productToDisplay: any;
  serviceName: any;
  productImage: string;
  productId: any;
  serviceId: any;
  flagData2:any;
  dataOfProduct: any;
  dataOfService: any;
  serviceImage: string;
  showItem: boolean;
  // @HostListener('window:beforeunload', ['$event'])
  // public before() {
  //   return false
  // }
  // @HostListener('window:unload', ['$event'])
  // public after() {
  //   this.makerService.MyMethod()
  // }
  tabSet: NgbTabset;
  public navbarOpen: boolean;
  queryparamProjectId: any;
  approveData: FormGroup;
  projectName: any;
  projectVersion: any;
  productName: any;
  clientName: any;
  initiateUATFlag: any;
  radioValueArray = ['Yes', 'No'];
  userData: any;
  firstName: any;
  imageUrl=config.imageUrl;
  lastLoggedIn: Date;
  checklist=[];
  dataToDisplay =[] ;
  isReadOnly:boolean = false;
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
  displayActivities = [
    { activity: " DevOps: Code Checked-Out" },
    { activity: "DevOps: Application Deployment Unit Created" },
    { activity: "DevOps: Application Deployment Unit Configuration Updated" },
    { activity: "DevOps: Application Proxy Deployed (IBM APIC)" },
    { activity: "DevOps: Application Deployed (IBM ACE)" },
    { activity: "DevOps: Test Data Prepared" },
    { activity: "DevOps: Test Data Deployed" },
    { activity: "DevOps: Running Tests" },
    { activity: "DevOps: Test Run Completed" },
    { activity: "DevOps: Recording Test Results" }
  ];
  displayList = [
    { data: "Profunds configuration done" },
    { data: "IPS configuration done" },
    { data: "iCore configuration" },
    { data: "UAT testing completed successfully" },
    { data: "All necessary details provided are correct" },
    { data: "Tag mapping done correctly" },
    { data: "Live port opening" },
    { data: "IP whitelisting" },
    { data: "Legal documentation completed" }
  ];
  constructor(
    private makerService: MakerService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router,
    private checkerDetailsService: CheckerDetailsService,
  ) {
    this.actRoute.queryParams.subscribe(params => {
      this.queryparamProjectId = params['projectId'];
      console.log("Project id fromQuery params using ActivatedRoute ->", this.queryparamProjectId);
    });
  }
  toggleNavbar() {
  }

  ngOnInit() {
    console.log("ye hai data",this.flagData2)
    
    this.approveData = this.fb.group({
      'profundsConf': ["", [Validators.required]],
      'ipsC': ["", [Validators.required]],
      'icoreC': ["", [Validators.required]],
      'uatTest': ["", [Validators.required]],
      'allN': ["", [Validators.required]],
      'tagM': ["", [Validators.required]],
      'livePort': ["", [Validators.required]],
      'ipWhitelisting': ["", [Validators.required]],
      'legalDoc': ["", [Validators.required]],
      'Remarks1': [""],
      'Remarks2': [""],
      'Remarks3': [""],
      'Remarks4': [""],
      'Remarks5': [""],
      'Remarks6': [""],
      'Remarks7': [""],
      'Remarks8': [""],
      'Remarks9': [""]



    })
    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    this.userData = JSON.parse(localStorage.getItem("dataofUser"))
    console.log("Role of a customer",this.userData[0].roles[0]);
    this.firstName = this.userData[0].firstName
    if (localStorage.getItem("LastLoggedIn") != null) {
      this.lastLoggedIn = new Date(localStorage.getItem("LastLoggedIn"))
    }
  
    this.checkerDetailsService
      .getProjectDetails(this.queryparamProjectId)
      .then(data => {
        this.productName = data[0].productName;
        this.projectName = data[0].projectName;
        this.clientName = data[0].orgName;
        this.projectVersion = data[0].version;
        console.log("checker page data render -> ", data[0]);
        this.checkerDetailsService.getUserDetails().then(userDetails =>{
          console.log("data of user details",userDetails);
          for(var i= 0 ;i<userDetails.length;i++){
            console.log("data[0].orgName",data[0].orgName);
            console.log("userDetails[i].organisation",userDetails[i].organisation);
            if(this.queryparamProjectId == userDetails[i].projectId ){
          
                console.log("userDetails value",userDetails[i]);
                this.checkerDetailsService.getUser(userDetails[i].businessSpocUsername).then(specificDetails =>{
                  this.dataToDisplay.push(specificDetails[0]);
                  console.log("this.data to display",this.dataToDisplay);
                })
              
          
              
            }
          }
          
        })

      })
    this.checkerDetailsService
    .getProjectDetails(this.queryparamProjectId)
    .then(data => {
    
    this.dataOfProductToDisplay = data;
    this.productToDisplay = this.dataOfProductToDisplay[0];
    console.log("here",this.productToDisplay)
  
   if(this.productToDisplay.status == "Ready for Production Verified"){
     this.isReadOnly=true;
     this.showItem=true;
   }
    console.log("productsToDisplay",this.productToDisplay);
    this.productId = this.productToDisplay.products[0].productId;
      this.serviceId = this.productToDisplay.products[0].services[0].serviceId;
      
      this.checkerDetailsService
      .getProductDetails(this.productId)
      .then(data => {
      this.dataOfProduct = data;
      
      this.productName = this.dataOfProduct[0].productName;
      this.productImage =
      this.imageUrl + "Images/Products/" + data[0].fileName;
     
      this.checkerDetailsService
      .getServiceDetails(this.serviceId)
      .then(data => {
      this.dataOfService = data;
     
      this.serviceName = data[0].serviceName;
      this.serviceImage =
      this.imageUrl + "Images/Services/" + data[0].fileName;
      });
      });
  
    });
  
  
   
  }
  submitProductionDetails() {
    this.initiateUATFlag = "true";
    console.log(this.initiateUATFlag);
    let user_details = JSON.parse(localStorage.getItem('dataofUser'));
    console.log("user_details", user_details[0].username);
    // var profun =this.approveData.get('profundsConf').value
    // console.log("demo data",profun)
    let flagData = {
      "projectId": this.queryparamProjectId,
      "status": "Ready for Production Verified",
      "username": user_details[0].username,
      "orgName": user_details[0].organisation,
      "profun":this.approveData.get('profundsConf').value,
      "IPSconfig":this.approveData.get('ipsC').value,
      "iCOreconfig":this.approveData.get('icoreC').value,
      "UATtest":this.approveData.get('uatTest').value,
      "alldetails":this.approveData.get('allN').value,
      "map":this.approveData.get('tagM').value,
      "liveport":this.approveData.get('livePort').value,
      "IPwhite":this.approveData.get('ipWhitelisting').value,
      "documents":this.approveData.get('legalDoc').value,
      "remark1":this.approveData.get('Remarks1').value,
      "remark2":this.approveData.get('Remarks2').value,
      "remark3":this.approveData.get('Remarks3').value,
      "remark4":this.approveData.get('Remarks4').value,
      "remark5":this.approveData.get('Remarks5').value,
      "remark6":this.approveData.get('Remarks6').value,
      "remark7":this.approveData.get('Remarks7').value,
      "remark8":this.approveData.get('Remarks8').value,
      "remark9":this.approveData.get('Remarks9').value





    }
    console.log("Update data -> ", flagData);
    // this.flagData2=flagData;
    // console.log("ye hai data 2",this.flagData2)
    this.checkerDetailsService.updateProjectData(flagData).then(async data => {
      console.log("Update data in checker page-> ", data);

    })
    // alert("Production details verified.")
    if(this.userData[0].roles[0] == "checker"){
    
      this.router.navigate(["/authentication/Checker"])

    }
    else if(this.userData[0].roles[0] == "CMS_Ops"){
      this.router.navigate(['/cms/production']);
    }  
    // this.myProfileService.getApp(this.queryparamProjectId).then(async data => {
    //   data[0].flag="Ready for prod deployment"
    //   console.log("Getting application details with flag -> ",data);
    // });

  }
  valChange(index, $event) {

    if (index == "1") {
      console.log("Test value -> ", index, $event.target.value);

    } else if (index == "2") {
      console.log("Test value -> ", index, $event.target);

    } else if (index == "3") {

    } else if (index == "4") {

    } else if (index == "5") {

    } else if (index == "6") {

    } else if (index == "7") {

    } else if (index == "8") {

    }
  }
  backToOriginalPage(){
    if(this.userData[0].roles[0] == "checker"){
    
      this.router.navigate(["/authentication/Checker"])

    }
    else if(this.userData[0].roles[0] == "CMS_Ops"){
      this.router.navigate(['/cms/production']);
    }  
  }
  logout() {
    this.checkerDetailsService.logout(this.userData).then(logout => {
      console.log("logout", logout);
      localStorage.clear();
      this.router.navigateByUrl('/authentication/Home');
    })
  }
  jump(){
    if(this.userData[0].roles[0] == "checker"){
    
      this.router.navigate(["/authentication/Checker"])

    }
    else if(this.userData[0].roles[0] == "CMS_Ops"){
      this.router.navigate(['/cms/production']);
    } 
  }

}
