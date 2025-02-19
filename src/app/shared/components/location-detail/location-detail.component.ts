import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Current, ICurrent, Location } from '../../interfaces/current.interface';
import { UtilsService } from 'src/app/core/services/utils.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { ICityResult } from '../../interfaces/cityResult.interface';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss'],
  standalone: false
})
export class LocationDetailComponent  implements OnInit {

  @Input() locationCity!: Location;
  @Input() locationCondition!: Current;
  @Input() isLoading = false;

  @Output() addItem: EventEmitter<ICurrent> = new EventEmitter();
  @Output() removeItem: EventEmitter<ICurrent> = new EventEmitter();

  isLiked = false;

  constructor(
    private utilsService: UtilsService,
    private favoriteService: FavoriteService
  ) { }

  async ngOnInit() {
    this.isLiked = await this.favoriteService.isLiked(this.locationCity.name);
    console.log('liked ', this.isLiked);
  }

  openLikeModal(mode: string) {
    this.utilsService.presentAlertConfirm(
      `
        <div class="alert-head sc-ion-alert-md">
          <img src="assets/icons/warning-red-icon.svg" class="alert-icon">
          <h2 id="alert-1-hdr" class="alert-title sc-ion-alert-md">Warning!</h2>
        </div>
        <div class="alert-message-container">
          Are you sure ${mode} it to favorites?
        </div>
      `,
      [
        {
          text: 'No',
          handler: () => {

          },
        },
        {
          text: 'Yes',
          role: 'cancel',
          handler: () => {
            if(mode === 'add') {
              this.addItem.emit({location: this.locationCity, current:this.locationCondition})
              this.isLiked = true;
            } else {
              this.removeItem.emit({location: this.locationCity, current:this.locationCondition})
              this.isLiked = false;
            }
          },
        },
      ],
    )
  }

}
