import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginSlice = createApi({
  reducerPath: "loginSlice",
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Login"],
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (login) => ({
        url: 'login',
        method: 'POST',
        body: login
      }),
      invalidatesTags: ['Login']
    })
  })
})

export const {
  usePostLoginMutation
} = loginSlice