import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BeadcrumbsComponent } from './shared/beadcrumbs/beadcrumbs.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';


@NgModule({
    declarations: [
      AppComponent, 
      PagesComponent,
      DashboardComponent,
      HeaderComponent,
      SidebarComponent,
      BeadcrumbsComponent,
      ProgressComponent,
      Grafica1Component,
      RegisterComponent,
      LoginComponent,
      NopagefoundComponent,
    ],

    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule]
})
export class AppModule {}