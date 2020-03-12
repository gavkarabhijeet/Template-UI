import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TimelineService {


  responseData = {};

  projectData;
  projectTimelineData;

  globalTimeOfIbm
  projectId
  projectNameNavigate



  constructor(private router: Router, private http: HttpClient) { }

  getTimeline(projectId) {
    var headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))


    this.responseData = 

      {
        'projectName': 'Project2',
        'projects': 'Completed',
        'products': 'Completed',
        'flows': null,
        'mapping': null,
        'sitSubmission': null,
        'uatSubmission': null
      }

    

    return this.responseData;



  }


  relativeLink(value) {

    var projName = value.projectName
    console.log("Inside relative Link");
    console.log("projName = ", projName)


    var date = new Date();
    var data = date;
    this.globalTimeOfIbm = data;

    console.log("this.globalTimeOfIbm = ", this.globalTimeOfIbm)




    if (value.projects == null) {

      this.router.navigate(['/ProjectData/ProjectManagement', { id: this.projectId, projectName: this.projectNameNavigate, timeData: this.globalTimeOfIbm }]);


    }
    else if (value.projects != null && value.products == null) {


      this.router.navigate(['/ProjectData/ProductData', { id: this.projectId, projectName: this.projectNameNavigate, timeData: this.globalTimeOfIbm }]);

    }
    else if (value.projects != null && value.products != null && value.flows == null) {

      this.router.navigate(['/ProjectData/SequenceDiagram', { id: this.projectId, projectName: this.projectNameNavigate, timeData: this.globalTimeOfIbm }]);


    }

    else if (value.projects != null && value.products != null && value.flows != null && value.mapping == null) {


      this.router.navigate(['/ProjectData/MappingData', { id: this.projectId, projectName: this.projectNameNavigate, timeData: this.globalTimeOfIbm }]);

    }

    else if (value.projects != null && value.products != null && value.flows != null && value.mapping == null) {


      this.router.navigate(['/ProjectData/MappingData', { id: this.projectId, projectName: this.projectNameNavigate, timeData: this.globalTimeOfIbm }]);

    }
    else if (value.projects != null && value.products != null && value.flows != null && value.mapping == null) {


      this.router.navigate(['/ProjectData/MappingData', { id: this.projectId, projectName: this.projectNameNavigate, timeData: this.globalTimeOfIbm }]);

    }


  }
}
