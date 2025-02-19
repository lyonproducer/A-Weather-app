import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import { HISTORY_LOCAL } from 'src/app/shared/constants/storageNames';
import { ICityResult } from 'src/app/shared/interfaces/cityResult.interface';
import { ICurrent, Location } from '../../shared/interfaces/current.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  historyLocations$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    private storage: StorageService
  ) { }

  async initHistorys() {
    const historyList = await this.storage.get(HISTORY_LOCAL);
    this.setHistory(historyList ? historyList : []);
  }

  async getHistory() {
    const historyList = await this.storage.get(HISTORY_LOCAL);
    return historyList
  }

  setHistory(history: any) {
    this.storage.set(HISTORY_LOCAL, history);
    this.historyLocations$.next(history);
  }

  async removeHistory(historyName: string, localTime: number) {
    let historyList = await this.storage.get(HISTORY_LOCAL);
    const index = historyList.findIndex((item: ICurrent) => item.location.name === historyName && item.location.localtime_epoch === localTime);
    if (index > -1) {
      historyList.splice(index, 1);
      this.setHistory(historyList);
      return true;
    } else {
      return false;
    }
  }

  clearHistory() {
    this.setHistory([]);
  }
}
