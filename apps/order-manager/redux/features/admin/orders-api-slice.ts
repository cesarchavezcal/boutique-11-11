import { OrderT } from '@boutique-11-11/models';
import { Order } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminOrdersApiSlice = createApi({
  reducerPath: 'adminOrdersApi',
  tagTypes: ['Admin-Order'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/admin/orders',
  }),
  endpoints(builder) {
    return {
      fetchAllOrders: builder.query<Order[], void>({
        query: () => '/',
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.map(({ id }) => ({
                  type: 'Admin-Order' as const,
                  id,
                })),
                'Admin-Order',
              ]
            : ['Admin-Order'],
      }),
    };
  },
});

export const { useFetchAllOrdersQuery } = adminOrdersApiSlice;
