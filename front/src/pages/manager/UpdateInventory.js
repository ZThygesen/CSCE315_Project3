import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UpdateInventory() {
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

        const quantity = document.getElementById("quan").value;
        const type = document.getElementById("type").value;
        const serve = document.getElementById("serve").value;
        const minimum = document.getElementById("min").value;

        fetch("/api/update-inv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, quantity: quantity, type: type, serve: serve, onhand: minimum })
        })
            .then(res => res.json())
        
            alert("Update sent");
    }

    return (
        <div className="update-inventory-container">
            <h1>Update Inventory</h1>

            {/* Where the user enters the information */}
            <form className="update-inventory-form" onSubmit={handleSubmit}>
                
                {/* Lists the items currently in the inventory */}
                <div className="update-inventory-input">
                    <label for="item">
                        Choose an item to update:
                    </label>
                    <select id="item">
                        {
                            inventory.map((item,i) =>
                                <option key={i} value={item.product_id} name={item.product_name}>{item.product_name}</option>
                            )
                        }
                    </select>
                </div>

                <div className="update-inventory-input">
                    <label htmlFor="quan">Enter the quantity:</label>
                    <input type="text" id="quan" name="quan" />
                </div>

                <div className="update-inventory-input">
                    <label htmlFor="type">Enter the product type:</label>
                    <input type="text" id="type" name="type" />
                </div>

                <div className="update-inventory-input">
                    <label htmlFor="serve">Enter the serving size:</label>
                    <input type="text" id="serve" name="serve" />
                </div>

                <div className="update-inventory-input">
                    <label htmlFor="min">Enter the minimum required amount:</label>
                    <input type="text" id="min" name="min" />
                </div>

                <div className="update-inventory-buttons">
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" value="Submit">Update Item</button>
                </div>
            </form>
        </div>
    );
}
