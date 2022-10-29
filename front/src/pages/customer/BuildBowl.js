import { useNavigate } from "react-router-dom";

export default function BuildBowl() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Build a Bowl</h1>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </>
    );
}
