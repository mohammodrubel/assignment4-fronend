import { BaseQueryApi } from '@reduxjs/toolkit/query'
import {} from 'redux'
export type TError = {
  data:{
    message:string,
    success:boolean,
    stack:string 
  }
}

export type Tmeta = {
  limit:number 
  page:number 
  total:number 
}

export type TResponse<T> = {
  data?:T ,
  error:TError,
  meta?:Tmeta,
  success:boolean,
  message:string
}

export type TResponseRedux<T> =  TResponse<T> & BaseQueryApi

export interface product {
  _id: string
  name: string
  image: string
  orderQuantity: number
  brand: string
  price: number
  category: string
  inStock: boolean
  quantity: number
  description: string
}

export type TQueryParams = {
  name:string,
  value:string
}