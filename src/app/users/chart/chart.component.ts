import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  regionData: any;
  apiURL = 'http://127.0.0.1:8000/api/regionData';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRegionData()
      .subscribe(data => this.regionData = data);
  }
  getRegionData(): any {
    return this.http.get(this.apiURL);
  }
}
