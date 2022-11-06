import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io"
import "./OrderItem.css"

export default function OrderChoice(props) {
    const [extendDisplay, setExtendDisplay] = useState(false);

    function changeDropdown() {
        setExtendDisplay(current => !current);
    }

    function getItemDisplay() {
        if (props.item.type !== "Side") {
            return (
                <div className="order-item">
                    <div className="order-dropdown">
                        {extendDisplay ?
                            <IoIosArrowDropup onClick={changeDropdown} /> :
                            <IoIosArrowDropdown onClick={changeDropdown} />
                        }
                    </div>
                    <div>
                        <p>{props.item.type}</p>
                        {
                            extendDisplay ? 
                                <div>
                                    {
                                        props.item.items.map((item, i) => (
                                            <p key={i}>
                                                {item.product_name === undefined ?
                                                    item.item_name : item.product_name
                                                }
                                            </p>
                                        ))
                                    }
                                </div> :
                                <></>
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div className="order-item">
                    {props.item.items[0].product_name}
                </div>
            );
        }
    }

    return (
        <>
            <td>
                {getItemDisplay()}
            </td>
            <td>${props.item.price.toFixed(2)}</td>
            <td>
                {
                    props.item.type !== "Side" ?
                        <FiEdit onClick={() => props.editOrderItem(props.item)} /> :
                        <></>
                }
            </td >
            <td><FiTrash onClick={() => props.removeOrderItem(props.item)} /></td>
        </>
    );
}   
