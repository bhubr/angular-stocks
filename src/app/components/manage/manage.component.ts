import { Component, OnInit } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';

@Component({
  selector: 'manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  symbol: string = '';

  symbols: Array<string>;

  constructor(private service: StocksService) {
    this.symbols = service.get();
  }

  ngOnInit(): void {
  }

  onAdd() {
    const symbol = this.symbol.toUpperCase();
    this.symbols = this.service.add(symbol);
    this.symbol = '';
  }

  onRemove(symbol: string) {
    this.symbols = this.service.remove(symbol);
  }

}
