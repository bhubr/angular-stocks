import { Component, Input, OnInit } from '@angular/core';
import { StockInterface } from 'src/app/services/stocks.service';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() stock: any;

  constructor() { }

  ngOnInit(): void {
  }

  isNegative() {
    return (this.stock && this.stock.change < 0);
  }

  isPositive() {
    return (this.stock && this.stock.change > 0);
  }

}
