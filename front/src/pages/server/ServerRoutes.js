import { useEffect, useState } from "react";
import EmployeeCreateOrder from "./EmployeeCreateOrder";
import EmployeeBuildBowl from "./EmployeeBuildBowl";
import EmployeeBuildGyro from "./EmployeeBuildGyro";
import EmployeeSides from "./EmployeeSides";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../CreateOrder.css";

/**
 * @description Displays page for server to create an order for a customer
 * @param {*} props 
 * @returns null
 */
export default function ServerRoutes(props) {
    const [isLoading, setIsLoading] = useState(true);

    const [isMainPage, setIsMainPage] = useState(true)
    const [isBowlPage, setIsBowlPage] = useState(false);
    const [isGyroPage, setIsGyroPage] = useState(false);
    const [isSidePage, setIsSidePage] = useState(false);

    const [items, setItems] = useState({});

    const [orderItems, setOrderItems] = useState([]);
    const [editItem, setEditItem] = useState(undefined);

    const managerMode = props.manager === undefined ? false : true;

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/order-items")
            .then(res => res.json())
            .then(items => {
                setTimeout(() => {
                    setItems(items);
                    setIsLoading(false);
                }, 250);
            });
    }, []);

    /**
     * @description Adds item to order
     * @param {*} item 
     */
    function addOrderItem(item) {
        if (item !== undefined) {
            if (editItem !== undefined) {
                const index = orderItems.indexOf(editItem);

                const newOrderItems = [...orderItems];
                newOrderItems[index] = item;

                setOrderItems(newOrderItems);
            } else {
                setOrderItems(current => [...current, item]);
            }
        }

        setEditItem(undefined);

        changePage("Main");
    }

    /**
     * @description Edit one of the items on the order
     * @param {*} item 
     */
    function editOrderItem(item) {
        setEditItem(item);
        changePage(item.type);
    }

    /**
     * @description Remove item from current order
     * @param {*} item 
     */
    function removeOrderItem(item) {
        const index = orderItems.indexOf(item);
 
        const newOrderItems = [...orderItems];
        newOrderItems.splice(index, 1);

        setOrderItems(newOrderItems);
    }

    /**
     * @description Clear entire order
     */
    function clearOrder() {
        setOrderItems([]);
        setEditItem(undefined);
        changePage("Main");
    }

    /**
     * @description Changes page according to current page
     * @param {*} page 
     */
    function changePage(page) {
        setIsMainPage(false);
        setIsBowlPage(false);
        setIsGyroPage(false);
        setIsSidePage(false);

        switch (page) {
            case ("Main"):
                setIsMainPage(true);
                break;
            case ("Bowl"):
                setIsBowlPage(true);
                break;
            case ("Gyro"):
                setIsGyroPage(true);
                break;
            case ("Side"):
                setIsSidePage(true);
                break;
            default:
                setIsMainPage(true);
        }
    }

    return (
        <>
            <Modal isVisible={isLoading} full={!managerMode} loading={<LoadingSpinner />} />
            {isLoading ? <></> :
                <>
                    {isMainPage &&
                        <EmployeeCreateOrder
                            orderItems={orderItems}
                            changePage={changePage}
                            removeOrderItem={removeOrderItem}
                            editOrderItem={editOrderItem}
                            clearOrder={clearOrder}
                        />
                    }
                    {isBowlPage && <EmployeeBuildBowl items={items} addBowl={addOrderItem} editItem={editItem} />}
                    {isGyroPage && <EmployeeBuildGyro items={items} addGyro={addOrderItem} editItem={editItem} />}
                    {isSidePage &&
                        <EmployeeSides
                            items={items.menuItems.filter(item => item.product_type === "Side")}
                            addSide={addOrderItem}
                            editItem={editItem}
                        />
                    }
                </>
            }
        </>
    )
}  
