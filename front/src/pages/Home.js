import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
    const navigate = useNavigate();

    const [teammembers, setTeammembers] = useState([{}]);

    const fahrenheit = useRef(0);
    const [celsius, setCelsius] = useState(0);

    useEffect(() => {
        fahrenheit.current.value = 32;
    }, [])

    useEffect(() => {
        fetch("/api/home")
            .then(res => res.json())
            .then(members => setTeammembers(members.teammembers));
    }, []);


    function calculateTemperature(e) {
        e.preventDefault();
        
        fetch("/api/temp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ temp: fahrenheit.current.value })
        })
            .then(res => res.json())
            .then(temp => setCelsius(temp));
    }

    return (
        <>
            <h1>Home</h1>
            
            <div className="send-to-backend-example">
                <form onSubmit={calculateTemperature}>
                    <label htmlFor="test">Enter a temp in fahrenheit</label>
                    <input ref={fahrenheit} type="number" id="test" />
                    <button type="submit">Calculate Celsius</button>
                </form>
                <div className="temperature">
                    <p>{fahrenheit.current.value}° fahrenheit = {celsius.toFixed(0)}° celsius</p>
                </div>
            </div>

            <button onClick={() => navigate("create-order")}>Create Order</button>
            <button onClick={() => navigate("employee")}>Employee Login</button>
            <div className="teammembers-container">
                {
                    teammembers.map((member, i) => (
                        <div className="teammember" key={i}>
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
