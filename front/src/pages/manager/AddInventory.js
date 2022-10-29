import { useNavigate } from "react-router-dom";

export default function AddInventory() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Add Inventory</h1>
            <button onClick={() => navigate(-1)}>Back</button>
        </>
    );
}
