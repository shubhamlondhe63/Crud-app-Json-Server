import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Service/shared-service.service';
import { Person } from '../model/person.model';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  personForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      avatar: ['https://via.placeholder.com/150'],
      country: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      const newPerson: Person = this.personForm.value;
      this.apiService.addPerson(newPerson).subscribe(
        (response: any) => {
          console.log('Person added successfully:', response);
          this.personForm.reset();
        },
        (error: any) => {
          console.error('Error adding person:', error);
        }
      );
    } else {
      this.personForm.markAllAsTouched();
    }
  }
}
