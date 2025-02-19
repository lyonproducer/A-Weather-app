import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/core/services/http.service';
import { ICityResult } from '../../interfaces/cityResult.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  standalone: false
})
export class SearchModalComponent  implements OnInit {

  searchInput = '';
  results: ICityResult[]= [];
  resultSelected?: ICityResult;
  isLoading = false;

  constructor(
    private modalController: ModalController,
    private httpService: HttpService
  ) { }

  ngOnInit() {}

  onSelectOption(result: ICityResult) {
    if(this.resultSelected === result) {
      this.resultSelected = undefined;
    } else {
      this.resultSelected = result;
    }
  }

  async dismiss(object?: ICityResult) {
    let res = null;
    if(object) {
      res = await lastValueFrom(this.httpService.getCurrent(object?.url));
    }
    await this.modalController.dismiss(res);
  }

  onHandleSearch(event: any) {
    this.isLoading = true;
    this.httpService.getSearch(event.value).subscribe({
      next: (res) => {
        this.results = res;
        this.isLoading = false;
      },
      error: (e) => {
        console.log(e);
        this.isLoading = false;
      }
    })
  }
}
