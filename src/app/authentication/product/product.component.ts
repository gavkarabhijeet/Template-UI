import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  selectFlowFlag1: boolean;
  selectFlowFlag2: boolean;
  selectFlowFlag: boolean;
  nextButton: boolean = true;
  selectFlow1Flag: boolean;
  selectFlow2Flag: boolean;
  selectFlow3Flag: boolean;
  selectFlow4Flag: boolean;
  selectFlow5Flag: boolean;
  selectFlow6Flag: boolean;
  selectFlow7Flag: boolean;
  selectFlow8Flag: boolean;
  IsActiveorg: boolean;
  IsActiveapp: boolean;
  IsActiveprod: boolean;
  @Output() messageEvent = new EventEmitter<string>();
  product1Flag: boolean;

  constructor(private router : Router) { }

  ngOnInit() {
    localStorage.removeItem('data');
    localStorage.removeItem('data2');
    localStorage.setItem("prodAuth","true");

    $(".selectProd12").hide()
    $(".selectProd22").hide()
    $(".selectProd32").hide()
    $(".selectProd42").show()
    $("#orgg1").show()
    $("#orgg2").hide()
      $("#orgg3").hide()
      $("#orgg4").hide()
      $("#app4").hide()
    $("#application1").show()
      $("#app3").hide()
      $("#app2").hide()

    $(".selectProd12").css('color','white'); 
    $(".selectProd22").css('color','white'); 
    $(".selectProd32").css('color','white'); 
    $(".selectProd42").css('color','white');

    console.log(this.selectFlow1Flag)
    var selectFlow1Flag =localStorage.getItem("selectFlow1Flag");
    var selectFlow2Flag =localStorage.getItem("selectFlow2Flag");
    var selectFlow3Flag =localStorage.getItem("selectFlow3Flag");
    var selectFlow4Flag =localStorage.getItem("selectFlow4Flag");
    var selectFlow5Flag =localStorage.getItem("selectFlow5Flag");
    var selectFlow6Flag =localStorage.getItem("selectFlow6Flag");
    var selectFlow7Flag =localStorage.getItem("selectFlow7Flag");
    var selectFlow8Flag =localStorage.getItem("selectFlow8Flag");

    if(selectFlow1Flag == "true"){
      $('#flowimg1').css('border','3px solid #4e9af7'); 
      this.nextButton=false

    }
    if(selectFlow2Flag == "true"){
    $('#flowimg2').css('border','3px solid #4e9af7'); 
    
    this.nextButton=false
    this.product1Flag=true;

      
    }if(selectFlow3Flag == "true"){
    $('#flowimg3').css('border','3px solid #4e9af7'); 
    this.nextButton=false

      
    }if(selectFlow4Flag == "true"){
    $('#flowimg4').css('border','3px solid #4e9af7'); 
    this.nextButton=false
      
    }if(selectFlow5Flag == "true"){
    $('#flowimg5').css('border','3px solid #4e9af7'); 
    this.nextButton=false
    $(".selectProd12").show()
    $(".selectProd22").hide()
    $(".selectProd32").hide()
    $(".selectProd42").hide()
      
    }if(selectFlow6Flag == "true"){
    $('#flowimg6').css('border','3px solid #4e9af7'); 
    this.nextButton=false
    $(".selectProd12").hide()
    $(".selectProd22").show()
    $(".selectProd32").hide()
    $(".selectProd42").hide()
    }if(selectFlow7Flag == "true"){
      this.product1Flag=true;
      $(".selectProd12").hide()
      $(".selectProd22").hide()
      $(".selectProd32").show()
      $(".selectProd42").hide()
      console.log("in")
    $('#flowimg7').css('border','3px solid #4e9af7'); 
    this.nextButton=false
      
    }if(selectFlow8Flag == "true"){
    $('#flowimg8').css('border','3px solid #4e9af7'); 
    this.nextButton=false
      
    }
    

  }

  nextTab($event){
   
    console.log("In Recive Message Event===>",$event)
    this.messageEvent.next('orgnisation');

    console.log("after this.IsActiveorg ==== >>>",this.IsActiveorg)
    
    console.log("next tab")
    $('#selectProd').css('color','#808080'); 
    $('#selectProd12').css('color','#808080'); 
    $(".selectProd12").css('color','#808080'); 
    $(".selectProd22").css('color','#808080'); 
    $(".selectProd32").css('color','#808080'); 
    $(".selectProd42").css('color','#808080'); 
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
  }
  selectFlow1(){
    this.selectFlowFlag=true;
    this.product1Flag=false;
    localStorage.setItem("selectFlow1Flag","true");
    localStorage.removeItem("selectFlow2Flag"); 
    localStorage.removeItem("selectFlow3Flag");
    localStorage.removeItem("selectFlow4Flag"); 
   

    // this.selectFlow1Flag=true;
    $('#flowimg1').css('border','3px solid #4e9af7'); 
    $('#flowimg2').css('border','none'); 
    $('#flowimg3').css('border','none'); 
    $('#flowimg4').css('border','none'); 
    console.log("here")
    this.checkSelect()

  }
  selectFlow2(){
    this.selectFlowFlag=true;
    this.selectFlow2Flag=true;
    this.product1Flag=true;

    localStorage.setItem("selectFlow2Flag","true");
    localStorage.removeItem("selectFlow1Flag"); 
    localStorage.removeItem("selectFlow3Flag");
    localStorage.removeItem("selectFlow4Flag"); 

    $('#flowimg2').css('border','3px solid #4e9af7'); 
     $('#flowimg1').css('border','none'); 
    $('#flowimg3').css('border','none'); 
    $('#flowimg4').css('border','none'); 
    this.checkSelect()
    

  }
  selectFlow3(){
    this.selectFlowFlag=true;
    this.selectFlow3Flag=true;
    this.product1Flag=false;

    localStorage.setItem("selectFlow3Flag","true");
    localStorage.removeItem("selectFlow2Flag"); 
    localStorage.removeItem("selectFlow1Flag");
    localStorage.removeItem("selectFlow4Flag"); 
    $('#flowimg3').css('border','3px solid #4e9af7'); 
     $('#flowimg1').css('border','none'); 
    $('#flowimg2').css('border','none'); 
    $('#flowimg4').css('border','none'); 

    this.checkSelect()
    

  }
  selectFlow4(){
    this.selectFlowFlag=true;
    this.selectFlow4Flag=true;
    localStorage.setItem("selectFlow4Flag","true");
    localStorage.removeItem("selectFlow2Flag"); 
    localStorage.removeItem("selectFlow3Flag");
    localStorage.removeItem("selectFlow1Flag"); 
    $('#flowimg4').css('border','3px solid #4e9af7'); 
    $('#flowimg1').css('border','none'); 
    $('#flowimg2').css('border','none'); 
    $('#flowimg3').css('border','none'); 
    this.checkSelect()
    

  }
  selectFlow5(){
    this.selectFlowFlag2=true;
    this.selectFlow5Flag=true;
    $(".selectProd12").show()
    $(".selectProd22").hide()
    $(".selectProd32").hide()
    $(".selectProd42").hide()

    localStorage.setItem("selectFlow5Flag","true");
    localStorage.removeItem("selectFlow6Flag"); 
    localStorage.removeItem("selectFlow7Flag");
    localStorage.removeItem("selectFlow8Flag"); 
    $('#flowimg5').css('border','3px solid #4e9af7');
    $('#flowimg6').css('border','none'); 
    $('#flowimg7').css('border','none'); 
    $('#flowimg8').css('border','none');  
    this.checkSelect()

  }
  selectFlow6(){
    this.selectFlowFlag2=true;
    this.selectFlow6Flag=true;
    localStorage.setItem("selectFlow6Flag","true");
    localStorage.removeItem("selectFlow5Flag"); 
    localStorage.removeItem("selectFlow7Flag");
    localStorage.removeItem("selectFlow8Flag"); 
    $(".selectProd12").hide()
    $(".selectProd22").show()
    $(".selectProd32").hide()
    $(".selectProd42").hide()
    $('#flowimg6').css('border','3px solid #4e9af7'); 
    $('#flowimg5').css('border','none'); 
    $('#flowimg7').css('border','none'); 
    $('#flowimg8').css('border','none'); 
    this.checkSelect()

  }
  selectFlow7(){
    this.selectFlowFlag2=true;
    this.selectFlow7Flag=true;
    localStorage.setItem("selectFlow7Flag","true");
    localStorage.removeItem("selectFlow6Flag"); 
    localStorage.removeItem("selectFlow5Flag");
    localStorage.removeItem("selectFlow8Flag"); 
    $('#flowimg7').css('border','3px solid #4e9af7'); 
    $('#flowimg5').css('border','none'); 
    $('#flowimg6').css('border','none'); 
    $('#flowimg8').css('border','none'); 
    $(".selectProd12").hide()
    $(".selectProd22").hide()
    $(".selectProd32").show()
    $(".selectProd42").hide()
    this.checkSelect()

  }
  selectFlow8(){
    this.selectFlowFlag2=true;
    this.selectFlow8Flag=true;
    localStorage.setItem("selectFlow8Flag","true");
    localStorage.removeItem("selectFlow6Flag"); 
    localStorage.removeItem("selectFlow7Flag");
    localStorage.removeItem("selectFlow5Flag"); 
    $('#flowimg8').css('border','3px solid #4e9af7'); 
    $('#flowimg5').css('border','none'); 
    $('#flowimg6').css('border','none'); 
    $('#flowimg7').css('border','none'); 
    this.checkSelect()

  }
  checkSelect(){
    if(this.selectFlowFlag ==true && this.selectFlowFlag2==true ){
      console.log("ok")
      this.nextButton=false
      

    }
  }

}
