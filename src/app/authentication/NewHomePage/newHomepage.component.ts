import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ProductComponent } from '../product/product.component'
import { OrganizationComponent } from '../organization/organization.component';
import { ApplicationComponent } from '../application/application.component';
import { from } from 'rxjs';
import * as $ from 'jquery'
@Component({
  selector: 'app-newHomepage',
  templateUrl: './newHomepage.component.html',
  styleUrls: ['./newHomepage.component.css']
})
export class NewHomepageComponent implements OnInit {
  IsActive;
  @Output() messageEvent = new EventEmitter<string>();
  IsActiveprod: boolean;
  IsActiveorg: boolean;
  IsActiveapp: boolean;
 
  value: string;

  parentValue = true;
  message: any;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    ////////////////////////////////////
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("topbar1").style.top = "0";
      } else {
        document.getElementById("topbar1").style.top = "-70px";
      }
      prevScrollpos = currentScrollPos;
    }


    ////////////////////////////
    this.IsActive = 1;

    $('#application').css('color','#808080'); 
    $('#application1').css('color','#808080'); 
    $('#orgg').css('color','#808080'); 
    $('#orgg1').css('color','#808080'); 
  }

  receiveMessage($event) {
    this.message = $event
    console.log("this.message ----->", this.message)
    if(this.message == "orgnisation"){
      this.IsActive = 2;
    }else if(this.message == "application"){
      this.IsActive = 3;
    }
    else if(this.message == "back1"){
      this.IsActive = 1;
    }else if(this.message == "back2"){
      this.IsActive = 2;
    }
  }
}
