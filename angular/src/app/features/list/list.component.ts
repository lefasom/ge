import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { IUser } from '../../core/models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { UserStore } from '../../core/store/user.store';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  session: boolean = false
  userSubscription: Subscription;
  // users = signal<IUser[]>([])
  users: IUser[] = ([])
  private _router = inject(Router)
  private _userStore = inject(UserStore)

  constructor(private _UserService: UserService) {
    this.userSubscription = new Subscription();

    // effect(() => { console.log(this.users()) })
  }

  getUser() {
    this.userSubscription = this._UserService.getAll().subscribe({
      next: (data: IUser[]) => {
        // this.users.set(data);
        this.users = data;
        this._userStore.getToUsers(data)
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  deleteUser(id: string | any) {
    this._UserService.delete(id).subscribe({
      next: () => {
        console.log('Se eliminó el usuario con id:', id);
        this.getUser()
        // Aquí podrías realizar alguna acción adicional si es necesario
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    });
  }
  ngOnInit(): void {
    if (!this.session) {
      // this._router.navigate(['login'])
    }
    this.getUser()
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}