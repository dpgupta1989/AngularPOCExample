import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {StoreClaims} from '../modal/storeclaims.model';
import {GridOptions, GridApi, ColumnApi } from 'ag-grid';

import {MatDialog, MatDialogConfig} from '@angular/material';
import {OrderadjustmentPopupComponent} from "../orderadjustment-popup/orderadjustment-popup.component";
import { NgxSpinnerService   } from 'ngx-spinner';

@Component({
  selector: 'app-orderadjustment',
  templateUrl: '../orderadjustment/orderadjustment.component.html',
  styleUrls: ['../orderadjustment/orderadjustment.component.css']
})
export class OrderAdjustmentComponent implements OnInit {

  dialogResult = "";
  storeClaims = [
  new StoreClaims('LOWES OF COLUMBIA, MO.','TN PRE-FINISHED DOOR MILLWORK OPERATION', 1561),
  new StoreClaims('LOWES OF S. TULSA, OK','LOWES OF S. NEWYORK, FL', 1662),
    new StoreClaims('LOWES OF S. VIRGINIA, OK','LOWES OF S. FLORIDA, FL', 1952),
    new StoreClaims('LOWES OF S. NORTH CAROLINA, OK','LOWES OF S. TEXAS, FL', 1882),
    ];

  public loading = false;
  public rowSelected;
  constructor(public dialog: MatDialog,
              private spinner: NgxSpinnerService) {
    this.gridOptions = <GridOptions>{
      context: this,
      columnDefs: this.columnDefs,
      rowSelection: 'multiple',
      deltaRowDataMode: true,
      getRowNodeId: function (params) {
        return params.ID;
      }
    }
  }

  ngOnInit() {
  }

/*  grid table*/

  private gridApi;
  private gridColumnApi;
  /*private columnDefs;*/
  private sortingOrder;
  public gridOptions: GridOptions;
  public selectionChangedCount = 0;
  selectedNodes: any[] = [];

  gridDetails = [{"athlete":"Michael Phelps","age":23,"country":"United States","year":2008,"date":"24/08/2008","sport":"Swimming","gold":8,"silver":0,"bronze":0,"total":8},{"athlete":"Michael Phelps","age":19,"country":"United States","year":2004,"date":"29/08/2004","sport":"Swimming","gold":6,"silver":0,"bronze":2,"total":8},{"athlete":"Michael Phelps","age":27,"country":"United States","year":2012,"date":"12/08/2012","sport":"Swimming","gold":4,"silver":2,"bronze":0,"total":6},{"athlete":"Natalie Coughlin","age":25,"country":"United States","year":2008,"date":"24/08/2008","sport":"Swimming","gold":1,"silver":2,"bronze":3,"total":6},{"athlete":"Aleksey Nemov","age":24,"country":"Russia","year":2000,"date":"01/10/2000","sport":"Gymnastics","gold":2,"silver":1,"bronze":3,"total":6},{"athlete":"Alicia Coutts","age":24,"country":"Australia","year":2012,"date":"12/08/2012","sport":"Swimming","gold":1,"silver":3,"bronze":1,"total":5},{"athlete":"Missy Franklin","age":17,"country":"United States","year":2012,"date":"12/08/2012","sport":"Swimming","gold":4,"silver":0,"bronze":1,"total":5},{"athlete":"Ryan Lochte","age":27,"country":"United States","year":2012,"date":"12/08/2012","sport":"Swimming","gold":2,"silver":2,"bronze":1,"total":5},{"athlete":"Allison Schmitt","age":22,"country":"United States","year":2012,"date":"12/08/2012","sport":"Swimming","gold":3,"silver":1,"bronze":1,"total":5},{"athlete":"Natalie Coughlin","age":21,"country":"United States","year":2004,"date":"29/08/2004","sport":"Swimming","gold":2,"silver":2,"bronze":1,"total":5},{"athlete":"Ian Thorpe","age":17,"country":"Australia","year":2000,"date":"01/10/2000","sport":"Swimming","gold":3,"silver":2,"bronze":0,"total":5},{"athlete":"Dara Torres","age":33,"country":"United States","year":2000,"date":"01/10/2000","sport":"Swimming","gold":2,"silver":0,"bronze":3,"total":5},{"athlete":"Cindy Klassen","age":26,"country":"Canada","year":2006,"date":"26/02/2006","sport":"Speed Skating","gold":1,"silver":2,"bronze":2,"total":5},{"athlete":"Nastia Liukin","age":18,"country":"United States","year":2008,"date":"24/08/2008","sport":"Gymnastics","gold":1,"silver":3,"bronze":1,"total":5},{"athlete":"Dmytro Hrachov","age":20,"country":"Ukraine","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"Im Dong-Hyeon","age":19,"country":"South Korea","year":2004,"date":"29/08/2004","sport":"Archery","gold":1,"silver":0,"bronze":0,"total":1},{"athlete":"Jang Yong-Ho","age":28,"country":"South Korea","year":2004,"date":"29/08/2004","sport":"Archery","gold":1,"silver":0,"bronze":0,"total":1},{"athlete":"Lin Sang","age":26,"country":"China","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Liu Ming-Huang","age":19,"country":"Chinese Taipei","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Park Gyeong-Mo","age":28,"country":"South Korea","year":2004,"date":"29/08/2004","sport":"Archery","gold":1,"silver":0,"bronze":0,"total":1},{"athlete":"Viktor Ruban","age":23,"country":"Ukraine","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"Oleksandr Serdiuk","age":26,"country":"Ukraine","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"Wang Cheng-Pang","age":17,"country":"Chinese Taipei","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Alison Williamson","age":32,"country":"Great Britain","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"Wu Hui-Ju","age":21,"country":"Chinese Taipei","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"Hiroshi Yamamoto","age":41,"country":"Japan","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Yuan Shu-Chi","age":19,"country":"Chinese Taipei","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"Yun Mi-Jin","age":21,"country":"South Korea","year":2004,"date":"29/08/2004","sport":"Archery","gold":1,"silver":0,"bronze":0,"total":1},{"athlete":"Zhang Juanjuan","age":23,"country":"China","year":2004,"date":"29/08/2004","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Matteo Bisiani","age":24,"country":"Italy","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Nataliya Burdeina","age":26,"country":"Ukraine","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Ilario Di Buò","age":43,"country":"Italy","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Simon Fairweather","age":30,"country":"Australia","year":2000,"date":"01/10/2000","sport":"Archery","gold":1,"silver":0,"bronze":0,"total":1},{"athlete":"Michele Frangilli","age":24,"country":"Italy","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Jang Yong-Ho","age":24,"country":"South Korea","year":2000,"date":"01/10/2000","sport":"Archery","gold":1,"silver":0,"bronze":0,"total":1},{"athlete":"Butch Johnson","age":45,"country":"United States","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"Kim Cheong-Tae","age":20,"country":"South Korea","year":2000,"date":"01/10/2000","sport":"Archery","gold":1,"silver":0,"bronze":0,"total":1},{"athlete":"Barbara Mensing","age":39,"country":"Germany","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"O Gyo-Mun","age":28,"country":"South Korea","year":2000,"date":"01/10/2000","sport":"Archery","gold":1,"silver":0,"bronze":0,"total":1},{"athlete":"Cornelia Pfohl","age":29,"country":"Germany","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"Olena Sadovnycha","age":32,"country":"Ukraine","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Kateryna Serdiuk","age":17,"country":"Ukraine","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":1,"bronze":0,"total":1},{"athlete":"Wietse van Alten","age":21,"country":"Netherlands","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"Sandra Wagner-Sachse","age":31,"country":"Germany","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1},{"athlete":"Rod White","age":23,"country":"United States","year":2000,"date":"01/10/2000","sport":"Archery","gold":0,"silver":0,"bronze":1,"total":1}];
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
    {headerName: 'BatchId', field: 'athlete', width: 150, sortingOrder:['asc', 'desc']},
    {headerName: 'Adjustment Type', field: 'age', width: 150, sortingOrder:['desc','asc']},
    {headerName: 'Source', field: 'country', width: 150, sortingOrder:['desc','asc']},
    {headerName: 'Destination', field: 'year', width: 150, sortingOrder:['desc','asc']},
    {headerName: 'Requisition', field: 'gold', width: 150, sortingOrder:['desc','asc']},
    {headerName: 'SourceI', field: 'silver', width: 150, sortingOrder:['desc','asc']},
    {headerName: 'DestI', field: 'bronze', width: 150, sortingOrder:['desc','asc']},
    {headerName: 'Status', field: 'total', width: 150, sortingOrder:['desc','asc']}
  ];

  onGridReady(params){
    this.gridApi=params.api;
    this.gridColumnApi=params.columnApi;
    /*let dataValue=[{"athlete": "Dablu", "age":24 },{"athlete": "Amit", "age":28 }];
    params.api.setRowData(dataValue);*/
    /*passing hardcode json array gridDetails*/
    params.api.setRowData(this.gridDetails);
    /*this.userService.onGridReady()
      .subscribe(
      (resultDetails) => {
          params.api.setRowData(resultDetails);
        }
    );*/
  }

  onRowSelected(event) {
    if(event.node.selected) {
      /*alert("Hi - "+ event.node.data.athlete);*/
      this.selectedNodes.push(event.data);
      console.log(this.selectedNodes);
      this.rowSelected = true;
    }
  }

  exportReportAsCsv(): void{
    const params = {
      columnGroups: true,
      allColumns: false,
      onlySelected: true,
      fileName: 'Order Adjustment Report'
    };
    this.gridApi.exportDataAsCsv(params);
    this.gridApi.api.setQuickFilter()
  }

  deleteReport(){

  }

  private loadGridData;

  searchData(){
    this.spinner.show();
    console.log("Spinner is loaded");
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    this.dialogResult="";
    this.loadGridData=true;
  }

  /*passing StoreClaims form object to this dialog function*/
  openDialog(StoreClaimvalue: StoreClaims){
    console.log(StoreClaimvalue.source + StoreClaimvalue.destination);

/*Dialog Data which need to pass when dialog open*/
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      source: StoreClaimvalue.source,
      destination: StoreClaimvalue.destination,
      requisition: StoreClaimvalue.requisition
    };

    let dialogRef = this.dialog.open(OrderadjustmentPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog Closed: ${result}`);
      this.dialogResult = result;
    })
  }

  validateType(){
    this.loadGridData=false;
    this.rowSelected=false;
  }
}
