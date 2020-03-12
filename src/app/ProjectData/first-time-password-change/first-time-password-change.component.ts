import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {FirstTimePasswordChangeService} from './first-time-password-change.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-first-time-password-change',
  templateUrl: './first-time-password-change.component.html',
  styleUrls: ['./first-time-password-change.component.css']
})
export class FirstTimePasswordChangeComponent implements OnInit {
  changeData: FormGroup;
  username;
  dataObj;

  constructor(private fb: FormBuilder,  private toastr: ToastrService, private http: HttpClient, private router: Router, private spinner: NgxSpinnerService,private changeService:FirstTimePasswordChangeService) {
    this.changeData = this.fb.group({
      'oldPassword': ['', [Validators.required]],
      'newPassword': ['', [Validators.required]]

    })
   }
   changePassword(data){
    this.username=localStorage.getItem('username'); 
    console.log("this.username",this.username);
    this.dataObj={
      'username':this.username,
      'oldPassword':data.oldPassword,
      'newPassword':data.newPassword,
      'confirmPassword':data.newPassword
    }
    this.changeService.changePassword(this.dataObj).then((data)=>{
      console.log("data",data);
      if(data.message === 'Data Updated in DB')
      {
        this.toastr.success("Password Changed successfully!");
        this.changeData.reset();
        this.changeService.updateUser(this.username).then((data)=>{
            console.log("data",data);
            this.router.navigate(['/ProjectData/ProjectManagement']);
        });
      }
      else{
        this.toastr.error("UserName or Password is incorrect");
        this.changeData.reset();
      }
    })
   }
  ngOnInit() {
    this.username=localStorage.getItem('username'); 
    console.log("this.username",this.username);
  }

}
