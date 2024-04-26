import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [  
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component
  ]
})
export class PagesModule { }
