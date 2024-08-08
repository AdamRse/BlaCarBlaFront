import { Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { UsersComponent } from './content/users/users.component';
import { LoginComponent } from './content/login/login.component';
import { RegisterComponent } from './content/register/register.component';
import { TripsComponent } from './content/trips/trips.component';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    // { path: 'register', component: RegisterComponent, title: 'Register', canActivate: [AuthGuard]  },
    { path: 'users', component: UsersComponent, title: 'Users' },
    { path: 'trips', component: TripsComponent, title: 'Trips', data:{connected: true}  },
    { path: 'register', component: RegisterComponent, title: 'Register', data:{connected: false}  },
    { path: 'login', component: LoginComponent, title: 'Login', data:{connected: false} },
    { path: 'logout', component: LoginComponent, title: 'Logout', data:{connected: true} },
];