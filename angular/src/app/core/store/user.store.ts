import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { IUser } from "../models/user.model";

export interface UserState {
    users: IUser[],
}

const initialState: UserState = {
    users: [
        {  
            "_id": "",
            "name": "",
            "email": "",
            "password": "",
        }
    ],
}

export const UserStore = signalStore(
    {providedIn:  "root"},
    withState(initialState),
    withMethods(({users, ...store})=>({

        getToUsers(users:IUser[]){
            patchState(store,{users:users})
        },
        addToUser(user:IUser){
            const updatedUser = [...users(),user]
            patchState(store,{users:updatedUser})
        }
        // removeItemFromCart(id:string){
        //     const updatedProduct = products().filter(item=>item._id!==id)
        //     patchState(store,{products:updatedProduct})
        // }

    }))
)