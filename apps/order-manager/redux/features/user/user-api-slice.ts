import { UserT } from '@boutique-11-11/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/user',
  }),
  endpoints(builder) {
    return {
      fetchUserById: builder.query<{ data: UserT }, string>({
        query() {
          return `/`;
        },
        providesTags: (result, error, id) => [{ type: 'User', id }],
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

export const { useFetchUserByIdQuery, useUpdateUserMutation } = userApiSlice;
