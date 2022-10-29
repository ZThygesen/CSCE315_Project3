import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Create Order</h1>
            <button onClick={() => navigate("build-a-bowl")}>Build a Bowl</button>
            <button onClick={() => navigate("build-a-gyro")}>Build a Gyro</button>
            <button onClick={() => navigate("sides")}>Sides</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </>
    );
}
