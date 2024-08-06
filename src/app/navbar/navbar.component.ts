// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css'
// })
// export class NavbarComponent {}


import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  routes: Route[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.routes = this.router.config.filter(route => route.path && route.path.length > 0);
  }
}
