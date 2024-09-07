import React from "react";
import {useDeleteEmployeeMutation, useGetEmployeeQuery,} from "../../api/slices/employee";
import {Empty, Image, Spin} from "antd";
import {IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {PencilIcon} from "@heroicons/react/24/outline";
import DeleteIcon from "../icons/DeleteIcon.jsx";


function EmployeeList() {
    const {data: employees, isLoading} = useGetEmployeeQuery();
    const [deleteEmployee] = useDeleteEmployeeMutation();


    const handleDeleteEmployee = async (id) => {
        try {
            const response = await deleteEmployee(id);
            if (response) {

            }
        } catch (err) {
            console.log(err);
        }
    }


    if (isLoading) {
        return (
            <div className=" h-[50vh] flex justify-center items-center">
                <Spin size="large"/>
            </div>
        )
    }

    return (
        <table className="mt-4 w-full min-w-max table-auto text-left ">
            <thead>
            <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70">
                        Şəxs
                    </Typography>
                </th>
                <th className=" text-right border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 pr-14 ">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70">
                        Düzəliş et
                    </Typography>
                </th>
            </tr>
            </thead>
            <tbody>
            {employees.length > 0 ? (
                employees?.map((employee, index) => {
                    const isLast = index === employees.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                    return (
                        <tr key={employee.id}>
                            <td className={classes}>
                                <div className="flex avatar items-center gap-3">
                                    <Image
                                        className=" rounded-md"
                                        width={60}
                                        src={employee.image}
                                        size="sm"
                                        alt={employee.name}/>

                                    <div className="flex flex-col">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal">
                                            {employee.name}
                                        </Typography>
                                    </div>
                                </div>
                            </td>
                            <td className={` text-right pr-10  ${classes}`}>
                                <Tooltip content="Edit User">
                                    <Link to={`/employee/update/${employee.id}`}>
                                        <IconButton variant="text">
                                            <PencilIcon className="h-4 w-4"/>
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                                <Tooltip content="Delete User">
                                    <IconButton onClick={() => handleDeleteEmployee(employee.id)} variant="text">
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    );
                })
            ) : (
                <>
                    <tr>
                        <td colSpan={2}>
                            <Empty/>
                        </td>
                    </tr>
                </>
            )}
            </tbody>
        </table>
    );
}

export default EmployeeList;
