import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { IUser, User } from "../models/user.model";

export interface UserState {
    user: User,
}

const initialState: UserState = {
    user: 
        {  
            "_id": "",
            "name": "",
            "email": "",
            "password": "",
        }
    ,
}

export const UserStore = signalStore(
    {providedIn:  "root"},
    withState(initialState),
    withMethods(({user, ...store})=>({

        getToUser(user:any){
            patchState(store,{user:user})
        }

    }))
)