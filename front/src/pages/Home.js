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
            <Map />
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

// {/* <h1>We are located in the MSC!</h1>
//             <LoadScript
//                 googleMapsApiKey="AIzaSyCNNtfx44impW9Ii9Rq26p6D6E05cQNyvk"
//             >
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={center}
//                     zoom={10}
//                 >
//           { /* Child components, such as markers, info windows, etc. */ }
//           <></>
//         </GoogleMap>
//       </LoadScript> */}