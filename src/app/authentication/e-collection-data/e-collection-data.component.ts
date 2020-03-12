import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from "config";
import {ECollectionService} from './e-collection-data.service';
const baseUrl: string = config.pageUrl;
@Component({
  selector: 'app-e-collection-data',
  templateUrl: './e-collection-data.component.html',
  styleUrls: ['./e-collection-data.component.css']
})
export class ECollectionDataComponent implements OnInit {
  productName;
  productId;
  imageDetails = [];
  signUpPath;
  signUp;
  loginPath;
  public navbarOpen:boolean;
  isCollapsed:boolean;
  changeColorSignUp:boolean;
  changeColor:boolean;
  constructor(private router: Router,private eCollectionService:ECollectionService) { }

    ngOnInit() {
    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    this.productId=localStorage.getItem("productId");
    console.log("productId",this.productId);
    this.eCollectionService.getServiceData().then((data)=>{
      console.log("data",data);
    })

    this.signUpPath=baseUrl+"authentication/signup";
    this.loginPath=baseUrl+"authentication/login";
    
    this.imageDetails = [
    {"imageName":"1. ECollection intimation","imagePath":"assets/E-collection/Ecollection-Seqdiagrams-1.jpg"},
    { "imageName":"2. ECollection with remitter validation","imagePath":"assets/E-collection/Ecollection-Seqdiagrams-2.jpg"}, 
    {"imageName":"3. ECollection with remitter validation in intermediary account","imagePath":"assets/E-collection/Ecollection-Seqdiagrams-3.jpg"},
    { "imageName":"4. ECollection with two level validation at Bank and Client’s end","imagePath":"assets/E-collection/Ecollection-Seqdiagrams-4.jpg"},
    { "imageName":"6. MIS","imagePath":"assets/E-collection/Ecollection-Seqdiagrams-5.jpg"}]
  }
  /**
   * @author Sanchita
   * @param data 
   * @description This function will be called to get the data selected and to go to register page
   */
  dataSelected(data){
    console.log("-------------------",data);
  this.router.navigate(['authentication/signup']);
  }
  toggleSidebarType(){}
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
  /**
    * @author Sanchita
    * @description This function will be called on click of back button
    */
  backbutton() {
    this.router.navigate(['/authentication/landingPage']);
  }
  /**
   * @author Sanchita
   * @description This function will be called on click of proceed button
   */
  proceedButton() {
    localStorage.setItem("productName", "eCollection");
    this.router.navigate(['/authentication/Flows']);
  }
}
