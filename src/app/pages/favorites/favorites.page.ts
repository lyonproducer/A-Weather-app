import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/core/services/favorite.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ICityResult } from 'src/app/shared/interfaces/cityResult.interface';
import { ICurrent } from 'src/app/shared/interfaces/current.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {

  favorites: ICurrent[] = [];
  
  constructor(
    private favoriteService: FavoriteService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.favoriteService.favoriteLocations$.subscribe({
      next: (res) => {
        this.favorites = res;
      },
      error: (e)=> {
        console.log(e);
      }
    })
  }

  async removeFromFavorite(item: ICurrent) {
    const successRemoved = await this.favoriteService.removeFavorites(item.location.name);
    if(successRemoved) {
      this.utilsService.presentToast('success', 'Favorite location removed successfully');
    } else {
      this.utilsService.presentToast('danger', 'Error trying to remove favorite location');
    }
  }
}
