import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  constructor(private router:Router,private authService:AuthService){

  }
  logout(){
    this.authService.logout();
    Swal.fire({
      title: "SUCCESS",
      text: "Logout Successfully!",
      icon: "success"
    });
    setTimeout(()=>{
      this.router.navigate(['/auth/login']);
    },2000)
  }
}
