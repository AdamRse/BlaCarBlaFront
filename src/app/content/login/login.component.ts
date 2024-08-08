import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUser } from "../../interfaces/user";
import { ILoginResponse } from "../../interfaces/login-response";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log('LoginComponent.onSubmit : Formulaire soumis, password : '+this.registerForm.value.password);
    if (this.registerForm.valid) {
      console.log('Formulaire valide');
      const user: IUser = {
        ...this.registerForm.value,
        avatar: null,
        password_confirmation: this.registerForm.value.password,
      };

      this.usersService.loginUser(user).subscribe(
        registeredUser => {
          console.log('LoginComponent.onSubmit : Utilisateur enregistré avec succès:', registeredUser);
          this.usersService.setToken(registeredUser.access_token);
        },
        error => {
          if(error.email && error.email[0])
            console.error(error.email[0])
          console.error('LoginComponent.onSubmit : Erreur lors de l\'enregistrement de l\'utilisateur:', error);
        }
      );
    }
    else{
      console.log('LoginComponent.onSubmit : Formulaire invalide');
    }
  }
}
