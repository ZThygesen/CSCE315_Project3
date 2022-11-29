import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from "react";

export default function Home() {
    const navigate = useNavigate();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCNNtfx44impW9Ii9Rq26p6D6E05cQNyvk",
    });

    if (!isLoaded) return <div>Loading...</div>;
    
    return (
        <>
            <h1>Welcome to Pom & Honey!</h1>
            
            <div className="home-buttons">
                <button onClick={() => navigate("create-order")}>Place an Order</button>
                <button onClick={() => navigate("employee")}>Employee Login</button>
            </div>
            <div className="map-title">We are located in the MSC!</div>
            
            <img className="home-img" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.olivetomato.com%2Fwp-content%2Fuploads%2F2020%2F08%2FE73678B0-5FC4-4F05-8A28-4E7B3804E2CC.jpg&f=1&nofb=1&ipt=b23b58cdd98509b2735c0e42fa55c9c0d9a71d65c5ea38b52a73e33b913f4f74&ipo=images"
             alt="Plate full of chickpeas, cucumbers, dates, and cherry tomatoes"></img>
            
            <p></p>
            <Map />
            <p></p>

            <div className="table-bg">
                <table className="store-hours">
                    <tr className="table-row">
                        <th>Days</th>
                        <th>Hours</th>
                    </tr>
                    <tr className="table-row">
                        <td className="day">Sunday</td>
                        <td className="hour">Closed</td>
                    </tr>
                    <tr className="table-row">
                        <td className="day">Monday</td>
                        <td className="hour">10:00am - 3:00am</td>
                    </tr>
                    <tr className="table-row">
                        <td className="day">Tuesday</td>
                        <td className="hour">10:00am - 3:00am</td>
                    </tr>
                    <tr className="table-row">
                        <td className="day">Wednesday</td>
                        <td className="hour">10:00am - 3:00am</td>
                    </tr>
                    <tr className="table-row">
                        <td className="day">Thursday</td>
                        <td className="hour">10:00am - 3:00am</td>
                    </tr>
                    <tr className="table-row">
                        <td className="day">Friday</td>
                        <td className="hour">10:00am - 3:00am</td>
                    </tr>
                    <tr className="table-row">
                        <td className="day">Saturday</td>
                        <td className="hour">Closed</td>
                    </tr>
                </table>
            </div>
            
        </>
        
    );
}

function Map() {
    const center = useMemo(() => ({lat: 30.61227281695433, lng: -96.34128581712766}), []); 

    return (
        <GoogleMap
                zoom={17} 
                center={center}
                mapContainerClassName="map-container"
            >
                <Marker position= {center}/>
            </GoogleMap>
    );
}