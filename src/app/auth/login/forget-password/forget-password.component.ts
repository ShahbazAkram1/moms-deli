import { Component } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email="";
  isEmailVerfed = false;

  verifyEmail(){
    if(this.email == "shahbaz@gmail.com"){
        this.isEmailVerfed = true;
    }else{
      this.isEmailVerfed = false;
    }
  }
}
