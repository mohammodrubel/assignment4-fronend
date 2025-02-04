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
            if (item.value) {
              params.append(item.name, item.value.toString());
            }
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: Object.fromEntries(params.entries()),
        };
      },
      transformResponse: (response: TResponseRedux<product[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    categoryBrand: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateProductMutation, useGetAllProductQuery, useCategoryBrandQuery, useGetSingleProductQuery } = authApi;
