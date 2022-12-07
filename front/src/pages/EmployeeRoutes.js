import { Routes, Route } from "react-router-dom";
import ManagerRoutes from "./manager/ManagerRoutes";
import ServerRoutes from "./ServerRoutes";

/**
 * @description Routes for manager and server interfaces
 * @returns null
 */
export default function EmployeeRoutes() {
    return (
        <>
            <Routes>
                <Route path="manager/*" element={<ManagerRoutes />} />
                <Route path="server/*" element={<ServerRoutes />} />
            </Routes>
        </>
    );
}
