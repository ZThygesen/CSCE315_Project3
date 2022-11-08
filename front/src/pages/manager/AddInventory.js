import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import uuid from 'react-uuid';

export default function AddInventory() {
    const navigate = useNavigate();

    const [inventory, setInventory] = useState([{}]);
    
    //Gets the inventory from the database using Express route and puts in 'inventory'
    useEffect(() => {
        fetch("/api/inventory")
            .then(res => res.json())
            .then(inventory => setInventory(inventory.inventory));
    }, []);

    //What happens when the user clicks submit
    function handleSubmit(e) {
        e.preventDefault();
        
        const temp = uuid();
        const id = temp.toString();

        var selection = document.getElementById("type");
        const type = selection.options[selection.selectedIndex].value;

        const name = document.getElementById("name").value;
        const quantity = document.getElementById("quan").value;
        const serve = document.getElementById("serve").value;
        const minimum = document.getElementById("min").value;

        if(name === '' || quantity === '' || type === '' || serve === "" || minimum === '' ){
            alert("Please enter all the fields")
        } else {

            fetch("/api/add-inv", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, id: id, quantity: quantity, type: type, serve: serve, onhand: minimum })
            })
                .then(res => res.json())
            
            alert("Update sent");
        }
    }

    return (
        <>
            <h1>Add Inventory</h1>

            {/* Where user enters information on new item */}
            <form onSubmit={handleSubmit}>
                <label for="name">Enter the new item name:</label>
                <input type="text" id="name" name="name"></input>

                <label for="quan">Enter the quantity:</label>
                <input type="text" id="quan" name="quan"></input>

                <p></p>
                <label for="type">
                    Choose a product type:
                </label>
                <select id="type">
                        <option value="Pita">Pita</option>
                        <option value="Rice">Rice</option>
                        <option value="Protein">Protein</option>
                        <option value="Topping">Topping</option>
                        <option value="Dressing">Dressing</option>
                        <option value="Side">Side</option>
                </select>
                <p></p>

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
