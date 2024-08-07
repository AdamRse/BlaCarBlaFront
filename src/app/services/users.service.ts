import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {IUser} from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>('http://localhost:8000/api/users/nt');
  }
  registerUser(user:IUser): Observable<IUser>{
    return this.http.post<IUser>("http://localhost:8000/api/users", user);//https://angular.dev/api/common/http/HttpClient
  }
  loginUser(user:IUser): Observable<IUser>{
    return this.http.post<IUser>("http://localhost:8000/api/login", user);
  }
}