import { Injectable } from '@angular/core';
import { User } from '../common/User';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly localStorageKey = 'token'; // Adjust this key as needed
  private authenticationStatus = new Subject<boolean>(); 


  public isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public getToken(): string | null {
    const authDataString = localStorage.getItem(this.localStorageKey);

    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);

        // Check if the token is still valid (not expired)
        if (authData.expiryTime && new Date().getTime() < authData.expiryTime) {
          return authData.token;
        } else {
          // Token has expired, remove it from localStorage
          this.logout();
          return null;
        }
      } catch (error) {
        console.error('Error parsing authentication data:', error);
        this.logout(); // Remove invalid data from localStorage
      }
    }

    return null;
  }

  public logout(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  public setToken(token: string): void {
    const expiryTime = new Date();
    expiryTime.setTime(expiryTime.getTime() + 60 * 60 * 1000);
    const authData = {
      token: token,
      expiryTime: expiryTime.getTime(),
    };

    localStorage.setItem(this.localStorageKey, JSON.stringify(authData));
  }

  public setUser(userDto: User): void {
    localStorage.setItem('user', JSON.stringify(userDto));
    this.authenticationStatus.next(true); 
    
  }

  public getUser(): User {
    const user: string = localStorage.getItem('user') || '{}';
    return JSON.parse(user);
  }

  public getUserDto(): User | null {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const user: User = JSON.parse(userJSON);
      return user;
    } else {
      return null;
    }
  }

  public getUserRole(): string | null {
    return this.getUserDto()?.roles[0]?.name || null;
  }

  public getAuthenticationStatus() {
    return this.authenticationStatus.asObservable();
  }
}
