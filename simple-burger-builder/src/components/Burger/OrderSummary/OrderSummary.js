import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(
            x => {
                return <li key={x}><span style={{textTransform: 'capitalize'}}>{x}</span>: {props.ingredients[x]}</li>
            }
        );

    // <li>Salad: 1</li>
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicius Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout</p>
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </Aux>
    )
}

export default orderSummary;