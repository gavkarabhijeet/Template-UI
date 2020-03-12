import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { ProductPageService } from "./product-page.service";
import { Router } from "@angular/router";

const baseUrl: string = config.url;
import { config } from "config";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ProductPageComponent implements OnInit {
  imageDetails: any;
  imageName: any;
  imagePath;
  productId;
  productName;
  description;
  data;
  productData;
  dropdownData = [];
  pushedData = [];
  serviceData;
  public navbarOpen:boolean;
  serviceName:any;
  dataFormatted: any[];
  productDescription;
  configURL = config.url;
  imageUrl = config.imageUrl;
  browserValue;
  slides = [
    { img: "/assets/E-collection/Ecollection-Seqdiagrams-1.jpg" },
    { img: "/assets/E-collection/Ecollection-Seqdiagrams-2.jpg" },
    { img: "/assets/E-collection/Ecollection-Seqdiagrams-3.jpg" },
    { img: "/assets/isurePay/isurePay-seqdiagram-1.jpg" }
  ];

  public slideConfig = {
    dots: false,
    infinite: false,
    speed: 300,
    nextArrow: '<div class="productNav-btn next-slide"></div>',
    prevArrow: '<div class="productNav-btn prev-slide"></div>',
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,

    responsive: [
      {
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
  imageData: any;
  displayService: any;
  selectedService = "undefined";
  constructor(
    private router: Router,
    private productPageService: ProductPageService
  ) {
    // config.interval = 10000;
    // config.wrap = true;
    // config.keyboard = true;
    // config.showNavigationIndicators = false;
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

  /**
   * updated by kuldeep
   * @description:Assigned product description to productDescription variable
   */
  onChange(data) {
    
    this.displayService = data;
    if (data == "undefined") {
      this.productDescription = undefined;
      this.selectedService = "undefined";

    }
    for (var i = 0; i < this.productData.length; i++) {
      if (data === this.productData[i].serviceName) {
        // console.log(
        //   "this.productData[i].description: ",
        //   this.productData[i].description
        // );
        this.selectedService = this.productData[i].serviceName;
        this.serviceData = JSON.stringify(this.productData[i]);
        this.productDescription = this.productData[i].description;
        localStorage.setItem("serviceName", this.serviceData);
        this.imagePath =
          this.imageUrl + "Images/Services/" + this.productData[i].fileName;
      }
    }
  }
  /** */

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
    ngOnInit() {
    //for disabling back button
    window.history.pushState(null, "", window.location.href);
    this.browserValue=localStorage.getItem("displayFlag1");
    console.log("this.browserValue",this.browserValue);
    this.productId = localStorage.getItem("productId");
    this.productName = localStorage.getItem("productName");
    this.description = localStorage.getItem("description");
    this.imageData = JSON.parse(localStorage.getItem("productData"));
    this.productPageService.getService().then(data => {
      this.productData = data;
      console.log("PRINT : PRODUCT DATA", this.productData);
      for (var i = 0; i < this.productData.length; i++) {
        if (this.productId === this.productData[i].productId) {
          this.dropdownData.push(this.productData[i]);
        }
      }
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
      // console.log("data", this.dataFormatted);
    });
  }

  subscribeNow(){
    if(this.serviceData!=undefined || this.serviceData!='' || this.serviceData!=null){
      var value = confirm("Please select a flow before going to next Tab");
    } else {
    this.router.navigate(['/authentication/appDetails'])
    }
  }

  onClick() {
    let selectedData = undefined;
    selectedData = this.selectedService;
    // console.log("data",selectedData)
    if (selectedData == "undefined") {
      alert("Please select a Feature before proceeding ahead, thanks!.");
    } else {
      this.router.navigateByUrl("/authentication/appDetails");
      // console.log("Flow Name ", selectedData);
    }
  }

  addSlide() {
    // this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    // this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    // console.log("slick initialized");
  }

  breakpoint(e) {
    // console.log("breakpoint");
  }

  afterChange(e) {
    // console.log("afterChange");
  }

  beforeChange(e) {
    // console.log("beforeChange");
  }
}
