import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoute: Routes = [
  {path: '', component: HeaderComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoute, {enableTracing: true}),
    MatTabsModule,
    MatTableModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }],
  bootstrap: [AppComponent]

})
export class AppModule { }
