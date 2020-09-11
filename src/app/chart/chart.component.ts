import { Component, OnInit} from '@angular/core';
declare var google;
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  constructor() { }
  loadScript(url): void {
    const node = document.createElement('script'); // creates the script tag
    node.src = url;
    node.type = 'text/javascript'; // set the script type
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  ngOnInit(): void {
    this.loadScript('https://www.gstatic.com/charts/loader.js');
    this.loadScript('assets/chart.js');
  }
}
