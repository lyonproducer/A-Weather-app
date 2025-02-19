import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { FAVORITE_LOCAL } from 'src/app/shared/constants/storageNames';
import { ICityResult } from 'src/app/shared/interfaces/cityResult.interface';
import { ICurrent } from 'src/app/shared/interfaces/current.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  favoriteLocations$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private storage: StorageService) {}

  async getFavorites() {
    const favoritesList = await this.storage.get(FAVORITE_LOCAL);
    return favoritesList;
  }

  async initFavorites() {
    const favoriteList = await this.storage.get(FAVORITE_LOCAL);
    this.setFavorites(favoriteList ? favoriteList : []);
  }

  setFavorites(favorites: any) {
    this.storage.set(FAVORITE_LOCAL, favorites);
    this.favoriteLocations$.next(favorites);
  }

  async removeFavorites(favoriteName: string) {
    let favoriteList = await this.storage.get(FAVORITE_LOCAL);
    const index = favoriteList.findIndex(
      (item: ICurrent) => item.location.name === favoriteName
    );
    if (index > -1) {
      favoriteList.splice(index, 1);
      this.setFavorites(favoriteList);
      return true;
    } else {
      return false;
    }
  }

  clearHistory() {
    this.setFavorites([]);
  }

  async isLiked(favoriteName: string) {
    let favoriteList = await this.storage.get(FAVORITE_LOCAL);
    const index = favoriteList.findIndex(
      (item: ICurrent) => item.location.name === favoriteName
    );
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }
}
