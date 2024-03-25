import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registercustomer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent  implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService:UserService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.pattern('^[0-9]*$')]
    });
  }

  registered="";
  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.registerUser(this.signupForm.value).subscribe(
        (data:any)=>{
          if(data!=null){
              this.registered = "Registered Successfully!";
          }
        }
      )
    } else {
      // Form is invalid, handle accordingly (show errors, etc.)
    }
  }
}
