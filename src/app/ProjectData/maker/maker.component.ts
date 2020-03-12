import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { makerService } from './maker.service'


@Component({
  selector: 'app-maker',
  templateUrl: './maker.component.html',
  styleUrls: ['./maker.component.css'],
  providers: [makerService]
})
export class MakerComponent implements OnInit {

  //pagination
  p: number = 1;

  isEmpty: boolean = false;
  usersDataForApproval = []
  temp = [];

  //view
  enterDetailsForm: FormGroup
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
  viewClientCodeProfunds: any
  viewFormatCodeProfunds: any
  //edit
  accountNoForEditCompare
  editUserDetailsForm: FormGroup
  displayTable: boolean = true;
  displaySearch: boolean = true;


  duplicateUsersDataForApproval = [];

  constructor(public fb: FormBuilder, private viewModal: NgbModal,
    public makerService: makerService, private editModal: NgbModal) {


    this.editUserDetailsForm = this.fb.group({

      'editAccountNo': [{ value: '', disabled: true }, [Validators.required]],
      'editOrganisation': [{ value: '', disabled: true }, [Validators.required]],
      'editFirstName': [{ value: '', disabled: true }, [Validators.required]],
      'editLastName': [{ value: '', disabled: true }, [Validators.required]],
      'editUatUrl': [{ value: '', disabled: true }, [Validators.required]],
      'editProdUrl': [{ value: '', disabled: true }, [Validators.required]],
      'editIP': [{ value: '', disabled: true }, [Validators.required]],
      'editPort': [{ value: '', disabled: true }, [Validators.required]],
      'editVan': [{ value: '', disabled: true }, [Validators.required]],
      'editClientCode': ['', [Validators.required]],
      'editFormatCode': ['', [Validators.required]],
      'editClientCodeProfunds': ['', [Validators.required]],
      'editFormatCodeProfunds': ['', [Validators.required]]
    })


    this.enterDetailsForm = this.fb.group({
      'enteredAccountNo': [{ value: '', disabled: true }, [Validators.required]],
      'enteredOrganisation': [{ value: '', disabled: true }, [Validators.required]],
      'enteredFirstName': [{ value: '', disabled: true }, [Validators.required]],
      'enteredLastName': [{ value: '', disabled: true }, [Validators.required]],
      'enteredUatUrl': [{ value: '', disabled: true }, [Validators.required]],
      'enterProdUrl': [{ value: '', disabled: true }, [Validators.required]],
      'enteredIP': [{ value: '', disabled: true }, [Validators.required]],
      'enteredPort': [{ value: '', disabled: true }, [Validators.required]],
      'enteredVan': [{ value: '', disabled: true }, [Validators.required]],
      'enterClientCode': ['', [Validators.required]],
      'enterFormatCode': ['', [Validators.required]]

    })


    this.usersDataForApproval = [
      {
        'no': 1,
        'accountNo': "1234556789",
        'organisation': 'Cateina',
        'firstName': "Deepika",
        'lastName': "Padukone",
        'uatUrl': "http://cateina.com",
        'prodUrl': "http://123.com",
        'status': "Approved",
        'ip': '192.168.5.140',
        'port': '4300',
        'van': '1234',
        'clientCode': 123,
        'formatCode': 234,
        'clientCodeProfunds': null,
        'formatCodeProfunds': null

      },
      {
        'no': 2,
        'organisation': 'Microsoft',
        'firstName': "Bill",
        'lastName': "Gates",
        'accountNo': "12345522222",
        'uatUrl': "http://microsoft.com",
        'prodUrl': "http://567.com",
        'ip': '192.168.5.140',
        'port': '4300',
        'van': '1234',
        'clientCode': null,
        'formatCode': null,
        'clientCodeProfunds': null,
        'formatCodeProfunds': null


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
        'ip': '192.168.5.140',
        'port': '4300',
        'van': '1234',
        'clientCodeProfunds': null,
        'formatCodeProfunds': null
      }
    ]
  }

  ngOnInit() {

    this.duplicateUsersDataForApproval = this.usersDataForApproval;
  }


  /**
   * @author Sucheta
   * @description get Data function
   * @param event 
   */

  getData() {

    this.makerService.getMakerData().then((makerData) => {

      makerData.forEach((element, index) => {

        this.usersDataForApproval.push({
          'no': index,
          'accountNo': "1234556789",
          'organisation': 'Cateina',
          'firstName': "Deepika",
          'lastName': "Padukone",
          'uatUrl': "http://cateina.com",
          'prodUrl': "http://123.com",
          'status': "Approved",
          'ip': '192.168.5.140',
          'port': '4300',
          'van': '1234',
          'clientCode': 123,
          'formatCode': 234,
          'clientCodeProfunds': null,
          'formatCodeProfunds': null
        })
      });
      this.usersDataForApproval = [
        {
          'no': 1,
          'accountNo': "1234556789",
          'organisationName': 'Cateina',
          'firstName': "Deepika",
          'lastName': "Padukone",
          'mobileNumber': 'mobileNumber',
          'email': 'email',
          'IFSCCode':'IFSCCode',
          'creditAccountNumber': 'creditAccountNumber',
          'businessSpocName': 'businessSpocName',
          'businessSpocMobileNumber': 'businessSpocMobileNumber',
          'ITSpocName': 'ITSpocName',
          'ITSpocMobileNumber': 'ITSpocMobileNumber',
          'webService': 'webService',
          'uatUrl': "http://cateina.com",
          'prodUrl': "http://123.com",
          'status': "Approved",
          'uatPublicIP': '192.168.5.140',
          'uatPortNo': '4300',
          'vanNo': '1234',
          'clientCode': 123,
          'formatCode': 234,
          'clientCodeProfunds': null,
          'formatCodeProfunds': null

        }]

    })
    

  }


  /**
   * @author Sucheta
   * @description Search filter function
   * @param event 
   */

  updateFilter(event) {

    console.log("Inside the updateFilter")
    console.log("this.duplicateUserDataForApproval = ", this.duplicateUsersDataForApproval)
    this.temp = this.duplicateUsersDataForApproval;
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
      this.usersDataForApproval = temp;
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
    this.usersDataForApproval = temp;
    // Whenever the filter changes, always go back to the first page


  }


  /**
   * @author Sucheta
   * @description view / display User Details function
   * @param :  data , ModalValue 
   */


  viewUser(value, viewModal1) {

    console.log("Inside editDetails ")
    console.log("data = ", value.accountNo, " , ", value.organisation)
    this.viewModal.open(viewModal1, { size: 'lg' });


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
  * @description close the view User Details function
  */

  closeViewDetails() {

    this.viewModal.dismissAll();
  }

  /**
  * @author Sucheta
  * @description edit User Details function
  * @param :  data , ModalValue 
  */

  editUser(value, editModal1) {

    console.log("Inside editUser ")
    console.log("data = ", value.accountNo, " , ", value.organisation)
    this.editModal.open(editModal1, { size: 'lg' });

    this.accountNoForEditCompare = value.accountNo;

    this.editUserDetailsForm.controls['editAccountNo'].setValue(value.accountNo);
    this.editUserDetailsForm.controls['editOrganisation'].setValue(value.organisation);
    this.editUserDetailsForm.controls['editUatUrl'].setValue(value.uatUrl);
    this.editUserDetailsForm.controls['editProdUrl'].setValue(value.prodUrl);
    this.editUserDetailsForm.controls['editClientCode'].setValue(value.clientCode);
    this.editUserDetailsForm.controls['editFormatCode'].setValue(value.formatCode);
    this.editUserDetailsForm.controls['editIP'].setValue(value.ip);
    this.editUserDetailsForm.controls['editPort'].setValue(value.port);
    this.editUserDetailsForm.controls['editVan'].setValue(value.van);
    this.editUserDetailsForm.controls['editLastName'].setValue(value.lastName);
    this.editUserDetailsForm.controls['editFirstName'].setValue(value.firstName)
    this.editUserDetailsForm.controls['editClientCodeProfunds'].setValue(value.clientCodeProfunds);
    this.editUserDetailsForm.controls['editFormatCodeProfunds'].setValue(value.formatCodeProfunds)



  }


  /**
  * @author Sucheta
  * @description submit the edited User Details function
  * @param :  data 
  */

  submitUserDetails(value) {
    console.log("Inside submitUserEditDetails")
    console.log("value = ", value)
    for (let i = 0; i < this.usersDataForApproval.length; i++) {

      if (this.usersDataForApproval[i].accountNo == this.accountNoForEditCompare) {
        console.log("Inside If")

        this.usersDataForApproval[i].clientCode = value.editClientCode;
        this.usersDataForApproval[i].formatCode = value.editFormatCode;
        this.usersDataForApproval[i].clientCodeProfunds = value.editClientCodeProfunds
        this.usersDataForApproval[i].formatCodeProfunds = value.editFormatCodeProfunds


      }
    }
    console.log("this.usersApprovedData = ", this.usersDataForApproval)
    this.editModal.dismissAll();

  }

  /**
   * @author Sucheta
   * @description approve User Details function
   * @param :  data 
   */
  sendForApproval(data) {
    console.log("inside send for approval")

    var approvalObject = {
      "projectId": data.projectId,
      "makerApproval": "true",
      "status": "Sent-For-Approval",
      "username": data.username,
      "createdBy": data.username,
      "orgName": data.organisationName
    }

    this.makerService.postMaker(approvalObject).then((approvalData) => {
      console.log("approvalData = ", approvalData)
    })
  }


  /**
   * @author Sucheta
   * @description reject the User Details function
   * @param :  data 
   */

  rejectFromMaker(data) {
    console.log("inside reject ")

    var approvalObject = {
      "projectId": data.projectId,
      "makerApproval": "true",
      "status": "Rejected",
      "username": data.username,
      "createdBy": data.username,
      "orgName": data.organisationName
    }

    this.makerService.postMaker(approvalObject).then((approvalData) => {
      console.log("approvalData = ", approvalData)
    })

  }
}
