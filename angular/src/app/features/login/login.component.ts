import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  emailControl!: FormControl;
  passwordControl!: FormControl;

  private _formBuilder = inject(FormBuilder)

  ngOnInit(): void {
    this.emailControl = new FormControl('');
    this.passwordControl = new FormControl('');
    this.formulario = this._formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }
  logIn(): void {
    console.log(this.formulario.value)
  }
}
