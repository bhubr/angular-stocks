import { Component, OnInit } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';

@Component({
  selector: 'manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  symbol: string = '';

  constructor(private service: StocksService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const symbol = this.symbol.toUpperCase();
    this.service.add(symbol);
    console.log(this.service.get());
    this.service.load(this.service.get());
  }

}
