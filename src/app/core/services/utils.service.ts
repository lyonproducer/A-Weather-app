import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loading ?: HTMLIonLoadingElement | null;

  constructor(
    private loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });
    await this.loading.present();
  }

  async closeLoading() {
    if(this.loading) {
      try {
        await this.loadingController.dismiss();
        this.loading = null;
      } catch (error) {
        this.loading = null;
      }
    }
  }

  async presentToast(color: string, message: string) {
    const toast = await this.toastController.create({
      position: 'top',
      color: color,
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  async presentErrorToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'top',
      color: 'danger',
      cssClass: 'toast',
    });
    toast.present();
  }
}
