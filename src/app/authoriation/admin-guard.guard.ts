import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from "../services/auth-service.service";
@Injectable({
    providedIn: "root",
  }
)
export class AdminGurard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {
    console.log("SUPER ADMIN GUARD IS RUNNING");
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("ACTIVE IS RUNNING HERE");
    // console.log(this.authService.isAuthorized);
    if (this.authService.isLoggedIn() && this.authService.getUserRole()=="ROLE_ADMIN") {
      console.log("Welcome to super");
      return true;
    } else {
      console.log("Please Login here first.");
      this.route.navigate(["/auth/login"]);
      return false;
    }
  }
}
