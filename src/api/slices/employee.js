import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "./baseQuery/baseQuery";


export const employeeApi = createApi({
  reducerPath: "employee",
  baseQuery:baseQuery,
  tagTypes: ["employee"],
  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: () => "/employee",
      providesTags: ["employee"],
    }),
    getEmployeeById: builder.query({
      query: (id) => `/employee/${id}`,
    }),
    postEmployee: builder.mutation({
      query: (body) => ({
        url: "/employee",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["employee"],
    }),
    putEmployee: builder.mutation({
      query: ({ body, id }) => ({
        url: `/employee/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["employee"],
    }),
    putEmployeeImage: builder.mutation({
      query: ({ body, id }) => ({
        url: `/employee/${id}/image`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employee"],
    }),
  }),
});
export const {
  useGetEmployeeQuery,
  useGetEmployeeByIdQuery,
  usePostEmployeeMutation,
  usePutEmployeeMutation,
  usePutEmployeeImageMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
