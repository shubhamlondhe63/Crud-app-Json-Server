import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Service/shared-service.service';
import { Person } from '../model/person.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchPersons();
  }

  fetchPersons() {
    this.apiService.getPersons().subscribe((data: Person[]) => {
      this.persons = data;
    });
  }
}
