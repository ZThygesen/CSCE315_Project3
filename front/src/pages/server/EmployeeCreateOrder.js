import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderItem from "../../components/OrderItem.js";

export default function EmployeeCreateOrder() {
    const navigate = useNavigate();

    const [orderItems, setOrderItems] = useState([]);

    const location = useLocation();
    const { selections, type, price } = location.state;

    useEffect(() => {
        console.log("here")
        setOrderItems(current => [...current, {
            type: type,
            items: selections,
            price: price
        }]);
    }, [type, selections, price]);

    function editItem(item) {
        console.log("Editing...");
    }

    function removeItem(item) {
        let index;
        for (let i = 0; i < orderItems.length; i++) {
            if (orderItems[i] === item) {
                index = i;
            }
        }

        setOrderItems(current => current.splice(index, 1));
    }

    function calculatePrice() {
        // start with base price of a bowl
        let price = 0;

        // get the price for all the potentially selected extras
        orderItems.forEach(item => {
            price += item.price;
        });

        return price.toFixed(2);
    }

    async function buildBowl() {
        const response = await fetch("/api/order-items");
        const items = await response.json();
        
        navigate("build-a-bowl", { state: { items: items } });
    }

    return (
        <>
            <h1>Employee Create Order</h1>
            <div className="current-order-container">
                <table className="current-order-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderItems.map((item, i) => (
                                <tr key={i}>
                                    <OrderItem
                                        item={item}
                                        editItem={editItem}
                                        removeItem={removeItem}
                                    />
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="current-order-price">
                    Total: ${calculatePrice()}
                </div>
            </div>
            <button onClick={buildBowl}>Employee Build a Bowl</button>
            <button onClick={() => navigate("build-a-gyro")}>Employee Build a Gyro</button>
            <button onClick={() => navigate("sides")}>Employee Sides</button>
            <button onClick={() => navigate("/")}>Logout</button>
        </>
    );
}
