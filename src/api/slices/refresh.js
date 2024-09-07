import {createApi,} from "@reduxjs/toolkit/query/react";
import {baseQuery} from "./baseQuery/baseQuery";

export const refreshApi = createApi({
    reducerPath: "refresh",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        changeUsername: builder.mutation({
            query: (username) => ({
                url: `auth/change/username/${username}`,
                method: "POST",
            })
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: `auth/change/password`,
                method: "POST",
                body: body
            })
        }),
    }),
});

export const {useChangeUsernameMutation, useChangePasswordMutation} = refreshApi;

