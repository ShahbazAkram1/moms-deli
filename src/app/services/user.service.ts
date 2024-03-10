import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/User';
import { LoginRequest } from '../common/LoginRequest';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // url = 'https://momsdelionline.com/auth/';
    url = 'https://api.momsdelionline.com/auth/'
  //url = 'http://localhost:8080/auth/';
  constructor(private httpClient: HttpClient) {}

  public registerUser(user: User) {
    return this.httpClient.post(`${this.url}register`, user);
  }
  public loginUser(loginRequest: LoginRequest) {
    return this.httpClient.post(`${this.url}login`, loginRequest);
  }
}
