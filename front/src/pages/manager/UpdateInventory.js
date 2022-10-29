import { useNavigate } from "react-router-dom";

export default function UpdateInventory() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Update Inventory</h1>
            <button onClick={() => navigate(-1)}>Back</button>
        </>
    );
}
