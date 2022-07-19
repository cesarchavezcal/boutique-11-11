import { OrderT } from '@boutique-11-11/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApiSlice = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Orders'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/order',
  }),
  endpoints(builder) {
    return {
      fetchOrders: builder.query<{ data: OrderT[] }, void>({
        query() {
          return `/`;
        },
        providesTags: (result, error) => [
          ...result.data.map(({ id }) => ({ type: 'Orders', id } as const)),
        ],
      }),
    };
  },
});

export const { useFetchOrdersQuery } = ordersApiSlice;
