import { Component, OnInit } from '@angular/core';

import {ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material";

import {GridOptions, GridApi, ColumnApi } from 'ag-grid';

@Component({
  selector: 'app-comp2',
  templateUrl: './Handbill.component.html'
})
export class HandbillComponent {
    loadGridData: boolean = false;

  selectedFiles: File = null;
  form: FormGroup;
  loading: boolean = false;
  fileUploadedIndicator: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  public _IsFileInValid: boolean = true;
  uploadResult: string = "";
  private arrayList: any;
  private uploadFileData: any[];
  private fileHeaderValidErrorMsg: string;
  private fileEmptyErrorMsg: string = "";

  /*Grid variables*/
  public gridOptions: GridOptions;
  public rowData:any[];
  private gridApi;

  constructor(private fb: FormBuilder, private http: HttpClient, public dialog: MatDialog) {
    this.gridOptions = <GridOptions>{
      context: this,
      columnDefs: this.columnDefs,
      rowData: this.rowData,
      rowSelection: 'multiple',
      deltaRowDataMode: true,
      getRowNodeId: function (params) {
        return params.ID;
      }
  }
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });
  }

  onFileChange(event) {
    console.log(event);
    this.selectedFiles = <File>event.target.files[0];
    this._IsFileInValid = false;
    this.uploadResult = "";
    this.fileHeaderValidErrorMsg = "";
    this.fileEmptyErrorMsg = "";
    this.fileUploadedIndicator = true;
  }

  onSubmit() {
    this.loading = true;
    const fd = new FormData();
    fd.append(this.selectedFiles.type, this.selectedFiles, this.selectedFiles.name);
    console.log(this.selectedFiles);
    this.readingFileData();
      /*uncomment below code to call the http service api to upload the file to server path*/
      /*this.http.post('apiUrl', fd)
        .subscribe(res => {
            console.log('done!');
          this.loading = false;
        });*/
      this.clearFile();
      this.loading = false;
      this._IsFileInValid = true;
  }

    clearFile() {
      this.form.get('avatar').setValue(null);
      this.form.get('name').setValue(null);
      this.fileInput.nativeElement.value = '';
      this.loading = true;
      this.fileUploadedIndicator = false;
    }

    readingFileData(){
      let fileReader = new FileReader();
     /* let headers : String[];*/
      fileReader.onload = (e) => {
        let csv: string = fileReader.result;
        /*Reading the File -start*/
        let allTextLines = csv.split(/\r\n|\r/);
        let headers = allTextLines[0].split(',');
        let lines = [];

        for (let i = 0; i < allTextLines.length; i++) {
          let data = allTextLines[i].split(',');
          if (data.length == headers.length) {
            let tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
            }
            // log each row to see output
            /*alert(tarr);*/
            /*console.log(tarr);*/
            lines.push(tarr);
          }
        }
        //Storing File Data into a variable
        this.uploadFileData = lines;
        /*alert(lines);*/
        //all rows in the csv file
        console.log(">>>>>>>>>>>>>>>>>", lines);
        /*Reading the File  -end*/
        this.validateUploadFileHeaderLength(headers);
      }
      fileReader.readAsText(this.selectedFiles);
    }

  private validateUploadFileHeaderLength(headers) {
    /*alert("Dablu" + "-" + headers.length);*/
    if(headers.length !== 0){
      /*alert("headers.length !== 1 :");*/
        if(headers.length !== 2 || headers[0].trim() !== 'Item' || headers[1].trim() !== 'Quantity'){
           this.fileHeaderValidErrorMsg = 'Invalid Header, Please Upload Correct File...!';
        }
        else {
          this.fileHeaderValidErrorMsg = "";
          this.fileEmptyErrorMsg = "";
          this.validateRows();
          this.addFileToGrid();
        }
    }
    else {
      this.fileEmptyErrorMsg = "File is empty!";
    }
  }

  private validateRows() {
      let rowCount = this.uploadFileData.length;
      if(rowCount >= 1){
        if(rowCount <= 10){
          /*alert("File max limit check - successful");*/
          /*alert('File Uploaded Successfully');*/
          this.uploadResult = this.selectedFiles.name + " " + " header validated successfully";
        }
        else {
          this.fileEmptyErrorMsg = "File is too long!";
        }
      }
  }

  /*Handbill Grid Coding started*/

  gridDetails = [{"item":"Michael Phelps","location":23,"requestName":"United States"}];
  private columnDefs = [
    {
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      suppressResize: true,
      suppressAutoSize: true,
      suppressSizeToFit: true,
      suppressMenu: true
    },
    {headerName: 'Item', field: 'item', width: 150, sortingOrder:['asc', 'desc']},
    {headerName: 'Location', field: 'location', width: 150, sortingOrder:['desc','asc']},
    {headerName: 'RequestName', field: 'requestName', width: 150, sortingOrder:['desc','asc'], editable: true}
  ];


  onGridReady(params){
    this.gridApi = params.api;
    /*params.api.setRowData(this.gridDetails);*/
  }

  private addFileToGrid() {
    let jsonFormattedRequest = [];
    let existingGridDataArray = [];
    if(!this.rowData) {
      if(this.uploadFileData.length) {
        let tempArray = [];
        this.uploadFileData.forEach(function (Item) {
            tempArray.push({
              item: Item[0],
              location: Item[1],
              requestName: "Devdpg1"
            });
        });
        jsonFormattedRequest = tempArray;
        this.rowData = jsonFormattedRequest;
        this.loadGridData=true;
      }
    }
    else if(this.rowData) {
      /*this.rowData.forEach(function (existingGridData) {
        existingGridDataArray.push(existingGridData.item);
      });*/

      let tempArray2 = [];
      if(this.uploadFileData.length) {
        this.uploadFileData.forEach(function (Item) {
          /*if (!existingGridDataArray.includes(Item.item)) {*/
            tempArray2.push({
              item: Item[0],
              location: Item[1],
              requestName: "Devdpg1"
            });
          /*}*/
        });


       /*for(let i=0;i<tempArray2.length;i++) {
          this.rowData.push(tempArray2[i]);
        };*/
        this.gridApi.updateRowData({ add: tempArray2});
        console.log(this.rowData);
        jsonFormattedRequest = tempArray2;
        /*this.rowData.push(jsonFormattedRequest);*/
      }
    }
  }
}
