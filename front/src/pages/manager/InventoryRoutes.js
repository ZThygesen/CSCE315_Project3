import { Routes, Route } from "react-router-dom";
import Inventory from "./Inventory";
import AddInventory from "./AddInventory";
import RemoveInventory from "./RemoveInventory";
import UpdateInventory from "./UpdateInventory";

export default function InventoryRoutes() {
    return (
        <>
            <Routes>
                <Route index element={<Inventory />} />
                <Route path="add-inventory" element={<AddInventory />} />
                <Route path="remove-inventory" element={<RemoveInventory />} />
                <Route path="update-inventory" element={<UpdateInventory />} />
            </Routes>
        </>
    );
}
