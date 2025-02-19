import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NetworkService } from './core/services/network.service';
import { StorageService } from './core/services/storage.service';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { GeolocationService } from './core/services/geolocation.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs';
import { FavoriteService } from './core/services/favorite.service';
import { HistoryService } from './core/services/history.service';
import { SettingsService } from './core/services/settings.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  currentUrl = '';
  scaleSelected = 'C';

  public appPages = [
    { title: 'Current', url: '/home/current', icon: 'cloud', include: 'home' },
    {
      title: 'Favorites',
      url: '/favorites',
      icon: 'heart',
      include: 'favorites',
    },
    { title: 'History', url: '/history', icon: 'document', include: 'history' },
  ];

  constructor(
    protected platform: Platform,
    private networkService: NetworkService,
    public localStorage: StorageService,
    private geolocationService: GeolocationService,
    private router: Router,
    private favoriteService: FavoriteService,
    private historyService: HistoryService,
    private settings: SettingsService
  ) {
    this.platform.ready().then(async () => {
      await this.localStorage.init();
      await this.favoriteService.initFavorites();
      await this.historyService.initHistorys();

      if (Capacitor.isNativePlatform()) {
        await StatusBar.setOverlaysWebView({ overlay: false });
        await StatusBar.setStyle({ style: Style.Light });
      }

      // get network data
      this.networkService.initializeNetworkEvents();

      // init get geolocation
      this.geolocationService.initGeoLocation();
    });

    this.router.events
      .pipe(
        map((event: any) => event.routerEvent as RouterEvent),
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((e: RouterEvent) => {
        this.currentUrl = e.url;
        console.log('this.currentUrl ', this.currentUrl);
      });
  }

  onHandleGradeChange() {
    this.settings.changeScale(this.scaleSelected);
  }
}
