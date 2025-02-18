import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  
  public appPages = [
    { title: 'Home', url: '/home', icon: 'cloud' },
    { title: 'Favorites', url: '/favorites', icon: 'heart' },
    { title: 'History', url: '/history', icon: 'document' },
  ];


  constructor() {}
}
