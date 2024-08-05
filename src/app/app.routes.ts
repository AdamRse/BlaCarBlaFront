import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersComponent } from './content/users/users.component';

export const routes: Routes = [
    { path: '', component: AppComponent, title: 'Home', },
    { path: 'users', component: UsersComponent, title: 'Users', }
];