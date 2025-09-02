import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const expenseSlice = createApi({
  reducerPath: 'expenseSlice',
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
  tagTypes: ['Expense'],
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => 'expenses',
      providesTags: ['Expense']
    }),
    addExpense: builder.mutation({
      query: (newexpense) => ({
        url: 'expenses',
        method: 'POST',
        body: newexpense
      }),
      invalidatesTags: ['Expense']
    }),
    updateExpense: builder.mutation({
      query: ({ id, expenseData }) => ({
          url: `expenses/${id}`,
          method: 'PUT',
          body: expenseData
      }),
      invalidatesTags: ['Expense']
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expenses/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Expense']
    })
  })
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} = expenseSlice