import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const selectsSlice = createApi({
  reducerPath: 'selectsSlice',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getIncomeCategories: builder.query({
      query: () => 'incomes/categories',
      keepUnusedDataFor: 3600 // caché por una hora
    }),
    getExpenseCategories: builder.query({
      query: () => 'expenses/categories',
      keepUnusedDataFor: 3600 // caché por una hora
    }),
    getPayments: builder.query({
      query: () => 'payments',
      keepUnusedDataFor: 3600 // caché por una hora
    }),
  })
});

export const {
  useGetIncomeCategoriesQuery,
  useGetExpenseCategoriesQuery,
  useGetPaymentsQuery,
} = selectsSlice