import { Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import AddMenu from "./AddMenu";
import RemoveMenu from "./RemoveMenu";
import UpdateMenu  from "./UpdateMenu";

/**
 * @description This the handles the routes for the manager to access the add, remove, and update menu items pages
 * @author Zach
 * @returns Routes for Menu
 */
export default function MenuRoutes() {
    return (
        <>
            <Routes>
                <Route index element={<Menu />} />
                <Route path="add-menu-item" element={<AddMenu />} />
                <Route path="remove-menu-item" element={<RemoveMenu />} />
                <Route path="update-menu-item" element={<UpdateMenu />} />
            </Routes>
        </>
    );
}
