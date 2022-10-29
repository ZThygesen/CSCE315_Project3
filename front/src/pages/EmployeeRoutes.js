import { Routes, Route } from "react-router-dom";
import EmployeeLogin from "./EmployeeLogin";
import ManagerRoutes from "./manager/ManagerRoutes";
import ServerRoutes from "./server/ServerRoutes";

export default function EmployeeRoutes() {
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
