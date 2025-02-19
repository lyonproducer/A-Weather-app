import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ICityResult } from '../../interfaces/cityResult.interface';
import { ICurrent } from '../../interfaces/current.interface';

@Component({
  selector: 'app-location-preview',
  templateUrl: './location-preview.component.html',
  styleUrls: ['./location-preview.component.scss'],
  standalone: false
})
export class LocationPreviewComponent  implements OnInit {

  @Input() mode: string = '';
  @Input() item!: ICurrent;
  
  @Output() removeItem: EventEmitter<ICurrent> = new EventEmitter();

  constructor(
    private router: Router,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {}

  goToDetail(item: ICurrent) {
    this.router.navigateByUrl(`/detail/${item.location.lat},${item.location.lon}`);
  }

  removeFrom(item: ICurrent) {
    this.utilsService.presentAlertConfirm(
      `
        <div class="alert-head sc-ion-alert-md">
          <img src="assets/icons/warning-red-icon.svg" class="alert-icon">
          <h2 id="alert-1-hdr" class="alert-title sc-ion-alert-md">Warning!</h2>
        </div>
        <div class="alert-message-container">
          Are you sure about remove it from ${this.mode}?
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
            this.removeItem.emit(item);
          },
        },
      ],
    )
  }

}
