import { Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { UsersComponent } from './content/users/users.component';
import { LoginComponent } from './content/login/login.component';
import { RegisterComponent } from './content/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'users', component: UsersComponent, title: 'Users' }
];