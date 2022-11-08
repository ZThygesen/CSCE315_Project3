import { useEffect, useState } from "react";
import CreateOrder from "./CreateOrder";
import BuildBowl from "./BuildBowl";
import BuildGyro from "./BuildGyro";
import Sides from "./Sides";
import "../CreateOrder.css";

export default function CustomerRoutes() {
    const [isMainPage, setIsMainPage] = useState(true)
    const [isBowlPage, setIsBowlPage] = useState(false);
    const [isGyroPage, setIsGyroPage] = useState(false);
    const [isSidePage, setIsSidePage] = useState(false);

    const [items, setItems] = useState({});

    const [orderItems, setOrderItems] = useState([]);
    const [editItem, setEditItem] = useState(undefined);

    useEffect(() => {
        fetch("/api/order-items")
            .then(res => res.json())
            .then(test => setItems(test));
    }, []);

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

    function editOrderItem(item) {
        setEditItem(item);
        changePage(item.type);
    }

    function removeOrderItem(item) {
        const index = orderItems.indexOf(item);
 
        const newOrderItems = [...orderItems];
        newOrderItems.splice(index, 1);

        setOrderItems(newOrderItems);
    }

    function clearOrder() {
        setOrderItems([]);
        setEditItem(undefined);
        changePage("Main");
    }

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
    )
}  
