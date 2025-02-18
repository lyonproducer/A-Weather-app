import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderMainComponent } from './header-main/header-main.component';

@NgModule({
  declarations: [
    HeaderMainComponent
  ],
  imports: [ 
    CommonModule, 
    IonicModule
  ],
  exports: [
    HeaderMainComponent
  ],
  providers: [],
})
export class ComponentsModule {}