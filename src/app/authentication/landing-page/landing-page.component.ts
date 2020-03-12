import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationComponent } from '../../shared/header-navigation/navigation.component';
import { Router } from '@angular/router';
import { config } from "config";
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {LandingService} from './landing-page.service';
import { local } from 'd3';
const baseUrl: string = config.url;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  changeColor: Boolean;
  changeColorSignUp: Boolean;
  public config: PerfectScrollbarConfigInterface = {};
  eCollection;
  iSurePay;
  signUpPath;
  loginPath;
  eCollectionPath;
  isurePayPath;
  productName;
  productData;
  imagePath;
  public navbarOpen:boolean;


  constructor(public router: Router,private landingService:LandingService) {
    this.changeColor = false;
    this.changeColorSignUp = false;
  }

  tabStatus = 'justified';

  public isCollapsed = false;
  productID;
  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;
  public loggedUserName: any;

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

    ngOnInit() {
    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    this.landingService.getProducts().then((data)=>{
     this.productData=data;
     console.log("this.productData",this.productData);
    })
  }
  Logo() {
    this.expandLogo = !this.expandLogo;
  }
  eCollectionClicked(data) {
    if(data.productName === "ECollection")
    {
      this.productName = "ECollection";
      this.productID=data.productId;
      localStorage.setItem("productId",this.productID);
      this.router.navigate(['/authentication/Data1']);
    }
    else if(data.productName === "iSurePay"){
      this.productName = "iSurePay";
      this.productID=data.productId;
      localStorage.setItem("productId",this.productID);
      this.router.navigate(['/authentication/Data2']);
    }
   
  }
  toggleSidebarType(){}
  registerClicked() {
    console.log("this.productName", this.productName);
    if (this.productName == undefined) {
      if (confirm("Product Should be selected")) {
      }
    }
    else {
      this.router.navigate(['/authentication/signup']);
    }
  }
}
