import { Component, Input, OnInit } from '@angular/core';
import { Current, Location } from '../../interfaces/current';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss'],
  standalone: false
})
export class LocationDetailComponent  implements OnInit {

  @Input() locationCity?: Location;
  @Input() locationCondition?: Current;

  constructor() { }

  ngOnInit() {}

}
