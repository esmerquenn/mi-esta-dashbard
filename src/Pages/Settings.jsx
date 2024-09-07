import React, {useState} from "react";
import {Button, Card, Input, Typography} from "@material-tailwind/react";
import {useChangePasswordMutation, useChangeUsernameMutation} from "../api/slices/refresh.js";
import {showAlertError, showAlertSuccess} from "../components/Alerts/showAlert.jsx";

function Settings() {
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");


    const [updateUsername] = useChangeUsernameMutation();
    const [updatePassword] = useChangePasswordMutation();

    const handleChangeUsername = () => {
        if (username) {
            try {
                const response = updateUsername(username);
                if (username) {
                    showAlertSuccess("İstifadəçi Adı dəyişdirildi!")
                }
            } catch (err) {
                showAlertError("İstifadəçi Adı dəyişdirilərkən xəta baş verdi!")
            }
        } else {
            showAlertError("İstifadəçi adı daxil edilməyib!")
        }
    }

    const handleChangePassword = () => {
        if (!currentPassword) {
            showAlertError(" Hazırki sifrə daxil edilməyib!")
            return;
        }
        if (!newPassword && !newPasswordConfirm) {
            showAlertError("Yeni Şifrə daxil edin!")
            return;
        }

        if (newPassword !== newPasswordConfirm) {
            showAlertError("Yeni Sifrələr eyni deyil!")
            return;
        }

        try {
            const body = {
                old_password: currentPassword,
                new_password: newPassword,
                confirm_password: newPasswordConfirm
            }
            const response = updatePassword(body);
            if (response) {
                showAlertSuccess("Şifrə dəyişdirildi!")
            }
        }catch (err) {
            showAlertError("Şifrə deyişdirilərkən xəta baş verdi!")
        }

    }

    return (
        <div className="flex justify-center flex-col gap-16 items-center">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    İstifadəçi adını dəyiş
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            New Username
                        </Typography>
                        <Input
                            size="lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <Button
                        onClick={handleChangeUsername}
                        className="mt-6"
                        fullWidth>
                        İstifadəçi adını dəyiş
                    </Button>
                </form>
            </Card>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Şifrəni dəyiş
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Hazırki Şifrə
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="*********"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Yeni Şifrə
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        /><Typography variant="h6" color="blue-gray" className="-mb-3">
                        Yeni Şifrənin təkrarı
                    </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            value={newPasswordConfirm}
                            onChange={(e) => setNewPasswordConfirm(e.target.value)}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <Button
                        onClick={handleChangePassword}
                        className="mt-6"
                        fullWidth>
                        Şifrəni dəyiş
                    </Button>
                </form>
            </Card>
        </div>);
}

export default Settings;
