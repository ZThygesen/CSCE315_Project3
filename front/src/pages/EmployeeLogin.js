import { useNavigate } from "react-router-dom";

export default function ExployeeLogin() {
    const navigate = useNavigate();

    return (
        <>
            {/** TODO: IMPLEMENT OAUTH LOGIN */}
            <h1>Employee Login</h1>
            <button onClick={() => navigate("manager")}>Manager</button>
            <button onClick={() => navigate("server")}>Server</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </>
    );
}
