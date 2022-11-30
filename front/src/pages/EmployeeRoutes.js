import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeLogin from "./EmployeeLogin";
import ManagerRoutes from "./manager/ManagerRoutes";
import ServerRoutes from "./server/ServerRoutes";

export default function EmployeeRoutes() {
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        const currEmployee = localStorage.getItem("user");

        if (currEmployee && !currEmployee.includes("undefined")) {
            setEmployee(JSON.parse(currEmployee));
            console.log(currEmployee);
        }
    }, []);

    return (
        <>
            <Routes>
                <Route index element={<EmployeeLogin />} />
                <Route path="manager/*" element={<ManagerRoutes />} />
                <Route path="server/*" element={<ServerRoutes />} />
            </Routes>
        </>
    );
}
