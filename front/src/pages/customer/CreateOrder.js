import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateOrder.css";

export default function CreateOrder() {
    const navigate = useNavigate();

    const [menuItems, setMenuItems] = useState([{}]);
    const [bases, setBases] = useState([{}]);
    const [proteins, setProteins] = useState([{}]);
    const [toppings, setToppings] = useState([{}]);
    const [dressings, setDressings] = useState([{}]);

/*     const [orderType, setOrderType] = useState([{}]);
    const [orderItems, setOrderItems] = useState([{}]); */

    useEffect(() => {
        fetch("/api/order-items")
            .then(res => res.json())
            .then(items => {
                setMenuItems(items.menuItems);
                setBases(items.bases);
                setProteins(items.proteins);
                setToppings(items.toppings);
                setDressings(items.dressings);
            });
    }, []);

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
            <div className="items">
                <div className="menu-items">
                    <h1>Menu Items</h1>
                    {menuItems.map((item, i) => <p key={i}>{item.item_name}</p>)}
                </div>
                <div className="bases">
                    <h1>Bases</h1>
                    {bases.map((item, i) => <p key={i}>{item.product_name}</p>)}
                </div>
                <div className="proteins">
                    <h1>Proteins</h1>
                    {proteins.map((item, i) => <p key={i}>{item.product_name}</p>)}
                </div>
                <div className="toppings">
                    <h1>Toppings</h1>
                    {toppings.map((item, i) => <p key={i}>{item.product_name}</p>)}
                </div>
                <div className="dressings">
                    <h1>Dressings</h1>
                    {dressings.map((item, i) => <p key={i}>{item.product_name}</p>)}
                </div>
            </div>
        </>
    );
}
