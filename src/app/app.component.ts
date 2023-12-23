import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';
  isNavbarOpen: boolean = false;

  isAdminPanel= false;
   
  constructor(private router:Router){
    this.router.events.subscribe(
      (data:any)=>{ 
        console.log("URL TESTING")
        console.log(data.url);
        if(data.url.startsWith("/admin")){
          this.isAdminPanel
           = true;
        }else{
          this.isAdminPanel = false;
        }
      }
    )

    }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}
