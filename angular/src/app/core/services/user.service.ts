import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:3000/auth';
export type Tokens = {
  error: string;
  access_token: string;
  refresh_token: string;
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
  // refreshUser(data: any): Observable<any> {
  //   data={"msj":"probando post"}
  //   return this.http.post(`${baseUrl}/refresh`,data);
  // }
}
