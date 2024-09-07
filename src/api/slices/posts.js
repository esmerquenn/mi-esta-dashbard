import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery/baseQuery";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: baseQuery,
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => `/posts?page=${page}`,
      providesTags: ["posts"],
    }),
    postPosts: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["posts"],
    }),
    putPostsThumbnail: builder.mutation({
      query: ({ body, id }) => ({
        url: `/posts/${id}/thumbnail`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["posts"],
    }),
    putPosts: builder.mutation({
      query: ({ body, id }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["posts"],
    }),
    deletePosts: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
    getRepairPosts: builder.query({
      query: (page) => `/posts/repair?page=${page}`,
      providesTags: ["posts"],
    }),
    getInvestmentPosts: builder.query({
      query: (page) => `/posts/investment?page=${page}`,
      providesTags: ["posts"],
    }),
    getPostDetail: builder.query({
      query: (slug) => `/posts/detail/${slug}`,
      providesTags: ["posts"],
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ["posts"],
    }),
    getDesignPosts: builder.query({
      query: (page) => `/posts/design?page=${page}`,
      providesTags: ["posts"],
    }),
    searchPosts: builder.query({
      query: (query) => `posts/search?query=${encodeURIComponent(query)}`,
    }),
  }),
});
export const {
  useGetPostsQuery,
  usePostPostsMutation,
  useDeletePostsMutation,
  usePutPostsMutation,
  useGetDesignPostsQuery,
  useGetInvestmentPostsQuery,
  useGetRepairPostsQuery,
  useGetPostDetailQuery,
  useGetPostByIdQuery,
  usePutPostsThumbnailMutation,
  useSearchPostsQuery,
} = postsApi;
