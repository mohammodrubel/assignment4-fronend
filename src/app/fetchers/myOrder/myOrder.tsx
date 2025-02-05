import { baseApi } from '../../api/baseApi';


const myOrder = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        myOrder: builder.query({
            query: () => ({
                url: `/user/myorder`
            }),
        }),

    }),
});

export const { useMyOrderQuery} = myOrder;
