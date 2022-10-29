import { useNavigate } from "react-router-dom";

export default function BuildGyro() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Build a Gyro</h1>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </>
    );
}
