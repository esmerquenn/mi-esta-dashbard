import React, {useState} from "react";
import {showAlertError, showAlertSuccess} from "../Alerts/showAlert";
import {PostInput} from "../Posts/Editor/PostInput";
import ImageUpload from "../ChildComponents/ImageUpload";
import {usePostEmployeeMutation} from "../../api/slices/employee";
import {PostButton} from "../ChildComponents/PostButton";
import InputForm from "../ChildComponents/InputForm";
import {Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

function AddEmployee() {

    const navigate = useNavigate();

    const [postEmployee, {isLoading}] = usePostEmployeeMutation();
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [order, setOrder] = useState("");

    const [details, setDetails] = useState([
        {name: "", surname: "", position: "", professional: "", language: "AZ"},
        {name: "", surname: "", position: "", professional: "", language: "EN"},
        {name: "", surname: "", position: "", professional: "", language: "RU"},
    ]);


    const handleSavePost = async () => {
        if (!image) {
            showAlertError("Şəkil əlavə edilməyib !", "OK");
            return;
        }
        if (!order) {
            showAlertError("Sıra daxil edilməyib !", "OK");
            return
        }

        if (!birthdate) {
            showAlertError("Doğum tarixi daxil edilməyib !", "OK");
            return
        }
        for (let detail of details) {
            if (!detail.name || !detail.surname || !detail.professional || !detail.position) {
                showAlertError("Formdakı boşluqları doldurun !", "OK");
                return;
            }
        }
        const data = {birthdate, order, details};
        const formData = new FormData();
        formData.append("image", image);
        const json = JSON.stringify(data);
        const blob = new Blob([json], {type: "application/json"});
        formData.append("data", blob);
        try {
            const result = await postEmployee(formData).unwrap();
            if (result) {
                showAlertSuccess("Data göndərildi", "OK");
                navigate("/employee");
            }
        } catch (error) {
            showAlertError("Data düzgün deyil !", "OK");
        }
    }


    const handleChangeDetail = (e, index, key) => {
        setDetails(prev =>
            prev.map((detail, i) => {
                if (index === i) {
                    return {...detail, [key]: e.target.value};
                }
                return detail;
            })
        );
    };
    return (
        <>
            <div className="px-5">
                <div className="flex">
                    <div className="w-96">
                        <ImageUpload {...{setImage, setPreview, preview}} />
                    </div>
                    <div className="w-40">
                        <PostInput value={birthdate} onChange={(e) => setBirthdate(e.target.value)} label="birthdate"
                                   name="birthdate"
                                   className="mb-8"/>
                        <PostInput value={order} onChange={(e) => setOrder(e.target.value)} label="Sıra" name="order"
                                   type="number"/>
                    </div>
                </div>
                <div className=" mt-10   grid md:grid-cols-2  xl:grid-cols-3  w-full gap-3 gap-y-5 ">
                    {details.map((item, index) => (
                        <div key={index} className=" border grid gap-2  border-gray-50 shadow-lg m-4 p-4">
                            <Typography className=" text-gray-400" variant="h6">
                                {item.language === "AZ" ? "Azərbaycan dili" : item.language === "EN" ? "English" : "Русский"}
                            </Typography>
                            <InputForm onChange={(e) => handleChangeDetail(e, index, 'name')} label="Name"
                                       inputValue="name"/>
                            <InputForm onChange={(e) => handleChangeDetail(e, index, 'surname')} label="Surname"
                                       inputValue="surname"/>
                            <InputForm onChange={(e) => handleChangeDetail(e, index, 'position')} label="Position"
                                       inputValue="position"/>
                            <InputForm onChange={(e) => handleChangeDetail(e, index, 'professional')}
                                       label="Professional"
                                       inputValue="professional"/>
                        </div>
                    ))}
                </div>
            </div>
            <PostButton onClick={handleSavePost} content="Əlavə et" align="justify-end"/>
        </>
    );
}

export default AddEmployee;
