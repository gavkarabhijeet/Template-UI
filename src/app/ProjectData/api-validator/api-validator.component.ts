import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ok } from 'assert';

@Component({
  selector: 'app-api-validator',
  templateUrl: './api-validator.component.html',
  styleUrls: ['./api-validator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiValidatorComponent implements OnInit {

  statusCode;
  statusResponse;
  responseText;
  validatorData = [];
  p=1;
  // Postman 
  method;
  requestText;

  url;
  authUsername;
  authPassword;
  authorizationToken
  methods=[] ;
  // . ['GET', 'POST', 'PUT', 'DELETE'];
  tab: string[] = ['Authorization', 'Headers', 'Body', 'Response'];
  selectedwallet = this.tab[0];

  //textboxes

  passHeaderUrl: boolean = false;
  headerName = [];
  containers = [];
  addContainer: boolean = false;
  addMore: boolean = true;
  clickAgain: boolean = true;
  firstApiMining;
  showButton:boolean=true;
  status:boolean=false;


  constructor(private router: Router, private _route: ActivatedRoute, private http: HttpClient) {
    this.methods = [
      { name: "GET", value: "GET" },
      { name: "POST", value: "POST" },
      { name: "PUT", value: "PUT" },
      { name: "DELETE", value: "DELETE" },
    ];
   }

  ngOnInit() {
    this.method="GET";
    // code to get the projectName and time while routing
    this._route.params.subscribe((params) => {
      console.log("projectName", params['projectName']);
      // this.projectName = params['projectName'];
      console.log("time", params['timeData']);
      this.showButton=true;

    })


    this.validatorData = [
      {
        'id': 1,
        'url': "https://github.com/jacomyal/sigma.js/issues/200",
      },
      {
        'id': 2,
        'url': "https://www.npmjs.com/package/neo4jd3",
      },
      {
        'id': 3,
        'url': "https://github.com/micwan88/d3js-neo4j-example",
      },
      {
        'id': 4,
        'url': "https://github.com/d3/d3",
      }

    ]

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
    // console.log("authorizationToken = ", authorizationToken)
    console.log("this.headerName = ", this.headerName);
    var headerLength = this.headerName.length;
    if (method == 'GET' && headerLength == 0 && authUsername == undefined && authPassword == undefined) {
      if (url1.includes("/")) {
        var url = url1.replace(/\//g, "%2F")
      }
    }
    else if (method == 'GET' && headerLength == 0 && authUsername != undefined && authPassword != undefined) {
      if (url1.includes("/")) {
        var url = url1.replace(/\//g, "%2F")
      }
    }
    else if (method == 'GET' && headerLength != 0 && authUsername == undefined && authPassword == undefined) {
      this.passHeaderUrl = false;
      for (var l = 0; l < headerLength; l++) {
        if (this.headerName[l].key != undefined && this.headerName[l].value != undefined) {
          this.passHeaderUrl = true;
        }
      }
      if (this.passHeaderUrl == true) {
        if (url1.includes("/")) {
          var url = url1.replace(/\//g, "%2F")
          this.passHeaderUrl = false;
        }
      }
    }
    //POST
    else if (method == 'POST' && headerLength == 0 && authUsername == undefined && authPassword == undefined) {
      var postObject =
      {
        url: url1,
        requestBody: requestText,

      }
    }
    else if (method == 'POST' && headerLength == undefined && authUsername != undefined && authPassword != undefined) {
      var postObjectAuth =
      {
        url: url1,
        requestBody: requestText,
        authUsername: authUsername,
        authPassword: authPassword
      }
    }
    else if (method == 'POST' && headerLength != undefined && authUsername == undefined && authPassword == undefined) {
      var postObjectToken =
      {
        url: url1,
        requestBody: requestText,
        token: authorizationToken
      }
    }
    //POST ends
    else if (method == 'PUT' && headerLength == undefined && authUsername == undefined && authPassword == undefined) {
      var putObject =
      {
        url: url1,
        requestBody: requestText
      }
    }
    else if (method == 'PUT' && headerLength == undefined && authUsername != undefined && authPassword != undefined) {
      var putObjectAuth =
      {
        url: url1,
        requestBody: requestText,
        authUsername: authUsername,
        authPassword: authPassword
      }
    }
    else if (method == 'PUT' && headerLength != undefined && authUsername == undefined && authPassword == undefined) {
      var putObjectToken =
      {
        url: url1,
        requestBody: requestText,
        token: authorizationToken
      }
    }
    //PUT ends

    //DELETE

    else if (method == 'DELETE' && headerLength == undefined && authUsername == undefined && authPassword == undefined) {
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
    else if (method == 'DELETE' && headerLength == undefined && authUsername != undefined && authPassword != undefined) {
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

    else if (method == 'DELETE' && headerLength != undefined && authUsername == undefined && authPassword == undefined) {
      const optionsToken = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          url: url1,
          requestBody: requestText,
          token: authorizationToken
        },
      };
    }
  }
  currentJustify = 'justified';
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

  selectCheckbox(value, event) {
    console.log("Inside selectCheckbox")
    console.log("data = ", value.isChecked);


    console.log("event = ", event.target.value)
    var length = this.validatorData.length;
    for (var i = 0; i < length; i++) {
      if (this.validatorData[i].id == value.id) {
        console.log("inside If ======")
        this.validatorData[i].isChecked = value.isChecked;
        console.log("After , this.validatorData[i] = ", this.validatorData[i])
      }
    }
  }

  submitAPI() {
    console.log("Inside submitAPI");
    console.log("Inside  api = ", this.validatorData)

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
      this.showButton=true;
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

  check(data){
    console.log("data",data.url);
    var lastFive = data.url.substr(data.url.length - 5);
    var firstFive = data.url.substr(8, 3);
    console.log(lastFive);
    console.log(firstFive);
    this.status=true;
    if(firstFive !== 'www'){
      // this.validatorData.push({id:data.id,url:data.url,status:"no"})
      console.log("Not ok")
      console.log("data",this.validatorData);
      for(var i=0;i<this.validatorData.length;i++){
        if(this.validatorData[i].url == data.url){
          this.validatorData.splice(i, 1,{id:data.id,url:data.url,status:"no"});
        }
      }
      // this.validatorData.push({id:data.id,url:data.url,status:"no"})
      console.log("validatorsData",this.validatorData);
    }
    else{
      for(var i=0;i<this.validatorData.length;i++){
        if(this.validatorData[i].url == data.url){
          this.validatorData.splice(i, 1,{id:data.id,url:data.url,status:"ok"});
        }
      }
      // this.validatorData.push({id:data.id,url:data.url,status:"no"})
      console.log("validatorsData",this.validatorData);
    }
  }
  //-------------- Text Boxes functions ends  -----------------------
}
