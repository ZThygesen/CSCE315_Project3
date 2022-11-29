import { Routes, Route } from "react-router-dom";
import EmployeeLogin from "./EmployeeLogin";
import ManagerRoutes from "./manager/ManagerRoutes";
import ServerRoutes from "./server/ServerRoutes";

/**
 * Routes for manager and server interfaces
 * @returns null
 */
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
