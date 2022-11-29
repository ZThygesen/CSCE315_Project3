import { useNavigate } from "react-router-dom";

/**
 * Space for employee to select if they are a manager or server.
 * Selecting either option will take the user to the respective interface.
 * 
 * @returns null
 */
export default function EmployeeLogin() {
    const navigate = useNavigate();

    return (
        <>
            {/** TODO: IMPLEMENT OAUTH LOGIN */}
            <h1>Employee Login</h1>
            <div className="employee-login-container">
                <div className="login-buttons">
                    <button onClick={() => navigate("manager")}>Manager</button>
                    <button onClick={() => navigate("server", { state: {} })}>Server</button>
                </div>
                <button onClick={() => navigate(-1)}>Cancel</button>
            </div>
        </>
    );
}
