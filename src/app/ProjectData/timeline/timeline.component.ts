import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  responseData = [];

  projectData;
  projectTimelineData;

  globalTimeOfIbm
  projectId
  projectNameNavigate



  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {

    this.projectName();

    this.projectTimeline();

  }

  projectName() {
    var headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))


      this.responseData = [
      //   {
      //   'ProjectName': 'Project1',
      //   'Projects':'Completed',
      //   'Products': 'Completed',
      //   'Flows':'Completed',
      //   'Mapping' : 'Completed',
      //   'Sit Submission':'Completed',
      //   'UAT Submission': 'Completed'
       
      // },
      {
        'projectName': 'Project2',
        'projects':'Completed',
        'products': 'Completed',
        'flows':null,
        'mapping' : null,
        'sitSubmission':null,
        'uatSubmission': null
      },
      // {
      //   'ProjectName': 'Project3',
      //   'Projects':'Completed',
      //   'Products': 'Completed',
      //   'Flows':'Completed',
      //   'Mapping' : null,
      //   'Sit Submission':null,
      //   'UAT Submission': null
        
      // }
    ]


    


  }



  projectTimeline() {
    console.log("Inside projectTimeline")
    var headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'))




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
        else if (value.projects != null && value.validateApi == null) {
    
          this.router.navigate(['/ProjectData/Products', { id: this.projectId, projectName: this.projectNameNavigate, timeData: this.globalTimeOfIbm }]);
    
        }
        else if (value.projects != null && value.validateApi != null && value.flows == null) {
    
          this.router.navigate(['/ProjectData/SequenceDiagram', { id: this.projectId, projectName: this.projectNameNavigate, timeData: this.globalTimeOfIbm }]);
    
        }
    
        else if (value.projects != null && value.validateApi != null && value.flows != null && value.mapping == null) {
    
          this.router.navigate(['/ProjectData/MappingData', { id: this.projectId, projectName: this.projectNameNavigate, timeData: this.globalTimeOfIbm }]);
    
        }
     
  }

}