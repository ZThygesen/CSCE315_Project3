import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";

export default function EmployeeLogin() {
    const navigate = useNavigate();

    const { handleGoogle, loading, error } = useFetch("/api/login");

    useEffect(() => {
        if (window.google) {
            google.accounts.id.initialize({
                client_id: process.env.GOOGLE_CLIENT_ID,
                callback: handleGoogle,
            });

            google.accounts.id.renderButton(document.getElementById("loginDiv"), {
                theme: "filled_black",
                text: "signin_with",
                shape: "pill",
            });
        }
    }, [handleGoogle]);

    return (
        <>
            {/** TODO: IMPLEMENT OAUTH LOGIN */}
            <h1>Employee Login</h1>
            <div className="employee-login-container">
                <div className="login-buttons">
                    <button onClick={() => navigate("manager")}>Manager</button>
                    <button onClick={() => navigate("server", { state: {} })}>Server</button>
                    <Link
                        to="manager"
                        style={{
                            textDecoration: "none",
                            border: "1px solid gray",
                            padding: "0.5rem 1rem",
                            backgroundColor: "whitesmoke",
                            color: "#333",
                        }}
                    >Login</Link>
                </div>
                <button onClick={() => navigate(-1)}>Cancel</button>
            </div>
        </>
    );
}
