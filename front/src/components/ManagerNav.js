import { useNavigate } from "react-router-dom";
import "./ManagerNav.css";

/**
 * This function creates a navigation bar to be used by managers
 * @returns Manager Navigation Bar
 */
export default function ManagerNav() {

    const navigate = useNavigate();

    return (
        <div className="manager-nav">
            <button onClick={() => navigate("inventory")}>Inventory</button>
            <button onClick={() => navigate("menu")}>Menu</button>
            <button onClick={() => navigate("sales-report")}>Sales Report</button>
            <button onClick={() => navigate("excess-report")}>Excess Report</button>
            <button onClick={() => navigate("restock-report")}>Restock Report</button>
            <button onClick={() => navigate("create-order")}>Create Order</button>
            <button onClick={() => navigate("/")}>Logout</button>
        </div>
    );
}
