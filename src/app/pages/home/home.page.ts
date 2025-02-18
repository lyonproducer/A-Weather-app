import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ICoords } from 'src/app/shared/interfaces/coords';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  currentLocationCoords?: ICoords;

  constructor(
    private geolocationService: GeolocationService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.geolocationService.currentLocationCoords$.subscribe(
      (res: ICoords)=> {
        this.currentLocationCoords = res;
      }
    );
  }

  getCurrentLocationData() {
    this.httpService.getCurrent(`${ this.currentLocationCoords?.latitude },${ this.currentLocationCoords?.longitude }`).subscribe({
      next: () => {

      },
      error: (e) => {
        
      }
    })
  }

}
