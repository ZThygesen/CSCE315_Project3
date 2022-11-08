import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/OrderItem.js";

export default function EmployeeCreateOrder(props) {
    const navigate = useNavigate();

    function calculatePrice() {
        let price = 0;

        props.orderItems.forEach(item => {
            price += item.price;
        });

        return price.toFixed(2);
    }

    function submitOrder() {
        if (props.orderItems.length === 0) {
            alert("Cannot submit empty order");
            return;
        }

        fetch("/api/submit-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: props.orderItems, price: calculatePrice() })
        })
            .then(res => res.json())
            .then(res => {
                alert(res);
                props.clearOrder();
            });
    }

    return (
        <div className="create-order-container">
            <div className="left">
                <p className="create-order-title">Current Order</p>
                <div className="current-order-container">
                    <div className="current-order-labels">
                        <p className="order-item-label">Item</p>
                        <p>Price</p>
                    </div>
                    <div className="current-order-items-container">
                        {
                            props.orderItems.map((item, i) => (
                                <OrderItem
                                    key={i}
                                    item={item}
                                    editOrderItem={props.editOrderItem}
                                    removeOrderItem={props.removeOrderItem}
                                />
                            ))
                        }
                    </div>
                    <div className="current-order-price">
                        Total: ${calculatePrice()}
                    </div>
                </div>
                <div className="order-buttons-container">
                    <button onClick={() => navigate("/")}>Logout</button>
                    <button onClick={props.clearOrder}>Cancel</button>
                    <button onClick={submitOrder}>Submit</button>
                </div>
            </div>
            <div className="right">
                <p className="create-order-title">Add Items</p>
                <div className="add-items-container">
                    <button onClick={() => props.changePage("Bowl")}>Bowl</button>
                    <button onClick={() => props.changePage("Gyro")}>Gyro</button>
                    <button onClick={() => props.changePage("Side")}>Sides</button>
                </div>
            </div>
        </div>
    );
}
