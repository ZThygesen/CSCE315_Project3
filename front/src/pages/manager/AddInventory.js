import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import uuid from 'react-uuid';

export default function AddInventory() {
    const navigate = useNavigate();

    //Stores the invetory items from the database
    const [inventory, setInventory] = useState([{}]);
    
    //Gets the inventory from the database using Express route and puts in 'inventory'
    useEffect(() => {
        fetch("/api/inventory")
            .then(res => res.json())
            .then(inventory => setInventory(inventory.inventory));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        
        const temp = uuid();
        const id = temp.toString();

        const name = document.getElementById("name").value;
        const quantity = document.getElementById("quan").value;
        const type = document.getElementById("type").value;
        const serve = document.getElementById("serve").value;
        const minimum = document.getElementById("min").value;

        fetch("/api/add-inv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, id: id, quantity: quantity, type: type, serve: serve, onhand: minimum })
        })
            .then(res => res.json())
        
            alert("Update sent");
    }

    return (
        <>
            <h1>Add Inventory</h1>

            {/* Where user enters information on new item */}
            <form onSubmit={handleSubmit}>
                <label for="quan">Enter the new item name:</label>
                <input type="text" id="name" name="name"></input>

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
