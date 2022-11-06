import { useState } from "react";
import { v4 as uuid } from "uuid";
import Extra from "../../components/Extra";
import Option from "../../components/Option";
import "./Server.css";

export default function EmployeeBuildBowl(props) {
    const bases = props.items.bases;
    const proteins = props.items.proteins;
    const toppings = props.items.toppings;
    const dressings = props.items.dressings;
    const extraProtein = props.items.menuItems.filter(item => item.product_name === "Extra Protein")[0];
    const extraDressing = props.items.menuItems.filter(item => item.product_name === "Extra Dressing")[0];

    const editMode = props.editItem !== undefined

    function getSelectionObject(selectionId) {
        let selection;
        for (let key in props.items) {
            for (let i = 0; i < props.items[key].length; i++) {
                if (props.items[key][i].product_id === selectionId || props.items[key][i].item_id === selectionId) {
                    selection = props.items[key][i];
                    break;
                }
            }

            if (selection !== undefined) {
                break;
            }
        }

        return selection
    }

     function checkExtraProtein(selections) {
        const hasExtraProtein = selections.filter(selection => (
            selection.product_name === "Extra Protein"
        )).length > 0;

        const hasProtein = selections.filter(selection => (
            selection.product_type === "Protein"
        )).length > 0;

        if (hasExtraProtein && !hasProtein) {
            return true;
        }

        return false;
    }

    function checkExtraDressing(selections) {
        const hasExtraDressing = selections.filter(selection => (
            selection.product_name === "Extra Dressing"
        )).length > 0;

        const hasDressing = selections.filter(selection => (
            selection.product_type === "Dressing"
        )).length > 0;

        if (hasExtraDressing && !hasDressing) {
            return true;
        }

        return false;
    }

    function calculatePrice(selections) {
        // start with base price of a bowl
        let price = props.items.menuItems.filter(item => item.product_name === "Bowl")[0].price;

        // get the price for all the potentially selected extras
        selections.forEach(selection => {
            price += (selection.price === undefined) ? 0 : selection.price;
        });

        return price;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const selections = Array.from(document.querySelectorAll(".options-form input[type=\"checkbox\"]"))
            .filter(option => option.checked)
            .map(selection => getSelectionObject(selection.id));
        
        if (checkExtraProtein(selections)) {
            alert("Can't select extra protein with no protein selected");
            return;
        } else if (checkExtraDressing(selections)) {
            alert("Can't select extra dressing with no dressing selected");
            return;
        }

        const price = calculatePrice(selections);
        
        props.addBowl({
            id: uuid(),
            type: "Bowl",
            items: selections,
            price: price
        });
    }

    return (
        <>
            <div className="bowl-container">
                <div className="bowl-title">
                    <h1>Bowl</h1>
                </div>

                <form onSubmit={handleSubmit} className="options-form">
                    <div className="bowl-options">
                        <div className="bowl-option">
                            <p>Base</p>
                        </div>
                        <div className="options">
                            {
                                bases.map((item, i) =>
                                    <Option
                                        key={i}
                                        data={item}
                                        buttonType="radio"
                                        checked={editMode ? props.editItem.items.includes(item) : false}
                                    />
                                )
                            }
                        </div>

                        <div className="bowl-option">
                            <p>Protein</p>
                        </div>
                        <div className="options">
                            {
                                proteins.map((item, i) =>
                                    <Option
                                        key={i}
                                        data={item}
                                        buttonType="radio"
                                        checked={editMode ? props.editItem.items.includes(item) : false}
                                    />
                                )
                            }
                            <Extra
                                data={extraProtein}
                                type="Protein"
                                checked={editMode ? props.editItem.items.includes(extraProtein) : false}
                            />
                        </div>

                        <div className="bowl-option">
                            <p>Toppings</p>
                        </div>
                        <div className="options">
                            {
                                toppings.map((item, i) =>
                                    <Option
                                        key={i}
                                        data={item}
                                        buttonType="checkbox"
                                        checked={editMode ? props.editItem.items.includes(item) : false}
                                    />
                                )
                            }
                        </div>

                        <div className="bowl-option">
                            <p>Dressing</p>
                        </div>
                        <div className="options">
                            {
                                dressings.map((item, i) =>
                                    <Option
                                        key={i}
                                        data={item}
                                        buttonType="radio"
                                        checked={editMode ? props.editItem.items.includes(item) : false}
                                    />
                                )
                            }
                            <Extra
                                data={extraDressing}
                                type="Dressing"
                                checked={editMode ? props.editItem.items.includes(extraDressing) : false}
                            />
                        </div>
                    </div>
                    <div className="bowl-button-container">
                        <div className="bowl-buttons">
                            <button type="button" className="bowl-button" onClick={() => props.addBowl()}>Cancel</button>
                            <button type="submit" className="bowl-button">Add to Order</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
    /* const navigate = useNavigate();

    const location = useLocation();
    const { items } = location.state;

    const menuItems = items.menuItems;
    const bases = items.bases;
    const proteins = items.proteins;
    const toppings = items.toppings;
    const dressings = items.dressings;
    const extraProtein = menuItems.filter(item => item.item_name === "Extra Protein")[0];
    const extraDressing = menuItems.filter(item => item.item_name === "Extra Dressing")[0];

    // finds and returns the object corresponding to the selected options
    function getSelectionObject(selectionId) {
        let selection;
        for (let key in items) {
            for (let i = 0; i < items[key].length; i++) {
                if (items[key][i].product_id === selectionId || items[key][i].item_id === selectionId) {
                    selection = items[key][i];
                    break;
                }
            }

            if (selection !== undefined) {
                break;
            }
        }

        return selection
    }

    function checkExtraProtein(selections) {
        const hasExtraProtein = selections.filter(selection => (
            selection.item_name === "Extra Protein"
        )).length > 0;

        const hasProtein = selections.filter(selection => (
            selection.product_type === "Protein"
        )).length > 0;

        if (hasExtraProtein && !hasProtein) {
            return true;
        }

        return false;
    }

    function checkExtraDressing(selections) {
        const hasExtraDressing = selections.filter(selection => (
            selection.item_name === "Extra Dressing"
        )).length > 0;

        const hasDressing = selections.filter(selection => (
            selection.product_type === "Dressing"
        )).length > 0;

        if (hasExtraDressing && !hasDressing) {
            return true;
        }

        return false;
    }

    function calculatePrice(selections) {
        // start with base price of a bowl
        let price = menuItems.filter(item => item.item_name === "Bowl")[0].price;

        // get the price for all the potentially selected extras
        selections.forEach(selection => {
            price += (selection.price === undefined) ? 0 : selection.price;
        });

        return price;
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        const selections = Array.from(document.querySelectorAll(".options-form input[type=\"checkbox\"]"))
            .filter(option => option.checked)
            .map(selection => getSelectionObject(selection.id));
        
        if (checkExtraProtein(selections)) {
            alert("Can't select extra protein with no protein selected");
            return;
        } else if (checkExtraDressing(selections)) {
            alert("Can't select extra dressing with no dressing selected");
            return;
        }

        const price = calculatePrice(selections);

        navigate("/employee/server", { state: { type: "Bowl", selections: selections,  price: price } });
    }

    return (
        <>
            <div className="bowl-container">
                <div className="bowl-title">
                    <h1>Bowl</h1>
                </div>

                <form onSubmit={handleSubmit} className="options-form">
                    <div className="bowl-options">
                        <div className="bowl-option">
                            <p>Base</p>
                        </div>
                        <div className="options">
                            {
                                bases.map((item, i) =>
                                    <Option key={i} data={item} buttonType="radio" />
                                )
                            }
                        </div>

                        <div className="bowl-option">
                            <p>Protein</p>
                        </div>
                        <div className="options">
                            {
                                proteins.map((item, i) =>
                                    <Option key={i} data={item} buttonType="radio" />
                                )
                            }
                            <Extra data={extraProtein} type="Protein" />
                        </div>

                        <div className="bowl-option">
                            <p>Toppings</p>
                        </div>
                        <div className="options">
                            {
                                toppings.map((item, i) =>
                                    <Option key={i} data={item} buttonType="checkbox" />
                                )
                            }
                        </div>

                        <div className="bowl-option">
                            <p>Dressing</p>
                        </div>
                        <div className="options">
                            {
                                dressings.map((item, i) =>
                                    <Option key={i} data={item} buttonType="radio" />
                                )
                            }
                            <Extra data={extraDressing} type="Dressing" />
                        </div>
                    </div>
                    <div className="bowl-button-container">
                        <div className="bowl-buttons">
                            <button type="button" className="bowl-button" onClick={() => navigate(-1)}>Cancel</button>
                            <button type="submit" className="bowl-button">Add to Order</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    ); */
}
