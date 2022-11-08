import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';

export default function AddMenu() {
    const navigate = useNavigate();

    //What happens when the user clicks submit
    function handleSubmit(e) {
        e.preventDefault();
        
        const temp = uuid();
        const id = temp.toString();

        var selection = document.getElementById("type");
        const type = selection.options[selection.selectedIndex].value;

        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const calorie = document.getElementById("cal").value;

        if(name === '' || price === '' || calorie === '' ){
            alert("Please enter all the fields")
        } else {

            fetch("/api/add-menu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, id: id, type: type, price: price, cal: calorie })
            })
                .then(res => res.json())
            
            alert("Update sent");
        }
    }

    return (
        <>
            <h1>Add Menu</h1>

            {/* Where user enters information on new item */}
            <form onSubmit={handleSubmit}>
                <label for="name">Enter the new menu item name:</label>
                <input type="text" id="name" name="name"></input>

                <p></p>
                <label for="type">
                    Choose a product type:
                </label>
                <select id="type">
                        <option value="Type">Type</option>
                        <option value="Side">Side</option>
                        <option value="Extra">Extra</option>
                </select>
                <p></p>

                <label for="price">Enter the menu price:</label>
                <input type="text" id="price" name="price"></input>

                <label for="cal">Enter the new menu item calorie/caloric range:</label>
                <input type="text" id="cal" name="cal"></input>

                <input type="submit" value="Submit"></input>
            </form>

            <button onClick={() => navigate(-1)}>Back</button>
        </>
    );
}
