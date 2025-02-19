import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { DB_NAME } from './shared/constants/storageNames';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot({name: DB_NAME, storeName: DB_NAME}),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptorsFromDi()),
    Geolocation
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
