import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CustomerRoutes from "./pages/create_order/CustomerRoutes";
import EmployeeRoutes from "./pages/EmployeeRoutes";
import "./App.css";
/**
 * @description Creates routes for creating an order (Customer-side) and employee side
 * 
 * @author Zach
 * @returns null
 */
export default function App() {
    return (
        <>
            <Header />
            <div id="main-content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="create-order/*" element={<CustomerRoutes />} />
                    <Route path="employee/*" element={<EmployeeRoutes />} />
                </Routes>
            </div>
        </>
    );
}
