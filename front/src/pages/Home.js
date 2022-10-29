import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Home</h1>
            <button onClick={() => navigate("create-order")}>Create Order</button>
            <button onClick={() => navigate("employee")}>Employee Login</button>
        </>
    );
}
