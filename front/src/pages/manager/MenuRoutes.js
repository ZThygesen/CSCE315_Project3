import { Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import AddMenu from "./AddMenu";
import RemoveMenu from "./RemoveMenu";

export default function MenuRoutes() {
    return (
        <>
            <Routes>
                <Route index element={<Menu />} />
                <Route path="add-menu-item" element={<AddMenu />} />
                <Route path="remove-menu-item" element={<RemoveMenu />} />
            </Routes>
        </>
    );
}
