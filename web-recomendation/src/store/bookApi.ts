import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from '../types/bookcard';

const BASE_URL = 'http://127.1.0.1:8000';
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'same-origin',
  }),
  tagTypes: ['Books', 'Book', 'Rec', 'User'],
  endpoints: (builder) => ({
    getBooks: builder.query<
      { books: Book[]; pages: number; page: number },
      string
    >({
      query: (page) => `books?${page && `page=${page}`}`,
      providesTags: () => ['Books'],
    }),
    getSingleBook: builder.query<{ book: Book }, string | undefined>({
      query: (id) => `books/${id}`,
      providesTags: () => ['Book'],
    }),
    getRecBooks: builder.query<{ rec_books: Book[] }, void>({
      query: () => 'rec_user',
      providesTags: () => ['Books', 'Rec', 'User'],
    }),
  }),
});

export const { useGetBooksQuery, useGetSingleBookQuery, useGetRecBooksQuery } =
  booksApi;
