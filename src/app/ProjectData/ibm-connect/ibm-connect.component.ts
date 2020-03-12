import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ibm-connect',
  templateUrl: './ibm-connect.component.html',
  styleUrls: ['./ibm-connect.component.css']
})
export class IbmConnectComponent implements OnInit {
  statusCode;
  statusResponse;
  responseText;
  method:any
  url:any
  requestText: any;
  authUsername: any;
  authPassword: any;
  authorizationToken: any;

  // Postman 
  methods = ['GET', 'POST', 'PUT', 'DELETE'];
  tab: string[] = ['Authorization', 'Headers', 'Body', 'Response'];
  selectedwallet = this.tab[0];


  constructor(private router: Router, private _route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // code to get the projectName and time while routing
    this._route.params.subscribe((params) => {
      console.log("projectName", params['projectName']);
      // this.projectName = params['projectName'];
      console.log("time", params['timeData']);
    
     
    })

   }

  // function called to go to the next page
  nextLink() {
    
  

    this.updateTimeline();




  }

  updateTimeline() {

    var updateObject = {
      // 'projectName': this.projectName,
      'ibmApiConnect': 'Completed',
      'sequenceDiagram': null,
      'mapping': null,
      'probableApi': null
    }
    console.log("Inside updateTimeline = ", updateObject)



  }

  
  submitUrl(requestText, method, url1, authUsername, authPassword, authorizationToken) {


    console.log("requestText = ", requestText)
    console.log("Method = ", method);
    console.log("Url = ", url1)
    console.log("authUsername = ", authUsername)
    console.log("authPassword = ", authPassword);
    console.log("authorizationToken = ", authorizationToken)


    if (method == 'GET' && authorizationToken == undefined && authUsername == undefined && authPassword == undefined) {

      if (url1.includes("/")) {
        var url = url1.replace(/\//g, "%2F")
      }


    }


    else if (method == 'GET' && authorizationToken == undefined && authUsername != undefined && authPassword != undefined) {

      if (url1.includes("/")) {
        var url = url1.replace(/\//g, "%2F")
      }


     
    }
    else if (method == 'GET' && authorizationToken != undefined && authUsername == undefined && authPassword == undefined) {

      if (url1.includes("/")) {
        var url = url1.replace(/\//g, "%2F")
      }


     
    }
    //POST
    else if (method == 'POST' && authorizationToken == undefined && authUsername == undefined && authPassword == undefined) {
      var postObject =
      {
        url: url1,
        requestBody: requestText,

      }


    }


    else if (method == 'POST' && authorizationToken == undefined && authUsername != undefined && authPassword != undefined) {
      var postObjectAuth =
      {
        url: url1,
        requestBody: requestText,
        authUsername: authUsername,
        authPassword: authPassword
      }



    }

    else if (method == 'POST' && authorizationToken != undefined && authUsername == undefined && authPassword == undefined) {
      var postObjectToken =
      {
        url: url1,
        requestBody: requestText,
        token : authorizationToken
      }


    }


    //POST ends
    else if (method == 'PUT' && authorizationToken == undefined && authUsername == undefined && authPassword == undefined) {
      var putObject =
      {
        url: url1,
        requestBody: requestText
      }

    }
    else if (method == 'PUT' && authorizationToken == undefined && authUsername != undefined && authPassword != undefined) {
      var putObjectAuth =
      {
        url: url1,
        requestBody: requestText,
        authUsername: authUsername,
        authPassword: authPassword
      }



    }

    else if (method == 'PUT' && authorizationToken != undefined && authUsername == undefined && authPassword == undefined) {
      var putObjectToken =
      {
        url: url1,
        requestBody: requestText,
        token : authorizationToken
      }


     
    }


//PUT ends

//DELETE

    else if (method == 'DELETE' && authorizationToken == undefined && authUsername == undefined && authPassword == undefined) {

     
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          url: url1,
          requestBody: requestText
        },
      };


    }

    else if (method == 'DELETE' && authorizationToken == undefined && authUsername != undefined && authPassword != undefined) {

      const optionsAuth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          url: url1,
          requestBody: requestText,
          authUsername: authUsername,
        authPassword: authPassword
        },
      };


    

    }

    else if (method == 'DELETE' && authorizationToken != undefined && authUsername == undefined && authPassword == undefined) {

      const optionsToken = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          url: url1,
          requestBody: requestText,
          token : authorizationToken
        },
      };


      
    }
  }


  statusResponses(statusCode) {


    if (statusCode == 100) {
      this.statusResponse = "Continue"
    }
    else if (statusCode == 101) {
      this.statusResponse = " Switching Protocol"
    }
    else if (statusCode == 102) {
      this.statusResponse = "Processing"
    }
    else if (statusCode == 103) {
      this.statusResponse = "Early Hints"
    }
    else if (statusCode == 203) {
      this.statusResponse = " Non-Authoritative Information"
    }
    else if (statusCode == 205) {

      this.statusResponse = "Reset Content"
    }
    else if (statusCode == 206) {
      this.statusResponse = "Partial Content"
    }

    else if (statusCode == 207) {
      this.statusResponse = " Multi-Status"
    }
    else if (statusCode == 208) {
      this.statusResponse = "Multi-Status"
    }
    else if (statusCode == 226) {

      this.statusResponse = "IM Used"
    }
    else if (statusCode == 301) {
      this.statusResponse = "Moved Permanently"
    }
    else if (statusCode == 303) {
      this.statusResponse = "See Other"
    }
    else if (statusCode == 304) {
      this.statusResponse = "Not Modified"
    }
    else if (statusCode == 305) {
      this.statusResponse = "Use Proxy"
    }
    else if (statusCode == 306) {
      this.statusResponse = "unused"
    }
    else if (statusCode == 307) {
      this.statusResponse = " Temporary Redirect"
    }
    else if (statusCode == 308) {
      this.statusResponse = "Permanent Redirect"
    }

    else if (statusCode == 200) {
      this.statusResponse = "OK"
    }
    else if (statusCode == 201) {
      this.statusResponse = "Created "
    }
    else if (statusCode == 202) {
      this.statusResponse = "Accepted "
    }
    else if (statusCode == 204) {
      this.statusResponse = "No Content "
    }
    else if (statusCode == 300) {
      this.statusResponse = "Multiple Choice "
    }
    else if (statusCode == 302) {
      this.statusResponse = "Found "
    }
    else if (statusCode == 400) {
      this.statusResponse = "Bad Request "
    }
    else if (statusCode == 401) {
      this.statusResponse = "Unauthorized "
    }
    else if (statusCode == 403) {
      this.statusResponse = "Forbidden "
    }
    else if (statusCode == 404) {
      this.statusResponse = "Not Found "
    }
    else if (statusCode == 405) {
      this.statusResponse = "Method Not Allowed "
    }
    else if (statusCode == 406) {
      this.statusResponse = "Not Acceptable "
    }
    else if (statusCode == 413) {
      this.statusResponse = "Payload Too Large "
    }
    else if (statusCode == 414) {
      this.statusResponse = "URI Too Long "
    }
    else if (statusCode == 429) {
      this.statusResponse = "Too Many Requests "
    }
    else if (statusCode == 402) {
      this.statusResponse = "Payment Required "
    }
    else if (statusCode == 407) {
      this.statusResponse = "Proxy Authentication Required "
    }
    else if (statusCode == 408) {
      this.statusResponse = " Request Timeout "
    }
    else if (statusCode == 409) {
      this.statusResponse = "Conflict "
    }
    else if (statusCode == 410) {
      this.statusResponse = "Gone "
    }
    else if (statusCode == 411) {
      this.statusResponse = " Length Required "
    }
    else if (statusCode == 412) {
      this.statusResponse = " Precondition Failed "
    }
    else if (statusCode == 415) {
      this.statusResponse = " Unsupported Media Type "
    }
    else if (statusCode == 416) {
      this.statusResponse = " Requested Range Not Satisfiable "
    }
    else if (statusCode == 417) {
      this.statusResponse = " Expectation Failed "
    }
    else if (statusCode == 421) {
      this.statusResponse = "Misdirected Request "
    }
    else if (statusCode == 424) {
      this.statusResponse = "Failed Dependency "
    }
    else if (statusCode == 431) {
      this.statusResponse = "Request Header Fields Too Large "
    }
    else if (statusCode == 500) {
      this.statusResponse = "Internal Server Error "
    }
    else if (statusCode == 501) {
      this.statusResponse = "Not Implemented "
    }
    else if (statusCode == 503) {
      this.statusResponse = "Service Unavailable "
    }

    else if (statusCode == 502) {
      this.statusResponse = "Bad Gateway "
    }
    else if (statusCode == 505) {
      this.statusResponse = "HTTP Version Not Supported "
    }
    else if (statusCode == 510) {
      this.statusResponse = " Not Extended "
    }
    else if (statusCode == 507) {
      this.statusResponse = "Insufficient Storage "
    }
    else if (statusCode == 511) {
      this.statusResponse = " Network Authentication Required "
    }
    else {
      this.statusResponse = " "
    }
  }
}