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
                            props.orderItems.map((item, i) => (
                                <tr key={i}>
                                    <OrderItem
                                        item={item}
                                        editOrderItem={props.editOrderItem}
                                        removeOrderItem={props.removeOrderItem}
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
            <button onClick={() => props.changePage("Bowl")}>Employee Build a Bowl</button>
            <button onClick={() => props.changePage("Gyro")}>Employee Build a Gyro</button>
            <button onClick={() => props.changePage("Side")}>Employee Sides</button>
            <button onClick={() => navigate("/")}>Logout</button>
        </>
    );
}
