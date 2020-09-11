import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import { IndexComponent } from './users/index/index.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateEditComponent } from './users/create-edit/create-edit.component';
import {RouterModule, Route, Routes} from '@angular/router';
import { ChartComponent } from './chart/chart.component';

const appRoutes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'create', component: CreateEditComponent},
  { path: 'edit/:id', component: CreateEditComponent},
  { path: 'chart', component: ChartComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CreateEditComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
