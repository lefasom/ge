import { Component, inject } from '@angular/core';
import { UserStore } from '../../core/store/user.store';

@Component({
  selector: 'app-center-state',
  standalone: true,
  imports: [],
  templateUrl: './center-state.component.html',
  styleUrl: './center-state.component.css'
})
export class CenterStateComponent {

   _userStore = inject(UserStore)

  constructor() {
    console.log(this._userStore.users())
  }
}