import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Service/shared-service.service';
import { Person } from '../model/person.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.fetchPersons();
  }

  fetchPersons() {
    this.apiService.getPersons().subscribe((data: Person[]) => {
      this.persons = data;
    });
  }

  editPerson(person: Person): void {
    this.router.navigate(['/edit-person', person.id]); // Navigate to edit-person route with person ID
  }
}
