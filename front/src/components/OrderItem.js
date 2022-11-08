import { useState } from "react";
import { TfiAngleDoubleDown, TfiAngleDoubleUp, TfiPencil, TfiTrash } from "react-icons/tfi";
import "./OrderItem.css"

export default function OrderChoice(props) {
    const isSide = props.item.type === "Side";
    const [isExtended, setIsExtended] = useState(false);

    function changeDropdown() {
        setIsExtended(current => !current);
    }

    function sideDisplay() {
        return (
            <>
                <p className="item-name">{props.item.items[0].product_name}</p>
                <p className="item-price">${props.item.price.toFixed(2)}</p>
                <TfiTrash className="item-remove" onClick={() => props.removeOrderItem(props.item)} />
            </>
        );
    }

    function itemDisplay() {
        return (
            <>
                <div className="item-dropdown">
                    {isExtended ?
                        <TfiAngleDoubleUp className="item-dropup" onClick={changeDropdown} /> :
                        <TfiAngleDoubleDown className="item-dropdown" onClick={changeDropdown} />
                    }
                </div>
                <p className="item-name">{props.item.type}</p>
                <p className="item-price">${props.item.price.toFixed(2)}</p>
                <TfiPencil className="item-edit" onClick={() => props.editOrderItem(props.item)} />
                <TfiTrash className="item-remove" onClick={() => props.removeOrderItem(props.item)} />
            </>
        );
    }

    function getItemDetails() {
        return (
            <>
                {
                    props.item.items.map((item, i) => (
                        <p key={i}>
                            {item.product_name === undefined ?
                                item.product_name : item.product_name
                            }
                        </p>
                    ))
                }
            </>
        );
    }

    return (
        <div className="current-order-item">
            <div className="order-item">
                {isSide ? sideDisplay() : itemDisplay()}
            </div>
            <div className="order-item-details">
                {isExtended && getItemDetails()}
            </div>
        </div>
    );
}   
