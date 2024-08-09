import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IUser } from '../../models/User';
import { IniciarSesionService } from './iniciar-sesion.service';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private iniciarSesionService: IniciarSesionService, private tokenStorageService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userInput: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const userInput = this.loginForm.get('userInput')?.value;
      const isEmail = this.isValidEmail(userInput);
      const newUser: IUser = {
        id: -1,
        username: '',
        email: '',
        password: ''
      };
      if (isEmail) {
        newUser.email = userInput;
      } else {
        newUser.username = userInput;
      }

      newUser.password = this.loginForm.get('contraseña')?.value;


      this.iniciarSesionService.postLogIn(newUser).subscribe({
        next: (response: any) => {
          console.log('Usuario registrado:', response);
          this.tokenStorageService.saveToken(response.token);
          this.errorMessage = null;
          this.router.navigateByUrl('perfil').then(() => {
            window.location.reload()
          }
          );
        },
        error: (error) => {
          if (error.status === 409) { // Suponiendo que el backend devuelve 409 para duplicados
            if (error.error.includes('email')) {
              this.errorMessage = 'El correo electrónico ya está registrado.';
            } else if (error.error.includes('username')) {
              this.errorMessage = 'El nombre de usuario ya está registrado.';
            }
          } else {
            this.errorMessage = 'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.';
          }
        }
      });

    } else {
      this.errorMessage = 'Por favor, corrija los errores en el formulario.';
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
