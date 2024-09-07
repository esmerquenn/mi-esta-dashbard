import React, {useEffect, useState} from "react";
import {showAlertError, showAlertSuccess} from "../Alerts/showAlert";
import {PostInput} from "../Posts/Editor/PostInput";
import {useGetEmployeeByIdQuery, usePutEmployeeImageMutation, usePutEmployeeMutation} from "../../api/slices/employee";
import InputForm from "../ChildComponents/InputForm";
import {Typography} from "@material-tailwind/react";
import {useParams} from "react-router-dom";
import Loading from "../ChildComponents/Loading.jsx";
import {PostButton} from "../ChildComponents/PostButton.jsx";

export default function UpdateEmployee() {

    const {employeeId} = useParams();
    const {data: employee, isLoading} = useGetEmployeeByIdQuery(employeeId);
    const [updateEmployee, {isLoading: isLoadingUpdate}] = usePutEmployeeMutation();
    const [updateEmployeeImage, {isLoading: isLoadingImage}] = usePutEmployeeImageMutation();


    const [image, setImage] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [order, setOrder] = useState();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            setImage(employee.image);
            setBirthdate(employee.birthdate);
            setOrder(employee.order);
            setDetails(employee.details);
        }
    }, [isLoading]);


    if (isLoading) {
        return <Loading/>
    }

    const handleUpdatePost = async () => {

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
        try {
            const result = await updateEmployee({body: data, id: employeeId}).unwrap();
            if (result) {
                showAlertSuccess("Data göndərildi", "OK");
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
    const handleUpdateImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append("image", file);
                const response = await updateEmployeeImage({body: formData, id: employeeId});
                if (response) {
                    setImage(response.data.url)
                }
            } catch (err) {
                console.log(err)
            }
        }
    };
    return (
        <>
            <div className="px-5">
                <div className="flex">
                    <div className="w-96">
                        <div className="max-w-[320px] min-h-[220px]  p-4 relative bg-gray-50 rounded-lg shadow-lg">
                            <input
                                type="file"
                                accept="image/*"
                                className="cursor-pointer absolute inset-0 opacity-0  border h-full z-50"
                                onChange={handleUpdateImage}
                            />
                            <img src={image} alt="Uploaded Thumbnail"
                                 className=" object-cover rounded-lg max-h-[220px]"/>
                        </div>
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
                    {details.map((detail, index) => (
                        <div className=" border grid gap-2  border-gray-50 shadow-lg m-4 p-4">

                            <Typography className=" text-gray-400" variant="h6">
                                {detail.language === "AZ" ? "Azərbaycan dili" : detail.language === "EN" ? "English" : "Русский"}
                            </Typography>

                            <InputForm
                                onChange={(e) => handleChangeDetail(e, index, 'name')}
                                label="Name"
                                name="name"
                                value={detail.name}/>

                            <InputForm
                                onChange={(e) => handleChangeDetail(e, index, 'surname')}
                                label="Surname"
                                name="surname"
                                value={detail.surname}/>

                            <InputForm
                                onChange={(e) => handleChangeDetail(e, index, 'position')}
                                label="Position"
                                name="position"
                                value={detail.position}/>
                            <InputForm
                                onChange={(e) => handleChangeDetail(e, index, 'professional')}
                                label="Professional"
                                name="professional"
                                value={detail.professional}/>
                        </div>
                    ))}
                </div>
            </div>
            <PostButton onClick={handleUpdatePost} content="Yenilə" align="justify-end"/>
        </>
    );
}

