import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core';
import {ServicesService} from './services.component.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  
  encapsulation: ViewEncapsulation.None,
 
})


@Injectable({
  providedIn: 'root',
})
/**
    * @author Suchheta
    * @description  Creating and Defining Services Component
    */

export class ServicesComponent implements OnInit {
 
  //Modal
  closeResult: string;
  //modal ends
  serviceData = [];
  serviceDataAgain = [];
  temp = [];
  //pagination
  p: number = 1;
  displayTable: boolean
   = false;
  addServiceCreationData: FormGroup;
  editChosenServiceName;
  editChosenServiceVersion;
  editChosenSpareServiceName;
  editChosenSpareVersion;
  responseData;
  productIdFromProduct ;
  serviceDeleteObj;
  serviceUpdateObj ;
  organisationName;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
    private modalService: NgbModal,private servicesService:ServicesService,private _route: ActivatedRoute,
     private modalService2: NgbModal, private modalService3: NgbModal) {
    this.addServiceCreationData = this.fb.group({
      'serviceName': ['', [Validators.required]],
      'version': ['', [Validators.required]]
    })
  }


  ngOnInit() {
    this.organisationName=localStorage.getItem("organisationName");
    console.log("this.organisationName",this.organisationName);
    this._route.params.subscribe((params) => {

      this.productIdFromProduct = params['productIdFromProject'];

      console.log("productIdFromProject", params['productIdFromProject']);

    })
    
    this.displayTable = true;
    this.servicesService.getServices().then((data) => {
      console.log("data",data);
      this.serviceData=data;
    
  });
  }

   /**
     * @author Suchheta
     * @param value {productName,version}
     * @description creates a Product
     */

  ServiceCreationData(value) {
    console.log("value", value);
    var dataObj = {
      'productId':this.productIdFromProduct,
      'serviceName': value.serviceName,
      'version': value.version,
    };
    this.displayTable = true;
    this.serviceData.push(dataObj);
    this.serviceDataAgain = this.serviceData;

    this.servicesService.createService(dataObj).then((data) => {
      console.log("this.response", data);
    });

    this.addServiceCreationData.reset();
    this.modalService.dismissAll();
  }


  /**
     * @author Suchheta
     * @param value {modal id}
     * @description used to Open the Modal of Add Product.
     */
    addService(content) {
      this.modalService.open(content, { size: 'lg' });
    }

    
   /**
     * @author Suchheta
     * @param value {event}
     * @description used to Search amongst the given Product Names.
     */

  updateFilter(event) {
    this.temp = this.serviceDataAgain;
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.productName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.serviceData = temp;
    // Whenever the filter changes, always go back to the first page

  }

 
  /**
     * @author Suchheta
     * @param value {Tab - event}
     * @description used to Open the Modals.
     */

  currentJustify = 'start';
  currentOrientation = 'horizontal';
  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }

  /**
     * @author Suchheta
     * @param value {event}
     * @description used to Search amongst the given Product Names.
     */
  editServicesData(value, contentEdit) {
    console.log("Inside editProductsData ")
    console.log("data = ", value.serviceName, " , ", value.version)
    this.modalService3.open(contentEdit, { size: 'lg' });
    this.editChosenServiceName = value.serviceName;
    this.editChosenServiceVersion = value.version;
    this.editChosenSpareServiceName = value.serviceName;
    this.editChosenSpareVersion = value.version;
  }

  /**
     * @author Suchheta
     * @param value {event}
     * @description used to Search amongst the given Product Names.
     */


  ServiceEditData(serviceNameEdit , versionEdit) {
    console.log("Inside Service EditData");
    console.log("data = ", serviceNameEdit, " , ", versionEdit)
    for (var index = 0; index < this.serviceData.length; index++) {
      if (this.serviceData[index].serviceName == this.editChosenSpareServiceName) {
        this.serviceData[index].serviceName = serviceNameEdit;
        this.serviceData[index].version = versionEdit;
        console.log("this.serviceData[index] = ", this.serviceData[index])
        this.serviceUpdateObj = {
          "serviceId": this.serviceData[index].serviceId,
          "serviceName": serviceNameEdit,
          "version": versionEdit
        }
      }
    }
    this.servicesService.updateService(this.serviceUpdateObj).then((data) => {
      console.log("this.response", data);
    });
    console.log("this.serviceData = ", this.serviceData)
    this.modalService3.dismissAll();
  }
 
  /**
  *@author Suchheta
  *@param value { serviceName , version}
  *@description service to delete Services
  * */
  deleteService(value) {

    if (confirm("Are you sure you want to delete the Service ?")) {
             console.log('accepted button clicked');

    console.log("Inside Delete Project");
    console.log("Value.serviceName = ", value.serviceName)
    console.log("value.version = ", value.version)
    console.log("Project Data = ", this.serviceData)
    for (var i = 0; i < this.serviceData.length; i++) {
      if (this.serviceData[i].serviceName == value.serviceName) {
        this.serviceDeleteObj = this.serviceData[i].serviceId;
        console.log("this.projectDeleteObj = ", this.serviceDeleteObj)
      }
    }
    console.log("", this.serviceDeleteObj);
    this.servicesService.deleteServices(this.serviceDeleteObj).then((data) => {
      console.log("data",data);
      this.getData();
    });
          } else {
            console.log('decline button clicked');
          }
     


  }

  /**
   * @author Suchheta
   * @description service to get data
   */
getData(){
  this.servicesService.getServices().then((data) => {
    console.log("data",data);
    this.serviceData=data;
  });
}
}
