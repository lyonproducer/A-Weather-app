import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  currentScale$ :BehaviorSubject<string> =  new BehaviorSubject<string>('C');

  constructor() { }

  changeScale(scale: string) {
    this.currentScale$.next(scale);
  }
}
