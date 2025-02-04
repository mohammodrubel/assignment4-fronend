import { TQueryParams } from '../../../types/globalTypes';
import { baseApi } from '../../api/baseApi';


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: '/orders',
                method: 'POST',
                body: data,
            }),
        }),
        getAllOrder: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value);
                    });
                }

                return {
                    url: "/orders",
                    method: "GET",
                    params: params,
                };
            },
        }),
    }),
});

export const { useCreateOrderMutation, useGetAllOrderQuery } = authApi;
