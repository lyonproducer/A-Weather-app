import { Injectable } from '@angular/core';
import { AlertController, IonicSafeString, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loading ?: HTMLIonLoadingElement | null;

  constructor(
    private loadingController: LoadingController,
    public toastController: ToastController,
    private alertController: AlertController
  ) {}

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Loading...',
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

  async presentAlertConfirm(sms: string, opt: any[]) {
		const alert = await this.alertController.create({
      mode: 'md',
      message: new IonicSafeString(sms),
			buttons: opt,
			backdropDismiss : false,
      cssClass: 'alert-class',
		});
		await alert.present();
	}

}
