import { baseApi } from '../../api/baseApi';


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (id) => ({
                url: `/payment/intent/${id}`,
                method: 'POST',
            }),
        }),


    }),
});

export const { useCreatePaymentMutation } = authApi;
