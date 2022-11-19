import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function RestockReport() {

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
        <div className="restock-report-container">
            <Modal isVisible={isLoading} body={<LoadingSpinner />} />
            {isLoading ? <></> :
            <>
            <h1>Restock Report</h1>
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
                            inventory.filter((item,i) => item.total_quantity < item.min_quantity).map((item, i) => (
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
                <p></p>

                <div className="restock-report-buttons">
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                </div>
            </>
            }
        </div>
    );
}
