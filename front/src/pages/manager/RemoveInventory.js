import { useNavigate } from "react-router-dom";

export default function RemoveInventory() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Remove Inventory</h1>
            <button onClick={() => navigate(-1)}>Back</button>
        </>
    );
}
