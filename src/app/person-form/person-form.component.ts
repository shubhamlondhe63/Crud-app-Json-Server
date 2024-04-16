import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Service/shared-service.service';
import { Person } from '../model/person.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  @Input() personToEdit?: Person; // Input for person data to edit
  personForm: FormGroup;
  isEditMode: boolean = false;

  constructor(    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      avatar: ['https://via.placeholder.com/150'],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.apiService.getPersonById(params['id']).subscribe(
          (person: Person) => {
            this.personToEdit = person;
            this.setFormValues(person);
          },
          (error: any) => {
            console.error('Error fetching person for edit:', error);
            // Handle error or navigate back
          }
        );
      }
    });
  }

  setFormValues(person: Person): void {
    this.personForm.patchValue({
      name: person.name,
      email: person.email,
      dob: person.dob,
      avatar: person.avatar,
      country: person.country
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      const formData: Person = this.personForm.value;
      if (this.isEditMode) {
        formData.id = this.personToEdit?.id;
        this.apiService.updatePerson(formData).subscribe(
          (response: Person) => {
            console.log('Person updated successfully:', response);
            this.personForm.reset();
            this.router.navigate(['/persons']);
          },
          (error: any) => {
            console.error('Error updating person:', error);
            
          }
        );
      } else {
        this.apiService.addPerson(formData).subscribe(
          (response: Person) => {
            console.log('Person added successfully:', response);
            this.router.navigate(['/persons']);
            this.personForm.reset();
          },
          (error: any) => {
            console.error('Error adding person:', error);
          }
        );
      }
    } else {
      this.personForm.markAllAsTouched();
    }
  }
}
