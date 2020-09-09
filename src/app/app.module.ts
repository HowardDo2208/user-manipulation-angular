import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import { IndexComponent } from './users/index/index.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateComponent } from './users/create/create.component';
import { ChartComponent } from './users/chart/chart.component';
import {RouterModule, Route, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'create', component: CreateComponent},
  { path: 'edit/:id', component: CreateComponent},
  { path: 'chart', component: ChartComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CreateComponent,
    ChartComponent
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
