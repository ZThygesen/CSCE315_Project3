import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Modal from "../components/Modal";

export default function Home() {
    const navigate = useNavigate();

    // OAuth code
    const [employee, setEmployee] = useState({});
    const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

    const [authFail, setAuthFail] = useState(false);
    const [authMessage, setAuthMessage] = useState("");

    useEffect(() => {
        const initClient = () => {
            gapi.auth2.init({
                clientId: REACT_APP_GOOGLE_CLIENT_ID,
                scope: ""
            });
        };
        gapi.load("client:auth2", initClient);
    });

    useEffect(() => {
        const currEmployee = localStorage.getItem("employee");

        if (currEmployee && !currEmployee.includes("undefined")) {
            setEmployee(JSON.parse(currEmployee));
        } else {
            setEmployee(null);
        }
    }, []);

    const handleLogin = (googleData) => {
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: googleData.tokenId
            })
        })
            .then(async res => {
                if (res.status !== 201) {
                    const message = await res.json();
                    throw new Error(message.message);
                }
                return res.json();
            })
            .then(data => {
                localStorage.setItem("employee", JSON.stringify(data.employee));
                setEmployee(data.employee);
                if (data.employee.position === "Server") {
                    navigate("employee/server", { state: {} });
                } else {
                    navigate("employee/manager");
                }
            })
            .catch(err => {
                console.log("here")
                localStorage.clear();
                setEmployee(null);
                setAuthFail(true);
                setAuthMessage(err.message);
            })
    }

    const logOut = () => {
        setEmployee(null);
        localStorage.clear();
    }
    
    function employeeNav() {
        if (employee.position === "Server") {
            navigate("employee/server", { state: {} });
        } else {
            navigate("employee/manager");
        }
    }

    function UnauthorizedModal() {
        return (
            <Modal isVisible={authFail} full={true}
                body={
                    <p>{authMessage}</p>
                }
                footer={ 
                    <button
                        className="modal-close-button"
                        onClick={() => {
                            setAuthFail(current => !current);
                            setAuthMessage("");
                        }}
                    >
                        Close
                    </button>
                }
            />
        );
    }

    // Google Maps code
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCNNtfx44impW9Ii9Rq26p6D6E05cQNyvk",
    });

    if (!isLoaded) return <div>Loading...</div>;
    
    return (
        <>
            <UnauthorizedModal />
            <h1>Welcome to Pom & Honey!</h1>
            
            <div className="home-buttons">
                <button onClick={() => navigate("create-order")}>Place an Order</button>
            </div>
            <div className="map-title">We are located in the MSC!</div>
            <Map />
            {employee !== null ? (
                <div>
                    <button onClick={employeeNav}>{employee.position === "Server" ? "Navigate to Server Page" : "Navigate to Manager Page"}</button>
                    <GoogleLogout clientId={REACT_APP_GOOGLE_CLIENT_ID} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Sign in with Google"
                    onSuccess={handleLogin}
                    cookiePolicy={'single_host_origin'}
                    prompt="select_account"
                />
            )}
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
