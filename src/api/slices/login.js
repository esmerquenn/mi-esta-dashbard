import {createApi,} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";

export const loginApi = createApi({
    reducerPath: "login",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4444/api/1.0",
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json",
                }
            }),
        }),
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: "/auth/refresh/token?token=" + refreshToken,
                method: "POST",
            }),
        }),
    }),
});

export const {useLoginMutation, useRefreshTokenMutation} = loginApi;

