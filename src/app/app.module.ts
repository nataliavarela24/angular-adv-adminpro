import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';


import { AuthModule } from './auth/auth.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesModule } from './pages/pages.module';




@NgModule({
    declarations: [
      AppComponent, 
      NopagefoundComponent,
    ],

    imports: [
      BrowserModule, 
      AppRoutingModule,
      PagesModule,
      AuthModule
    ],

    bootstrap: [AppComponent],
})
export class AppModule {}