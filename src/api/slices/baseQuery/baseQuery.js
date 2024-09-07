import {fetchBaseQuery} from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4444/api/1.0",
    //   credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.value.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

