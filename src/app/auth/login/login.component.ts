import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/common/LoginRequest';
import { SharedService } from 'src/app/common/shared.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequest:LoginRequest;
  constructor(private userService: UserService, private authService: AuthService, private router: Router,private datashared:SharedService) {
    this.loginRequest = {} as LoginRequest;
  }


  ngOnInit(): void {
    this.datashared.getData().subscribe(
      (data)=>{
        if(data!=null){
          this.message = data;
        }
      }
    )
  }


  message="";
  rememberMe:Boolean=false;
  login(rememberMe: Boolean) {
    this.userService.loginUser(this.loginRequest).subscribe(
      (data: any) => {
        if (data.code===200) {
          // Store user information in the AuthService
          this.authService.setUser(data.data)
          this.authService.setToken(data.data.token);
          // Calculate expiration time based on rememberMe
          const expirationDate = rememberMe ? new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000) : undefined;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          // Check the user's role and redirect accordingly
          if (this.authService.getUserRole()==="ROLE_ADMIN") {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
  
          // Update UI as needed
          console.log('User logged in successfully');
        } else {
          this.message = data.message;
        }
      },
      (error: any) => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }
  }