import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

const baseUrl = 'http://localhost:3000/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${baseUrl}`);
  }
  get(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${baseUrl}/${id}`);
  }

  createUser(data: any): Observable<any> {
    console.log(data)
    return this.http.post(baseUrl, data);
  }

  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }

  delete(id: string): Observable<any> {

    return this.http.delete(`${baseUrl}/${id}`);
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  // findByTitle(title: any): Observable<User[]> {
  //   return this.http.get<User[]>(`${baseUrl}?title=${title}`);
  // }
}
