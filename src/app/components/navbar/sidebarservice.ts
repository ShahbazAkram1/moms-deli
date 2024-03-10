import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isOpen = new BehaviorSubject<boolean>(false);

  get isOpen$() {
    return this._isOpen.asObservable();
  }

  toggle() {
    console.log(this._isOpen.value);
    this._isOpen.next(!this._isOpen.value);
  }
}