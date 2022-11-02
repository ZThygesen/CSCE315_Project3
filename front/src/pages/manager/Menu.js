import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
    const navigate = useNavigate();

    const [menu, setMenu] = useState([{}]);

    useEffect(() => {
        fetch("/api/menu")
            .then(res => res.json())
            .then(menu => setMenu(menu.menu));
    }, []);

    console.log(menu);

    return (
        <>
            <h1>Menu</h1>
            <div className="menu-container">
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
                                    <td>{item.item_name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.calories}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            
            <button onClick={() => navigate("add-menu-item")}>Add Menu Item</button>
        </>
    );
}
