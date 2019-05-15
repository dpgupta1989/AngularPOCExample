import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatListModule, MatButtonModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule, MatSidenavModule} from '@angular/material';
/*import { MaterialModule } from '@angular/material';*/
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';

/*Imported dialog module to load up*/
import {MatDialogModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';

/*Reactive Form Module required in Handbill component form group*/
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { FullscreenService } from '../fullscreen.service';
import { AppComponent } from './app.component';
import { OrderAdjustmentComponent } from './OrderAdjustment/orderadjustment.component';
import { HandbillComponent } from './Handbill/Handbill.component';
import { Fullscreen1Component } from './fullscreen1/fullscreen1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationComponent } from './application/application.component';
import {AgGridModule} from 'ag-grid-angular/main';
import { OrderadjustmentPopupComponent } from './orderadjustment-popup/orderadjustment-popup.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    OrderAdjustmentComponent,
    HandbillComponent,
    Fullscreen1Component,
    ApplicationComponent,
    OrderadjustmentPopupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    NgxSpinnerModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot([
      {
        path: 'home',
        component: ApplicationComponent
      },
      {
        path: 'orderAdjustment',
        component: OrderAdjustmentComponent
      },
      {
        path: 'handbill',
        component: HandbillComponent
      },
      <any>{
        path: 'fullscreen1',
        component: Fullscreen1Component,
        fullscreen: true
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: ApplicationComponent
      }
    ]),
  ],
  entryComponents:[OrderadjustmentPopupComponent],
  providers: [FullscreenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
