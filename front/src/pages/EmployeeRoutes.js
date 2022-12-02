import { Routes, Route } from "react-router-dom";
import ManagerRoutes from "./manager/ManagerRoutes";
import ServerRoutes from "./server/ServerRoutes";

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
