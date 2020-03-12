import { Component, OnInit } from '@angular/core';
import * as tableData from './mapping-table';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { Pipe, PipeTransform } from '@angular/core';
import * as jspdf from 'jspdf';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { mappingService } from './mapping.service'
import 'jspdf-autotable';


@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html',
    styleUrls: ['./mapping.component.css'],

})

/**
 * @author : Suchheta
 * @description: Mapping Component for mapping source and target.
 */
export class MappingComponent implements OnInit {

    source = [];
    responseData = [];
    responseDataSource = [];
    responseDataTarget = [];
    //file
    targetFileName;
    sourceFileName;
    //pagination
    p: number = 1;
    //Add Data
    addModalData: FormGroup

    itemsForUrgency = ['Optional', 'Mandatory'];
    dataTypeValue = [];

    //Edit Data
    editModalData: FormGroup
    editParameter;
    sourceNameEdit;
    sfieldNameEdit;
    sdataTypeEdit;
    targetNameEdit;
    tfieldNameEdit;
    tdataTypeEdit;
    urgencyNameEdit;
    descriptionNameEdit;
    targetMethod;
    sourceMethod;
    //Reset
    resetButtonClick;
    resetButtonId;
    resetId

    //Target Data
    targetProjectId
    fileDataByProjectId;
    targetPath
    fields = [];
    levelFieldKey = [];
    levelFieldKeyNested = [];
    extractedData = {};
    combinedDataAfterExtraction = [];
    splitData = [];
    sourceFlowId;
    fileDataByFlowId;
    sourcePath;
    sourceFields
    extractedDataSource
    combinedDataAfterExtractionSource = [];
    splitDataSource
    demoArray = [];
    onClickData;
    targetName;
    fieldsSource;
    filedsTarget;
    dataForEsql = [];
    valueForEsqlSource;
    valueForEsqlTarget;
    jsonStructure = [];
    dataWithNoDirectRow = [];

    //Response

    resetButtonClickResponse
    resetButtonIdResponse
    targetNameResponse
    onClickDataResponse
    resetIdResp
    responseDataForResponse = [];
    editParameterResp
    sourceNameEditResp
    sfieldNameEditResp
    sdataTypeEditResp
    targetNameEditResp
    tfieldNameEditResp
    tdataTypeEditResp
    urgencyNameEditResp
    descriptionNameEditResp

    ngOnInit() {
        console.log("---------- Mapping ----------")
        this._route.params.subscribe((params) => {

            this.targetProjectId = params['projectIdMapping'];
            this.sourceFlowId = params['flowId'];
            console.log("this.sourceFlowId", this.sourceFlowId);
            console.log("this.targetProjectId = ", this.targetProjectId)
            this.getSourceFileService(this.targetProjectId);
            this.getTargetFileService(this.sourceFlowId);
        })

    }

    constructor(private modalService: NgbModal, private fb: FormBuilder,
        private http: HttpClient, private mappingService: mappingService,
        private _route: ActivatedRoute) {

        this.dataTypeValue = [
            { name: "String", value: "String" },
            { name: "Number-Integer", value: "Number-Integer" },
            { name: "Number-Float", value: "Number-Float" },
            { name: "Number-Decimal", value: "Number-Decimal" },
            { name: "Boolean(True/False)", value: "Boolean(True/False)" },
            { name: "Boolean(Yes/No)", value: "Boolean(Yes/No)" },
            { name: "Boolean(1/0)", value: "Boolean(1/0)" },
            { name: "xs:Boolean", value: "xs:Boolean" },
            { name: "xs:Date", value: "xs:Date" },
            { name: "xs:Date Time", value: "xs:Date Time" },
            { name: "xs:Time", value: "xs:Time" },
            { name: "Date", value: "Date" },
            { name: "DateTime", value: "DateTime" },
            { name: "Time", value: "Time" },
            { name: "String-Enumerated", value: "String-Enumerated" },
            { name: "Empty(Node Element)", value: "Empty(Node Element)" }
        ];

        this.addModalData = this.fb.group({
            'sourceName': ['', [Validators.required]],
            'sfieldName': ['', [Validators.required]],
            'sdataType': ['', [Validators.required]],
            'targetName': ['', [Validators.required]],
            'tfieldName': ['', [Validators.required]],
            'tdataType': ['', [Validators.required]],
            'urgencyName': ['', [Validators.required]],
            'descriptionName': ['', [Validators.required]]
        })


        this.editModalData = this.fb.group({
            'sourceNameEdit': ['', [Validators.required]],
            'sfieldNameEdit': ['', [Validators.required]],
            'sdataTypeEdit': ['', [Validators.required]],
            'targetNameEdit': ['', [Validators.required]],
            'tfieldNameEdit': ['', [Validators.required]],
            'tdataTypeEdit': ['', [Validators.required]],
            'urgencyNameEdit': ['', [Validators.required]],
            'descriptionNameEdit': ['', [Validators.required]]
        })

        var responseData1 = [
            {
                id: 1,
                sourceName: "GetBook",
                sfieldName: "ID",
                sdataType: "xsd:string",
                targetName: "disconnectCab",
                tfieldName: "cabinetName",
                tdataType: "xs:string",
                urgencyName: "Optional",
                descriptionName: " ",
                directRowNo: "",
                sourceFieldPath: "",
                sourceFieldName: "",
                datatypeVerified: "",
                backgroundColor: "true"

            },
        ]

            ;

    }
    settings = tableData.settings;
    /**
    * @author Sanchita
    * @param flowId 
    * @description This function is called for the source value
    */

    getSourceFileService(projectId) {
        // this.mappingService.getFileDataByFlowId(flowId).then((data) => {
        //     console.log("this.fileDataByFlowId", data);

        //     this.fileDataByFlowId = data
        //     console.log(" this.fileDataByFlowId", this.fileDataByFlowId);
        //     this.segregateSourceData(data)
        // })

        this.mappingService.getFileDataByProjectId(projectId).then((data) => {
            console.log("this.getFileDataByProjectId", data);
            this.fileDataByProjectId = data
            this.segregateSourceData(data)
        })
    }
    /**
    * @author Sanchita
    * @param sourceArray
    * @description This function is called to segregate the sourceArray Data
    */

    segregateSourceData(sourceArray) {
        console.log("============== Inside Source segregateData =============")
        var dataLength = sourceArray.length;
        console.log("dataLength = ", dataLength)

        for (var h = 0; h < dataLength; h++) {
            var operationsLength = sourceArray[h].operations.length
            for (var j = 0; j < operationsLength; j++) {
                this.sourceMethod = sourceArray[h].operations[j].method
                this.sourcePath = sourceArray[h].operations[j].path

                console.log(" this.sourcePath = ", this.sourcePath)
                this.sourceFields = sourceArray[h].operations[j].fields
                console.log("fields = ", this.sourceFields)
                for (var k = 0; k < this.sourceFields.length; k++) {


                    console.log("========== abc ===========")

                    this.extractedDataSource = this.nestedSegregationSource(this.sourceFields[k]);

                    // var commaData = this.splitComma(this.extractedData);

                    var keyData = Object.keys(this.extractedDataSource);
                    var valueData = Object.values(this.extractedDataSource)
                    console.log("keyData = ", keyData)
                    console.log("valueData = ", valueData)


                    for (var w = 0; w < keyData.length; w++) {
                        this.combinedDataAfterExtractionSource.push({ key: keyData[w], value: valueData[w] })
                    }
                    console.log(" this.combinedDataAfterExtraction = ", this.combinedDataAfterExtractionSource)

                }
                var inc = 1;
                for (var q = 0; q < this.combinedDataAfterExtractionSource.length; q++) {

                    var x = this.combinedDataAfterExtractionSource[q].key;
                    var splitted = x.split(".");
                    console.log(" ------- splitted --------- = ", splitted)
                    var splitLength = splitted.length
                    if (splitted[splitLength - 1] == "type") {

                        this.splitData.push(splitted[splitLength - 2])

                        this.responseDataSource.push({
                            id: inc, sourceName: this.sourcePath, sfieldName: splitted[splitLength - 2],
                            sdataType: this.combinedDataAfterExtractionSource[q].value
                        })
                        inc++;
                    }

                }
                console.log(this.responseDataSource);

            }

        }
    }
    /**
    * @author : Sanchita
    * @param data
    * @description: This function consist code of flatten the json
    */
    nestedSegregationSource(data) {


        var result = {};
        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                for (var i = 0, l = cur.length; i < l; i++)
                    recurse(cur[i], prop + "[" + i + "]");
                if (l == 0)
                    result[prop] = [];
            } else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + "." + p : p);
                }
                if (isEmpty && prop)
                    result[prop] = {};
            }
        }
        recurse(data, "");


        console.log("********** Result ************* = ", result)
        return result;


    }

    /**
    * @author : Suchheta
    * @description: Mapping Component for mapping source and target.
    */


    getTargetFileService(flowId) {
        // this.mappingService.getFileDataByProjectId(projectId).then((data) => {
        //     console.log("this.getFileDataByProjectId", data);
        //     this.fileDataByProjectId = data
        //     this.segregateData(data)
        // })
        this.mappingService.getFileDataByFlowId(flowId).then((data) => {
            console.log("this.fileDataByFlowId", data);

            this.fileDataByFlowId = data
            console.log(" this.fileDataByFlowId", this.fileDataByFlowId);
            this.segregateData(data)

        })
    }

    /**
    * @author : Suchheta
    * @description: Process to display segregate and display the target data.
    */
    segregateData(array) {
        console.log("============== Inside segregateData =============")
        var dataLength = array.length;
        console.log("dataLength = ", dataLength)

        for (var h = 0; h < dataLength; h++) {
            var operationsLength = array[h].operations.length
            for (var j = 0; j < operationsLength; j++) {
                this.targetMethod = array[h].operations[j].method
                this.targetPath = array[h].operations[j].path

                console.log(" this.targetPath = ", this.targetPath)
                this.fields = array[h].operations[j].fields
                console.log("fields = ", this.fields)
                for (var k = 0; k < this.fields.length; k++) {


                    console.log("========== abc ===========")

                    this.extractedData = this.nestedSegregation(this.fields[k]);

                    // var commaData = this.splitComma(this.extractedData);

                    var keyData = Object.keys(this.extractedData);
                    var valueData = Object.values(this.extractedData)
                    console.log("keyData = ", keyData)
                    console.log("valueData = ", valueData)


                    for (var w = 0; w < keyData.length; w++) {
                        this.combinedDataAfterExtraction.push({ key: keyData[w], value: valueData[w] })
                    }
                    console.log(" this.combinedDataAfterExtraction = ", this.combinedDataAfterExtraction)

                }
                var inc = 1;
                for (var q = 0; q < this.combinedDataAfterExtraction.length; q++) {
                    var x = this.combinedDataAfterExtraction[q].key;
                    var splitted = x.split(".");
                    console.log(" ------- splitted --------- = ", splitted)
                    var splitLength = splitted.length
                    if (splitted[splitLength - 1] == "type") {
                        this.splitData.push(splitted[splitLength - 2])
                        this.responseDataTarget.push({
                            id: inc, targetName: this.targetPath, tfieldName: splitted[splitLength - 2],
                            tdataType: this.combinedDataAfterExtraction[q].value
                        })
                        inc++;
                    }

                }
                console.log(this.responseDataTarget);
                console.log(this.responseData);
                this.sortSourceTargetData();
            }

        }
    }
    /**
    * @author Sanchita
    * @description This function will be called to merge responseDataSource and responseDataTarget
    */
    sortSourceTargetData() {
        console.log("source", this.responseDataSource);
        console.log("target", this.responseDataTarget);
        let arr3 = [];
        this.responseDataTarget.forEach((itm, i) => {
            arr3.push(Object.assign({}, itm, this.responseDataSource[i]));
        });

        console.log(arr3);
        for (var i = 0; i < arr3.length; i++) {
            var name = arr3[i].sourceName;
            if (name === arr3[i].sourceName) {
                this.responseData.push({
                    id: arr3[i].id, sourceName: arr3[i].sourceName, sfieldName: arr3[i].sfieldName, sdataType: arr3[i].sdataType, targetName: arr3[i].targetName, tfieldName: arr3[i].tfieldName, tdataType: arr3[i].tdataType, urgencyName: "Mandatory", descriptionName: " ", directRowNo: "", sourceFieldPath: "", sourceFieldName: "", datatypeVerified: "", backgroundColor: "true"
                })
                name = '';
            }
            else {
                this.responseData.push({
                    id: arr3[i].id, sourceName: " ", sfieldName: " ", sdataType: " ", targetName: arr3[i].targetName, tfieldName: arr3[i].tfieldName, tdataType: arr3[i].tdataType, urgencyName: "Mandatory", descriptionName: " ", directRowNo: "", sourceFieldPath: "", sourceFieldName: "", datatypeVerified: "", backgroundColor: "true"
                })
            }
        }
        console.log(" this.responseData", this.responseData);
        console.log("------- ResponseData for Response ------")

//         this.responseDataForResponse.push(

//             {
//                 'sourceNameResponse':this.responseData[0].sourceName,
// 'sfieldNameResponse':this.responseData[0].sfieldName,
// 'sdataTypeResponse':this.responseData[0].sdataType,
// 'targetNameResponse':this.responseData[0].targetName,
// 'tfieldNameResponse':this.responseData[0].tfieldName,
// 'tdataTypeResponse':this.responseData[0].urgencyName,
// 'urgencyNameResponse':this.responseData[0].descriptionName,
// 'descriptionNameResponse':this.responseData[0].directRowNo,
// 'directRowNoResponse':this.responseData[0].sourceFieldPath,
// 'sourceFieldPathResponse':this.responseData[0].sourceFieldName,
// 'sourceFieldNameResponse':this.responseData[0].sourceFieldName,
// 'datatypeVerifiedResponse':this.responseData[0].datatypeVerified
//             });
//         // this.responseDataForResponse.push(this.responseData[1]);
//         console.log("this.responseDataForResponse = ", this.responseDataForResponse)
    }

    /**
    * @author : Suchheta
    * @description: flatten the json.
    */
    nestedSegregation(data) {


        var result = {};
        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                for (var i = 0, l = cur.length; i < l; i++)
                    recurse(cur[i], prop + "[" + i + "]");
                if (l == 0)
                    result[prop] = [];
            } else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + "." + p : p);
                }
                if (isEmpty && prop)
                    result[prop] = {};
            }
        }
        recurse(data, "");


        console.log("********** Result ************* = ", result)
        return result;


    }



    /**
    * @author : Suchheta
    * @description: Create and download PDF.
    */
    capture() {

        var doc = new jspdf('l', 'pt', 'a4');

        var cols = [{ title: 'Id', dataKey: 'id' },
        { title: 'Source-Field Resolved Path', dataKey: 'sourceName' }, { title: 'Source Field Technical Name', dataKey: 'sfieldName' },
        { title: 'Source Data Type', dataKey: 'sdataType' }, { title: 'Target Field Resolved Path', dataKey: 'targetName' },
        { title: 'Target Field Technical Name', dataKey: 'tfieldName' }, { title: 'Target Data Type', dataKey: 'tdataType' }, { title: 'Condition', dataKey: 'urgencyName' },
        { title: 'Description', dataKey: 'descriptionName' }, { title: 'Source Field Row No.', dataKey: 'directRowNo' },
        { title: 'Source Field Path', dataKey: 'sourceFieldPath' }, { title: 'Source Field Name', dataKey: 'sourceFieldName' },
        { title: 'Data Type Verified', dataKey: 'datatypeVerified' }]

        var tableData = [];
        for (var i = 0; i < this.responseData.length; i++) {
            tableData.push({
                'id': this.responseData[i].id, 'sourceName': this.responseData[i].sourceName, 'sfieldName': this.responseData[i].sfieldName, 'sdataType': this.responseData[i].sdataType,
                'targetName': this.responseData[i].targetName, 'tfieldName': this.responseData[i].tfieldName, 'tdataType': this.responseData[i].tdataType, 'urgencyName': this.responseData[i].urgencyName,
                'descriptionName': this.responseData[i].descriptionName, 'directRowNo': this.responseData[i].directRowNo, 'sourceFieldPath': this.responseData[i].sourceFieldPath,
                'sourceFieldName': this.responseData[i].sourceFieldName, 'datatypeVerified': this.responseData[i].datatypeVerified, 'backgroundColor': this.responseData[i].backgroundColor
            })
        }
        console.log("tableData = ", tableData)
        doc.autoTable(cols, tableData, {
            didParseCell: function (HookData) {
                console.log("HookData = ", HookData)
                // console.log("cell = ", cell)

                var tdElement;


                tdElement = HookData.row.raw.backgroundColor
                    ;
                console.log("tdElement = ", tdElement)
                if (tdElement == false && HookData.column.raw.dataKey == "datatypeVerified") {
                    HookData.cell.styles.fontStyle = 'bold';
                    HookData.cell.styles.textColor = [255, 0, 0]
                }


            }

        })

        doc.save("table.pdf");

        document.getElementById('obj').dataset.data = doc.output("datauristring");


        var blob = doc.output("blob");
        window.open(URL.createObjectURL(blob));

    }

    // Upload File
    /**
    * @author : Suchheta
    * @description: Add Source and Target field.
    */

    addSourceNTargetField(uploadFile) {

        this.modalService.open(uploadFile, { size: 'lg' });
    }

    /**
    * @author : Suchheta
    * @description: change event of Source file upload.
    */

    filesToUploadSource: Array<File> = [];
    fileSourceChangeEvent(fileInput: any) {
        this.filesToUploadSource = <Array<File>>fileInput.target.files;
    }
    /**
    * @author : Suchheta
    * @description: Change event of Target file upload.
    */

    filesToUploadTarget: Array<File> = [];
    fileTargetChangeEvent(fileInput: any) {

        this.filesToUploadTarget = <Array<File>>fileInput.target.files;
    }


    /**
    * @author : Suchheta
    * @description: Download both Source and Target Files with all permutations.
    */
    async sourceNTargetModalButton() {
        const filesTarget: Array<File> = this.filesToUploadTarget;
        const filesSource: Array<File> = this.filesToUploadSource;


        // ---------------------- Source ----------------------


        console.log("inside Source Upload, file = ", filesSource);
        console.log("inside Target Upload, file = ", filesTarget);

        if (filesSource.length != 0 && filesTarget.length != 0) {



            // ------------- check if the file is already present in database ------------
            this.sourceFileName = filesSource[0].name;

            console.log(" inside upload, this.checkFileName = ", this.sourceFileName);

            var lastFive = this.sourceFileName.substr(this.sourceFileName.length - 5);

            console.log("lastFive letters =", lastFive);


            const formData: any = new FormData();

            const formDataSource: any = new FormData();
            const formDataTarget: any = new FormData();

            for (let i = 0; i < filesSource.length; i++) {
                formDataSource.append("uploads[]", filesSource[i], filesSource[i]['name']);

                console.log("inside upload, formDataSource = ", formDataSource);
            }
            console.log('form data variable : ' + formDataSource.toString());

            // --------------------- Target ----------------------


            console.log("inside Target Upload, file = ", filesTarget);




            // ------------- check if the file is already present in database ------------
            this.targetFileName = filesTarget[0].name;

            console.log(" inside upload, this.checkTargetFileName = ", this.targetFileName);

            var lastFive = this.targetFileName.substr(this.targetFileName.length - 5);

            console.log("lastFive letters =", lastFive);



            for (let i = 0; i < filesTarget.length; i++) {
                formDataTarget.append("uploads[]", filesTarget[i], filesTarget[i]['name']);

                console.log("inside upload, formData = ", formDataTarget);
            }
            console.log('form data variable : ' + formDataTarget.toString());



            this.modalService.dismissAll();

        }
        else if (filesSource.length != 0 && filesTarget.length == 0) {



            // ------------- check if the file is already present in database ------------
            this.sourceFileName = filesSource[0].name;

            console.log(" inside upload, this.checkFileName = ", this.sourceFileName);

            var lastFive = this.sourceFileName.substr(this.sourceFileName.length - 5);

            console.log("lastFive letters =", lastFive);


            const formData: any = new FormData();

            const formDataSource: any = new FormData();
            const formDataTarget: any = new FormData();

            for (let i = 0; i < filesSource.length; i++) {
                formDataSource.append("uploads[]", filesSource[i], filesSource[i]['name']);

                console.log("inside upload, formDataSource = ", formDataSource);
            }
            console.log('form data variable : ' + formDataSource.toString());

            // --------------------- Target ----------------------

            this.modalService.dismissAll();


        }
        else if (filesSource.length == 0 && filesTarget.length != 0) {



            // ------------- check if the file is already present in database ------------
            // 

            // const formDataSource: any = new FormData();
            const formDataTarget: any = new FormData();


            // --------------------- Target ----------------------


            console.log("inside Target Upload, file = ", filesTarget);




            // ------------- check if the file is already present in database ------------
            this.targetFileName = filesTarget[0].name;

            console.log(" inside upload, this.checkTargetFileName = ", this.targetFileName);

            var lastFive = this.targetFileName.substr(this.targetFileName.length - 5);

            console.log("lastFive letters =", lastFive);

            for (let i = 0; i < filesTarget.length; i++) {
                formDataTarget.append("uploads[]", filesTarget[i], filesTarget[i]['name']);

                console.log("inside upload, formData = ", formDataTarget);
            }
            console.log('form data variable : ' + formDataTarget.toString());

            this.modalService.dismissAll();

        }
        else if (filesSource.length == 0 && filesTarget.length == 0) {

            alert("Files are not Uploaded !")
            this.modalService.dismissAll();
        }
    }


    /**
    * @author : Suchheta
    * @description: Open add field Modal button.
    */
    addFieldValue1(addDataModal11) {

        this.modalService.open(addDataModal11, { size: 'lg' });
    }


    /**
    * @author : Suchheta
    * @description:Add Data Function.
    */
    addData(value) {
        console.log("Inside Add Data");
        console.log("Value ======== ", value);
        this.modalService.dismissAll();

        var addData = {


            id: this.responseData.length + 1,
            sourceName: value.sourceName,
            sfieldName: value.sfieldName,
            sdataType: value.sdataType,
            targetName: value.targetName,
            tfieldName: value.tfieldName,
            tdataType: value.tdataType,
            urgencyName: value.urgencyName,
            descriptionName: value.descriptionName,
            directRowNo: null,
            sourceFieldPath: null,
            sourceFieldName: null,
            datatypeVerified: null,
            backgroundColor: "true"

        }

        this.responseData.push(addData);

    }



    /**
    * @author : Suchheta
    * @description: Open Edit Modal for Request.
    */

    editValueModal(id, data, editModal) {
        this.editParameter = data.sourceName;
        this.sourceNameEdit = data.sourceName
        this.sfieldNameEdit = data.sfieldName
        this.sdataTypeEdit = data.sdataType
        this.targetNameEdit = data.targetName
        this.tfieldNameEdit = data.tfieldName
        this.tdataTypeEdit = data.tdataType
        this.urgencyNameEdit = data.urgencyName
        this.descriptionNameEdit = data.descriptionName


        this.modalService.open(editModal, { size: 'lg' });


    }

    /**
        * @author : Suchheta
        * @description: Open Edit Modal for Response.
        */



    editValueModalResponse(id, data, editModalResponse) {
        this.editParameterResp = data.sourceNameResponse;
        this.sourceNameEditResp = data.sourceNameResponse
        this.sfieldNameEditResp = data.sfieldNameResponse
        this.sdataTypeEditResp = data.sdataTypeResponse
        this.targetNameEditResp = data.targetNameResponse
        this.tfieldNameEditResp = data.tfieldNameResponse
        this.tdataTypeEditResp = data.tdataTypeResponse
        this.urgencyNameEditResp = data.urgencyNameResponse
        this.descriptionNameEditResp = data.descriptionNameResponse


        this.modalService.open(editModalResponse, { size: 'lg' });

    }


    /**
    * @author : Suchheta
    * @description: Edit Data Function.
    */

    editData(sourceNameEdit, sfieldNameEdit, sdataTypeEdit, targetNameEdit, tfieldNameEdit, tdataTypeEdit, urgencyNameEdit, descriptionNameEdit) {

        for (var i = 0; i < this.responseData.length; i++) {

            if (this.responseData[i].sourceName === this.editParameter) {
                this.responseData[i].sourceName = sourceNameEdit
                this.responseData[i].sfieldName = sfieldNameEdit
                this.responseData[i].sdataType = sdataTypeEdit
                this.responseData[i].targetName = targetNameEdit
                this.responseData[i].tfieldName = tfieldNameEdit
                this.responseData[i].tdataType = tdataTypeEdit
                this.responseData[i].urgencyName = urgencyNameEdit
                this.responseData[i].descriptionName = descriptionNameEdit
            }
        }
        this.modalService.dismissAll();
    }

    //Reset Data

    addFieldValue2(a, data, resetModal) {
        console.log("Inside addFieldValue2");
        console.log("data", data);
        this.onClickData = data;
        this.targetName = data.tfieldName;

        console.log("a = ", a)
        this.modalService.open(resetModal, { size: 'lg' });

        this.resetButtonClick = data.sfieldName
        this.resetButtonId = a + 1;
    }



    addFieldValueResponse(a, data, resetModalResponse) {
        console.log("Inside addFieldValue2");
        console.log("data", data);
        this.onClickDataResponse = data;
        this.targetNameResponse = data.tfieldName;

        console.log("a = ", a)
        this.modalService.open(resetModalResponse, { size: 'lg' });

        this.resetButtonClickResponse = data.sfieldNameResponse
        this.resetButtonIdResponse = a + 1;
    }

    /**
    * @author : Suchheta
    * @description: Reset Function for Request.
    */

    resetButton(resetIdValue) {

        console.log("this.resetButtonClick", this.resetButtonClick);
        for (var i = 0; i < this.responseData.length; i++) {
            if (this.responseData[i].sfieldName === this.resetButtonClick && this.resetButtonClick != undefined) {
                this.responseData[i].directRowNo = resetIdValue;
                this.responseData[i].sourceFieldPath = this.responseData[resetIdValue - 1].sourceName;
                this.responseData[i].sourceFieldName = this.responseData[resetIdValue - 1].sfieldName
                this.responseData[i].datatypeVerified = this.responseData[resetIdValue - 1].sdataType
                if (this.responseData[i].sdataType != this.responseData[resetIdValue - 1].tdataType) {
                    this.responseData[i].backgroundColor = "false"
                }
                else {
                    this.responseData[i].backgroundColor = "true";
                }
            }
            else {
                for (var i = 0; i < this.responseData.length; i++) {
                    if (this.responseData[i].tfieldName === this.targetName) {
                        this.responseData[i].directRowNo = resetIdValue;
                        this.responseData[i].sourceFieldPath = this.responseData[resetIdValue - 1].sourceName;
                        this.responseData[i].sourceFieldName = this.responseData[resetIdValue - 1].sfieldName
                        this.responseData[i].datatypeVerified = this.responseData[resetIdValue - 1].sdataType

                        if (this.responseData[i].tdataType != this.responseData[resetIdValue - 1].sdataType) {
                            this.responseData[i].backgroundColor = "false"
                        }
                        else {
                            this.responseData[i].backgroundColor = "true";
                        }
                    }
                }
            }

        }
        this.resetId = null;
        console.log("this.responseData", this.responseData);

        this.modalService.dismissAll();

    }

    /**
       * @author : Suchheta
       * @description: Reset Function for Response.
       */


    resetButtonResponse(resetIdValue) {


        console.log("this.resetButtonClick Response", this.resetButtonClickResponse);
        for (var i = 0; i < this.responseDataForResponse.length; i++) {
            if (this.responseDataForResponse[i].sfieldNameResponse === this.resetButtonClickResponse && this.resetButtonClickResponse != undefined) {
                this.responseDataForResponse[i].directRowNoResponse = resetIdValue;
                this.responseDataForResponse[i].sourceFieldPathResponse = this.responseDataForResponse[resetIdValue - 1].sourceNameResponse;
                this.responseDataForResponse[i].sourceFieldNameResponse = this.responseDataForResponse[resetIdValue - 1].sfieldNameResponse
                this.responseDataForResponse[i].datatypeVerifiedResponse = this.responseDataForResponse[resetIdValue - 1].sdataTypeResponse
                if (this.responseDataForResponse[i].sdataTypeResponse != this.responseDataForResponse[resetIdValue - 1].tdataTypeResponse) {
                    this.responseDataForResponse[i].backgroundColor = "false"
                }
                else {
                    this.responseDataForResponse[i].backgroundColor = "true";
                }
            }
            else {
                for (var i = 0; i < this.responseDataForResponse.length; i++) {
                    if (this.responseDataForResponse[i].tfieldNameResponse === this.targetNameResponse) {
                        if (this.responseDataForResponse[i].tfieldNameResponse === this.targetNameResponse) {
                            this.responseDataForResponse[i].directRowNoResponse = resetIdValue;
                            this.responseDataForResponse[i].sourceFieldPathResponse = this.responseData[resetIdValue - 1].sourceNameResponse;
                            this.responseDataForResponse[i].sourceFieldNameResponse = this.responseData[resetIdValue - 1].sfieldNameResponse
                            this.responseDataForResponse[i].datatypeVerifiedResponse = this.responseData[resetIdValue - 1].sdataTypeResponse

                            if (this.responseDataForResponse[i].tdataTypeResponse != this.responseDataForResponse[resetIdValue - 1].sdataTypeResponse) {
                                this.responseDataForResponse[i].backgroundColor = "false"
                            }
                            else {
                                this.responseDataForResponse[i].backgroundColor = "true";
                            }
                        }
                    }
                }

            }
            this.resetIdResp = null;
            console.log("this.responseDataForResponse", this.responseDataForResponse);

            this.modalService.dismissAll();

        }
    }

    SubmitForMapping() {
        this.getFlattenStructure(this.responseData);
    }
    /**
    * @author Sanchita
    * @param data 
    * @description This function is used to get the json structure for esql generation
    */
    getFlattenStructure(data) {
        console.log("this.responseData", data);
        for (var i = 0; i < this.responseData.length; i++) {
            if (this.responseData[i].directRowNo !== "") {
                this.dataForEsql.push(this.responseData[i]);
            }
            else {
                this.dataWithNoDirectRow.push(this.responseData[i]);
            }
        }

        for (var i = 0; i < this.dataForEsql.length; i++) {
            for (var j = 0; j < this.combinedDataAfterExtractionSource.length; j++) {
                var x = this.combinedDataAfterExtractionSource[j].key;
                var splitted = x.split(".");
                var data = splitted[1];
                if (this.dataForEsql[i].sourceFieldName === splitted[1]) {
                    var sourceJson = this.combinedDataAfterExtractionSource[j].key;
                    var val = sourceJson.replace(".type", "");
                    sourceJson = val;
                    console.log("sourceJson", sourceJson);
                }
            }
            for (var j = 0; j < this.combinedDataAfterExtraction.length; j++) {
                var x = this.combinedDataAfterExtraction[j].key;
                var splitted = x.split(".");
                var data = splitted[1];
                if (this.dataForEsql[i].tfieldName === splitted[1]) {
                    var targetJson = this.combinedDataAfterExtraction[j].key;
                    var val = targetJson.replace(".type", "");
                    targetJson = val;
                    console.log("targetJson", targetJson);
                }
            }
            this.jsonStructure.push({
                "sourcePath": this.dataForEsql[0].sourceName,
                "sourceMethod": this.sourceMethod,
                "sourceField": sourceJson,
                "targetPath": this.dataForEsql[0].targetName,
                "targetMethod": this.targetMethod,
                "targetField": targetJson
            });
            console.log("this.jsonStructure", this.jsonStructure);
        }
        for (var i = 0; i < this.dataWithNoDirectRow.length; i++) {
            this.jsonStructure.push({
                "sourcePath": this.dataWithNoDirectRow[i].sourceName,
                "sourceMethod": this.sourceMethod,
                "sourceField": sourceJson,
                "targetPath": this.dataWithNoDirectRow[0].targetName,
                "targetMethod": this.targetMethod,
                "targetField": ""
            });
        }

    }




    /**
    * @author : Suchheta
    * @description: Delete Value for Request Function.
    */
    deleteValue(value) {

        for (var i = this.responseData.length - 1; i >= 0; --i) {
            if (this.responseData[i].sourceName == value.sourceName) {
                this.responseData.splice(i, 1);
            }
        }

    }

    /**
  * @author : Suchheta
  * @description: Delete Value for Response Function.
  */
    deleteValueResponse(value) {

        for (var i = this.responseDataForResponse.length - 1; i >= 0; --i) {
            if (this.responseDataForResponse[i].sourceNameResponse == value.sourceNameResponse) {
                this.responseDataForResponse.splice(i, 1);
            }
        }

    }


    /**
    * @author : Suchheta
    * @description: Generate Yaml and ESQL file.
    */
    generatefiles() {
        console.log("Inside generateFiles")
    }
}
