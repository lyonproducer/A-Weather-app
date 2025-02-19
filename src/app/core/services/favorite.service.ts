import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { FAVORITE_LOCAL } from 'src/app/shared/constants/storageNames';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favoriteLocations$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    private storage: StorageService
  ) { }

  async initFavorites() {
    const favoriteList = await this.storage.get(FAVORITE_LOCAL);
    this.setFavorites(favoriteList ? favoriteList : []);
  }

  setFavorites(favorites: any) {
    this.storage.set(FAVORITE_LOCAL, favorites)
    this.favoriteLocations$.next(favorites);
  }

  removeFavorites(favoriteId: number) {


  }
}
