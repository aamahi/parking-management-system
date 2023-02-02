import {AfterViewInit, Component,ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto'
import {CommonService} from "../../services/common.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  canvas: any;
  ctx: any;
  car: any = 1;
  microbus: any = 1;
  truck: any = 1;
  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };
  @ViewChild('barCanvas') barCanvas: ElementRef | undefined;
  barChart: any;
  pieChart: any;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.getCar();
    this.getMicroBus();
    this.getTruck();
  }

  ngAfterViewInit(): void {
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
            data: [this.car?.length ? this.car.length : 1, this.microbus?.length ? this.microbus.length : 1, this.truck.length? this.truck.length : 1],
          },
        ],
      },
    });
  }

  getCar() {
    this.commonService.getCategory('Car').subscribe((res)=> {
      this.car =res;
      this.pieChart.data[0] = this.car.length;
    })
  }
  getMicroBus() {
    this.commonService.getCategory('MicroBus').subscribe((res)=> {
      this.microbus = res;
      this.pieChart.data[1]=this.microbus.length;
    })
  }
  getTruck() {
    this.commonService.getCategory('Truck').subscribe((res)=> {
     this.truck = res;
     this.pieChart.data[2]= this.truck?.length
    })
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Car', 'MicroBus', 'Truck'],
        datasets: [
          {
            label: '# parking',
            data: [this.car?.length ? this.car.length : 1, this.microbus?.length ? this.microbus.length : 1, this.truck.length? this.truck.length : 1],
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
