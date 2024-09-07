import {configureStore} from "@reduxjs/toolkit";
import {postsApi} from "./slices/posts";
import {brandsApi} from "./slices/brands";
import editPostReducer from "./edit/editPost";
import editEmployeeReducer from "./edit/editEmployee";
import {employeeApi} from "./slices/employee";
import {aboutApi} from "./slices/about";
import {loginApi} from "./slices/login";
import {imageEditorApi} from "./slices/imageEditor";
import {refreshApi} from "./slices/refresh";
import authenticationSlice from "./edit/authenticationSlice.js";

export const store = configureStore({
    reducer: {
        // [courseClassesApi.reducerPath]:courseClassesApi.reducer, if ti has middleware
        // edit: editSliceReducer, if it is only simple slide
        [loginApi.reducerPath]: loginApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [brandsApi.reducerPath]: brandsApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [aboutApi.reducerPath]: aboutApi.reducer,
        [imageEditorApi.reducerPath]: imageEditorApi.reducer,
        [refreshApi.reducerPath]: refreshApi.reducer,
        editPost: editPostReducer,
        editEmployee: editEmployeeReducer,
        auth: authenticationSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            loginApi.middleware,
            postsApi.middleware,
            brandsApi.middleware,
            employeeApi.middleware,
            aboutApi.middleware,
            imageEditorApi.middleware,
            refreshApi.middleware
        ),
    devTools: true,
});
