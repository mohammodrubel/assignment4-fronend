import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
export type TToken = {
    userId:string,
    role:string,
    iat:number,
    exp:number
  }
type TauthState = {
    user:null | TToken,
    token:null | string 
}

const initialState:TauthState = {
    user:null ,
    token:null 
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUsers:(state,action)=>{
            const {user,token} = action.payload
            state.user = user 
            state.token = token
        },
        logout:(state)=>{
            state.user = null 
            state.token = null 
        }
    }
})

export const {setUsers,logout} = authSlice.actions
export default authSlice.reducer 
export const userCurrentToken = (state:RootState)=> state.auth.token 
export const userCurrentInformation = (state:RootState)=> state.auth.user