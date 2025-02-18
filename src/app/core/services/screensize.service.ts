import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  currentPosition: any;
  public width = new BehaviorSubject<number>(0);
  private isMobile = new BehaviorSubject<boolean>(false);
  private isDesktop = new BehaviorSubject<boolean>(false);
  private isTablet = new BehaviorSubject<boolean>(false);

  constructor() {}

  onResize(size: number) {
    this.width.next(size);
    if (size <= 576) {
      this.isMobile.next(true);
      this.isDesktop.next(false);
      this.isTablet.next(false);
    } else if (size > 576 && size < 992) {
      this.isMobile.next(false);
      this.isDesktop.next(false);
      this.isTablet.next(true);
    } else if (size > 992) {
      this.isMobile.next(false);
      this.isDesktop.next(true);
      this.isTablet.next(false);
    }
  }

  isMobileView(): Observable<boolean> {
    return this.isMobile.asObservable().pipe(distinctUntilChanged());
  }

  isDesktopView(): Observable<boolean> {
    return this.isDesktop.asObservable().pipe(distinctUntilChanged());
  }

  isTabletView(): Observable<boolean> {
    return this.isTablet.asObservable().pipe(distinctUntilChanged());
  }
}
