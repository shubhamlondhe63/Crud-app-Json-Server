import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  personForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      avatar: ['https://via.placeholder.com/150'],
      country: ['', Validators.required]
    });
  }

  onSubmit() {
    // Implement saving data logic here
    console.log(this.personForm.value);
    this.personForm.reset();
  }
}
