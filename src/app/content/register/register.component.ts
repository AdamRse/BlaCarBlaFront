import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUser } from "../../interfaces/user";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log('Formulaire soumis, password : '+this.registerForm.value.password);
    if (this.registerForm.valid) {
      console.log('Formulaire valide');
      const user: IUser = {
        ...this.registerForm.value,
        avatar: null,
        password_confirmation: this.registerForm.value.password,
      };

      this.usersService.registerUser(user).subscribe(
        registeredUser => {
          console.log('Utilisateur enregistré avec succès:', registeredUser);
        },
        error => {
          if(error.email && error.email[0])
            console.error(error.email[0])
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
        }
      );
    }
    else{
      console.log('Formulaire invalide');
    }
  }
}
