import { useEffect, useState } from "react";
import EmployeeCreateOrder from "./EmployeeCreateOrder";
import EmployeeBuildBowl from "./EmployeeBuildBowl";
import EmployeeBuildGyro from "./EmployeeBuildGyro";
import EmployeeSides from "./EmployeeSides";

export default function ServerRoutes() {
    const [isMainPage, setIsMainPage] = useState(true)
    const [isBowlPage, setIsBowlPage] = useState(false);
    const [isGyroPage, setIsGyroPage] = useState(false);
    const [isSidePage, setIsSidePage] = useState(false);

    const [items, setItems] = useState({});

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        fetch("/api/order-items")
            .then(res => res.json())
            .then(test => setItems(test));
    }, []);

    //console.log(items)
    
    function addOrderItem(item) {
        if (item !== undefined) {
            setOrderItems(current => [...current, item]);
        }
        changePage("main");
    }

    function editOrderItem(item) {

    }

     function removeOrderItem(item) {
        let index;
        for (let i = 0; i < orderItems.length; i++) {
            if (orderItems[i] === item) {
                index = i;
            }
        }

        setOrderItems(current => current.splice(index, 1));
    }

    function changePage(page) {
        setIsMainPage(false);
        setIsBowlPage(false);
        setIsGyroPage(false);
        setIsSidePage(false);

        switch (page) {
            case ("main"):
                setIsMainPage(true);
                break;
            case ("bowl"):
                setIsBowlPage(true);
                break;
            case ("gyro"):
                setIsGyroPage(true);
                break;
            case ("side"):
                setIsSidePage(true);
                break;
            default:
                setIsMainPage(true);
        }
    }

    return (
        <>
            {isMainPage &&
                <EmployeeCreateOrder
                    orderItems={orderItems}
                    changePage={changePage}
                    removeOrderItem={removeOrderItem}
                    editOrderItem={editOrderItem}
                />}
            {isBowlPage && <EmployeeBuildBowl items={items} addBowl={addOrderItem} />}
            {isGyroPage && <EmployeeBuildGyro items={items} addGyro={addOrderItem} />}
            {isSidePage && <EmployeeSides items={items.menuItems} addSide={addOrderItem} />}
        </>
    )
}  
