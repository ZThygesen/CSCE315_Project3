import { useNavigate } from "react-router-dom";

export default function AddMenu() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Add Menu</h1>
            <button onClick={() => navigate(-1)}>Back</button>
        </>
    );
}
