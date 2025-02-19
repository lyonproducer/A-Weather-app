import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import { HISTORY_LOCAL } from 'src/app/shared/constants/storageNames';

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

  removeHistory(historyId: number) {

  }

  clearHistory() {
    this.setHistory([]);
  }
}
