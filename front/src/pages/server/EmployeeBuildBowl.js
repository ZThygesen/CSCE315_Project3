import { useNavigate } from "react-router-dom";

export default function EmployeeBuildBowl() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Employee Build a Bowl</h1>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </>
    );
}
