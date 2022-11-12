import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UpdateMenu() {
    const navigate = useNavigate();

    const [menu, setMenu] = useState([{}]);

    useEffect(() => {
        fetch("/api/menu")
            .then(res => res.json())
            .then(menu => setMenu(menu.menu));
    }, []);


    //What happens when the user clicks submit
    function handleSubmit(e) {
        e.preventDefault();
        
        var selection = document.getElementById("item");
        const id = selection.options[selection.selectedIndex].value;

        const price = document.getElementById("price").value;
        const type = document.getElementById("type").value;
        const calories = document.getElementById("cal").value;

        fetch("/api/update-menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, price: price, type: type, cal: calories })
        })
            .then(res => res.json())
        
            alert("Update sent");
    }

    return (
        <div className="update-menu-container">
            <h1>Update Inventory</h1>

            {/* Where the user enters the information */}
            <form className="update-menu-form" onSubmit={handleSubmit}>
                
                {/* Lists the items currently in the inventory */}
                <div className="update-menu-input">
                    <label htmlFor="item">
                        Choose an item to update:
                    </label>
                    <select id="item">
                        {
                            menu.map((item,i) =>
                                <option key={i} value={item.product_id} name={item.product_name}>{item.product_name}</option>
                            )
                        }
                    </select>
                </div>

                <div className="update-menu-input">
                    <label htmlFor="price">Enter the quantity:</label>
                    <input type="text" id="price" name="price" />
                </div>

                <div className="update-menu-input">
                    <label htmlFor="cal">Enter the product type:</label>
                    <input type="text" id="cal" name="cal" />
                </div>

                <div className="update-menu-input">
                    <label htmlFor="type">Enter the serving size:</label>
                    <input type="text" id="type" name="type" />
                </div>

                <div className="update-menu-buttons">
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" value="Submit">Update Item</button>
                </div>
            </form>
        </div>
    );
}
