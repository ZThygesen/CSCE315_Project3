import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Slideshow from "../components/Slideshow";
import Modal from "../components/Modal";

/**
 * @author Justin, Zach
 * @description Displays main home page for application
 * @returns null
 */
export default function Home() {
    const navigate = useNavigate();

    // OAuth code
    const [employee, setEmployee] = useState({});
    const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

    const [authFail, setAuthFail] = useState(false);
    const [authMessage, setAuthMessage] = useState("");

    useEffect(() => {
        const initClient = () => {
            gapi.auth2.getAuthInstance({
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
        <div className="home-container">
            <UnauthorizedModal />
            <div className="landing-section">
                <div className="bg">
                    <h1>Welcome to Pom & Honey!</h1>
                    
                    <div className="home-buttons">
                        <button onClick={() => navigate("create-order")}>Place an Order!</button>
                    </div>
                    <Slideshow
                        interval={7000}
                        images={[
                        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.olivetomato.com%2Fwp-content%2Fuploads%2F2020%2F08%2FE73678B0-5FC4-4F05-8A28-4E7B3804E2CC.jpg&f=1&nofb=1&ipt=b23b58cdd98509b2735c0e42fa55c9c0d9a71d65c5ea38b52a73e33b913f4f74&ipo=images',
                        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.healthygffamily.com%2Fwp-content%2Fuploads%2F2018%2F02%2FIMG_8271-1024x1024.jpg&f=1&nofb=1&ipt=9efc282689b2bf1bd3162243b5d04a946ddeae64d3a56614342026d196ece2e4&ipo=images',
                        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.healthygffamily.com%2Fwp-content%2Fuploads%2F2019%2F02%2F005E48E5-EDD2-47E4-A4B3-B0D4A53D28C2-720x720.jpg&f=1&nofb=1&ipt=9c63c22c3a4871622727827a58ff38cc8341a1d4b39c356b5393d031f89c16b6&ipo=images'
                        ]}
                    />
                </div>
            </div>

            <div className="info-section">
                <div className="map-title">We are located in the MSC!</div>
                <Map />
                <div className="table-bg">
                    <h3 style={{margin: 0}}>Store Hours</h3>
                    <table className="store-hours">
                        <thead>
                            <tr className="table-row">
                                <th>Day</th>
                                <th>Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-row">
                                <td className="day">Sunday</td>
                                <td className="hour">Closed</td>
                            </tr>
                            <tr className="table-row">
                                <td className="day">Monday</td>
                                <td className="hour">10:00am - 3:00pm</td>
                            </tr>
                            <tr className="table-row">
                                <td className="day">Tuesday</td>
                                <td className="hour">10:00am - 3:00pm</td>
                            </tr>
                            <tr className="table-row">
                                <td className="day">Wednesday</td>
                                <td className="hour">10:00am - 3:00pm</td>
                            </tr>
                            <tr className="table-row">
                                <td className="day">Thursday</td>
                                <td className="hour">10:00am - 3:00pm</td>
                            </tr>
                            <tr className="table-row">
                                <td className="day">Friday</td>
                                <td className="hour">10:00am - 3:00pm</td>
                            </tr>
                            <tr className="table-row">
                                <td className="day">Saturday</td>
                                <td className="hour">Closed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="employee-section">
                    <h3 style={{margin: 0}}>Employees</h3>
                    {employee !== null ? (
                        <div className="employee-nav">
                            <button
                                onClick={employeeNav}
                                className="employee-nav-button"
                            >
                            {employee.position === "Server" ? "Navigate to Server Page" : "Navigate to Manager Page"}
                            </button>
                            <GoogleLogout clientId={REACT_APP_GOOGLE_CLIENT_ID} buttonText="Log out" onLogoutSuccess={logOut} />
                        </div>
                    ) : (
                        <GoogleLogin
                            clientId={REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Sign in with Google"
                            onSuccess={handleLogin}
                            cookiePolicy={'single_host_origin'}
                            prompt="select_account"
                            style={{
                                backgroundColor: "black"
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
        
    );
}
/**
 * @author Justin
 * 
 * @description Creates map React object to be displayed on home page.
 * Map contains the location of the restaurant
 * @returns null
 */
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
