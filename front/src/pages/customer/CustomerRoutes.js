import { Routes, Route } from "react-router-dom";
import CreateOrder from "./CreateOrder";
import BuildBowl from "./BuildBowl";
import BuildGyro from "./BuildGyro";
import Sides from "./Sides";

export default function CustomerRoutes() {
    return (
        <>
            <Routes>
                <Route index element={<CreateOrder />} />
                <Route path="build-a-bowl" element={<BuildBowl />} />
                <Route path="build-a-gyro" element={<BuildGyro />} />
                <Route path="sides" element={<Sides />} />
            </Routes>
        </>
    )
}   
