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
        <>
            <h1>Update Inventory</h1>

            <form onSubmit={handleSubmit}>
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
                <p></p>

                <label for="quan">Enter the quantity:</label>
                <input type="text" id="quan" name="quan"></input>

                <label for="type">Enter the product type:</label>
                <input type="text" id="type" name="type"></input>

                <label for="serve">Enter the serving size:</label>
                <input type="text" id="serve" name="serve"></input>

                <label for="min">Enter the minimum required amount:</label>
                <input type="text" id="min" name="min"></input>

                <input type="submit" value="Submit"></input>
            </form>

            <button onClick={() => navigate(-1)}>Back</button>
        </>
    );
}
