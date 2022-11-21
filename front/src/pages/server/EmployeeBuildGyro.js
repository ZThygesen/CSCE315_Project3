import { useState } from "react";
import { v4 as uuid } from "uuid";
import Extra from "../../components/Extra";
import Option from "../../components/Option";
import Modal from "../../components/Modal";

export default function EmployeeBuildGyro(props) {
    const pita = props.items.pita[0];
    const proteins = props.items.proteins;
    const toppings = props.items.toppings;
    const dressings = props.items.dressings;
    const extraProtein = props.items.menuItems.filter(item => item.product_name === "Extra Protein")[0];
    const extraDressing = props.items.menuItems.filter(item => item.product_name === "Extra Dressing")[0];

    const editMode = props.editItem !== undefined;

    const [extraProteinErr, setExtraProteinErr] = useState(false);
    const [extraDressingErr, setExtraDressingErr] = useState(false);

    function getSelectionObject(selectionId) {
        let selection;
        for (let key in props.items) {
            for (let i = 0; i < props.items[key].length; i++) {
                if (props.items[key][i].product_id === selectionId) {
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
        // start with base price of a gyro
        let price = props.items.menuItems.filter(item => item.product_name === "Gyro")[0].price;

        // get the price for all the potentially selected extras
        selections.forEach(selection => {
            price += (selection.price === undefined) ? 0 : selection.price;
        });

        return price;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const selections = Array.from(document.querySelectorAll(".order-options-form input[type=\"checkbox\"]"))
            .filter(option => option.checked)
            .map(selection => getSelectionObject(selection.id));
        
        if (checkExtraProtein(selections)) {
            setExtraProteinErr(true);
            return;
        } else if (checkExtraDressing(selections)) {
            setExtraDressingErr(true);
            return;
        }

        const price = calculatePrice(selections);

        if (selections.length === 0) {
            props.addGyro();
        } else {
            selections.push(pita);
            props.addGyro({
                id: uuid(),
                type: "Gyro",
                items: selections,
                price: price
            });
        }
    }

    function ExtraProteinModal() {
        return (
            <Modal isVisible={extraProteinErr} full={true}
                body={
                    <p>Cannot select extra protein with no protein selected</p>
                }
                footer={ 
                    <button
                        className="modal-close-button"
                        onClick={() => setExtraProteinErr(current => !current)}
                    >
                        Close
                    </button>
                }
            />
        );
    }

    function ExtraDressingModal() {
        return (
            <Modal isVisible={extraDressingErr} full={true}
                body={
                    <p>Cannot select extra dressing with no dressing selected</p>
                }
                footer={ 
                    <button
                        className="modal-close-button"
                        onClick={() => setExtraDressingErr(current => !current)}
                    >
                        Close
                    </button>
                }
            />
        );
    }

    return (
        <>
            <ExtraProteinModal />
            <ExtraDressingModal />
            <div className="order-options-container">
                <div className="order-options-title">
                    <h1>Gyro</h1>
                </div>

                <form onSubmit={handleSubmit} className="order-options-form">
                    <div className="order-options">
                        <div className="order-option">
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

                        <div className="order-option">
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

                        <div className="order-option">
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
                    <div className="order-options-button-container">
                        <div className="order-option-buttons">
                            <button type="button" className="order-option-button" onClick={() => props.addGyro()}>Cancel</button>
                            <button type="submit" className="order-option-button">Add to Order</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
