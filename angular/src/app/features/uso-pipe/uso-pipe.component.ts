import { Component, Pipe } from '@angular/core';
import { MiPipePersonalizadoPipe } from '../../shared/pipes/mi-pipe-personalizado.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uso-pipe',
  standalone: true,
  imports: [MiPipePersonalizadoPipe,CommonModule],
  templateUrl: './uso-pipe.component.html',
  styleUrl: './uso-pipe.component.css'
})
export class UsoPipeComponent {
  nombre: string = "estoy estudiando pipe"
  fecha = new Date()
}
