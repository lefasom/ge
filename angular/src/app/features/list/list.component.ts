import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserStore } from '../../core/store/user.store';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  private _userService = inject(UserService)
  private _router = inject(Router)
  _userStore = inject(UserStore)

  logout() {
    const token = JSON.parse(localStorage.getItem('Tokens') as string )
    console.log(token)
    this._userService.logOut(token).subscribe({
      next: (data) => {
        console.log(data)
        localStorage.removeItem('Tokens')
        this._userStore.getToUser({})
        this._router.navigate(['login'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {

    const token = localStorage.getItem('Tokens') as string


    this._userService.refreshUser(JSON.parse(token)).subscribe({
      next: (user) => {
        console.log(user)
        const tokenString = JSON.stringify(user);
        localStorage.setItem("Tokens", tokenString)
        this._userStore.getToUser(user.user)
        // this._router.navigate([''])
      },
      error: (err) => {
        console.log(err)
        this._router.navigate(['login'])

      }
    })
    // if (this._userStore.user()._id == "") {
    //   this._router.navigate(['login'])
    // }
  }
}