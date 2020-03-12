import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.css']
})
export class CheckerComponent implements OnInit {
  //pagination
  p: number = 1;

  isEmpty: Boolean = false;
  displaySearch: boolean = true;
  displayDelete: Boolean = false;
  displayApprove: Boolean = true;
  usersDataForApproval = [];
  temp = [];
  displayTable: boolean = true;


  viewForApproval = [];
  viewAccountNumber: any
  viewOrganisation: any
  viewFirstName: any
  viewLastName: any
  viewUATUrl: any
  viewProdUrl: any
  viewIP: any
  viewPort: any
  viewVan: any
  viewClientCode: any
  viewFormatCode: any
  duplicateUserDataForApproval = [];


  constructor(public fb: FormBuilder, public viewModal: NgbModal) {

  }

  ngOnInit() {
    this.initialData();

  }
  /**
   * @author Sucheta
   * @description initialize the data function
   */

  initialData() {
    this.viewForApproval = [
      {
        'no': 1,
        'accountNo': "1234556789",
        'organisation': 'Cateina',
        'firstName': "Deepika",
        'lastName': "Padukone",
        'uatUrl': "http://cateina.com",
        'prodUrl': "http://123.com",
        'status': "Pending",
        'ip': null,
        'port': null,
        'van': null,
        'clientCode': 123,
        'formatCode': 234

      },
      {
        'no': 2,
        'organisation': 'Microsoft',
        'firstName': "Bill",
        'lastName': "Gates",
        'accountNo': "12345522222",
        'uatUrl': "http://microsoft.com",
        'prodUrl': "http://567.com",
        'ip': null,
        'port': null,
        'van': null,
        'clientCode': null,
        'formatCode': null,
        'status': "Pending"


      },
      {
        'no': 3,
        'organisation': 'Google',
        'firstName': "Sundar",
        'lastName': "Pichai",
        'accountNo': "12345522235",
        'uatUrl': "http://google.com",
        'prodUrl': "http://799.com",
        'clientCode': null,
        'formatCode': null,
        'ip': null,
        'port': null,
        'van': null,
        'status': "Pending"
      }
    ]

    this.duplicateUserDataForApproval = this.viewForApproval
  }


  /**
     * @author Sucheta
     * @description view / display User Details function
     * @param :  data 
     */

  viewUser(value, viewDetails) {


    console.log("Inside viewUser")
    this.viewModal.open(viewDetails, { size: 'lg' });

    this.viewAccountNumber = value.accountNo
    this.viewOrganisation = value.organisation
    this.viewFirstName = value.firstName
    this.viewLastName = value.lastName
    this.viewUATUrl = value.uatUrl
    this.viewProdUrl = value.prodUrl
    this.viewIP = value.ip
    this.viewPort = value.port
    this.viewVan = value.van
    this.viewClientCode = value.clientCode
    this.viewFormatCode = value.formatCode

  }

  /**
   * @author Sucheta
   * @description search filter function
   * @param :  event 
   */

  updateFilter(event) {

    console.log("Inside the updateFilter")
    console.log("this.duplicateUserDataForApproval = ", this.duplicateUserDataForApproval)
    this.temp = this.duplicateUserDataForApproval;
    const val = event.target.value.toLowerCase();
    // filter our data based on projectName
    const temp = this.temp.filter(function (d) {
      return d.organisation.toLowerCase().indexOf(val) !== -1 || !val;
    });

    if (temp.length === 0) {

      console.log("If Rejected User")
      this.displayTable = false;
      // this.displayTableRejected = false;
      this.isEmpty = true;
      this.viewForApproval = temp;
    }
    else {
      console.log("Inside else - Rejected")
      // this.isEmptyRejected = false;
      this.displayTable = true;
      this.isEmpty = false;

    }


    // update the rows
    console.log("======= Filter ======")


    console.log("temp.length = ", temp.length)
    console.log("this.Temp.length = ", this.temp.length)
    this.viewForApproval = temp;
    // Whenever the filter changes, always go back to the first page


  }

  /**
   * @author Sucheta
   * @description close the view details Modal function
   */

  closeViewDetails() {
    this.viewModal.dismissAll();
  }

  /**
   * @author Sucheta
   * @description approve the User Details function
   * @param :  data 
   */

  approveUser(value) {

    this.viewForApproval.forEach((item, index) => {

      if (item.accountNo === value.accountNo) {

        item.status = "Approved"
      }
    })
  }
}
