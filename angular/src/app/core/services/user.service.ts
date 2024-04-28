import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:3000/auth';
export type Tokens = {
  user: User;
  error: string;
  tokens: {
    access_token: string;
    refresh_token: string;
  }
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  createUser(data: User): Observable<Tokens> {
    return this.http.post<Tokens>(`${baseUrl}/register`, data);
  }
  logInUser(data: any): Observable<Tokens> {

    return this.http.post<Tokens>(`${baseUrl}/login`, data);
  }
  refreshUser(tokens: any): Observable<any> {
    console.log(tokens)
    return this.http.post(`${baseUrl}/refresh`,tokens);
  }
  logOut(userId:any): Observable<any> {
    console.log(userId)
    return this.http.post(`${baseUrl}/logout`,userId)
  }
}
