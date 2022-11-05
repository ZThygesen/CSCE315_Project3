import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
    const navigate = useNavigate();

    const [inventory, setInventory] = useState([{}]);

    useEffect(() => {
        fetch("/api/inventory")
            .then(res => res.json())
            .then(inventory => setInventory(inventory.inventory));
    }, []);

    console.log(inventory);

    return (
        <>
            <h1>Inventory</h1>
            <div className="inventory-container">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>On Hand</th>
                            <th>Serving Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inventory.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.product_name}</td>
                                    <td>{item.product_type}</td>
                                    <td>{item.total_quantity}</td>
                                    <td>{item.min_quantity}</td>
                                    <td>{item.serving_size}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <button onClick={() => navigate("add-inventory")}>Add Inventory</button>
            <button onClick={() => navigate("remove-inventory")}>Remove Inventory</button>
            <button onClick={() => navigate("update-inventory")}>Update Inventory</button>
        </>
    );
}
