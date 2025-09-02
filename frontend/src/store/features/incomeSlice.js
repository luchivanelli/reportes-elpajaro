import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const incomeSlice = createApi({
  reducerPath: 'incomeSlice',
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
  tagTypes: ['Income'],
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => 'incomes',
      providesTags: ['Income']
    }),
    addIncome: builder.mutation({
      query: (newIncome) => ({
        url: 'incomes',
        method: 'POST',
        body: newIncome
      }),
      invalidatesTags: ['Income']
    }),
    updateIncome: builder.mutation({
      query: ({ id, incomeData }) => ({
          url: `incomes/${id}`,
          method: 'PUT',
          body: incomeData
      }),
      invalidatesTags: ['Income']
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `incomes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Income']
    })
  })
});

export const {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useUpdateIncomeMutation,
} = incomeSlice
