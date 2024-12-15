import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isRegisterMode = false;
  errorMessage: string | null = null;
  errorCode: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;

    if (this.isRegisterMode) {
      this.loginForm
        .get('confirmPassword')
        ?.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      this.loginForm.get('confirmPassword')?.clearValidators();
    }
    this.loginForm.get('confirmPassword')?.updateValueAndValidity();
  }

  hideState = {
    button1: signal(true),
    button2: signal(true),
  };
  clickEvent(event: MouseEvent, buttonId: 'button1' | 'button2') {
    this.hideState[buttonId].set(!this.hideState[buttonId]());
    event.stopPropagation();
  }

  // ngOnInit(): void {
  //   this.authService.onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log('Cambio de estado: Usuario autenticado:', user);
  //       this.router.navigate(['/profile']);
  //     } else {
  //       console.log('Cambio de estado: Usuario no autenticado');
  //     }
  //   });
  // }

  onSubmit(): void {
    const { email, password } = this.loginForm.value;
    if (!this.isRegisterMode) {
      this.authService
        .login(email, password)
        .then(() => {
          this.router.navigate(['/profile']);
          console.log('Iniciada');
        })
        .catch((error) => {
          this.errorCode = error.code;
          this.errorMessage = error.message;
          console.error(
            `Error al autenticar: ${this.errorCode} - ${this.errorMessage}`
          );
        });
    } else {
      this.authService
        .createUser(email, password)
        .then((data) => {
          console.log('Usuario creado exitosamente:', data);
          this.router.navigate(['/profile']);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error('Error al registrar usuario:', this.errorMessage);
        });
    }
  }

  onLogout(): void {
    this.authService
      .logout()
      .then(() => {
        console.log('Cerrada');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error.message);
      });
  }
}
