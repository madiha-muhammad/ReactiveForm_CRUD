import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UnitTypeData } from './unit-type-data';

import { AppComponent } from './app.component';
import { UnitTypeComponent } from './unitTypes/unit-type.component';

@NgModule({
  declarations: [
    AppComponent,
    UnitTypeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(UnitTypeData),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
