import { useNavigate } from "react-router-dom";

export default function Inventory() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Inventory</h1>
            <button onClick={() => navigate("add-inventory")}>Add Inventory</button>
            <button onClick={() => navigate("remove-inventory")}>Remove Inventory</button>
            <button onClick={() => navigate("update-inventory")}>Update Inventory</button>
        </>
    );
}
