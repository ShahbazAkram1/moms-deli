import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartToCheckoutPriceService {
  private totalPriceSource = new BehaviorSubject<number>(0);
  public totalPrice$ = this.totalPriceSource.asObservable();

  public updateTotalPrice(totalPrice: number): void {
      this.totalPriceSource.next(totalPrice);
  }
}