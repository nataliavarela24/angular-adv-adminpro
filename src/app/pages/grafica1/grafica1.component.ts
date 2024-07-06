import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from "chart.js";
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrl: './grafica1.component.css'
})
export class Grafica1Component {

  

  public labels1: string[] = [
    'Pan',
    'Refresco',
    'Tacos',
  ];
  public data1: ChartConfiguration<'doughnut'>['data'] = {
    labels: this.labels1,
    datasets: [
      { data: [10, 40, 100],
        backgroundColor:['#6857E6','#009FEE','#F02059']
       },
    ],
  };
  type = 'doughnut';

}
