// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
            invalidatesTags:['Orders']
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
            providesTags: ['Orders'],
        }),
        getSingleOrder: builder.query({
            query: (id: string) => ({
                url: `/orders/${id}`,
            }),
            providesTags: ['Orders']
        }),
        updateSingleOrder: builder.mutation({
            query: (information) => ({
                url: `/orders/${information.orderId}`,
                method: 'PATCH',
                body: information.mainData,
            }),
            invalidatesTags:['Orders']
        }),
    }),
});

export const { 
    useCreateOrderMutation, 
    useGetAllOrderQuery, 
    useGetSingleOrderQuery, 
    useUpdateSingleOrderMutation 
} = authApi;
