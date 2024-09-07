import {jwtDecode} from "jwt-decode";
import {setAuthenticated, setUnAuthenticated} from "../api/edit/authenticationSlice.js";
import {Cookies} from "react-cookie";

export const checkAuth = async (refreshTokenMutation, dispatch) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access-token");
    const refreshToken = cookies.get("refresh-token");
    if (accessToken !== undefined && refreshToken !== undefined) {
        try {
            const user = jwtDecode(accessToken);
            if (user.exp > Math.round(Date.now() / 1000) - 100) {
                dispatch(setAuthenticated({accessToken, refreshToken}));
            } else {
                try {
                    const {access_token, refresh_token} = await refreshTokenMutation(refreshToken).unwrap();
                    cookies.set("access-token", access_token);
                    cookies.set("refresh-token", refresh_token);
                    dispatch(setAuthenticated({access_token, refresh_token}));
                } catch {
                    dispatch(setUnAuthenticated());
                }
            }
        } catch {
            dispatch(setUnAuthenticated());
        }
    } else {
        dispatch(setUnAuthenticated());
    }

};