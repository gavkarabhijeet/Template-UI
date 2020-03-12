import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core';
import { ProductsService } from './product-data.component.service';
import * as $ from "jquery";
import { data } from '../mapping/mapping-table';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
    * @author Suchheta
    * @description  Creating and Defining Products Component
    */
export class ProductDataComponent implements OnInit {

  //Modal
  closeResult: string;
  //modal ends
  productData = [];
  productDataAgain = [];
  temp = [];
  //pagination
  p: number = 1;
  displayTable: boolean = false;
  addProductCreationData: FormGroup;
  editChosenProductName;
  editChosenProductVersion;
  editChosenSpareProductName;
  editChosenSpareVersion;
  notMatchedData
  dataUploaded
  uploadedData
  productAttachedFlow
  projectData;
  responseGet
  isDataEmpty: Boolean = false;
  displaySearch: Boolean = false;
  displayStatus: Boolean = false;
  displayCheckBox: Boolean = false;
  displayTab: Boolean = false;
  productIdFromProject;
  createResponse;
  updateResponse;
  deleteResponse;
  getProductByIdResponse;
  deleteId;
  updateObj;
  organisationName;
  sequenceIdFromProduct;
  getResponse = [];
  fromProjects;
  selectedProduct = [];
  obj = [];
  projectDataMultiSelect;
  showButton;
  finalSubmit: Boolean = true;
  unCheckedProduct = [];
  projectId;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private spinner: NgxSpinnerService,
    private modalService: NgbModal, private modalService2: NgbModal, private modalService3: NgbModal,
    public ProductDataService: ProductsService, private _route: ActivatedRoute) {
    this.addProductCreationData = this.fb.group({
      'productName': ['', [Validators.required]],
      'version': ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.finalSubmit = true;
    this.displayTable = true;
    this.organisationName = localStorage.getItem("organisationName");
    console.log("this.organisationName", this.organisationName);
    this._route.params.subscribe((params) => {
      this.productIdFromProject = params['productIdFromProject'];
      this.projectId = params['productIdFromProject'];
      this.fromProjects = params['fromProjects'];
      this.showSpinner();
      this.getAllProducts();
    })
  }



  showSpinner() {
    this.spinner.show();
  }
  /**
   * @author Sanchita
   * @description This function is called everytime to get all the products in database
   */
  getAllProducts() {
    this.ProductDataService.getAllProducts().then((data) => {
      this.getResponse = data;
     
      console.log("this.getResponse",this.getResponse);
      if (this.getResponse.length !== 0 && this.fromProjects == "true") {
        this.ProductDataService.getProjectData(this.productIdFromProject).then((data) => {
          this.projectData = data;
          if (this.projectData[0].products.length == 0) {
            this.uploadedData = [];
            for (var i = 0; i < this.getResponse.length; i++) {
              this.uploadedData.push(this.getResponse[i])
            }
            this.finalSubmit = true;
            this.showButton = true;
            this.displayTable = true;
            this.displayCheckBox = true;
            this.spinner.hide();
          }
          else {
            this.getDataOnInit();
          }
        });
      }
      else if (this.fromProjects == undefined) {
        this.uploadedData = [];
        for (var i = 0; i < this.getResponse.length; i++) {
          this.uploadedData.push(this.getResponse[i])
        }
        this.showButton = false;
        this.displayTable = true;
        this.displaySearch = false;
        this.displayCheckBox = false;
        this.spinner.hide();
      }
    })
  }
  /**
   * @author Sanchita
   * @param value{data,event} 
   * @description This function is called on checkbox click and gets the number of products added
   */
  onSelectedCheckBox(data, event) {
    this.selectedProduct = [];
    console.log("data", data);
    console.log("event", event);
    this.selectedProduct.push(data);
    console.log("this.selectedData", this.selectedProduct);
    if (this.selectedProduct.length !== 0) {
      this.finalSubmit = false;
    }
    else {
      this.finalSubmit = true;
    }
    // --------------------- Code for multiple selection of products
    // console.log("event", event.currentTarget.checked);
    // if (event.currentTarget.checked == true) {
    //   this.selectedProduct.push(data);
    //   console.log("this.selectedProduct", this.selectedProduct);
    //   if (this.selectedProduct.length !== 0) {

    //     this.finalSubmit = false;
    //   }
    //   else {
    //     this.finalSubmit = true;
    //   }
    // }
    // else if (event.currentTarget.checked == false) {
    //   for (var i = 0; i < this.selectedProduct.length; i++) {
    //     if (this.selectedProduct[i].productId == data.productId) {
    //       this.selectedProduct.splice(i);
    //       console.log("this.selectedProduct", this.selectedProduct);
    //     }
    //     if (this.selectedProduct.length !== 0) {

    //       this.finalSubmit = false;
    //     }
    //     else {
    //       this.finalSubmit = true;
    //     }
    //   }
    // }
  }
  /**
   * @author Sanchita
   * @description This function is a desscion making and called on submit button to know which of the service should be called on the basis of the number of products selected
   */
  submitProduct() {
    console.log("this.selectedProduct", this.selectedProduct);
    for (var i = 0; i < this.selectedProduct.length; i++) {
      if (this.selectedProduct.length == 1) {
        this.ProductDataService.addProductIdInProject(this.selectedProduct[i].productId, this.productIdFromProject).then((data) => {
          this.getDataOnInit();
          console.log("data", data);
        });
      }
      else {
        this.obj.push(this.selectedProduct[i].productId);
        console.log("--------", this.obj);
        this.ProductDataService.addProductIdInProjectMultiple(this.obj, this.productIdFromProject).then((data) => {
          console.log("data", data);
        });
        this.getMultipleData();
      }
    }
  }
  /**
   * @author Sanchita 
   * @description  This function will be called if the user comes from projects 
   */
  getSelectedProducts() {
    this.productData = [];
    this.notMatchedData = [];
    this.dataUploaded = [];
    this.uploadedData = [];
    this.productAttachedFlow = '';
    this.ProductDataService.getProjectData(this.productIdFromProject).then((data) => {
      this.projectData = data;
      for (var i = 0; i < this.projectData.length; i++) {
        for (var j = 0; j < this.projectData[i].products.length; j++) {
          this.productAttachedFlow = this.projectData[i].products[j];

          this.ProductDataService.getAllProducts().then((data) => {
            this.responseGet = data;
            if (this.responseGet.length == 0) {
              this.isDataEmpty = true;
              this.showButton = false;
              this.displayTable = false;
              this.displaySearch = false;
            }
            else {

              this.isDataEmpty = false;
              this.showButton = true;
              this.displaySearch = true;
              this.displayTable = true;
              for (var i = 0; i < this.responseGet.length; i++) {
                if (this.productAttachedFlow == this.responseGet[i].productId) {
                  this.uploadedData.push(this.responseGet[i]);
                  console.log("this.uploadedData---------------", this.uploadedData);
                  let unique_array = [];
                  this.uploadedData.map(function (item) {
                    var existItem = unique_array.find(x => x.productId == item.productId);
                    if (existItem) { } else {
                      unique_array.push(item);
                    }
                  });
                  this.uploadedData = unique_array
                }
                else {
                  this.notMatchedData.push(this.responseGet[i]);
                  console.log("this.notMatched-------->", this.notMatchedData);
                }
              }
              for (var i = 0; i < this.notMatchedData.length; i++) {
                this.uploadedData.push(this.notMatchedData[i]);
                let unique_array = [];
                this.uploadedData.map(function (item) {
                  var existItem = unique_array.find(x => x.productId == item.productId);
                  if (existItem) { } else {
                    unique_array.push(item);
                  }
                });
                this.uploadedData = unique_array
              }
            }
            for (var i = 0; i < this.projectData.length; i++) {
              if (this.projectData[i].products.length == 0) {
                for (var i = 0; i < this.notMatchedData.length; i++) {
                  this.uploadedData.push(this.notMatchedData[i]);
                  this.displayStatus = false;
                  this.displayCheckBox = true;
                }
              }
              else {
                this.displayCheckBox = false;
                this.displayStatus = true;
              }
            }
            if (this.fromProjects == "true") {
              this.displayTable = true;
              this.showButton = true;
            }
            else if (this.fromProjects == undefined) {
              this.displayTable = false;
              this.showButton = false;
              for (var i = 0; i < this.notMatchedData.length; i++) {
                this.uploadedData.push(this.notMatchedData[i]);
              }
            }
          });
        }
      }
    });
  }
  /**
   * @author Sanchita 
   * @description This function is called by the submit button function to show both the selected products
   */
  getMultipleData() {
    this.productData = [];
    this.notMatchedData = [];
    this.dataUploaded = [];
    this.uploadedData = [];
    this.productAttachedFlow = '';
    this.ProductDataService.getProjectData(this.productIdFromProject).then((data) => {
      this.projectData = data;
      for (var i = 0; i < this.projectData.length; i++) {
        for (var j = 0; j < this.projectData[i].products.length; j++) {
          this.productAttachedFlow = this.projectData[i].products[j];
          this.ProductDataService.getAllProducts().then((data) => {
            this.responseGet = data;
            if (this.responseGet.length == 0) {
              this.isDataEmpty = true;
              this.showButton = false;
              this.displayTable = false;
              this.displaySearch = false;
            }
            else {
              this.isDataEmpty = false;
              this.showButton = true;
              this.displaySearch = true;
              this.displayTable = true;
              for (var i = 0; i < this.responseGet.length; i++) {
                if (this.productAttachedFlow == this.responseGet[i].productId) {
                  this.uploadedData.push(this.responseGet[i]);
                  console.log("this.uploadedData---------------", this.uploadedData);
                }
                else {
                  this.notMatchedData.push(this.responseGet[i]);
                  console.log("this.notMatched-------->", this.notMatchedData);
                }
              }
              for (var i = 0; i < this.notMatchedData.length; i++) {
                this.uploadedData.push(this.notMatchedData[i]);
                let unique_array = [];
                this.uploadedData.map(function (item) {
                  var existItem = unique_array.find(x => x.productId == item.productId);
                  if (existItem) { } else {
                    unique_array.push(item);
                  }
                });
                this.uploadedData = unique_array
              }
            }
            for (var i = 0; i < this.projectData.length; i++) {
              if (this.projectData[i].products.length == 0) {
                for (var i = 0; i < this.notMatchedData.length; i++) {
                  this.uploadedData.push(this.notMatchedData[i]);
                  this.displayStatus = false;
                  this.displayCheckBox = true;
                  this.showButton=true;
                }
              }
              else {
                this.displayCheckBox = false;
                this.displayStatus = true;
                this.showButton=false;
              }
            }
            if (this.fromProjects == "true") {
              this.displayTable = true;
              // this.showButton = true;
            }
            else if (this.fromProjects == undefined) {
              this.displayTable = false;
              // this.showButton = false;
              for (var i = 0; i < this.notMatchedData.length; i++) {
                this.uploadedData.push(this.notMatchedData[i]);
              }
            }
          });
        }
      }
    });
  }
  /**
   * @author Sanchita 
   * @description  This function is called on page load event and will bifercate the display on the basis of length of the products in projects
   */
  getDataOnInit() {
    this.productData = [];
    this.notMatchedData = [];
    this.dataUploaded = [];
    this.uploadedData = [];
    this.productAttachedFlow = '';
    this.isDataEmpty = false;
    this.displayTable = true;
    this.ProductDataService.getProjectData(this.productIdFromProject).then((data) => {
      this.projectData = data;
      if (this.projectData[0].products.length == 0) {
        this.isDataEmpty = false;
        this.displaySearch = true;
        this.displayTable = true;
        this.displayTab = true;
      }
      else {
        for (var i = 0; i < this.projectData.length; i++) {
          for (var j = 0; j < this.projectData[i].products.length; j++) {
            this.productAttachedFlow = this.projectData[i].products[j];
            if (this.projectData[0].products.length === 1) {
              this.ProductDataService.getAllProducts().then((data) => {
                this.responseGet = data;
                if (this.responseGet.length == 0) {
                  this.isDataEmpty = true;
                  this.displayTable = false;
                  this.displaySearch = false;
                }
                else {
                  this.isDataEmpty = false;
                  this.displaySearch = true;
                  this.displayTable = true;
                  for (var i = 0; i < this.responseGet.length; i++) {
                    if (this.productAttachedFlow == this.responseGet[i].productId) {
                      this.uploadedData.push(this.responseGet[i]);
                      console.log("this.uploadedData---------------", this.uploadedData);
                    }
                    else {
                      this.notMatchedData.push(this.responseGet[i]);
                      console.log("this.notMatched-------->", this.notMatchedData);
                    }
                  }
                }
                for (var i = 0; i < this.projectData.length; i++) {
                  if (this.projectData[i].products.length == 0) {
                    for (var i = 0; i < this.notMatchedData.length; i++) {
                      this.uploadedData.push(this.notMatchedData[i]);
                      this.displayStatus = false;
                      this.displayCheckBox = true;
                      this.showButton=true;
                      console.log("this.notMatched--------", this.uploadedData);
                    }
                  }
                  else {
                    this.showButton=false;
                    this.displayCheckBox = false;
                    this.displayStatus = true;
                    // this.spinner.hide();

                  }
                }
                if (this.fromProjects == "true") {
                  this.displayTable = true;
                  // this.showButton = true;
                }
                else if (this.fromProjects == undefined) {
                  this.displayTable = false;
                  this.showButton = false;
                  for (var i = 0; i < this.notMatchedData.length; i++) {
                    this.uploadedData.push(this.notMatchedData[i]);
                  }
                }
              });
            }
            else {
              this.ProductDataService.getProjectData(this.productIdFromProject).then((data) => {
                this.projectData = data;
                for (var i = 0; i < this.projectData.length; i++) {
                  for (var j = 0; j < this.projectData[i].products.length; j++) {
                    this.productAttachedFlow = this.projectData[i].products[j];
                    this.ProductDataService.getAllProducts().then((data) => {
                      this.responseGet = data;
                      if (this.responseGet.length == 0) {
                        this.isDataEmpty = true;
                        this.showButton = false;
                        this.displayTable = false;
                        this.displaySearch = false;
                      }
                      else {
                        this.isDataEmpty = false;
                        // this.showButton = true;
                        this.displaySearch = true;
                        this.displayTable = true;
                        for (var i = 0; i < this.responseGet.length; i++) {
                          if (this.productAttachedFlow == this.responseGet[i].productId) {
                            this.uploadedData.push(this.responseGet[i]);
                            console.log("this.uploadedData---------------", this.uploadedData);
                            let unique_array = [];
                            this.uploadedData.map(function (item) {
                              var existItem = unique_array.find(x => x.productId == item.productId);
                              if (existItem) { } else {
                                unique_array.push(item);
                              }
                            });
                            this.uploadedData = unique_array
                          }
                          else {
                            this.notMatchedData.push(this.responseGet[i]);
                            console.log("this.notMatched-------->", this.notMatchedData);
                          }
                        }
                        for (var i = 0; i < this.notMatchedData.length; i++) {
                          this.uploadedData.push(this.notMatchedData[i]);
                          let unique_array = [];
                          this.uploadedData.map(function (item) {
                            var existItem = unique_array.find(x => x.productId == item.productId);
                            if (existItem) { } else {
                              unique_array.push(item);
                            }
                          });
                          this.uploadedData = unique_array
                        }
                      }
                      for (var i = 0; i < this.projectData.length; i++) {
                        if (this.projectData[i].products.length == 0) {
                          for (var i = 0; i < this.notMatchedData.length; i++) {
                            this.uploadedData.push(this.notMatchedData[i]);
                            this.displayStatus = false;
                            this.displayCheckBox = true;
                            this.showButton=true;
                          }
                        }
                        else {
                          this.showButton=false;
                          this.displayCheckBox = false;
                          this.displayStatus = true;
                        }
                      }
                      if (this.fromProjects == "true") {
                        this.displayTable = true;
                        // this.showButton = true;
                      }
                      else if (this.fromProjects == undefined) {
                        this.displayTable = false;
                        this.showButton = false;
                        for (var i = 0; i < this.notMatchedData.length; i++) {
                          this.uploadedData.push(this.notMatchedData[i]);
                        }
                      }
                    });
                  }
                }
              });
              }
          }
        }
      }
      this.spinner.hide();
    });
  }

  /**
    * @author Suchheta
    * @param value {productName,version}
    * @description creates a Product
    */

  productCreationData(value) {
    console.log("Inside productCreationData, value", value);
    var data = {
      'projectId': this.productIdFromProject,
      'productName': value.productName,
      'version': value.version,
      'flows':[]
    };
    this.displayTable = true;
    this.createProductService(data);
    console.log("this.productData after createProductService =", this.productData)
    this.productDataAgain = this.productData;
    this.addProductCreationData.reset();
    this.modalService.dismissAll();
  }
  /**
     * @author Suchheta
     * @param value {modal id}
     * @description used to Open the Modal of Add Product.
     */
  addProduct(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  /**
    * @author Suchheta
    * @param value {event}
    * @description used to Search amongst the given Product Names.
    */
  updateFilter(event) {
    this.temp = this.productDataAgain;
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.productName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.productData = temp;
  }

  // Project Table
  viewServices(value, index) {
    for (var i = 0; i < this.productData.length; i++) {

      if (this.productData[i].projectName == value.projectName) {
        this.productIdFromProject = this.productData[i].projectId
      }
    }
    console.log("Inside view Products, Id = ", index);
    console.log(" this.productIdFromProject = ", this.productIdFromProject)
    console.log("Inside view Flow, Id = ", index);
    this.router.navigate(['/ProjectData/ServiceData', { productIdFromProject: this.productIdFromProject }]);
  }

  /**
     * @author Suchheta
     * @param value {modal id and projectName and Version}
     * @description used to Open the Modal of Edit Product.
     */
  editProduct(data, contentUpload) {
    this.modalService2.open(contentUpload, { size: 'lg' });
  }

  // Tab
  currentJustify = 'start';
  currentOrientation = 'horizontal';
  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }


  //File
  filesToUpload: Array<File> = [];
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  submitFile() {
    const files: Array<File> = this.filesToUpload;
    var checkFileName = files[0].name;
    console.log(" inside upload, this.checkFileName = ", checkFileName);
  }
  //File ends

  //Url
  submitUrl(requestUrl) {
    console.log("Inside submitUrl")
    console.log("requestUrl", requestUrl)
  }
  //Url ends 

  //JSON
  submitJson(requestJSON) {
    console.log("Inside submitJson");
    console.log("requestJSON = ", requestJSON)
  }
  //JSON ends 


  //Edit project Data 
  editProductsData(value, contentEdit) {
    console.log("Inside editProductsData ")
    console.log("data = ", value.productName, " , ", value.version)
    this.modalService3.open(contentEdit, { size: 'lg' });
    this.editChosenProductName = value.productName;
    this.editChosenProductVersion = value.version;
    this.editChosenSpareProductName = value.productName;
    this.editChosenSpareVersion = value.version;
  }


  productEditData(productNameEdit, versionEdit) {

    console.log("Inside ProductEditData");
    console.log("data = ", productNameEdit, " , ", versionEdit)
    for (var index = 0; index < this.productData.length; index++) {
      if (this.productData[index].productName == this.editChosenSpareProductName) {
        this.productData[index].productName = productNameEdit;
        this.productData[index].version = versionEdit;
        console.log("this.productData[index] = ", this.productData[index])

        this.updateObj = {

          "productName": productNameEdit,
          "productId": this.productData[index].productId,
          "version": versionEdit
        }
      }
    }


    this.editProductService(this.updateObj);

    console.log("this.productData = ", this.productData)
    this.modalService3.dismissAll();
  }


  //Delete
  async deleteProduct(value) {

    console.log("Inside Delete Project");
    console.log("value.projectName = ", value.productName)
    console.log("value.version = ", value.version)
    console.log("Project Data = ", this.productData)

    for (var i = 0; i < this.productData.length; i++) {
      if (this.productData[i].productName == value.productName) {
        this.deleteId = this.productData[i].productId;
      }

    }
    console.log("this.deleteId = ", this.deleteId)
    await this.deleteProductService(this.deleteId);
    // this.productData = this.productData.filter(order => order.productName !== value.productName)
    // this.productDataAgain = this.productData;
    console.log("Project Data = ", this.productData)


    if (this.productData.length == 0) {
      this.displayTable = false;
    }

  }

  viewFlow(value, index) {
    console.log("value",value);
    for (var i = 0; i < this.productData.length; i++) {
      if (this.productData[i].productName == value.productName) {
        this.sequenceIdFromProduct = this.productData[i].productId
      }
    }
    console.log(" this.productIdFromProject = ", this.sequenceIdFromProduct)
    console.log("Inside view Flow, Id = ", index);
    console.log("-------------",this.uploadedData[0].productId )
    this.router.navigate(['/ProjectData/SequencesDiagram', { projectId:this.projectId,fromProducts:true,productId: value.productId}]);
  }

  createProductService(dataObj) {
    this.ProductDataService.createProduct(dataObj).then((data) => {
      this.createResponse = data;
      console.log("this.response", data);
      this.getAllProducts();
    })
  }


  editProductService(productUpdateObj) {
    this.ProductDataService.updateProduct(productUpdateObj).then((data) => {
      this.updateResponse = data;
      console.log("this.updateResponse", data);
    })
  }

  deleteProductService(productDeleteObj) {
    console.log("Inside  deleteProductService")
    this.ProductDataService.deleteProduct(productDeleteObj).then((data) => {
      this.deleteResponse = data;
      console.log("this.deleteResponse", data);
      this.getProductByProjectIdService(this.productIdFromProject)
    })

  }

  getProductByProductIdService(productId) {

    this.ProductDataService.getProductByProductId(productId).then((data) => {
      this.getProductByIdResponse = data;
      console.log("this.getProductByIdResponse", data);


      if (this.getProductByIdResponse.length == 0) {
        this.displayTable = false;
      }

      else {
        this.productData = [];
        for (var i = 0; i < this.getProductByIdResponse.length; i++) {

          this.productData.push({ projectId: this.getProductByIdResponse[i].projectId, productId: this.getProductByIdResponse[i].productId, productName: this.getProductByIdResponse[i].productName, version: this.getProductByIdResponse[i].version })
          this.productDataAgain = this.productData;
        }
        this.displayTable = true;
        console.log(" this.productData = ", this.productData)
      }

    })


  }

  getProductByProjectIdService(projectId) {

    this.ProductDataService.getProductByProjectId(projectId).then((data) => {
      this.getProductByIdResponse = data;
      console.log("this.getProductByIdResponse", data);

      if (this.getProductByIdResponse.length == 0) {
        this.displayTable = false;
      }
      else {
        this.productData = [];
        for (var i = 0; i < this.getProductByIdResponse.length; i++) {

          this.productData.push({ projectId: this.getProductByIdResponse[i].projectId, productId: this.getProductByIdResponse[i].productId, productName: this.getProductByIdResponse[i].productName, version: this.getProductByIdResponse[i].version })
          this.productDataAgain = this.productData;
        }
        this.displayTable = true;
        console.log(" this.productData = ", this.productData)
      }
      console.log("ProductData = ", this.productData)
    })
  }
}
