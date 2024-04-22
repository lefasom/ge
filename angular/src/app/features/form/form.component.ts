import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../core/models/user.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserStore } from '../../core/store/user.store';

function noCaracteresEspeciales(control: AbstractControl): { [key: string]: any } | null {
  const caracteresEspeciales = /[!@#$%^&*(),.?":{}|<>]/;
  const tieneCaracterEspecial = caracteresEspeciales.test(control.value);
  return tieneCaracterEspecial ? { caracteresEspeciales: true } : null;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  formulario!: FormGroup;
  nameControl!: FormControl;
  emailControl!: FormControl;
  passwordControl!: FormControl;
  private _formBuilder = inject(FormBuilder)
  private _userService = inject(UserService)
  private _userStore = inject(UserStore);

  ngOnInit(): void {
    this.nameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      noCaracteresEspeciales // Validador personalizado
    ]);
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
    ]);
    this.passwordControl = new FormControl('', [
      // Validators.required,
      // Validators.pattern('[0-9]{10}'),
      // Validators.min(1000000000),
      // Validators.max(9999999999)
    ]);
    this.formulario = this._formBuilder.group({
      name: this.nameControl,
      email: this.emailControl,
      password: this.passwordControl,
    });
  }
  enviarFormulario(): void {
    // Obtener los valores del formulario
    const datosFormulario = {
      name: this.nameControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value
    };

    // Llamar al servicio para crear el usuario
    this._userService.createUser(datosFormulario).subscribe(
      (response) => {
        // Manejar la respuesta si es necesario
        console.log('Usuario creado exitosamente', response);
        const { _id, name, email, password } = response
        const newUser = { _id, name, email, password }
        this._userStore.addToUser(newUser)
      },
      (error) => {
        // Manejar cualquier error que pueda ocurrir
        console.error('Error al crear usuario', error);
      }
    );
  }
}
