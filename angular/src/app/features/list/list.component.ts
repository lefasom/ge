import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserStore } from '../../core/store/user.store';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  private _router = inject(Router)
  private _userStore = inject(UserStore)


  ngOnInit(): void {
    if (this._userStore.user()._id == "") {
      this._router.navigate(['login'])
    }
  }
}