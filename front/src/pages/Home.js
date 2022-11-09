import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Welcome to Pom & Honey!</h1>
            
            <div className="home-buttons">
                <button onClick={() => navigate("create-order")}>Place an Order</button>
                <button onClick={() => navigate("employee")}>Employee Login</button>
            </div>
        </>
    );
}
