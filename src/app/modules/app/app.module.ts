import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import {WorkflowModule} from "../../modules/workflow/workflow.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WorkflowModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
