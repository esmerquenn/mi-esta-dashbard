import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "./baseQuery/baseQuery";

export const brandsApi = createApi({
  reducerPath: "brands",
  baseQuery,
  tagTypes: ["brands"],
  endpoints: (builder) => ({
    getbrands: builder.query({
      query: () => "/brands",
      providesTags: ["brands"],
    }),
    getbrandsById: builder.query({
      query: (id) => `/brands/${id}`,
    }),
    postbrands: builder.mutation({
      query: (body) => ({
        url: "/brands",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["brands"],
    }),
    deletebrands: builder.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brands"],
    }),
  }),
});
export const { useGetbrandsByIdQuery, useGetbrandsQuery, usePostbrandsMutation, useDeletebrandsMutation } = brandsApi;
