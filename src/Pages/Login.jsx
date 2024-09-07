import React, {useEffect, useState} from "react";
import {useLoginMutation, useRefreshTokenMutation} from "../api/slices/login";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Typography} from "@material-tailwind/react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {Cookies} from "react-cookie";
import {setAuthenticated} from "../api/edit/authenticationSlice.js";
import {checkAuth} from "../utils/checkAuth.js";
import {Navigate} from "react-router-dom";
import {showAlertError} from "../components/Alerts/showAlert.jsx";

function Login() {

    const cookie = new Cookies();
    const [login, {isLoading}] = useLoginMutation();
    const [refreshToken] = useRefreshTokenMutation();

    const auth = useSelector(state => state.auth.value);
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            showAlertError()
            showAlertError("İstifadəçi adı və ya şifrə daxil edilməyib!");
        } else {
            const data = {username, password};
            const json = JSON.stringify(data);
            try {
                const {access_token, refresh_token} = await login(json).unwrap();
                cookie.set("access-token", access_token);
                cookie.set("refresh-token", refresh_token);
                dispatch(setAuthenticated({access_token, refresh_token}));
            } catch (err) {
                showAlertError("İstifadəçi adi və ya şifrə yanlışdır!")
            }
        }
    };

    useEffect(() => {
        checkAuth(refreshToken, dispatch);
    }, []);


    if (auth.isAuthenticated) {
        return <Navigate to="/"/>;
    }

    return (
        <section className="grid text-center h-screen items-center p-8">
            <div>
                <Typography variant="h3" color="blue-gray" className="mb-2">
                    Daxil ol
                </Typography>
                <Typography className="mb-16 text-gray-600 font-normal text-[18px]">Mi'estanın admin paneline xoş
                    gəlmisiz</Typography>
                <form action="#" className="mx-auto max-w-[24rem] text-left">
                    <div className="mb-6">
                        <label htmlFor="email">
                            <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                                İstifadəçi adı
                            </Typography>
                        </label>
                        <Input
                            id="email"
                            color="gray"
                            size="lg"
                            type="email"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="name@mail.com"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password">
                            <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                                Password
                            </Typography>
                        </label>
                        <Input
                            size="lg"
                            name="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            labelProps={{
                                className: "hidden",
                            }}
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            type={showPassword ? "text" : "password"}
                            icon={
                                <i onClick={() => setShowPassword(prev => !prev)} className="h-5 w-5 text-gray-400">
                                    {showPassword ? <EyeIcon className="h-5 w-5"/> :
                                        <EyeSlashIcon className="h-5 w-5"/>}
                                </i>
                            }
                        />
                    </div>
                    <Button onClick={handleLogin} color="gray" size="lg" className="mt-6" fullWidth>
                        Daxil ol
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default Login;
