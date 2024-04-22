import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css'
})
export class SignalComponent {

  counter = signal<number>(0)
  double = computed(():number=>this.counter()*2)

  constructor(){
    effect(()=>{
      console.log(`counter: ${this.counter()}, double: ${this.double()} `)
    })
  }

  increment(){
    this.counter.update((val:number)=>val+1)
  }
  decrement(){
    this.counter.update((val:number)=>val-1)
  }
  reset(){
    this.counter.set(0)
  }


}
