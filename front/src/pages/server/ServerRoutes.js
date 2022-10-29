import { Routes, Route } from "react-router-dom";
import EmployeeCreateOrder from "./EmployeeCreateOrder";
import EmployeeBuildBowl from "./EmployeeBuildBowl";
import EmployeeBuildGyro from "./EmployeeBuildGyro";
import EmployeeSides from "./EmployeeSides";

export default function ServerRoutes() {
    return (
        <>
            <Routes>
                <Route index element={<EmployeeCreateOrder />} />
                <Route path="build-a-bowl" element={<EmployeeBuildBowl />} />
                <Route path="build-a-gyro" element={<EmployeeBuildGyro />} />
                <Route path="sides" element={<EmployeeSides />} />
            </Routes>
        </>
    )
}  
