import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { Tokens, UserService } from '../../core/services/user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  statusEmail = signal<boolean>(false)

  formulario!: FormGroup;
  emailControl!: FormControl;
  nameControl!: FormControl;
  passwordControl!: FormControl;

  private _router = inject(Router)
  private _formBuilder = inject(FormBuilder)
  private _userService = inject(UserService)

  ngOnInit(): void {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
    ]);
    this.nameControl = new FormControl('');
    this.passwordControl = new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(12)
    ])
    this.formulario = this._formBuilder.group({
      email: this.emailControl,
      name: this.nameControl,
      password: this.passwordControl,
    });

  }

  newUser(): void {
    this._userService.createUser(this.formulario.value).subscribe({
      next: (data: Tokens) => {
        if (data.error === 'Email already exists') {
          // Manejar el error de correo electrónico existente
          this.statusEmail.set(true)

        } else {
          // Si no hay error, el registro fue exitoso
          console.log("RECIBO TOKEN : ", data)
          // this.statusEmail.set(false)
          this.formulario.reset()
          this._router.navigate(['login'])
        }
      },
      error: (e) => {
        if (this.emailControl.value == "") {
          this.statusEmail.set(false)

        } else {
          this.statusEmail.set(true);
        }
      }
    })
  }
}
