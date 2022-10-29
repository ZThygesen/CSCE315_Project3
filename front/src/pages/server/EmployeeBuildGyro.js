import { useNavigate } from "react-router-dom";

export default function EmployeeBuildGyro() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Employee Build a Gyro</h1>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </>
    );
}
