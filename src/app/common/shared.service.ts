// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private tempCartItemSource = new BehaviorSubject<any>(null);
  tempCartItem$ = this.tempCartItemSource.asObservable();

  sendTempCartItem(tempCartItem: any) {
    this.tempCartItemSource.next(tempCartItem);
  }
  sendAnyData(data:any){
    this.tempCartItemSource.next(data);
  }
  getData(): Observable<any> {
    return this.tempCartItemSource.asObservable();
  }
}
