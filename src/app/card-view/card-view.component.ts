import { Component, Input } from '@angular/core';
import { Person } from '../model/person.model';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent {
  @Input() person?: Person;

  constructor() {}
}
