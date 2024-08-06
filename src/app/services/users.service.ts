import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get('http://localhost:8000/api/users/nt');
  }
  registerUser(): Observable<any>{
    return this.http.post("");//
  }
}