/* import { React, useState } from 'react';
import "./Counter.css";
 
export default function Counter({countToOrder}) {
    const [counter, setCounter] = useState(0);
    countToOrder(counter);

    //increase counter
    const increase = () => {
        setCounter(count => count + 1);
        countToOrder(counter);
    };

    //decrease counter
    const decrease = () => {
        if (counter > 0) {
            setCounter(count => count - 1);
        }
        countToOrder(counter);
    };

    //reset counter 
    const reset = () =>{
        setCounter(0)
        countToOrder(counter);
    }

    return (
    <div className="counter">
        <h1>React Counter</h1>
        <span className="counter__output">{counter}</span>
        <div className="btn__container">
        <button className="control__btn" onClick={increase}>+</button>
        <button className="control__btn" onClick={decrease}>-</button>
        <button className="reset" onClick={reset}>Reset</button>
        </div>
    </div>
    );
} */
