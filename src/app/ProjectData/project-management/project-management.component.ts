import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ProjectManagementService } from './project-management.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TimelineService } from './../../ProjectData/timeline.service'

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 *  @author Suchheta
 * @description  Defining and Creating Project Management Component
*/
export class ProjectManagementComponent implements OnInit {

  projectData = [];
  projectDataAgain = [];
  temp = [];
  //pagination
  p: number = 1;
  displayTable: boolean = false;
  addProjectCreationData: FormGroup;
  editChosenProjectName;
  editChosenProjectVersion;
  editChosenSpareProjectName;
  editChosenSpareVersion;
  productIdFromProject;
  //Responses
  createResponse;
  getResponse;
  getByIdResponse;
  updateResponse;
  deleteResponse;
  storeFileResponse;
  projectUpdateObj;
  projectDeleteObj;
  projectIdFromProject;
  sequenceIdFromProject;
  uploadFileData: FormGroup
  urlUploadData: FormGroup
  jsonUploadData: FormGroup
  isEmpty: Boolean;
  displaySearch: Boolean;
  itemsPerPage = 5;
  currentPage = 1;
  index
  fileUploadProjectName;
  timelineData1= [];
  timelineData = []

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
    private modalService: NgbModal, private modalService2: NgbModal, private spinner: NgxSpinnerService
    , private modalService3: NgbModal, public ProjectManagementService: ProjectManagementService,
    public timelineService: TimelineService) {

    this.addProjectCreationData = this.fb.group({
      'projectName': ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')]],
      'version': ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z.0-9]+$')]]
    })


    this.urlUploadData = this.fb.group({
      'urlUpload': ['', [Validators.required]]
    })

    this.jsonUploadData = this.fb.group({
      'jsonUpload': ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.showSpinner();
    this.getProjectService();
  
  }


  /**
   * @author Suchheta
   * @description Timeline function
   * @param projectId
   */

  displayTimeline(projectId) {

   this.timelineData.push(this.timelineService.getTimeline(projectId));

   console.log(" TIMELINE DATA --------- = ", this.timelineData)
  }

/**
   * @author Suchheta
   * @description Timeline function
   * @param projectId
   */

  relativeLink(value){
    
    this.timelineService.relativeLink(value);
  }


  /**
    * @author Suchheta
    * @param value {projectName,version}
    * @description  Defining and Creating Project Management Component
    */
  projectCreationData(value) {
    var dataObj = {
      'projectName': value.projectName,
      'version': value.version,
      'products': [],
      'flows': [],
    };
    this.displayTable = true;
    this.addProjectCreationData.reset()
    this.modalService.dismissAll();
    //create new Project if already present alert will be thrown
    this.ProjectManagementService.createProject(dataObj).then((data) => {
      this.createResponse = data;
      console.log("this.createResponse", this.createResponse);
      if (this.createResponse.message == "data is already exist") {
        data = alert("Project name is already taken!");
      }
      else {
        this.showSpinner();
        this.getProjectService();
      }
    })
  }

  /**
   * @author Suchheta
   * @param value {event}
   * @description  Filter for the search bar
   */
  updateFilter(event) {
    this.temp = this.projectDataAgain;
    const val = event.target.value.toLowerCase();
    // filter our data based on projectName
    const temp = this.temp.filter(function (d) {
      return d.projectName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    if (temp.length === 0) {
      this.isEmpty = true;
      this.displayTable = false;
    }
    else {
      this.isEmpty = false;
      this.displayTable = true;
    }
    // update the rows
    this.projectData = temp;
    // Whenever the filter changes, always go back to the first page
  }

  /**
   * @author Suchheta
   * @param value {Modal id}
   * @description  Open Add Project Modal
   */
  addProject(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  // Project Table
  /**
    * @author Suchheta
    * @param value {projectName, projectId  index}
    * @description  navigate to view Products 
    */
  viewProducts(value, index) {
    for (var i = 0; i < this.projectData.length; i++) {

      if (this.projectData[i].projectName == value.projectName) {
        this.productIdFromProject = this.projectData[i].projectId
      }
    }
    // on button click will navigate to products and pass projectId and fromProjects
    this.router.navigate(['/ProjectData/ProductsData', { productIdFromProject: this.productIdFromProject, fromProjects: "true" }]);
  }

  /**
   * @author Suchheta
   * @param value 
   * @param index 
   */
  viewMapping(value, index) {

    var projectId = value.projectId;
    var flowId = value.flows[0];
    console.log("flowId", flowId);
    // on button click will navigate to products and pass projectId and fromProjects
    this.router.navigate(['/ProjectData/MappingData', { projectIdMapping: projectId, flowId: flowId, fromProjects: "true" }]);
  }



  /**
    * @author Suchheta
    * @param value {index}
    * @description  navigate to view Flow
    */
  viewFlow(value, index) {
    for (var i = 0; i < this.projectData.length; i++) {
      if (this.projectData[i].projectName == value.projectName) {
        this.sequenceIdFromProject = this.projectData[i].projectId
      }
    }
    // on button click will pass projectId to get the flows attached to the project
    this.router.navigate(['/ProjectData/SequencesDiagram', { projectId: this.sequenceIdFromProject, fromProjects: "true" }]);
  }

  /**
    * @author Suchheta
    * @param value {data, contentUpload}
    * @description  open Edit Project
    */

  editProject(data, contentUpload) {
    this.modalService2.open(contentUpload, { size: 'lg' });
    // this.fileUploadProjectName = data.projectId;
  }

  // Tab

  /**
   * @author Suchheta
   * @param value {event}
   * @description  to Open the Modal
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
    * @description  to Upload the File - WSDL/YAML/JSON
    */
  filesToUpload: Array<File> = [];
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log("this.filesToUpload", this.filesToUpload);
  }

  submitFile(a) {
    console.log("--------------- Inside Submit File ---------------")
    console.log("a", a.projectId);
    const files: Array<File> = this.filesToUpload;
    var checkFileName = files[0].name;
    var projectId = a.projectId;
    console.log("projectId", projectId);
    console.log(" inside upload, this.checkFileName = ", checkFileName);
    const formData: any = new FormData();
    formData.append('file', this.filesToUpload[0]);
    this.ProjectManagementService.storeFile(projectId, formData).then((data) => {
      console.log("this.updateResponse", data);
      this.modalService2.dismissAll();
    })

  }
  /**
    * @author Suchheta
    * @param value {event}
    * @description  to Upload the Url
    */
  submitUrl(requestUrl) {
    console.log("Inside submitUrl")
    console.log("requestUrl", requestUrl)
  }

  /**
     * @author Suchheta
     * @param value {event}
     * @description  to Upload the JSON 
     */
  submitJson(requestJSON) {
    console.log("Inside submitJson");
    console.log("requestJSON = ", requestJSON)
  }

  /**
      * @author Suchheta
      * @param value {projectName, version, contentEdit }
      * @description  to Open the Edit Modal
      */
  editProjectsData(value, contentEdit) {
    console.log("Inside editProductsData ")
    console.log("data = ", value.projectName, " , ", value.version)
    this.modalService3.open(contentEdit, { size: 'lg' });
    this.editChosenProjectName = value.projectName;
    this.editChosenProjectVersion = value.version;
    this.editChosenSpareProjectName = value.projectName;
    this.editChosenSpareVersion = value.version;
  }


  /**
    * @author Suchheta
    * @param value {projectName, version }
    * @description  to Edit the Projects
    */
  projectEditData(productNameEdit, versionEdit) {
    console.log("Inside ProductEditData");
    console.log("data = ", productNameEdit, " , ", versionEdit)
    console.log("projectData", this.projectData);
    for (var index = 0; index < this.projectData.length; index++) {
      if (this.projectData[index].projectName == this.editChosenSpareProjectName) {
        this.projectData[index].projectName = productNameEdit;
        this.projectData[index].version = versionEdit;
        console.log("this.projectData[index] = ", this.projectData[index])

        this.projectUpdateObj = {
          "projectId": this.projectData[index].projectId,
          "projectName": productNameEdit,
          "version": versionEdit
        }
      }
    }
    console.log("this.projectData = ", this.projectData);
    console.log("this.projectUpdateObj = ", this.projectUpdateObj)

    this.ProjectManagementService.updateProject(this.projectUpdateObj).then((data) => {
      this.updateResponse = data;
      console.log("this.updateResponse", data);

    })

    this.modalService3.dismissAll();
  }

  /**
    * @author Suchheta
    * @param value {projectName, version }
    * @description  to Delete the Project
    */

  async deleteProject(value) {
    console.log("value", value.projectId);
    if (confirm("Are you sure to Delete? ")) {
      this.ProjectManagementService.deleteProject(value.projectId).then((data) => {
        console.log("", data);
        this.showSpinner();
        this.getProjectService();
      })
    }
  }



  /**
  * @author Suchheta
  * @param value {projectId }
  * @description  Service to Delete the Project
  */
  deleteProjectService(projectDeleteObj) {
    console.log("Inside deleteProjectService")
    this.ProjectManagementService.deleteProject(projectDeleteObj).then((data) => {
      this.deleteResponse = data;
      console.log("this.deleteResponse", data);
      this.getProjectService();

    })
  }

  /**
    * @author Suchheta
    * @param value { }
    * @description  Service to get the Projects
    */

  getProjectService() {
    console.log("Inside get Project Service")
    this.ProjectManagementService.getProject().then((data) => {
      this.getResponse = data;
      console.log("this.response", data);
      if (this.getResponse.length == 0) {
        this.isEmpty = true;
        this.displayTable = false;
        this.displaySearch = false;
      }
      else {
        this.projectData = [];

        for (var i = 0; i < this.getResponse.length; i++) {
          // this.projectData.push(this.getResponse[i]);
          this.projectDataAgain = this.projectData;
          this.projectData.push({ index: i + 1, id: this.getResponse[i]._id, projectName: this.getResponse[i].projectName, version: this.getResponse[i].version, products: this.getResponse[i].products, flows: this.getResponse[i].flows, projectId: this.getResponse[i].projectId })
          this.displayTimeline(this.getResponse[i].projectId)
        }
       
        this.displaySearch = true;
        this.displayTable = true;
        this.isEmpty = false;
        console.log(" getProjectService,this.projectData = ", this.projectData)
      }
      this.spinner.hide();
    })
  }
  showSpinner() {
    this.spinner.show();
  }
}
