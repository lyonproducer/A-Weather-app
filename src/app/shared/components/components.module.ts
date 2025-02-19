import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderMainComponent } from './header-main/header-main.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { LocationPreviewComponent } from './location-preview/location-preview.component';

@NgModule({
  declarations: [
    HeaderMainComponent,
    LocationDetailComponent,
    SearchModalComponent,
    LocationPreviewComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderMainComponent,
    LocationDetailComponent,
    LocationPreviewComponent
  ],
  providers: [],
})
export class ComponentsModule {}
