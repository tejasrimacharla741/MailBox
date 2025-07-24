import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComposeService {
  private _isComposeOpen = new BehaviorSubject<boolean>(false);
  isComposeOpen$ = this._isComposeOpen.asObservable();

  open() {
    this._isComposeOpen.next(true);
  }

  close() {
    this._isComposeOpen.next(false);
  }
}
