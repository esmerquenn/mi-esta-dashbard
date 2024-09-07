// imageEditorApi.js
import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './baseQuery/baseQuery';

export const imageEditorApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (image) => ({
                url: 'images',
                method: 'POST',
                body: image,
            }),
        }),
    }),
});

export const {useUploadImageMutation} = imageEditorApi;
