import { useNavigate } from "react-router-dom";

export default function EmployeeSides() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Employee Sides</h1>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </>
    );
}
