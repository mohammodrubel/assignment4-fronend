/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUsers } from "../fetchers/auth/authSlice";
import type { RootState } from "../store";


const baseQuery = fetchBaseQuery({
    baseUrl: 'https://bike-store-sage.vercel.app/api',
    credentials: 'include',
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
})

const BaseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401) {
        const res = await fetch(`https://bike-store-sage.vercel.app/api/user/refresh-token`, {
            method: "POST",
            credentials: 'include'
        })
        const data = await res.json()
        if (data?.data?.accessToken) {
            // set new cradential 
            const user = (api.getState() as RootState).auth.user
            api.dispatch(setUsers({ user: user, token: data?.data?.accessToken }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }

    }

    return result
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: BaseQueryWithRefreshToken,
    endpoints: () => ({})
})