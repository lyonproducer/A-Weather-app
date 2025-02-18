import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/inbox', icon: 'mail' },
    { title: 'Favorites', url: '/folder/outbox', icon: 'heart' },
    { title: 'History', url: '/folder/favorites', icon: 'document' },
  ];

  
  constructor() {}
}
