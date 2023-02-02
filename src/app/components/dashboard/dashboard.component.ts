import {AfterViewInit, Component,ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto'
import {CommonService} from "../../services/common.service";
import {take} from "rxjs";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  canvas: any;
  ctx: any;
  car: any;
  microbus: any;
  truck: any = 1;
  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };
  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any;
  pieChart: any;
  emptySolot: number = 8;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.getCar();
  }

  initChart(): void {
    this.pieChartBrowser();
    this.barChartMethod()
  }

  pieChartBrowser(): void {
    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.pieChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['Car', 'MicroBus', 'Truck'],
        datasets: [
          {
            backgroundColor: [
              '#2ecc71',
              '#f1c40f',
              '#e74c3c',
            ],
            data: [this.car, this.microbus,this.truck],
          },
        ],
      },
    });
  }

  getCar() {
    this.commonService.getCategory('Car').subscribe((Carres:any)=> {
      this.car= Carres.length;
      this.commonService.getCategory('MicroBus').subscribe((Busres:any)=> {
        this.microbus= Busres.length;
        this.commonService.getCategory('Truck').subscribe((Truckres:any)=> {
          this.truck= Truckres.length;
          this.initChart();
        })
      })
    })
  }
  // getMicroBus() {
  //   this.commonService.getCategory('MicroBus').subscribe((res:any)=> {
  //     this.pieChart.data[1]= res.length;
  //   })
  // }
  // getTruck() {
  //   this.commonService.getCategory('Truck').subscribe((res:any)=> {
  //     this.pieChart.data[2]= res.length;
  //   })
  // }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Car', 'MicroBus', 'Truck'],
        datasets: [
          {
            label: '# parking',
            data: [this.car, this.microbus, this.truck],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
