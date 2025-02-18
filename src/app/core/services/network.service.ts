import { Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';

export enum NetworkStatus {
  offline = 0,
  online = 1
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  status: BehaviorSubject<NetworkStatus> = new BehaviorSubject<NetworkStatus>(NetworkStatus.offline);

  constructor(
    private toastController: ToastController
  ) { };

  async initializeNetworkEvents() {
    this.setNetwork(await this.logCurrentNetworkStatus());

    Network.addListener('networkStatusChange', networkStatus => {
      //console.log('Network status changed', networkStatus);
      this.setNetwork(networkStatus);
    });

    this.status.subscribe(
      async () => {
        if (this.status.getValue() === NetworkStatus.offline) {
          //console.log('WE ARE offline');
          await this.updateNetworkStatus(NetworkStatus.offline);
        }
      }
    );
  }

  setNetwork(networkStatus: ConnectionStatus) {
    //console.log('set networkStatus ', networkStatus);
    const status =  networkStatus.connected ? NetworkStatus.online : NetworkStatus.offline;
    this.status.next(status);
  }

  logCurrentNetworkStatus() {
    return Network.getStatus();
  };

  async updateNetworkStatus(status: NetworkStatus) {
    const connection = status === NetworkStatus.offline ? 'sin conexión a internet' : 'conectado a internet';
    try {
      const toast = await this.toastController.create({
        color: status === NetworkStatus.offline ? 'danger' : 'success',
        message: `Se encuentra actualmente ${connection}`,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } catch (error) {

    }
  }
}
