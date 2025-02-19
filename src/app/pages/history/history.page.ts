import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/core/services/history.service';
import { UtilsService } from '../../core/services/utils.service';
import { ICurrent } from 'src/app/shared/interfaces/current.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false,
})
export class HistoryPage implements OnInit {

  history: ICurrent[] = [];
  
  constructor(
        private historyService: HistoryService,
        private utilsService: UtilsService
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

  async removeFromHistory(item: ICurrent) {
    const successRemoved = await this.historyService.removeHistory(item.location.name, item.location.localtime_epoch);
    if(successRemoved) {
      this.utilsService.presentToast('success', 'History removed successfully');
    } else {
      this.utilsService.presentToast('danger', 'Error trying to remove history');
    }
  }

}
