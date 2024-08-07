import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUser} from '../interfaces/user';
import { IHeader } from "../interfaces/header";
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private header:HttpHeaders | null = null;
  private connected:boolean = false;

  constructor(private http: HttpClient) { }

  setToken(token:string){
    this.header = new HttpHeaders({ Authorization: "Bearer "+token });
    this.connected=true;
  }
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