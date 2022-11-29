import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

/**
 * This displays the current menu items to the manager and allows them to access the add, remove, and update menu
 * item pages
 * @author Zach
 * @returns Menu page
 */
export default function Menu() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [menu, setMenu] = useState([{}]);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/menu")
            .then(res => res.json())
            .then(menu => {
                setTimeout(() => {
                    setMenu(menu.menu);
                    setIsLoading(false);
                }, 250);
            });
    }, []);

    return (
        <div className="menu-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            {isLoading ? <></> :
                <>
                    <h1>Menu</h1>
                    <table className="menu-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Calories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.product_name}</td>
                                        <td>{item.price.toFixed(2)}</td>
                                        <td>{item.calories}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="menu-buttons">
                        <button onClick={() => navigate("add-menu-item")}>Add Menu Item</button>
                        <button onClick={() => navigate("remove-menu-item")}>Remove Menu Item</button>
                        <button onClick={() => navigate("update-menu-item")}>Update Menu Item</button>
                    </div>
                </>
            }
        </div>
    );
}
