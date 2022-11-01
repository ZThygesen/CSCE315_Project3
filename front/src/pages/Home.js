import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        fetch("/api/home")
            .then(res => res.json())
            .then(users => setUsers(users));
    }, []);

    return (
        <>
            <h1>Home</h1>
            <button onClick={() => navigate("create-order")}>Create Order</button>
            <button onClick={() => navigate("employee")}>Employee Login</button>
            <ul>
                {
                    users.map((user, i) => (
                        <li key={i}>{console.log(i)} Name: {user.firstName} {user.lastName}; GPA: {user.gpa}</li>
                    ))
                }
            </ul>
        </>
    );
}
