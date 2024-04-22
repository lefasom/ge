import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { IProduct } from "../models/product.model";

export interface CartState {
    products: IProduct[],
}

const initialState: CartState = {
    products: [
        {  
            "_id": "1",
            "name": "name product 1",
            "price": 100,
            "description": "description product 1",
        }
    ],
}

export const CartStore = signalStore(
    {providedIn:  "root"},
    withState(initialState),
    withMethods(({products, ...store})=>({

        addToCart(product:IProduct){
            
            const updatedProduct = [...products(),product]
            patchState(store,{products:updatedProduct})
        },
        removeItemFromCart(id:string){
            const updatedProduct = products().filter(item=>item._id!==id)
            patchState(store,{products:updatedProduct})
        }

    }))
)