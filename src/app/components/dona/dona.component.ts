import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartType } from "chart.js";

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
})
export class DonaComponent {
  @Input() title: string = 'Sin titulo'

  public doughnutChartLabels: string[] = [
    'Label1',
    'Label2',
    'Label3',
  ];
 @Input('data2') doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100],
        backgroundColor:['#6857E6','#009FEE','#F02059']
       },
    ],
  };
  public  doughnutChartType: ChartType = 'doughnut';

}
