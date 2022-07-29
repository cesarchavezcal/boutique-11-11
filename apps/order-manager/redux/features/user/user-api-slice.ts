import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserT } from '@boutique-11-11/models';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/user',
  }),
  endpoints(builder) {
    return {
      fetchUser: builder.query<{ data: UserT }, string>({
        query() {
          return `/`;
        },
        providesTags: (result, error, id) => [{ type: 'User', id: id }],
      }),

      updateUser: builder.mutation<UserT, Partial<UserT>>({
        query: (data) => {
          const { id, ...body } = data;
          return {
            url: `/`,
            method: 'PATCH',
            body,
          };
        },
        invalidatesTags: (result, error, { id }) => [
          { type: 'User', id: id as string },
        ],
      }),
    };
  },
});

export const { useFetchUserQuery, useUpdateUserMutation } = userApiSlice;
