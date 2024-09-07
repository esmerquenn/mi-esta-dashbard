import {Image, Spin} from "antd";
import React from "react";
import {useDeletebrandsMutation, useGetbrandsQuery} from "../../api/slices/brands";
import {Button} from "@material-tailwind/react";
import Empty from "../ChildComponents/Empty";
import {showAlertError, showAlertSuccess} from "../Alerts/showAlert.jsx";

function BrandsList() {
    const {data, isLoading} = useGetbrandsQuery();
    const [deleteBrand] = useDeletebrandsMutation();

    const handleDeleteBrand = async (id) => {
        try {
            const response = await deleteBrand(id);
            if (response) {
                showAlertSuccess("Brand Silindi!")
            }
        } catch (err) {
            showAlertError("Brand Silinərkən xəta baş verdi !")
        }
    }

    return (
        <>
            {isLoading ? (
                <div className=" h-[50vh] flex justify-center items-center">
                    <Spin size="large"/>
                </div>
            ) : (
                <div className=" mt-10">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                        {data.length !== 0 ? (
                            data.map(({image, id}, index) => (
                                <div key={index}
                                     className=" my-3 flex justify-between border-gray-50 shadow-sm flex-col items-center text-center">
                                    <Image className=" object-cover" width={"100%"} src={image}/>
                                    <Button className=" py-1 px-3 mt-2" onClick={() => handleDeleteBrand(id)}
                                            variant="text">
                                        Sil
                                    </Button>
                                </div>
                            ))
                        ) : (

                            <div className=" flex justify-center w-full border border-gray-50 shadow-sm">
                                <Empty/>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default BrandsList;
