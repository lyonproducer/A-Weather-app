import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  _storage!: Storage;

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    // if _storage already exist don't create db again!
    if(this._storage) {
      return;
    }

    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    return this._storage?.get(key);
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }

  public clear() {
    this._storage?.clear();
  }
}
