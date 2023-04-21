import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnChanges {

  @Input() title:string='Sin titulo';
  @Input('labels') doughnutChartLabels: string[] = ['label1','label2','label3'];
  @Input() datos:number[]=[100,100,100];
  
  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartData={
      labels:this.doughnutChartLabels,
      datasets: [
        { data: this.datos,
          backgroundColor:['#6857E6','#009FEE', '#F02059']
        },
      ],
    }
  }

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.datos,
        backgroundColor:['#6857E6','#009FEE', '#F02059']
      },
    ],
    
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
