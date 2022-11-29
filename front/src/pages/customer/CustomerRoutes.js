import { useEffect, useState } from "react";
import CreateOrder from "./CreateOrder";
import BuildBowl from "./BuildBowl";
import BuildGyro from "./BuildGyro";
import Sides from "./Sides";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";
import "../CreateOrder.css";

/**
 * Displays page for customer to create order
 * @returns null
 */
export default function CustomerRoutes() {
    const [isLoading, setIsLoading] = useState(true);

    const [isMainPage, setIsMainPage] = useState(true)
    const [isBowlPage, setIsBowlPage] = useState(false);
    const [isGyroPage, setIsGyroPage] = useState(false);
    const [isSidePage, setIsSidePage] = useState(false);

    const [items, setItems] = useState({});

    const [orderItems, setOrderItems] = useState([]);
    const [editItem, setEditItem] = useState(undefined);

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
     * Adds item to order
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
     * Edit one of the items on the order
     * @param {*} item 
     */
    function editOrderItem(item) {
        setEditItem(item);
        changePage(item.type);
    }

    /**
     * Remove item from current order
     * @param {*} item 
     */
    function removeOrderItem(item) {
        const index = orderItems.indexOf(item);
 
        const newOrderItems = [...orderItems];
        newOrderItems.splice(index, 1);

        setOrderItems(newOrderItems);
    }

    /**
     * Clear entire order
     */
    function clearOrder() {
        setOrderItems([]);
        setEditItem(undefined);
        changePage("Main");
    }

    /**
     * Changes page according to current page
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
            <Modal isVisible={isLoading} full={true} loading={<LoadingSpinner />} />
            {isLoading ? <></> :   
                <>
                    {isMainPage &&
                        <CreateOrder
                            orderItems={orderItems}
                            changePage={changePage}
                            removeOrderItem={removeOrderItem}
                            editOrderItem={editOrderItem}
                            clearOrder={clearOrder}
                            orderTypes={items.menuItems}
                        />
                    }
                    {isBowlPage && <BuildBowl items={items} addBowl={addOrderItem} editItem={editItem} />}
                    {isGyroPage && <BuildGyro items={items} addGyro={addOrderItem} editItem={editItem} />}
                    {isSidePage &&
                        <Sides
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
