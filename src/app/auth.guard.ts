import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './services/users.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isConnected$: Observable<boolean>;

  constructor(private userService: UsersService, private router: Router) {
    this.isConnected$ = this.userService.connected$;
  }

  canActivate(): Observable<boolean> {
    return this.isConnected$.pipe(
      map(isConnected => {
        if (!isConnected) {
          this.router.navigate(['/']);
        }
        return isConnected;
      })
    );
  }
}