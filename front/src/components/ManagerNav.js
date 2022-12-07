import { useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import "./ManagerNav.css";

/**
 * This function creates a navigation bar to be used by managers
 * @returns Manager Navigation Bar
 */
export default function ManagerNav() {

    const navigate = useNavigate();

    function logOut() {
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="manager-nav">
            <button onClick={() => navigate("inventory")}>Inventory</button>
            <button onClick={() => navigate("menu")}>Menu</button>
            <button onClick={() => navigate("sales-report")}>Sales Report</button>
            <button onClick={() => navigate("excess-report")}>Excess Report</button>
            <button onClick={() => navigate("restock-report")}>Restock Report</button>
            <button onClick={() => navigate("create-order")}>Create Order</button>
            <GoogleLogout clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} buttonText="Log out" onLogoutSuccess={logOut} className="manager-logout"/>
        </div>
    );
}
