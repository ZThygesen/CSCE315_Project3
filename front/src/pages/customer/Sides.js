import { useNavigate } from "react-router-dom";

export default function Sides() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Sides</h1>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </>
    );
}
