import React from "react";
import {showAlertError} from "../Alerts/showAlert";

function ImageUpload({setImage, setPreview, preview}) {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        } else {
            showAlertError("Şəkil əlavə edin!", );
        }
    };
    return (
        <div className="max-w-[320px] min-h-[220px]  p-4 relative bg-gray-50 rounded-lg shadow-lg">
            <input
                type="file"
                accept="image/*"
                className="cursor-pointer absolute inset-0 opacity-0  border h-full z-50"
                onChange={handleFileChange}
            />
            {!preview ? (
                <div
                    className="text-center absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <h4 className="text-gray-500 font-medium">Şəkil seç</h4>
                    <p className="text-gray-400">Şəkil seçmək üçün toxunun vəya sürükləyin</p>
                </div>
            ) : (
                <img src={preview} alt="Uploaded Thumbnail" className=" object-cover rounded-lg max-h-[220px]"/>
            )}
        </div>
    );
}

export default ImageUpload;
