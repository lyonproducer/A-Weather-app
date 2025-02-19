import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { HistoryService } from 'src/app/core/services/history.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SearchModalComponent } from 'src/app/shared/components/search-modal/search-modal.component';
import { ICoords } from 'src/app/shared/interfaces/coords.interface';
import { Current, Location } from 'src/app/shared/interfaces/current.interface';
import { ICityResult } from 'src/app/shared/interfaces/cityResult.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  currentLocationCoords?: ICoords;
  currentLocationCity?: Location;
  currentLocationCondition?: Current;
  params = '';

  constructor(
    private geolocationService: GeolocationService,
    private httpService: HttpService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private historyService: HistoryService
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: any)=> {
      console.log(params);
      this.params = params.q;
      if(this.params != 'current') {
        this.getCurrentLocationData(this.params);
      } else {
        if(this.currentLocationCoords) {
          this.router.navigateByUrl(`home/${ this.currentLocationCoords?.latitude },${ this.currentLocationCoords?.longitude }`);
        }
      }
    })

    this.geolocationService.currentLocationCoords$.subscribe(
      (res: ICoords)=> {
        if(res.latitude !== 0 && res.longitude !== 0) {
          this.currentLocationCoords = res;
          if(this.params === 'current'){
            this.router.navigateByUrl(`home/${ this.currentLocationCoords?.latitude },${ this.currentLocationCoords?.longitude }`);
          }
        }
      }
    );
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
      cssClass: 'modal-select-city',
      animated: true
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
    if(data){
      await this.saveToHistory(data);
      await this.router.navigateByUrl(`/detail/${ data.url }`);
    }
  }

  async saveToHistory(data: ICityResult) {
    let historyList = await this.historyService.getHistory();
    if(historyList) {
      historyList.push(data);
      this.historyService.setHistory(historyList);
    }
  }

  getCurrentLocationData(q: string) {
    this.httpService.getCurrent(q).subscribe({
      next: (res) => {
        this.currentLocationCity = res.location;
        this.currentLocationCondition = res.current;
        console.log(res);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

}
