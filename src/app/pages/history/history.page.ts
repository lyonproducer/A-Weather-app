import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/core/services/history.service';
import { ICityResult } from 'src/app/shared/interfaces/cityResult.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false,
})
export class HistoryPage implements OnInit {

  history: ICityResult[] = [];
  
  constructor(
        private historyService: HistoryService
  ) { }

  ngOnInit() {
    this.historyService.historyLocations$.subscribe({
      next: (res) => {
        this.history = res;
      },
      error: (e)=> {
        console.log(e);
      }
    })
  }

}
