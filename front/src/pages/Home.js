import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
    const navigate = useNavigate();

    const [teammembers, setTeammembers] = useState([{}]);

    useEffect(() => {
        fetch("/api/home")
            .then(res => res.json())
            .then(members => setTeammembers(members.teammembers));
    }, []);

    return (
        <>
            <h1>Home</h1>
            <button onClick={() => navigate("create-order")}>Create Order</button>
            <button onClick={() => navigate("employee")}>Employee Login</button>
            <div className="teammembers-container">
                {
                    teammembers.map((member, i) => (
                        <div className="teammember" key={i}>
                            {console.log(member)}
                            <h1>{member.student_name}</h1>
                            <p>Section: {member.section}</p>
                            <p>Favorite movie: {member.favorite_movie}</p>
                            <p>Favorite holiday: {member.favorite_holiday}</p>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
