import { Component, OnInit , ViewChild, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import {FormGroup,FormBuilder,FormControl,Validators,ReactiveFormsModule} from "@angular/forms";
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  exp = "basicDetails";
  private tabSet: NgbTabset;
  addRegisterData: FormGroup;
  registerData: {};
  @Output() messageEvent = new EventEmitter<string>();
  IsActiveorg: boolean;
  IsActiveapp: boolean;
  IsActiveprod: boolean;
  dataToShow: any;
  dataOfUser: string;
  dataToDisplay: any;

  
  @ViewChild(NgbTabset) set content(content: NgbTabset) {
    this.tabSet = content;
  }
  constructor(private router : Router ,private fb: FormBuilder) { 
    this.addRegisterData = this.fb.group({
      organization: [
        "",
        [
          
          Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&'._]+$/)
        ]
      ],
      accountNumber : ['',[Validators.pattern(/^[A-Z0-9]{22}$/)]],
      amName : ["", [Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
      amMobile : ["", [Validators.pattern(/^[6-9]\d{9}$/)]],
      amEmail : [
        "",
        [
          Validators.pattern(
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
          )
        ]
      ],
      firstNameBusiness : ['',[Validators.pattern(/^[a-zA-Z]{2,}$/)]],
      lastNameBusiness : ['',[Validators.pattern(/^[a-zA-Z]{1,}$/)]],
      mobileNumberBusiness : ['',[Validators.pattern(/^[6-9]\d{9}$/)]],
      emailIdBusiness : ['',[Validators.pattern(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      )]],
      firstNameIt : ['',[Validators.pattern(/^[a-zA-Z]{2,}$/)]],
      lastNameIt : ['',[Validators.pattern(/^[a-zA-Z]{1,}$/)]],
      mobileNumberIt : ['',[Validators.pattern(/^[6-9]\d{9}$/)]],
      emailIdIt : ['',[Validators.pattern(
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      )]]
    })

  }
  
  ngOnInit() {
    $("#orgg2").show()
      $("#orgg3").hide()
      $("#orgg1").hide()
      $("#orgg4").hide()
      $("#app4").hide()
    $("#application1").show()
      $("#app3").hide()
      $("#app2").hide()
    this.dataOfUser = localStorage.getItem("data");

    this.dataToShow = JSON.parse(this.dataOfUser);
    this.dataToDisplay = this.dataToShow;

    $('#selectProd').css('color','#808080'); 
    $('#selectProd1').css('color','#808080'); 
    $('#application').css('color','#808080'); 
    $('#application1').css('color','#808080'); 
    $('#orgg').css('color','white'); 
    $('#orgg1').css('color','white'); 
    $('#circle2').css('background-color','#4E9AF7'); 
    $('#circle2').css('color','white'); 
    $('#circle1').css('background-color','#06142F')
    $('#circle1').html("✓")
    $('#circle1').css({"font-weight": "bold"});
    $('#rightDiv').css("background-image", "url('../../../assets/images/bank2.png')");

    localStorage.setItem("orgAuth","true");
    if(this.exp == "basicDetails"){
      localStorage.setItem("basicFlag","true")
    }

    // for storing data
    if(this.dataToDisplay == null){
      console.log("setting value",this.dataToDisplay);
      this.addRegisterData.controls["organization"].setValue(
        ''
        
      );
      this.addRegisterData.controls["accountNumber"].setValue(
        ''
        
      );
      this.addRegisterData.controls["amName"].setValue(
        ''
        
      );
      this.addRegisterData.controls["amMobile"].setValue(
        ''
        
      );
      this.addRegisterData.controls["amEmail"].setValue(
        ''
        
      );
      this.addRegisterData.controls["firstNameBusiness"].setValue(
        ''
        
      );
      this.addRegisterData.controls["lastNameBusiness"].setValue(
        ''
        
      );
      this.addRegisterData.controls["mobileNumberBusiness"].setValue(
        ''
        
      );
      this.addRegisterData.controls["emailIdBusiness"].setValue(
        ''
        
      );
      this.addRegisterData.controls["firstNameIt"].setValue(
        ''
        
      );
      this.addRegisterData.controls["lastNameIt"].setValue(
        ''
        
      );
      this.addRegisterData.controls["mobileNumberIt"].setValue(
        ''
        
      );
      this.addRegisterData.controls["emailIdIt"].setValue(
        ''
        
      );
    }
    else{
      console.log("into else part",this.dataToDisplay)
      this.addRegisterData.controls["organization"].setValue(
        this.dataToDisplay.organisation
        
      );
      this.addRegisterData.controls["accountNumber"].setValue(
        this.dataToDisplay.bankAccountNumber
        
      );
      this.addRegisterData.controls["amName"].setValue(
        this.dataToDisplay.amName
        
      );
      this.addRegisterData.controls["amMobile"].setValue(
        this.dataToDisplay.amMobile
        
      );
      this.addRegisterData.controls["amEmail"].setValue(
        this.dataToDisplay.emailIdAM
        
      );
      this.addRegisterData.controls["firstNameBusiness"].setValue(
        this.dataToDisplay.firstNameBusinessSpoc
        
      );
      this.addRegisterData.controls["lastNameBusiness"].setValue(
        this.dataToDisplay.lastNameBusinessSpoc
        
      );
      this.addRegisterData.controls["mobileNumberBusiness"].setValue(
        this.dataToDisplay.mobileNumberBusinessSpoc
        
      );
      this.addRegisterData.controls["emailIdBusiness"].setValue(
        this.dataToDisplay.emailIdBusinessSpoc
        
      );
      this.addRegisterData.controls["firstNameIt"].setValue(
        this.dataToDisplay.firstNameITSpoc
        
      );
      this.addRegisterData.controls["lastNameIt"].setValue(
        this.dataToDisplay.lastNameITSpoc
        
      );
      this.addRegisterData.controls["mobileNumberIt"].setValue(
        this.dataToDisplay.mobileNumberITSpoc
        
      );
      this.addRegisterData.controls["emailIdIt"].setValue(
        this.dataToDisplay.emailIdITSpoc
        
      );
      
    }

    
    
  }

  tabChange(event){
    console.log("event",event)
    if(event.nextId == "businessDetails"){
      this.exp = "businessDetails"
    }
    if(event.nextId == "itDetails"){
      this.exp = "itDetails"
    }
    if(event.nextId == "basicDetails"){
      this.exp = "basicDetails"
    }
    if(this.exp == "basicDetails"){
      localStorage.setItem("basicFlag","true")
      localStorage.removeItem("businessFlag")
      localStorage.removeItem("itFlag")
      localStorage.removeItem("orgFlag")
      // $('#orgg1').css('color','red'); 
      $("#orgg2").show()
      $("#orgg3").hide()
      $("#orgg1").hide()
      $("#orgg4").hide()

    }
    if(this.exp == "businessDetails"){
      localStorage.setItem("businessFlag","true")
      localStorage.removeItem("basicFlag")
      localStorage.removeItem("itFlag")
      localStorage.removeItem("orgFlag")
      $("#orgg3").show()
      $("#orgg2").hide()
      $("#orgg1").hide()
      $("#orgg4").hide()

    }
    if(this.exp == "itDetails"){
      localStorage.setItem("itFlag","true")
      localStorage.removeItem("businessFlag")
      localStorage.removeItem("basicFlag")
      localStorage.removeItem("orgFlag")
      $("#orgg4").show()
      $("#orgg3").hide()
      $("#orgg1").hide()
      $("#orgg2").hide()
      
    }
  }

  nextTab2(){
    // to set a flag
    // if(this.tabSet.activeId == "businessDetails"){
    //   localStorage.setItem("businessFlag","true")
    //   localStorage.removeItem("basicFlag")
    //   localStorage.removeItem("itFlag")

    // }
    // to set a flag
    console.log(this.tabSet.activeId);
    if(this.tabSet.activeId == "businessDetails"){
    console.log("next");  
      this.exp = "itDetails";
    }
    
      $("#orgg4").show()
      $("#orgg3").hide()
      $("#orgg1").hide()
      $("#orgg2").hide()
  }
  nextTab(){
    // // to set a flag
    // if(this.tabSet.activeId == "basicDetails"){
    //   localStorage.setItem("basicFlag","true")
    //   localStorage.removeItem("businessFlag")
    //   localStorage.removeItem("itFlag")
    // }
    // // to set a flag
    if(this.tabSet.activeId == "basicDetails"){
      console.log("next");  
        this.exp = "businessDetails";
      }
      $("#orgg3").show()
      $("#orgg2").hide()
      $("#orgg1").hide()
      $("#orgg4").hide()

  }
  nextTab3(){
    // this.router.navigate(['/application']);
    this.messageEvent.next('application');
    
    localStorage.setItem("orgFlag","true")
    $('#selectProd').css('color','#808080'); 
    $('#selectProd1').css('color','#808080'); 
    $('#orgg').css('color','#808080'); 
    $('#orgg1').css('color','#808080');
    $('#application').css('color','white'); 
    $('#application1').css('color','white');
    $('#circle1').html("✓")
    $('#circle2').html("✓")
    $('#circle1').css({"font-weight": "bold"})
    $('#circle2').css({"font-weight": "bold"})
    $('#circle3').css('background-color','#4E9AF7');
    $('#circle3').css('color','white');
    $('#circle1').css('background-color','#06142F'); 
    $('#circle2').css('background-color','#06142F'); 
    $('#circle1').css('color','white'); 
    $('#circle2').css('color','white');
    $('#rightDiv').css("background-image", "url('../../../assets/images/pins4.png')");
    localStorage.setItem("orgname",this.addRegisterData.get('organization').value)

    this.registerData = {
      organisation : this.addRegisterData.get('organization').value,
      bankAccountNumber : this.addRegisterData.get('accountNumber').value,
      amName : this.addRegisterData.get('amName').value,
      amMobile : this.addRegisterData.get('amMobile').value,
      emailIdAM : this.addRegisterData.get('amEmail').value,
      firstNameBusinessSpoc : this.addRegisterData.get('firstNameBusiness').value,
      firstName : this.addRegisterData.get('firstNameBusiness').value,
      lastNameBusinessSpoc : this.addRegisterData.get('lastNameBusiness').value,
      lastName : this.addRegisterData.get('lastNameBusiness').value,
      mobileNumberBusinessSpoc : this.addRegisterData.get('mobileNumberBusiness').value,
      emailIdBusinessSpoc : this.addRegisterData.get('emailIdBusiness').value,
      firstNameITSpoc : this.addRegisterData.get('firstNameIt').value,
      lastNameITSpoc : this.addRegisterData.get('lastNameIt').value,
      mobileNumberITSpoc : this.addRegisterData.get('mobileNumberIt').value,
      emailIdITSpoc : this.addRegisterData.get('emailIdIt').value
    }
    localStorage.setItem("data",JSON.stringify(this.registerData));
  }
  prevTab(){
    // this.router.navigate(['/product']);
    this.messageEvent.next('back1');

    $('#circle1').html("1");
    $('#circle1').css('background-color','#4E9AF7');
    $('#circle2').css('background-color','white');
    $('#circle2').css('color','#D3D2D7');
    $('#selectProd').css('color','white'); 
    $('#selectProd1').css('color','white');
    $('#orgg').css('color','#808080'); 
    $('#orgg1').css('color','#808080');
    $('#application').css('color','#808080'); 
    $('#application1').css('color','#808080'); 
    $('#rightDiv').css("background-image", "url('../../../assets/images/shoppingbag.svg')");

  }
  prevTab2(){
    if(this.tabSet.activeId == "businessDetails"){
      this.exp = "basicDetails"
    }
    $("#orgg2").show()
    $("#orgg3").hide()
    $("#orgg1").hide()
    $("#orgg4").hide()
  }
  prevTab3(){
    if(this.tabSet.activeId == "itDetails"){
      this.exp = "businessDetails"
    }
    $("#orgg3").show()
      $("#orgg2").hide()
      $("#orgg1").hide()
      $("#orgg4").hide()
  }
}
