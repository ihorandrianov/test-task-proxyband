import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album } from '../types/Album';
import { Post } from '../types/Post';
import { User } from '../types/User';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], string>({
      query: () => 'users/',
    }),
    getUserPosts: builder.query<Post[], string>({
      query: (userId) => `users/${userId}/posts`,
    }),
    getUserAlbums: builder.query<Album[], string>({
      query: (userId) => `/users/${userId}/albums`,
    }),
    getUserById: builder.query<User, string>({
      query: (userId) => `/users/${userId}`,
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserPostsQuery,
  useGetUserAlbumsQuery,
  useGetUserByIdQuery,
} = usersApi;
