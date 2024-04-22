import { Component, OnInit, inject } from '@angular/core';
import { CartStore } from '../../core/store/cart.store';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  private formBuilder = inject(FormBuilder)
  // private _router = inject(Router)
  cartStore = inject(CartStore);

  formulario!: FormGroup;
  nameControl!: FormControl;
  descriptionControl!: FormControl;
  priceControl!: FormControl;

  ngOnInit(): void {
    this.nameControl = new FormControl('');
    this.descriptionControl = new FormControl('');
    this.priceControl = new FormControl(0)
    this.formulario = this.formBuilder.group({
      name: this.nameControl,
      description: this.descriptionControl,
      price: this.priceControl
    });
  }
  
  enviarFormulario(): void {
    // Obtener los valores del formulario
    const datosFormulario = {
      _id: uuidv4(),
      name: this.nameControl.value,
      description: this.descriptionControl.value,
      price: this.priceControl.value
    };

    this.cartStore.addToCart(datosFormulario);

    this.nameControl = new FormControl('');
    this.descriptionControl = new FormControl('');
    this.priceControl = new FormControl(0)
    
    // this._router.navigate(['cart2'])
  }

}
