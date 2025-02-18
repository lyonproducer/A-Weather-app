import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {

  public citySelected$: BehaviorSubject<any> = new BehaviorSubject({
    name: 'Ciudad Guayana',
    value: 'PZO',
  });

  constructor(
    private geolocation: Geolocation
  ) {}

  initGeoLocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        //console.log("resp.coords.longitude ", resp);
        // resp.coords.latitude
        // resp.coords.longitude
        if (resp) {
          

        }
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data: any) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      
    });
  }
}
