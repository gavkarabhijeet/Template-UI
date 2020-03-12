import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SequenceDiagramService } from './sequence-diagram.service';
import { thresholdFreedmanDiaconis } from 'd3';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sequence-diagram',
  templateUrl: './sequence-diagram.component.html',
  styleUrls: ['./sequence-diagram.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SequenceDiagramComponent implements OnInit {
  addFlowData: FormGroup;
  flowData = [];
  flowDataAgain = [];
  temp = [];
  response;
  dataObj;
  responseGet;
  responseGetSelected = [];;
  responseGetUnSelected = [];
  editChosenFlowName;
  editChosenFile;
  editChosenSpareFlowName;
  editChosenSpareFile;
  sequenceId;
  projectId;
  displaySelected: boolean = false;
  displayUnSelected: boolean = false;
  mySelected = false;
  organisationName;
  uploadedData = [];
  notMatchedData = [];
  dataUploaded = [];
  data = [];
  fromProjectsSelection: boolean = false;
  fromProjects;
  isDataEmpty: Boolean = false;
  displaySearch: Boolean;
  projectData;
  projectAttachedFlow;
  showButton;
  displayStatus: Boolean = false;
  displayRadio: Boolean = false;
  finalSubmit: Boolean = true;
  selectedFlow = [];
  fromProducts;
  productId;
  productData = [];
  flowIdFromProduct;
  productName;
  segreggateArray = [];
  globalArray = [];
  dataOfProject;
  dataOfProduct = []
  dataOfFlows = [];
  selectedFlowsForMultiple = [];
  obj = [];
  displayMultipleUnselected1: Boolean = false;
  displayMultipleUnselected2: Boolean = false;

  //textboxes

  validatorData
  status: boolean = false

  // . ['GET', 'POST', 'PUT', 'DELETE'];
  tab: string[] = ['Authorization', 'Headers', 'Body', 'Response'];
  selectedwallet = this.tab[0];

  //textboxes
  methods = [];
  passHeaderUrl: boolean = false;
  headerName = [];
  containers = [];
  addContainer: boolean = false;
  addMore: boolean = true;
  clickAgain: boolean = true;
  firstApiMining;
  showButtonT: boolean = true;
  statusT: boolean = false;

  clientCode;
  formatCode;

  constructor(private fb: FormBuilder, private http: HttpClient, private spinner: NgxSpinnerService, private router: Router, private sequenceService: SequenceDiagramService,
    private modalService: NgbModal, private modalService3: NgbModal, private modalService2: NgbModal,
    private _route: ActivatedRoute) {
    this.addFlowData = this.fb.group({
      'flowName': ['', [Validators.required]],
      'file': ['', [Validators.required]]
    })
  }
  ngOnInit() {

    //ORIGINAL

    // this.organisationName = localStorage.getItem("organisationName");
    // this._route.params.subscribe((params) => {
    //   this.projectId = params['projectId'];
    //   this.fromProducts = params['fromProducts']
    //   this.fromProjects = params['fromProjects'];
    //   this.productId = params['productId'];
    //   console.log("this.productData", this.productId);
    //   console.log("this.projectId", this.projectId);
    //   console.log("this.fromProducts", this.fromProducts);
    //   console.log("this.fromProjects", this.fromProjects);
    //   if (this.fromProjects == "true") {
    //     this.fromProjectsSelection = true;
    //   }
    //   else if (this.fromProjects == "false") {
    //     this.fromProjectsSelection = false;
    //   }
    //   else if (this.projectId == undefined && this.productId == undefined) {
    //     this.showSpinner();
    //     this.getInit();
    //   }
    // })
    // this.showSpinner();
    // this.getDataOnInit();

    //ORIGINAL

    //NEW


    this.initialData();


    //NEW

  }


  //SUCHETA  NEW

  /**
   * @author :  Suchheta
   * @description : New flows page with one flow and API Validator
   * 
   */

  initialData() {

   this.clientCode = 123;
    this.formatCode = 234;

    this.methods = [
      { name: "GET", value: "GET" },
      { name: "POST", value: "POST" },
      { name: "PUT", value: "PUT" },
      { name: "DELETE", value: "DELETE" },
    ];
    this.displaySelected = true;
    this.isDataEmpty = false;
    this.uploadedData = [{

      flowId: "FlowId1568005004001",
      flowName: "Flow1",
      path: "FlowDiagram/ECollections.png",
      filename: "ECollections.png",
      projectId: ["ProjectID1568005137436", "ProjectID1568005137436"]


    }]
  }


  //-----------  Text Boxes Functions  ------------

  addOne(firstKey, firstValue) {
    console.log("this.headerName = ", this.headerName)


    if (this.headerName.length == 0) {

      console.log("=========  1  ========")
      alert("Previous grid is empty !")

    }
    else if ((this.headerName[0].key == "" || this.headerName[0].value == "")) {

      console.log("======== 2 ========")
      alert("Previous grid  is empty !")

    }
    else if ((this.headerName[0].value == undefined || this.headerName[0].key == undefined)) {
      console.log("=========== 3 ===========")
      alert("Previous grid is empty !")
    }
    else {

      console.log("=========== 4 ===========")
      this.addContainer = true;
      console.log(" this.containers = ", this.containers)
      this.addMore = true;
      this.showButtonT = true;
      this.clickAgain = false;
      this.containers.push(this.containers.length);
      console.log(" this.containers = ", this.containers)
      console.log("inside addOne(), ngModel =", firstKey);


      var valuePush = undefined
      this.headerName.push({ key: valuePush, value: valuePush });
    }
    console.log("inside addOne , headerName =", this.headerName)
  }
  addOneMore(moreKey, moreValue) {
    var length = this.headerName.length;


    if (this.headerName.length == 0) {

      console.log("=========  1  ========")
      alert("Previous grid is empty !")

    }
    else if ((this.headerName[length - 1].key == "" || this.headerName[length - 1].value == "")) {

      console.log("======== 2 ========")
      alert("Previous grid is empty !")

    }
    else if ((this.headerName[length - 1].value == undefined || this.headerName[length - 1].key == undefined)) {
      console.log("=========== 3 ===========")
      alert("Previous grid is empty !")
    }
    else {
      console.log("=========== 4 ===========")
      this.addContainer = true;
      this.addMore = true;
      this.containers.push(this.containers.length);
      console.log("moreKey = ", moreKey)
      this.headerName.push({ key: moreKey, value: moreValue });
    }

    console.log("inside addOneMore , headerName =", this.headerName);
  }

  deleteOneMore(index) {
    console.log("this.containers = ", this.containers)
    this.containers.splice(index, 1);
    if (this.containers.length == 0) {

      console.log("Inside this.containers.length == 0 ------------")
      this.clickAgain = true;
      this.headerName.splice(index, 0);

    }
    console.log("this.index =", index)
    this.headerName.splice(index + 1, 1);
    console.log("inside deleteOneMore(), this.headerName =", this.headerName);
    console.log("inside deleteOneMore(),this.headerName.push = ", this.headerName.length)

  }

  textKeyChanged(event) {

    console.log('changed', this.firstApiMining, event);
    this.firstApiMining = event;
    if (this.headerName.length == 0) {

      this.headerName.splice(0, 1, event);
    }


    var valueLength = this.headerName.length
    console.log("this.headerName = ", this.headerName)
    console.log("valueLength = ", valueLength)
    if (this.headerName[0].value == undefined || this.headerName.length == 0) {
      this.headerName.splice(0, 1, { key: event, value: undefined });
    }
    else {
      this.headerName.splice(0, 1, { key: event, value: this.headerName[0].value });
    }

    console.log("this.headerName.splice = ", this.headerName);
    console.log("this.headerName.push = ", this.headerName[0]);
    console.log("this.headerName.push.length = ", this.headerName.length)

  }


  textValueChanged(event) {
    console.log('changed', this.firstApiMining, event);
    this.firstApiMining = event;
    if (this.headerName.length == 0) {

      this.headerName.splice(0, 1, event);
    }
    var valueLength = this.headerName.length;

    console.log("valueLength = ", valueLength)

    console.log("this.headerName = ", this.headerName)
    if (this.headerName[0].key == undefined || this.headerName.length == 0) {
      this.headerName.splice(0, 1, { key: undefined, value: event });
    }
    else if (this.headerName[0].key !== undefined) {
      this.headerName.splice(0, 1, { key: this.headerName[0].key, value: event });
    }


    console.log("this.headerName.splice = ", this.headerName);
    console.log("this.headerName.push = ", this.headerName[0]);
    console.log("this.headerName.push.length = ", this.headerName.length)


  }


  textKeyChangedMore(eventMore, indexMore) {

    console.log('inside textChangedMore - eventMore, index = ', eventMore, indexMore);
    var valueLength = this.headerName.length
    var i = indexMore + 1;
    if (this.headerName[i].value == undefined) {

      this.headerName.splice(indexMore + 1, 1, { key: eventMore, value: undefined });
    }
    else if (this.headerName[i].value !== undefined) {

      this.headerName.splice(indexMore + 1, 1, { key: eventMore, value: this.headerName[i].value });
    }
    console.log("this.headerName.splice = ", this.headerName);
    console.log("this.headerName.push = ", this.headerName.length)

    if (this.headerName.length > 1) {
      console.log("this.headerName[0]=", this.headerName[0])
      console.log("this.headerName[1]=", this.headerName[1])
    }
  }

  textValueChangedMore(eventMore, indexMore) {

    console.log('inside textChangedMore - eventMore, index = ', eventMore, indexMore);

    var valueLength = this.headerName.length

    var i = indexMore + 1;
    if (this.headerName[i].key == undefined) {

      this.headerName.splice(indexMore + 1, 1, { key: undefined, value: eventMore });
    }
    else if (this.headerName[i].key !== undefined) {

      this.headerName.splice(indexMore + 1, 1, { key: this.headerName[i].key, value: eventMore });
    }
    console.log("this.headerName.splice = ", this.headerName);
    console.log("this.headerName.push = ", this.headerName.length)

    if (this.headerName.length > 1) {
      console.log("this.headerName[0]=", this.headerName[0])
      console.log("this.headerName[1]=", this.headerName[1])
    }
  }

  //for test

  accurateExtract() {
    console.log(" ----------------- FINAL accurateExtract -----------------");

    console.log("this.headerName = ", this.headerName)
    var filtered: string[] = this.headerName.filter(element => element !== undefined)

    console.log("--------- Filtered  ------------", filtered)
  }

  check(data) {
    console.log("data", data.url);
    var lastFive = data.url.substr(data.url.length - 5);
    var firstFive = data.url.substr(8, 3);
    console.log(lastFive);
    console.log(firstFive);
    this.statusT = true;
    if (firstFive !== 'www') {
      // this.validatorData.push({id:data.id,url:data.url,status:"no"})
      console.log("Not ok")
      console.log("data", this.validatorData);
      for (var i = 0; i < this.validatorData.length; i++) {
        if (this.validatorData[i].url == data.url) {
          this.validatorData.splice(i, 1, { id: data.id, url: data.url, status: "no" });
        }
      }
      // this.validatorData.push({id:data.id,url:data.url,status:"no"})
      console.log("validatorsData", this.validatorData);
    }
    else {
      for (var i = 0; i < this.validatorData.length; i++) {
        if (this.validatorData[i].url == data.url) {
          this.validatorData.splice(i, 1, { id: data.id, url: data.url, status: "ok" });
        }
      }
      // this.validatorData.push({id:data.id,url:data.url,status:"no"})
      console.log("validatorsData", this.validatorData);
    }
  }
  //-------------- Text Boxes functions ends  -----------------------

  showSpinner() {
    this.spinner.show();
  }
  /**
  * @author Sanchita 
  * @param value
  * @description This fuction is called by create, update and delete to get the latest data in the database
  */

  getData() {
    this.sequenceService.getFlow().then((data) => {
      this.uploadedData = data;
      if (this.uploadedData.length == 0) {
        this.isDataEmpty = true;
        this.displaySearch = false;
        this.displayUnSelected = false;
        this.displaySelected = false;
      }
      else {
        this.isDataEmpty = false;
        this.displaySelected = true;
        this.displaySearch = true;
        this.displayUnSelected = false;
      }
    });
  }
  /**
  * @author Sanchita 
  * @param imageName 
  * @description This function is use to see the image preview in next tab
  */
  imageDisplay(imageName) {
    var idValue = imageName;
    this.sequenceService.getFlowDisplay(idValue).then((data) => {
    });
  }
  /**
  * @author Sanchita 
  * @param content 
  * @description This function is used to open the model to add new flow
  */
  addFlow(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  /**
  * @author Sanchita 
  * @param file
  * @description This function is used to get the details of the file being uploaded
  */
  filesToUpload: Array<File> = [];
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  /**
  * @author Sanchita & Suchheta
  * @param value {flowName,flowUpload}
  * @description This function is used to add flows to database 
  */
  FlowCreationData(value) {
    var data = {
      'flowName': value.flowName,
      'file': this.filesToUpload[0].name,
    };
    this.dataObj = {
      'file': this.filesToUpload[0]
    }
    const formData: any = new FormData();
    formData.append('file', this.filesToUpload[0]);
    if (this.projectId == null) {
      this.projectId = null
    }
    else {
      this.projectId = this.projectId
    }
    this.flowData.push(this.dataObj);
    this.flowDataAgain = this.flowData;
    this.sequenceService.postFlow(formData, value.flowName).then((data) => {
      this.response = data;
      this.getDataWhenAdd();
    });
    this.addFlowData.reset();
    this.modalService.dismissAll();
  }
  /**
  * @author Sanchita
  * @param value {event}
  * @description This function is used to filter flows present 
  */
  updateFilter(event) {
    this.temp = this.responseGet;
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.flowname.toLowerCase().indexOf(val) !== -1 || !val;
    });
    if (temp.length === 0) {
      this.isDataEmpty = true;
      this.displaySelected = false;
    }
    else {
      this.isDataEmpty = false;
      this.displaySelected = true;
    }
    this.uploadedData = temp;
  }
  /**
  * @author Sanchita
  * @param value {flowName,flowUpload}
  * @description This function is used to delete a specific flow 
  */
  deleteFlow(value) {
    var flowid = value.flowId;
    var confirmation = confirm("Are you Sure you want to delete?");
    this.sequenceService.deleteFlow(flowid).then((data) => {
      this.getData();
      this.getLength();
    });
  }
  /**
  * @author Sanchita 
  * @param 
  * @description This function is used to get the length of the response 
  */
  getLength() {
    this.sequenceService.getFlow().then((data) => {
      if (data.length == 0) {
        this.isDataEmpty = true;
        this.displaySearch = false;
      }
      else {
        this.getData();
      }
    });
  }
  functionCall() {
    console.log("Called");
  }
  /**
  * @author Sanchita
  * @description This function is called on submit button to store the data in database
  */
  submitFlows() {
    console.log("this.selectedFlows", this.selectedFlow);
    for (var i = 0; i < this.selectedFlow.length; i++) {
      if (this.selectedFlow.length == 1) {
        this.sequenceService.addFlowIdInProject(this.selectedFlow[0].flowId, this.projectId).then((data) => {
          console.log("data", data);
          this.getDataOnInit();
        });
      }
      else {
        this.obj.push(this.selectedFlow[i].flowId);
        console.log("--------", this.obj);
        this.sequenceService.addFlowsIdInProjectMultiple(this.obj, this.projectId).then((data) => {
          console.log("data", data);
          this.getDataOnInit();
        });
        // this.getMultipleData();
      }
    }
    // if(this.selectedFlow.length === 1){
    // console.log("one");
    // this.sequenceService.updateProjectId(this.selectedFlow[0].flowId, this.projectId).then((data) => {
    // console.log("data", data);
    // this.getDataOnInit();
    // });
    // }
    // else{
    // console.log("two");
    // this.sequenceService.addFlowsIdInProjectMultiple(this.selectedFlow)
    // }
  }
  /**
  * @author Sanchita
  * @description This function is used to get the table of unselected as a response
  */
  getDataWhenAdd() {
    this.sequenceService.getFlow().then((data) => {
      this.uploadedData = data;
      if (this.uploadedData.length == 0) {
        this.isDataEmpty = true;
        this.displaySearch = false;
        this.displaySelected = false;
      }
      else {
        this.isDataEmpty = false;
        this.displaySearch = true;
        this.displaySelected = true;
        this.displayUnSelected = false;
      }
    });
  }
  /**
  * @author Sanchita
  * @param value {value,contentUpload}
  * @description This function is used to edit a specific flow 
  */
  editFlow(value, contentUpload) {
    this.modalService3.open(contentUpload, { size: 'lg' });
    this.editChosenFlowName = value.filename;
    this.editChosenFile = value.path;
    this.editChosenSpareFlowName = value.filename;
    this.editChosenSpareFile = value.path;
  }
  /**
  * @author Suchheta
  * @param value{flowNameEdit,fileEdit }
  * @description This is the function to edit the details of the flow
  */
  flowEditData(flowNameEdit, fileEdit) {
    for (var index = 0; index < this.responseGet.length; index++) {
      if (this.responseGet[index].filename == this.editChosenSpareFlowName) {
        const formData: any = new FormData();
        formData.append('file', this.filesToUpload[0]);
        if (this.projectId == null) {
          this.projectId = null
        }
        else {
          this.projectId = this.projectId
        }
        var id = this.responseGet[index].flowId;
        this.sequenceService.updateFlow(id, formData).then((data) => {
          this.getData();
        });
      }
    }
    this.modalService3.dismissAll();
  }
  /**
  * @author Suchheta
  * @param value {projectId, flowId, event}
  * @description This function is being called in Selected flows table
  */
  onSelectedTableClicked(data, event) {
    this.selectedFlow = [];
    console.log("data", data);
    console.log("event", event);
    this.selectedFlow.push(data);
    console.log("this.selectedData", this.selectedFlow);
    if (this.selectedFlow.length !== 0) {
      this.finalSubmit = false;
    }
    else {
      this.finalSubmit = true;
    }
  }

  /**
  * @author Sanchita
  * @param
  * @description This function is used to display the data on page load
  */
  getDataOnInit() {
    this.uploadedData = [];
    this.notMatchedData = [];
    this.dataUploaded = [];
    this.projectData = [];
    this.projectAttachedFlow = '';
    this.sequenceService.getProjectData(this.projectId).then((data) => {
      this.projectData = data;

      for (var i = 0; i < this.projectData.length; i++) {
        for (var j = 0; j < this.projectData[i].flows.length; j++) {
          this.projectAttachedFlow = this.projectData[i].flows[j];
          console.log("this.projectAttachedFlow", this.projectAttachedFlow);
        }
      }
      for (var i = 0; i < this.projectData.length; i++) {
        for (var j = 0; j < this.projectData[i].products.length; j++) {
          if (this.projectData[i].products.length > 1) {
            this.sequenceService.getProductByProductId(this.productId).then((data) => {
              console.log("data", data);
            })
            this.getMulipleProductFlows();
          }
          else {
            this.sequenceService.getProductByProductId(this.projectData[i].products[j]).then((data) => {
              this.productData = data;
              console.log("productData", this.productData);
              for (var i = 0; i < this.productData.length; i++) {
                for (var j = 0; j < this.productData[i].flows.length; j++) {
                  this.flowIdFromProduct = this.productData[i].flows[j];
                  console.log("-------", this.productData[i].flows);
                  this.sequenceService.getFlowById(this.flowIdFromProduct).then((data) => {
                    this.responseGet = data;
                    if (this.responseGet.length == 0) {
                      this.isDataEmpty = true;
                      this.displaySelected = false;
                      this.displaySearch = false;
                    }
                    else {
                      this.isDataEmpty = false;
                      this.displaySearch = true;
                      for (var i = 0; i < this.responseGet.length; i++) {
                        if (this.projectAttachedFlow == this.responseGet[i].flowId) {
                          this.uploadedData.push({ _id: this.responseGet[i]._id, flowId: this.responseGet[i].flowId, flowName: this.responseGet[i].flowName, filename: this.responseGet[i].filename, path: this.responseGet[i].path });
                          console.log("this.uploadedData", this.uploadedData);
                        }
                        else {
                          this.notMatchedData.push({ _id: this.responseGet[i]._id, flowId: this.responseGet[i].flowId, flowName: this.responseGet[i].flowName, filename: this.responseGet[i].filename, path: this.responseGet[i].path });
                          console.log("this.notMatchedData", this.notMatchedData);
                        }
                      }
                    }
                    for (var i = 0; i < this.projectData.length; i++) {
                      if (this.projectData[i].flows.length == 0) {
                        for (var i = 0; i < this.notMatchedData.length; i++) {
                          this.uploadedData.push(this.notMatchedData[i]);
                          this.displayStatus = false;
                          this.displayRadio = true;
                          this.showButton = true;
                        }
                      }
                      else {
                        this.showButton = false;
                        this.displayRadio = false;
                        this.displayStatus = true;
                      }
                    }
                    let unique_array = [];
                    this.uploadedData.map(function (item) {
                      var existItem = unique_array.find(x => x.flowId == item.flowId);
                      if (existItem) { } else {
                        unique_array.push(item);
                      }
                    });
                    console.log("reached");
                    this.uploadedData = unique_array
                    if (this.fromProjects == "true" || this.fromProducts == "true") {
                      this.displaySelected = true;
                    }
                    else if (this.fromProjects == undefined) {
                      this.displaySelected = false;
                    }
                  });
                  this.spinner.hide();
                }
              }
            });
          }
        }
      }
    });
  }
  onSelectedTable2Clicked(data, event) {
    console.log("event", event.target.value);
    console.log(":::::", data);
    this.selectedFlow.push(data);
    console.log("this.sellected", this.selectedFlow);
    if (this.selectedFlow.length !== 2) {
      this.finalSubmit = true;
      this.showButton = true;

    }
    else {
      this.showButton = true;
      this.finalSubmit = false;

    }
  }
  /**
   * @author Sanchita 
   * @description This function is called when multiple products are selected to show the flows for the prespective products
   */
  dataofFlowId
  getMulipleProductFlows() {
    this.uploadedData = [];
    this.notMatchedData = [];
    this.dataUploaded = [];
    this.productData = [];
    // this.projectData = [];
    this.sequenceService.getProjectData(this.projectId).then((data) => {
      this.dataOfProject = data;
      console.log("project data in multiple option", this.dataOfProject);
      for (var j = 0; j < this.dataOfProject.length; j++) {
        for (var i = 0; i < this.dataOfProject[j].products.length; i++) {
          this.sequenceService.getProductByProductId(this.dataOfProject[j].products[i]).then((data) => {
            for (var i = 0; i < data.length; i++) {
              for (var j = 0; j < data[i].flows.length; j++) {
                this.dataOfProduct.push({ productName: data[i].productName, flowId: data[i].flows[j] });
              }
            }
            let unique_array = [];
            this.dataOfProduct.map(function (item) {
              var existItem = unique_array.find(x => x.flowId == item.flowId);
              if (existItem) { } else {
                unique_array.push(item);
              }
            });
            console.log("reached");
            this.dataOfProduct = unique_array
            console.log(this.dataOfProduct);
            for (var i = 0; i < this.dataOfProduct.length; i++) {
              this.sequenceService.getFlowById(this.dataOfProduct[i].flowId).then((data) => {
                for (var i = 0; i < data.length; i++) {
                  for (var j = 0; j < this.dataOfProduct.length; j++) {
                    if (data[i].flowId === this.dataOfProduct[j].flowId) {
                      this.dataOfFlows.push({ productName: this.dataOfProduct[j].productName, _id: data[i]._id, filename: data[i].filename, path: data[i].path, flowId: data[i].flowId, flowName: data[i].flowName });
                    }
                  }
                }
                unique_array = [];
                this.dataOfFlows.map(function (item) {
                  var existItem = unique_array.find(x => x.flowId == item.flowId);
                  if (existItem) { } else {
                    unique_array.push(item);
                  }
                });
                console.log("reached");
                this.dataOfFlows = unique_array
                console.log(this.dataOfFlows);
                console.log("dataofProducts", this.dataOfProduct);
                for (var i = 0; i < this.dataOfFlows.length; i++) {
                  for (var j = 0; j < this.dataOfProduct.length; j++) {
                    this.productName = this.dataOfProduct[0].productName;
                    console.log("productName", this.productName);
                    if (this.productName === this.dataOfFlows[i].productName) {
                      this.segreggateArray.push(this.dataOfFlows[i]);
                      console.log("this.segreggateArray", this.segreggateArray);
                    }
                    else if (this.productName !== this.dataOfFlows[i].productName) {
                      this.globalArray.push(this.dataOfFlows[i]);
                      console.log("this.globalArray", this.globalArray);
                    }
                  }
                }
                unique_array = [];
                this.segreggateArray.map(function (item) {
                  var existItem = unique_array.find(x => x.flowId == item.flowId);
                  if (existItem) { } else {
                    unique_array.push(item);
                  }
                });
                console.log("reached");
                this.segreggateArray = unique_array
                console.log("this.segreggateArray", this.segreggateArray);

                unique_array = [];
                this.globalArray.map(function (item) {
                  var existItem = unique_array.find(x => x.flowId == item.flowId);
                  if (existItem) { } else {
                    unique_array.push(item);
                  }
                });
                console.log("reached");
                this.globalArray = unique_array
                console.log("this.globalArray", this.globalArray);
                console.log("this.projectData", this.projectData);
                this.getMultipleSelectedData();
              });
            }
          });
        }
      }
    });
  }
  /***
   * @author Sanchita
   * @description This function will be called by the getMulipleProductFlows function in order to get the sorted data 
   */
  getMultipleSelectedData() {
    if (this.projectData[0].flows.length == 0) {
      this.displayRadio = true;
      this.displayStatus = false;
      this.showButton = true;
      this.displayMultipleUnselected1 = true;
      this.displayMultipleUnselected2 = true;
    }
    else {
      for (var i = 0; i < this.projectData[0].flows.length; i++) {
        for (var j = 0; j < this.dataOfFlows.length; j++) {
          this.dataofFlowId = this.dataOfFlows[j].flowId;
          if (this.projectData[0].flows.length === 0) {
            this.displayRadio = true;
            this.displayStatus = false;
            this.showButton = true;
            this.displayMultipleUnselected1 = true;
            this.displayMultipleUnselected2 = true;
          }
          else if (this.projectData[0].flows.length !== 0 && this.dataofFlowId == this.projectData[0].flows[i]) {
            this.uploadedData.push(this.dataOfFlows[j]);
            console.log("this.uploadedData", this.uploadedData);
            this.showButton = false;
            this.displayRadio = false;
            this.displayMultipleUnselected1 = false;
            this.displayMultipleUnselected2 = false;
            this.displayStatus = true;
            this.displaySelected = true;

          }

        }
        let unique_array = [];
        this.uploadedData.map(function (item) {
          var existItem = unique_array.find(x => x.flowId == item.flowId);
          if (existItem) { } else {
            unique_array.push(item);
          }
        });
        console.log("reached");
        this.uploadedData = unique_array

      }
    }
  }
  /**
  * @author Sanchita
  * @description This function will be called if the projectId and productId is undefined
  */
  getInit() {
    this.uploadedData = [];
    this.notMatchedData = [];
    this.dataUploaded = [];
    // this.projectData = [];
    this.projectAttachedFlow = '';
    this.sequenceService.getProjectData(this.projectId).then((data) => {
      this.projectData = data;
      console.log("this.projectData", this.projectData);
      for (var i = 0; i < this.productData.length; i++) {
        for (var j = 0; j < this.productData[i].flows.length; j++) {
          this.projectAttachedFlow = this.productData[i].flows[j];
        }
      }
    });
    this.sequenceService.getFlow().then((data) => {
      this.responseGet = data;
      if (this.responseGet.length == 0) {
        this.isDataEmpty = true;
        this.displaySelected = false;
        this.displaySearch = false;
      }
      else {
        this.isDataEmpty = false;
        this.displaySearch = true;
        for (var i = 0; i < this.responseGet.length; i++) {
          if (this.projectAttachedFlow == this.responseGet[i].flowId) {
            this.uploadedData.push({ _id: this.responseGet[i]._id, flowId: this.responseGet[i].flowId, flowName: this.responseGet[i].flowName, filename: this.responseGet[i].filename, path: this.responseGet[i].path });
            console.log("this.uploadedData", this.uploadedData);
          }
          else {
            this.notMatchedData.push({ _id: this.responseGet[i]._id, flowId: this.responseGet[i].flowId, flowName: this.responseGet[i].flowName, filename: this.responseGet[i].filename, path: this.responseGet[i].path });
            console.log("this.notMatchedData", this.notMatchedData);
          }
        }
      }
      for (var i = 0; i < this.productData.length; i++) {
        if (this.projectData[i].flows.length == 0) {
          for (var i = 0; i < this.notMatchedData.length; i++) {
            this.uploadedData.push(this.notMatchedData[i]);
            this.displayStatus = false;
            this.displayRadio = true;
            this.showButton = true;
          }
        }
        else {
          this.showButton = false;
          this.displayRadio = false;
          this.displayStatus = true;
        }
      }
      let unique_array = [];
      this.uploadedData.map(function (item) {
        var existItem = unique_array.find(x => x.flowId == item.flowId);
        if (existItem) { } else {
          unique_array.push(item);
        }
      });
      console.log("reached");
      this.uploadedData = unique_array
      this.spinner.hide();
      if (this.fromProjects == "true" || this.fromProducts == "true") {
        this.displaySelected = true;
      }
      else if (this.fromProjects == undefined) {
        this.displayUnSelected = true;
      }
    });
  }
  // showSpinner() {
  //   this.spinner.show();
  //   setTimeout(()=>{
  //     this.spinner.hide();
  //   }, 5000);
  // }
}