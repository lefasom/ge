import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tokens, UserService } from '../../core/services/user.service';
import { UserStore } from '../../core/store/user.store';
import { Router } from '@angular/router';

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

  private _router = inject(Router)
  private _formBuilder = inject(FormBuilder)
  private _userService = inject(UserService)
  private _userStore = inject(UserStore);
  ngOnInit(): void {
    this.emailControl = new FormControl('');
    this.passwordControl = new FormControl('');
    this.formulario = this._formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  
  logIn(): void {
  this._userService.logInUser(this.formulario.value).subscribe({
    next: (user) => {
      console.log(user)
      const tokenString = JSON.stringify(user);
      localStorage.setItem("Tokens",tokenString)
      this._userStore.getToUser(user.user)
      this._router.navigate([''])
    },
    error: (err) => {
      console.log(err)
    }
  })
  }
}
