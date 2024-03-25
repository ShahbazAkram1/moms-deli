import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  description = new FormControl('', [Validators.required]);

  onSubmit() {
    if (this.name.valid && this.email.valid && this.description.valid) {
      // Form is valid, proceed with form submission
      console.log('Form submitted:', this.name.value, this.email.value, this.description.value);
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
    }
  }
}
