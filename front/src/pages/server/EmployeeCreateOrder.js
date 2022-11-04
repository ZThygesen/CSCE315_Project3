import { useNavigate } from "react-router-dom";

export default function EmployeeCreateOrder() {
    const navigate = useNavigate();

    async function buildBowl() {
        const response = await fetch("/api/order-items");
        const items = await response.json();
        
        navigate("build-a-bowl", { state: { items: items } });
    }

    //console.log(allItems)
    return (
        <>
            <h1>Employee Create Order</h1>
            <button onClick={buildBowl}>Employee Build a Bowl</button>
            <button onClick={() => navigate("build-a-gyro")}>Employee Build a Gyro</button>
            <button onClick={() => navigate("sides")}>Employee Sides</button>
            <button onClick={() => navigate("/")}>Logout</button>
        </>
    );
}
