import { OrderT } from '@boutique-11-11/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApiSlice = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/orders',
  }),
  endpoints(builder) {
    return {
      fetchOrdersByUser: builder.query<{ data: OrderT[] }, void>({
        query: () => '/',
        // providesTags: (result, error, arg) => ['Orders'],
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.data.map(({ id }) => ({
                  type: 'Order' as const,
                  id,
                })),
                'Order',
              ]
            : ['Order'],
      }),
      fetchOrderById: builder.query<{ data: OrderT }, string>({
        query(id) {
          return `/${id}`;
        },
      }),
    };
  },
});

export const { useFetchOrdersByUserQuery, useFetchOrderByIdQuery } =
  ordersApiSlice;
