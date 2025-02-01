import { product, TQueryParams, TResponseRedux } from '../../../types/globalTypes';
import { baseApi } from '../../api/baseApi';


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
    }),
    getAllProduct: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (Response: TResponseRedux<product[]>) => {
        return {
          data: Response.data,
          meta: Response.meta
        }
      }
    }),
  }),
});

export const { useCreateProductMutation, useGetAllProductQuery } = authApi;
