import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RemoveMenu() {
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

        fetch("/api/remove-menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        })
            .then(res => res.json())
        
            alert("Update sent");
    }

    return (
        <div className="remove-menu-container">
            <h1>Remove Menu</h1>

            {/* Where the user enters the information */}
            <form className="remove-menu-form" onSubmit={handleSubmit}>
                
                {/* Lists the items currently in the menu */}
                <div className="remove-menu-input">
                    <label htmlFor="item">
                        Choose an item to remove:
                    </label>
                    <select id="item">
                        {
                            menu.map((item,i) =>
                                <option key={i} value={item.product_id} name={item.product_name}>{item.product_name}</option>
                            )
                        }
                    </select>
                </div>
                <p></p>

                <div className="remove-menu-buttons">
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" value="Submit">Remove Item</button>
                </div>
            </form>
        </div>
    );
}
