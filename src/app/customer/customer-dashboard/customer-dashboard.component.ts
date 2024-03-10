import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  currentUser:any;
constructor(private authService:AuthService,private router:Router){
  this.currentUser =  this.authService.getUser();

}

logoutUser(){
  this.authService.logout();
window.location.href = "/product";
// spelling check kayo product js
}

}
