import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {IUser} from '../interfaces/user';
import { ILoginResponse } from "../interfaces/login-response";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private header:HttpHeaders | null = null;
  private _connected = new BehaviorSubject<boolean>(false);
  connected$ = this._connected.asObservable();
  private user?:IUser;
 
  constructor(private http: HttpClient) {
    const storedUser = sessionStorage.getItem('user');
    const storedHeader = sessionStorage.getItem('header');

    if (storedUser && storedHeader) {
      this.user = JSON.parse(storedUser);
      this.header = new HttpHeaders(JSON.parse(storedHeader));
      this._connected.next(true);
    }
  }
  logout(){
    this.header = null;
    this.user = undefined;
    this._connected.next(false);

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('header');
    console.log("UsersService.logout : utilisateur déconnecté")
  }
  setToken(token:string){
    this.header = new HttpHeaders({ Authorization: "Bearer "+token });
    this._connected.next(true);
    sessionStorage.setItem('header', JSON.stringify(this.header));
    console.log("UsersService.setToken : header utilisé : ", this.header, "status de la section :", (this._connected ? "connecté" : "déconnecté"));
  }
  getUser():IUser | undefined{
    return this.user;
  }
  getUsers(): Observable<IUser[]>{
    this.connected$.subscribe(isConnected => {
      console.log("UsersService.getUsers : status de la section :", isConnected ? "connecté" : "déconnecté");
    });
    return this.http.get<IUser[]>('http://localhost:8000/api/users/nt');
  }
  registerUser(user:Partial<IUser>): Observable<IUser>{
    return this.http.post<IUser>("http://localhost:8000/api/users", user);//https://angular.dev/api/common/http/HttpClient
  }
  loginUser(user:IUser): Observable<ILoginResponse>{    
    return this.http.post<ILoginResponse>("http://localhost:8000/api/login", user).pipe(
      tap(response => {
        this.user = response.user;
        this.setToken(response.access_token);
        sessionStorage.setItem('user', JSON.stringify(this.user));
      })
    );
  }
}