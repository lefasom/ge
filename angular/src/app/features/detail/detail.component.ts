import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../core/models/user.model';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  id: string = "";
  user: IUser = {
    name: '',
    email: '',
    password: ''
  };
  jsonUser: string = "";
  constructor(private route: ActivatedRoute, private _userService: UserService) { }

  getDetail(id: string | any) {
    this._userService.get(id).subscribe({
      next: (detail) => {
        this.user = detail
        this.jsonUser = JSON.stringify(this.user, null, 2)
      },
      error: (error) => {
        console.error('Error al getter usuario:', error);
      }
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la ruta
    this.route.params.subscribe(params => {
      this.id = params['id']; // Obtener el parámetro 'id' de la URL
      this.getDetail(this.id);
    });
  }
}