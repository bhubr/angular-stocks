import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_SYMBOLS_KEY: string = 'ng-stocks:symbols';

function getStocksFromStorage(): Array<string> {
  const defaultStocks: Array<string> = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];
  const storedStocksJSON: string | null = localStorage.getItem(LS_SYMBOLS_KEY);
  let storedStocks: Array<string>;
  if (storedStocksJSON === null) {
    return defaultStocks;
  }
  try {
    storedStocks = JSON.parse(storedStocksJSON);
    return storedStocks;
  } catch (err) {
    return defaultStocks;
  }
}

const stocks: Array<string> = getStocksFromStorage();
const service: string = 'https://angular2-in-action-api.herokuapp.com';

export interface StockInterface {
  symbol: string;
  lastTradePriceOnly: number;
  change: number;
  changeInPercent: number;
};

type StocksList = Observable<Array<StockInterface>> | undefined;

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }

  get() {
    return stocks.slice();
  }

  store() {
    localStorage.setItem(LS_SYMBOLS_KEY, JSON.stringify(this.get()));
  }

  add(stock: string) {
    stocks.push(stock);
    this.store();
    return this.get();
  }

  remove(stock: string) {
    stocks.splice(stocks.indexOf(stock), 1);
    this.store();
    return this.get();
  }

  load(symbols: Array<string>): StocksList {
    if (symbols) {
      return this.http.get<Array<StockInterface>>(`${service}/stocks/snapshot?symbols=${symbols.join()}`);
    } else {
      return undefined;
    }
  }
}
