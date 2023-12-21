// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private tempCartItemSource = new BehaviorSubject<any>(null);
  tempCartItem$ = this.tempCartItemSource.asObservable();

  sendTempCartItem(tempCartItem: any) {
    this.tempCartItemSource.next(tempCartItem);
  }
}
