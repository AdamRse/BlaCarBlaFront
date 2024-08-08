import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from "../services/users.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  routes: Route[] = [];
  isConnected$: Observable<boolean>;

  constructor(private router: Router, private userService: UsersService) {
    this.isConnected$ = this.userService.connected$;
  }

  ngOnInit() {
    this.isConnected$.pipe(
      map(connected => 
        this.router.config.filter(route => 
          route.data?.['connected'] === undefined || route.data?.['connected'] === connected
        )
      )
    ).subscribe(filteredRoutes => {
      this.routes = filteredRoutes;
    });
  }
}
