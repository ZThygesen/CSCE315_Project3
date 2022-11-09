import { Routes, Route, Navigate } from "react-router-dom";
import ManagerNav from "../../components/ManagerNav";
import InventoryRoutes from "./InventoryRoutes";
import MenuRoutes from "./MenuRoutes";
import SalesReport from "./SalesReport";
import ExcessReport from "./ExcessReport";
import RestockReport from "./RestockReport";
import ServerRoutes from "../server/ServerRoutes";
import "./Manager.css";

export default function ManagerRoutes() {
    return (
        <div className="manager-container">
            <ManagerNav />
            <Routes>
                <Route path="inventory/*" element={<InventoryRoutes />} />
                <Route path="menu/*" element={<MenuRoutes />} />
                <Route path="sales-report" element={<SalesReport />} />
                <Route path="excess-report" element={<ExcessReport />} />
                <Route path="restock-report" element={<RestockReport />} />
                <Route path="create-order/*" element={<ServerRoutes />} />
                <Route path="*" element={<Navigate to="inventory" replace />} />
            </Routes>
        </div>
    );
}
