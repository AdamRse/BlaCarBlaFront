import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {IUser} from '../interfaces/user';
import { ILoginResponse } from "../interfaces/login-response";
import { IHeader } from "../interfaces/header";
import { log } from 'console';
import { connect } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private header:HttpHeaders | null = null;
  private _connected = new BehaviorSubject<boolean>(false);
  connected$ = this._connected.asObservable();

  constructor(private http: HttpClient) { }
  logout(){
    this.header = null;
    this._connected.next(false);
    console.log("UsersService.logout : utilisateur déconnecté")
  }
  setToken(token:string){
    this.header = new HttpHeaders({ Authorization: "Bearer "+token });
    this._connected.next(true);
    console.log("UsersService.setToken : header utilisé : ", this.header, "status de la section :", (this._connected ? "connecté" : "déconnecté"));
  }
  getUsers(): Observable<IUser[]>{
    this.connected$.subscribe(isConnected => {
      console.log("UsersService.getUsers : status de la section :", isConnected ? "connecté" : "déconnecté");
    });
    return this.http.get<IUser[]>('http://localhost:8000/api/users/nt');
  }
  registerUser(user:IUser): Observable<IUser>{
    return this.http.post<IUser>("http://localhost:8000/api/users", user);//https://angular.dev/api/common/http/HttpClient
  }
  loginUser(user:IUser): Observable<ILoginResponse>{    
    return this.http.post<ILoginResponse>("http://localhost:8000/api/login", user);
  }
}