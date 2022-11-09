import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RemoveInventory() {
    const navigate = useNavigate();

    const [inventory, setInventory] = useState([{}]);

    useEffect(() => {
        fetch("/api/inventory")
            .then(res => res.json())
            .then(inventory => setInventory(inventory.inventory));
    }, []);

    //What happens when the user clicks submit
    function handleSubmit(e) {
        e.preventDefault();
        
        var selection = document.getElementById("item");
        const id = selection.options[selection.selectedIndex].value;

        fetch("/api/remove-inv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        })
            .then(res => res.json())
        
            alert("Update sent");
    }

    return (
        <div className="remove-inventory-container">
            <h1>Remove Inventory</h1>

            {/* Where the user enters the information */}
            <form className="remove-inventory-form" onSubmit={handleSubmit}>
                
                {/* Lists the items currently in the inventory */}
                <div className="remove-inventory-input">
                    <label for="item">
                        Choose an item to remove:
                    </label>
                    <select id="item">
                        {
                            inventory.map((item,i) =>
                                <option key={i} value={item.product_id} name={item.product_name}>{item.product_name}</option>
                            )
                        }
                    </select>
                </div>
                <p></p>

                <div className="remove-inventory-buttons">
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" value="Submit">Remove Item</button>
                </div>
            </form>
        </div>
    );
}
