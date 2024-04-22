import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hijo2',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hijo2.component.html',
  styleUrl: './hijo2.component.css'
})
export class Hijo2Component {
  @Output() messageEvent = new EventEmitter<string>();
  message: string = '';

  sendMessage() {
    this.messageEvent.emit(this.message);
    this.message = '';

  }
}
