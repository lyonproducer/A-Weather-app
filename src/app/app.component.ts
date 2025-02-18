import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NetworkService } from './core/services/network.service';
import { StorageService } from './core/services/storage.service';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { GeolocationService } from './core/services/geolocation.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'cloud' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'History', url: '/history', icon: 'document' },
  ];

  constructor(
    protected platform: Platform,
    private networkService: NetworkService,
    public localStorage: StorageService,
    private geolocationService: GeolocationService
  ) {
    this.platform.ready().then(async () => {
      await this.localStorage.init();

      if (Capacitor.isNativePlatform()) {
        await StatusBar.setOverlaysWebView({ overlay: false });
        await StatusBar.setStyle({ style: Style.Light });
      }

      // get network data
      this.networkService.initializeNetworkEvents();

      // init get geolocation
      this.geolocationService.initGeoLocation();
    });
  }
}
