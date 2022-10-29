import { useNavigate } from "react-router-dom";

export default function EmployeeCreateOrder() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Employee Create Order</h1>
            <button onClick={() => navigate("build-a-bowl")}>Employee Build a Bowl</button>
            <button onClick={() => navigate("build-a-gyro")}>Employee Build a Gyro</button>
            <button onClick={() => navigate("sides")}>Employee Sides</button>
            <button onClick={() => navigate("/")}>Logout</button>
        </>
    );
}
