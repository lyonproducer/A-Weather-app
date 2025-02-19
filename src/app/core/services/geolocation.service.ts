import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { BehaviorSubject } from 'rxjs';
import { ICoords } from 'src/app/shared/interfaces/coords.interface';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  public currentLocationCoords$: BehaviorSubject<ICoords> = new BehaviorSubject(
    {
      latitude: 0, longitude: 0
    }
  );

  constructor(
    private geolocation: Geolocation,
    private utilsService: UtilsService
) {}

  initGeoLocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log("resp.coords.longitude ", resp);
        // resp.coords.latitude
        // resp.coords.longitude
        if (resp) {
          this.currentLocationCoords$.next({
            latitude: resp.coords.latitude,
            longitude: resp.coords.longitude,
          });
        }
      })
      .catch((error) => {
        console.log('Error getting location', error);
        this.utilsService.presentToast('danger', 'Error trying to get current location');
      });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data: any) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      this.currentLocationCoords$.next({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
    });
  }
}
