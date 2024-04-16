import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../model/person.model';
import { ApiService } from '../Service/shared-service.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent {
  @Input() person?: Person;
  @Output() editClicked: EventEmitter<Person> = new EventEmitter<Person>();
  constructor(private apiService: ApiService) {}


  editPerson(): void {
    this.editClicked.emit(this.person);
  }

  onDeletePerson(personId: number): void {
    if (confirm('Are you sure you want to delete this person?')) {
      this.apiService.deletePerson(personId).subscribe(
        () => {
          console.log('Person deleted successfully');
          // Optionally, you can emit an event to notify the parent component about the deletion
        },
        (error: any) => {
          console.error('Error deleting person:', error);
        }
      );
    }
  }
  persons: Person[] = [];
}
