import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value: {
        isAuthenticated: false,
        accessToken: '',
        refreshToken: '',
    },
};

const authenticationSlice = createSlice({
    name: 'preLoading',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            const {refreshToken, accessToken} = action.payload;
            state.value = {
                isAuthenticated: true,
                accessToken,
                refreshToken,
            };
        },
        setUnAuthenticated: (state) => {
            state.value = {
                isAuthenticated: false,
                accessToken: '',
                refreshToken: '',
            };
        },
    },
});

export const {setAuthenticated, setUnAuthenticated} = authenticationSlice.actions;

export default authenticationSlice.reducer;