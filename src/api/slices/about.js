import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "./baseQuery/baseQuery";

export const aboutApi = createApi({
  reducerPath: "about",
  baseQuery:baseQuery,
  tagTypes: ["about"],
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => "/about/about",
      providesTags: ["about"],
    }),
    postAbout: builder.mutation({
      query: (body) => ({
        url: "/about/thumbnail",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["about"],
    }),
    putAbout: builder.mutation({
        query: (body) => ({
          url: `/about`,
          method: "PUT",
          body: body,
        }),
        invalidatesTags: ["about"],
      }),
    
  }),
});
export const { useGetAboutQuery, usePostAboutMutation, usePutAboutMutation } = aboutApi;
