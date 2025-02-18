import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ICoords } from 'src/app/shared/interfaces/coords';
import { Current, Location } from 'src/app/shared/interfaces/current';

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

  constructor(
    private geolocationService: GeolocationService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.geolocationService.currentLocationCoords$.subscribe(
      (res: ICoords)=> {
        if(res.latitude !== 0 && res.longitude !== 0) {
          this.currentLocationCoords = res;
          this.getCurrentLocationData();
        }
      }
    );
  }

  getCurrentLocationData() {
    this.httpService.getCurrent(`${ this.currentLocationCoords?.latitude },${ this.currentLocationCoords?.longitude }`).subscribe({
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
