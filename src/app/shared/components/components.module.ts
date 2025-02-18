import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderMainComponent } from './header-main/header-main.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';

@NgModule({
  declarations: [
    HeaderMainComponent,
    LocationDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderMainComponent,
    LocationDetailComponent
  ],
  providers: [],
})
export class ComponentsModule {}
