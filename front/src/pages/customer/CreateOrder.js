import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
    const navigate = useNavigate();

    const [inventoryItems, setInventoryItems] = useState([{}]);
    const [menuItems, setMenuItems] = useState([{}]);

    const [orderType, setOrderType] = useState([{}]);
    const [orderItems, setOrderItems] = useState([{}]);

    useEffect(() => {
        fetch("/api/inventory-items")
            .then(res => res.json())
            .then(items => {
                setInventoryItems(items.inventoryItems);
            });
    }, []);

    useEffect(() => {
        fetch("/api/menu-items")
            .then(res => res.json())
            .then(items => {
                setMenuItems(items.menuItems);
            });
    }, []);

    console.log(inventoryItems);
    console.log(menuItems);

    return (
        <>
            <h1>Create Order</h1>
            <button
                onClick={() => {
                    navigate("build-a-bowl");
                    
                }}
            >Build a Bowl</button>
            <button onClick={() => navigate("build-a-gyro")}>Build a Gyro</button>
            <button onClick={() => navigate("sides")}>Sides</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </>
    );
}
