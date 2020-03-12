import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserListService } from './user-list.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isEmpty: Boolean = false;
  displaySearch: Boolean = true;
  displayDelete: Boolean = false;
  displayApprove: Boolean = true;
  usersDataForApproval = [];
  temp = [];
  displayTable: boolean = true;

  //Approved
  editUserDetailsForm: FormGroup
  editAccountNo: any
  editOrganisation: any
  editUatUrl: any
  editProdUrl: any
  editClientCode: any
  editFormatCode: any

  viewAccountNumber: any
  viewOrganisation: any
  viewUATUrl: any
  viewProdUrl: any
  viewClientCode: any
  viewFormatCode: any
  accountNoForEditCompare: any


  usersApprovedData = [];

  //Pending
  enterDetailsForm: FormGroup;
  enteredAccountNo: any
  enteredOrganisation: any
  enteredUatUrl: any
  enteredProdUrl: any
  enterClientCode: any
  enterFormatCode: any
  accountNoForEnterCompare: any
  usersPendingData = [];
  removeFromPendingIndex: any

  //Rejected
  rejectedUsersData = [];
  removeFromRejectedIndex
  rejectedAccountNumber
  rejectedOrganisation
  rejectedUATUrl
  rejectedProdUrl
  rejectedClientCode
  rejectedFormatCode
  rejectedDulplicateArray = []   //for returning to the previous value when filtering
  approvedDuplicateArray = [];   //for returning to the previous value when filtering
  pendingDuplicateArray = [];    //for returning to the previous value when filtering

  newStatus = ["Pending", "Approved"]
  changedStatus: any


  isEmptyApproved: boolean = false;
  displayTableApproved: boolean = true;

  isEmptyPending: boolean = false;
  displayTablePending: boolean = true;

  isEmptyRejected: boolean = false;
  displayTableRejected: boolean = true;

  //tabs

  tabsInitialized: boolean = false;



  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService,
    private userService: UserListService, private viewModalService: NgbModal,
    private editModalService: NgbModal, private approveModalService: NgbModal,
    private rejectedModalService: NgbModal, private changeStatusService: NgbModal) {

    this.editUserDetailsForm = this.fb.group({

      'editAccountNo': ['', [Validators.required]],
      'editOrganisation': ['', [Validators.required]],
      'editUatUrl': ['', [Validators.required]],
      'editProdUrl': ['', [Validators.required]],
      'editClientCode': ['', [Validators.required]],
      'editFormatCode': ['', [Validators.required]]
    })

    this.enterDetailsForm = this.fb.group({
      'enteredAccountNo': [{ value: '', disabled: true }, [Validators.required]],
      'enteredOrganisation': [{ value: '', disabled: true }, [Validators.required]],
      'enteredUatUrl': [{ value: '', disabled: true }, [Validators.required]],
      'enteredProdUrl': [{ value: '', disabled: true }, [Validators.required]],
      'enterClientCode': ['', [Validators.required]],
      'enterFormatCode': ['', [Validators.required]]

    })


  }

  /**
   * @author Sanchita
   * @param event 
   * @description This function will be called to search for a user 
   */
  @ViewChild('tabRef') public tabRef: NgbTabset;

  ngAfterViewInit() {
    this.tabsInitialized = true;
  }

  intialData() {


    this.usersApprovedData = [
      {
        'accountNo': "1234556789",
        'firstName': "Alia",
        'lastName': "Bhatt",
        'organisation': "Cateina",
        'uatUrl': "http://cateina.com",
        'prodUrl': "http://123.com",
        'status': "Approved",
        'clientCode': 123,
        'formatCode': 234

      },
      {
        'accountNo': "121234789",
        'firstName': "Suchheta",
        'lastName': "Srivastav",
        'organisation': "Cateina",
        'uatUrl': "http://cateina.com",
        'prodUrl': "http://1123.com",
        'status': "Approved",
        'clientCode': 1223,
        'formatCode': 2334

      }
    ]

    this.usersPendingData = [
      {
        'firstName': "Bill",
        'lastName': "Gates",
        'accountNo': "12345522222",
        'organisation': "Microsoft",
        'uatUrl': "http://microsoft.com",
        'prodUrl': "http://567.com",
        'status': "Pending",
        'clientCode': null,
        'formatCode': null
      },
      {
        'firstName': "Sundar",
        'lastName': "Pichai",
        'accountNo': "12345522235",
        'organisation': "Google",
        'uatUrl': "http://google.com",
        'prodUrl': "http://799.com",
        'status': "Pending",
        'clientCode': null,
        'formatCode': null
      },
      {
        'firstName': "Elon",
        'lastName': "Musk",
        'accountNo': "123455222312",
        'organisation': "Tesla",
        'uatUrl': "http://tesla.com",
        'prodUrl': "http://5124.com",
        'status': "Pending",
        'clientCode': null,
        'formatCode': null
      }
    ]

    this.approvedDuplicateArray = this.usersApprovedData;
    this.pendingDuplicateArray = this.usersPendingData;
    this.rejectedDulplicateArray = this.rejectedUsersData;

  }

  updateFilter(event) {

    console.log("Inside the updateFilter")
    this.temp = this.usersApprovedData;
    const val = event.target.value.toLowerCase();
    // filter our data based on projectName
    const temp = this.temp.filter(function (d) {
      return d.organisation.toLowerCase().indexOf(val) !== -1 || !val;
    });
    if (temp.length === 0) {

      console.log("if the users approved data")
      //--------------------  Once again for Pending --------------------
      this.temp = (this.usersPendingData);
      const val = event.target.value.toLowerCase();
      // filter our data based on projectName
      const temp = this.temp.filter(function (d) {
        return d.organisation.toLowerCase().indexOf(val) !== -1 || !val;
      });
      if (temp.length === 0) {
        console.log("If Pending data ")
        // ====================  Once again for Rejected   ===============

        this.temp = this.rejectedUsersData;
        const val = event.target.value.toLowerCase();
        // filter our data based on projectName
        const temp = this.temp.filter(function (d) {
          return d.organisation.toLowerCase().indexOf(val) !== -1 || !val;
        });
        if (temp.length === 0) {

          console.log("If Rejected User")
          this.isEmptyRejected = true;
          this.displayTableRejected = false;
          this.rejectedUsersData = temp;
        }
        else {
          console.log("Inside else - Rejected")
          this.isEmptyRejected = false;
          this.displayTableRejected = true;
          this.tabRef.select('tabRejected');
          this.rejectedUsersData = temp
          // return;
        }
      }
      else {

        console.log("Else Pending data")
        this.isEmptyPending = false;
        this.displayTablePending = true;
        this.tabRef.select('tabPending');
        this.usersPendingData = temp
        // return;
      }
    }
    else {
      console.log("Else Approved data")
      this.isEmptyApproved = false;
      this.displayTableApproved = true;
      this.tabRef.select('tabApprove');

      this.usersApprovedData = this.approvedDuplicateArray;
      this.usersPendingData = this.pendingDuplicateArray;
      this.rejectedUsersData = this.rejectedDulplicateArray;
      // return;
    }
    // update the rows
    console.log("======= Filter ======")

    console.log("this.usersApprovedData  =  ", this.usersApprovedData)
    console.log("this.usersPendingData = ", this.usersPendingData)
    console.log("this.rejectedUsersData = ", this.rejectedUsersData)
    console.log("temp.length = ", temp.length)
    console.log("this.Temp.length = ", this.temp.length)
    // this.usersDataForApproval = temp;
    // Whenever the filter changes, always go back to the first page
  }
  /**
   * @author Sanchita
   * @param userInformation
   * @description This function will be called on approve user button 
   *    */
  approvedUser(userInformation) {
    console.log("data", userInformation);
    this.userService.approveUserAccount(userInformation.username).then((data) => {
      console.log("console.log", data);
      this.getData();
    })
    this.displayApprove = false;
    this.displayDelete = true;
  }

  approvedUserDelete(data) {
    console.log("data", data);
  }
  openData(data) {
    console.log("data", data);
  }
  /**
   * @uthor Sanchita
   * @description This function will be executed on page load 
   */



  ngOnInit() {

    this.intialData();
    this.userService.getAllUSers().then((data) => {
      console.log("data", data);
      this.usersDataForApproval = data;
      console.log("this.usersDataForApproval", this.usersDataForApproval);

      if (this.usersDataForApproval.length === 0) {
        this.displaySearch = false;
        this.isEmpty = true;
      }
      else {
        this.isEmpty = false;
        this.displaySearch = true;
        this.displayTable = true;
        for (var i = 0; i < this.usersDataForApproval.length; i++) {
          for (var j = 0; j < this.usersDataForApproval[0].roles.length; j++) {
            if (this.usersDataForApproval[i].roles[j] === 'admin') {
              this.usersDataForApproval.splice(i, 1);
            }
          }
        }
      }
    })

    this.displayCondition();
  }
  /**
   * @author Sanchita
   * @description This function will be called to get the latest data from the database
   */
  getData() {
    this.userService.getAllUSers().then((data) => {
      console.log("data", data);
      this.usersDataForApproval = data;
      console.log("this.usersDataForApproval", this.usersDataForApproval);

      if (this.usersDataForApproval.length === 0) {
        this.displaySearch = false;
        this.isEmpty = true;
      }
      else {
        this.isEmpty = false;
        this.displaySearch = true;
        this.displayTable = true;
        for (var i = 0; i < this.usersDataForApproval.length; i++) {
          for (var j = 0; j < this.usersDataForApproval[0].roles.length; j++) {
            if (this.usersDataForApproval[i].roles[j] === 'admin') {
              this.usersDataForApproval.splice(i, 1);
            }
          }
        }
      }
    })
  }



  /**
      * @author Suchheta
      * @param value {projectName, version, contentEdit }
      * @description  to Open the view Details Modal
      */
  viewDetails(value, contentView) {
    console.log("Inside viewDetails ")
    console.log("data = ", value.accountNo, " , ", value.organisation)
    this.viewModalService.open(contentView, { size: 'lg' });
    this.viewAccountNumber = value.accountNo;
    this.viewOrganisation = value.organisation;
    this.viewUATUrl = value.uatUrl;
    this.viewProdUrl = value.prodUrl;
    this.viewClientCode = value.clientCode
    this.viewFormatCode = value.formatCode


  }

  closeViewDetails() {
    this.viewModalService.dismissAll();
  }

  /**
  * @author Suchheta
  * @param value {projectName, version, contentEdit }
  * @description  to Open the Edit Details Modal
  */

  editDetails(value, contentEdit) {
    console.log("Inside editDetails ")
    console.log("data = ", value.accountNo, " , ", value.organisation)
    this.editModalService.open(contentEdit, { size: 'lg' });

    this.accountNoForEditCompare = value.accountNo;


    this.editUserDetailsForm.controls['editAccountNo'].setValue(value.accountNo);
    this.editUserDetailsForm.controls['editOrganisation'].setValue(value.organisation);
    this.editUserDetailsForm.controls['editUatUrl'].setValue(value.uatUrl);
    this.editUserDetailsForm.controls['editProdUrl'].setValue(value.prodUrl);
    this.editUserDetailsForm.controls['editClientCode'].setValue(value.clientCode);
    this.editUserDetailsForm.controls['editFormatCode'].setValue(value.formatCode);




  }

  submitUserEditDetails(value) {
    console.log("Inside submitUserEditDetails")
    console.log("value = ", value)
    for (let i = 0; i < this.usersApprovedData.length; i++) {

      if (this.usersApprovedData[i].accountNo == this.accountNoForEditCompare) {
        console.log("Inside If")
        this.usersApprovedData[i].accountNo = value.editAccountNo;
        this.usersApprovedData[i].organisation = value.editOrganisation;
        this.usersApprovedData[i].uatUrl = value.editUatUrl;
        this.usersApprovedData[i].prodUrl = value.editProdUrl;
        this.usersApprovedData[i].clientCode = value.editClientCode;
        this.usersApprovedData[i].formatCode = value.editFormatCode;

      }
    }
    console.log("this.usersApprovedData = ", this.usersApprovedData)
    this.editModalService.dismissAll();

  }



  pendingUser(value, contentApprove) {
    console.log("Inside pendingUser ")
    console.log("data = ", value.accountNo, " , ", value.organisation)
    this.approveModalService.open(contentApprove, { size: 'lg' });

    this.accountNoForEnterCompare = value.accountNo;

    this.enterDetailsForm.controls['enteredAccountNo'].setValue(value.accountNo);
    this.enterDetailsForm.controls['enteredOrganisation'].setValue(value.organisation);
    this.enterDetailsForm.controls['enteredUatUrl'].setValue(value.uatUrl);
    this.enterDetailsForm.controls['enteredProdUrl'].setValue(value.prodUrl);
    this.enterDetailsForm.controls['enterClientCode'].setValue(value.clientCode);
    this.enterDetailsForm.controls['enterFormatCode'].setValue(value.formatCode);
  }


  displayCondition() {

    if (this.usersApprovedData.length == 0) {

      this.isEmptyApproved = true;
      this.displayTableApproved = false;
    }
    if (this.usersApprovedData.length != 0) {
      this.isEmptyApproved = false;
      this.displayTableApproved = true;

    }

    if (this.usersPendingData.length == 0) {

      this.isEmptyPending = true;
      this.displayTablePending = false;
    }

    if (this.usersPendingData.length != 0) {
      this.isEmptyPending = false;
      this.displayTablePending = true;
    }
    if (this.rejectedUsersData.length == 0) {
      this.isEmptyRejected = true;
      this.displayTableRejected = false;
    }

    if (this.rejectedUsersData.length != 0) {

      this.isEmptyRejected = false;
      this.displayTableRejected = true;
    }
  }

  enterUserDetails(value) {

    this.usersPendingData.forEach((object, index) => {

      if (object.accountNo == this.accountNoForEnterCompare) {
        console.log("Inside if of enter details")
        console.log("object.accountNo = ", object.accountNo)
        this.removeFromPendingIndex = index;

        object.clientCode = value.clientCode;
        object.formatCode = value.formatCode;
        object.status = "Approved"

        //appending the array to the start of Pending data
        var start_index = 0;
        var number_of_elements_to_remove = 0;
        this.usersApprovedData.splice(start_index, number_of_elements_to_remove, object);
        console.log("After splice ,this.usersApprovedData = ", this.usersApprovedData);

        this.approvedDuplicateArray = this.usersApprovedData;

      }

    })
    //removing the element from the pending array and placing in approved.
    var dummyPendingArray = this.usersPendingData
    dummyPendingArray = this.usersPendingData.splice(this.removeFromPendingIndex, 1)
    console.log("After splice = ", this.usersPendingData)

    console.log("Remove the data = ", dummyPendingArray)
    console.log("Pending User data = ", this.usersPendingData)

    this.pendingDuplicateArray = this.usersPendingData;

    this.displayCondition();

    this.approveModalService.dismissAll();
  }



  rejectUser(value) {

    this.usersPendingData.forEach((object, index) => {

      if (object.accountNo == value.accountNo) {
        console.log("Inside if of enter details")
        console.log("object.accountNo = ", object.accountNo)
        this.removeFromRejectedIndex = index;

        object.status = "Rejected"

        //appending the array to the start of Rejected data
        var start_index = 0;
        var number_of_elements_to_remove = 0;
        this.rejectedUsersData.splice(start_index, number_of_elements_to_remove, object);
        console.log("After splice ,this.rejectedUsersData = ", this.rejectedUsersData);
        this.rejectedDulplicateArray = this.rejectedUsersData
      }

    })

    //removing the element from the pending array and placing in approved.
    var dummyPendingArray = this.usersPendingData
    dummyPendingArray = this.usersPendingData.splice(this.removeFromRejectedIndex, 1)

    console.log("Remove the data = ", dummyPendingArray)
    console.log("After splice, Pending User data = ", this.usersPendingData)

    this.pendingDuplicateArray = this.usersPendingData;
    this.displayCondition();
  }

  viewRejectedDetails(value, contentViewReject) {

    console.log("Inside viewRejectedDetails")
    this.rejectedModalService.open(contentViewReject, { size: 'lg' });

    this.rejectedAccountNumber = value.accountNo;
    this.rejectedOrganisation = value.organisation;
    this.rejectedUATUrl = value.uatUrl;
    this.rejectedProdUrl = value.prodUrl;
    this.rejectedClientCode = value.clientCode
    this.rejectedFormatCode = value.formatCode
  }

  changeStatusValue(value) {

    this.changedStatus = value
  }

  accountNoForChangeStatusCompare
  removeFromChangeStatusIndex

  changeStatus(value, contentChange) {

    console.log("Inside viewRejectedDetails")
    this.changeStatusService.open(contentChange, { size: 'lg' });

    this.accountNoForChangeStatusCompare = value.accountNo;
  }

  changeRejectDetails() {
    console.log("Inside changeRejectDetails")
    console.log("Status = ", this.changedStatus)

    if (this.changedStatus === "Approved") {
      this.rejectedUsersData.forEach((object, index) => {

        if (object.accountNo == this.accountNoForChangeStatusCompare) {
          console.log("Inside if of enter details")
          console.log("object.accountNo = ", object.accountNo)
          this.removeFromChangeStatusIndex = index;

          object.status = "Approved"

          //appending the array to the start of Rejected data
          var start_index = 0;
          var number_of_elements_to_remove = 0;
          this.usersApprovedData.splice(start_index, number_of_elements_to_remove, object);
          console.log("After splice ,this.rejectedUsersData = ", this.rejectedUsersData);
        }

      })

      //removing the element from the pending array and placing in approved.
      var dummyArray;
      dummyArray = this.rejectedUsersData.splice(this.removeFromChangeStatusIndex, 1)

      console.log("Remove the data = ", dummyArray)
      console.log("After splice, Pending User data = ", this.rejectedUsersData)

      this.displayCondition();
    }
    else if (this.changedStatus === "Pending") {

      this.rejectedUsersData.forEach((object, index) => {

        if (object.accountNo == this.accountNoForChangeStatusCompare) {
          console.log("Inside if of enter details")
          console.log("object.accountNo = ", object.accountNo)
          this.removeFromChangeStatusIndex = index;

          object.status = "Pending"

          //appending the array to the start of Rejected data
          var start_index = 0;
          var number_of_elements_to_remove = 0;
          this.usersPendingData.splice(start_index, number_of_elements_to_remove, object);
          console.log("After splice ,this.rejectedUsersData = ", this.usersPendingData);
          this.pendingDuplicateArray = this.usersPendingData;

        }

      })

      //removing the element from the pending array and placing in approved.
      var dummyPendingArray = [];
      dummyPendingArray = this.rejectedUsersData.splice(this.removeFromChangeStatusIndex, 1)

      console.log("Remove the data = ", dummyPendingArray)
      console.log("After splice, Rejected User data = ", this.rejectedUsersData)
      this.rejectedDulplicateArray = this.rejectedUsersData
      this.displayCondition();
    }

    this.changeStatusService.dismissAll();
  }


}
