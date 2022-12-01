import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

/**
 * @description This displays the inventory, including item names, product type, quantity, on-hand amount, and serving size 
 * @author Zach, Ardian
 * @returns Inventory Page
 */
export default function Inventory() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [inventory, setInventory] = useState([{}]);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/inventory")
            .then(res => res.json())
            .then(inventory => {
                setTimeout(() => {
                    setInventory(inventory.inventory);
                    setIsLoading(false);
                }, 250);
            });
    }, []);

    return (
        <div className="inventory-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            {isLoading ? <></> :
                <>
                    <h1>Inventory</h1>
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
                    <div className="inventory-buttons">
                        <button onClick={() => navigate("add-inventory")}>Add Inventory</button>
                        <button onClick={() => navigate("remove-inventory")}>Remove Inventory</button>
                        <button onClick={() => navigate("update-inventory")}>Update Inventory</button>
                    </div>
                </>
            }
        </div>
    );
}
