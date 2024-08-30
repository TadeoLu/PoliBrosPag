import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/User';
import { RegistroService } from './registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  seRegistro : boolean = false;
  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser: IUser = {
        id: 0, // Se asumirá que el backend asigna el ID
        username: this.registerForm.value.nombre,
        email: this.registerForm.value.mail,
        password: this.registerForm.value.contraseña
      };

      this.registroService.postRegistro(newUser).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          this.errorMessage = null;
          this.seRegistro = true;
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
    }
  }

  routerInicioSesion() {
    this.router.navigateByUrl('inicio-sesion');
  }
}
