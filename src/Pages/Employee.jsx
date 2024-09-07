import React from "react";
import EmployeeList from "../components/EmployeeStaff/EmployeeList";
import {Link} from "react-router-dom";
import {Button} from "antd";

export default function Employees() {
    return (
        <div>
            <div className="flex items-center  my-5 gap-4 justify-end">
                <Link to="/employee/add">
                    <Button variant="gradient">Işçi əlavə et</Button>
                </Link>
            </div>
            <EmployeeList/>
        </div>
    );
}

