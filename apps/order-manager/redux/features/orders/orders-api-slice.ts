import { Order } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApiSlice = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/orders',
  }),
  endpoints(builder) {
    return {
      fetchOrdersByUser: builder.query<Order[], void>({
        query: () => '/',
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.map(({ id }) => ({
                  type: 'Order' as const,
                  id,
                })),
                'Order',
              ]
            : ['Order'],
      }),

      fetchOrderById: builder.query<Order, string>({
        query: (id) => `/${id}`,
        providesTags: (result, error, id) => [{ type: 'Order', id }],
      }),

      postOrder: builder.mutation<Order, Partial<Order>>({
        query: (body) => ({
          url: '/',
          method: 'POST',
          body,
        }),
        invalidatesTags: (result, error) => [{ type: 'Order' }],
      }),
    };
  },
});

export const {
  useFetchOrdersByUserQuery,
  useFetchOrderByIdQuery,
  usePostOrderMutation,
} = ordersApiSlice;
