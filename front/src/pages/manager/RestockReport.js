import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function RestockReport() {
    const [isLoading, setIsLoading] = useState(true);

    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/inventory")
            .then(res => res.json())
            .then(inventory => {
                setTimeout(() => {
                    setInventory(inventory.inventory.filter(item => item.total_quantity < item.min_quantity));
                    setIsLoading(false);
                }, 250);
            });
    }, []);

    return (
        <div className="restock-report-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            {isLoading ? <></> :
                <>
                    <h1>Restock Report</h1>
                    {inventory.length === 0 ? <div>No items need to be restocked.</div> :
                        <table className="restock-report-table">
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
                    }
                </>
            }
        </div>
    );
}
