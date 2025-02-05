import { baseApi } from '../../api/baseApi';
interface LogoutResponse {
  success: boolean;
  message: string;
}
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: '/user/create-user',
        method: 'POST',
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/user/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/user/change-password',
        method: 'POST',
        body:data 
      }),
    }),
  }),
});

export const { useRegisterMutation ,useLoginMutation,useLogoutMutation,useChangePasswordMutation} = authApi;