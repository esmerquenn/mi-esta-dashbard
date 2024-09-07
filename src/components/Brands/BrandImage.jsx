import React, {useState} from "react";
import {showAlertError, showAlertSuccess} from "../Alerts/showAlert";
import {PostButton} from "../ChildComponents/PostButton";
import ImageUpload from "../ChildComponents/ImageUpload";
import {usePostbrandsMutation} from "../../api/slices/brands";

function BrandImage() {
    const [postPost] = usePostbrandsMutation();

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [show, setShow] = useState(false);

    function handleSave() {
        show ? handlePost() : setShow((prev) => !prev);
    }

    async function handlePost() {
        if (!image) {
            showAlertError("Şəkil əlavə edilməyib !");
            return;
        }
        const formData = new FormData();
        formData.append("image", image);
        try {
            const result = await postPost(formData).unwrap();
            console.log("Success:", result);
            setShow(false)

            if (result) {
                showAlertSuccess("Data göndərildi", "OK");
                setPreview("");
                setImage("");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    return (
        <div>
            <PostButton onClick={handleSave} content={show ? "Əlavə et" : "Brand Yarat"} align="justify-start"/>
            {show && <ImageUpload {...{setImage, setPreview, preview}} />}
        </div>
    );
}

export default BrandImage;
